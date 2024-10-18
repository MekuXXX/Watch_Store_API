import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import {
  User,
  categories,
  product_category,
  products,
  products_rel,
  user_product,
} from 'src/db/schema';
import { QueriesDto } from 'src/dtos/queries.dto';
import { SQL, and, eq, gte, ilike, inArray, lte, or, sql } from 'drizzle-orm';
import { SearchProduct } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  private transformProduct(product: any) {
    return {
      ...product,
      categories: product.categories.map((cat) => cat.category.name),
    };
  }

  private async createProductCategory(
    categoryType: CreateProductDto['category_type'],
    categoriesData: CreateProductDto['categories'],
    productId: string,
  ) {
    const productCategoryRel = [];

    if (categoryType === 'id') {
      categoriesData.forEach((id) =>
        productCategoryRel.push({
          product_id: productId,
          category_id: id,
        }),
      );
    } else {
      const categories_ids = await this.db.query.categories.findMany({
        where: inArray(categories.name, categoriesData),
        columns: {
          id: true,
        },
      });

      if (categories_ids.length !== categoriesData.length) {
        throw new NotFoundException('Some category names do not exist');
      }

      categories_ids.forEach((category) =>
        productCategoryRel.push({
          product_id: productId,
          category_id: category.id,
        }),
      );
    }

    await this.db.insert(product_category).values(productCategoryRel);

    return productCategoryRel;
  }

  async create(createProductDto: CreateProductDto) {
    const product = (
      await this.db.insert(products).values(createProductDto).returning()
    )[0];

    try {
      await this.createProductCategory(
        createProductDto.category_type,
        createProductDto.categories,
        product.id,
      );
    } catch (error) {
      await this.db.delete(products).where(eq(products.id, product.id));

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(
        'Error occurred during product creation: ' + error.message,
      );
    }

    return {
      success: true,
      message: 'Product created successfully',
      data: { product },
    };
  }

  async findAll(
    queries: QueriesDto,
    searchProduct: SearchProduct,
    user?: User,
  ) {
    const andQueries = [];

    // Search by product name and description
    if (queries.query) {
      andQueries.push(
        or(
          ilike(products.name, `%${queries.query}%`),
          ilike(products.description, `%${queries.query}%`),
        ),
      );
    }

    // Price filters
    if (searchProduct.maxPrice) {
      andQueries.push(lte(products.price, searchProduct.maxPrice));
    }

    if (searchProduct.minPrice) {
      andQueries.push(gte(products.price, searchProduct.minPrice));
    }

    // Quantity filters
    if (searchProduct.maxQuantity) {
      andQueries.push(lte(products.quantity, searchProduct.maxQuantity));
    }

    if (searchProduct.minQuantity) {
      andQueries.push(gte(products.quantity, searchProduct.minQuantity));
    }

    // Search by product category
    if (searchProduct.categories) {
      let categoriesId: string[] = [];
      const categoriesArray = searchProduct.categories
        .split(',')
        .map((category) => category.trim());

      if (searchProduct.category_type === 'id') {
        categoriesId = categoriesArray;
      } else {
        const categoriesData = await this.db.query.categories.findMany({
          where: (_, { inArray }) => inArray(categories.name, categoriesArray),
          columns: { id: true },
        });
        categoriesId = categoriesData.map((category) => category.id);
      }

      const productIds = await this.db.query.product_category.findMany({
        where: (_, { inArray }) =>
          inArray(product_category.category_id, categoriesId),
        columns: { product_id: true },
      });

      const productIdsArray = [
        ...new Set(productIds.map((product) => product.product_id)),
      ];

      if (productIdsArray.length) {
        andQueries.push(inArray(products.id, productIdsArray));
      }
    }

    // Query for products
    const baseQuery = this.db.query.products.findMany({
      columns: {
        id: true,
        name: true,
        description: true,
        image_url: true,
        price: true,
        quantity: true,
        // Select whether the product is wishlisted by the user
      },
      with: {
        categories: {
          columns: {},
          with: {
            category: {
              columns: { name: true },
            },
          },
        },
      },
      extras: {
        is_wishlisted: user
          ? sql`EXISTS (SELECT 1 FROM user_product WHERE user_product.product_id = products.id AND user_product.user_id = ${user.id})`.as(
              'is_wishlisted',
            )
          : sql`false`.as('is_wishlisted'),
      },
      limit: queries.limit,
      offset: queries.limit * (queries.page - 1),
      where: and(...andQueries),
    });

    const dbProducts = await baseQuery;

    const transformedProducts = dbProducts.map(this.transformProduct);

    return {
      success: true,
      message: 'Got the products successfully',
      data: { products: transformedProducts },
    };
  }

  async findOne(id: string) {
    const product = await this.db.query.products.findFirst({
      where: (product, { eq }) => eq(product.id, id),
      with: {
        categories: {
          columns: {},
          with: {
            category: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product is not found');
    }

    const transformedProduct = this.transformProduct(product);

    return { success: true, data: { product: transformedProduct } };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categories, category_type, ...updateData } = updateProductDto;

    const product = await this.db.query.products.findFirst({
      where: (product, { eq }) => eq(product.id, id),
    });

    if (!product) {
      throw new NotFoundException('Product is not found');
    }

    if (Object.keys(updateData).length) {
      await this.db.update(products).set(updateData).where(eq(products.id, id));
    }

    if (categories && categories.length) {
      const oldRelations = await this.db.query.product_category.findMany({
        where: eq(product_category.product_id, product.id),
        columns: { category_id: true },
      });

      try {
        await this.db
          .delete(product_category)
          .where(eq(product_category.product_id, id));
        await this.createProductCategory(category_type, categories, product.id);
      } catch (error) {
        await this.db.insert(product_category).values(
          oldRelations.map(({ category_id }) => ({
            product_id: product.id,
            category_id,
          })),
        );
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }

        throw new InternalServerErrorException(
          'Error occurred during updating product relations: ' + error.message,
        );
      }
    }

    return { success: true, data: { product } };
  }

  async remove(id: string) {
    const product = (
      await this.db.delete(products).where(eq(products.id, id)).returning()
    )[0];

    if (!product) {
      throw new NotFoundException('Product is not found');
    }

    return { success: true, data: { product } };
  }

  categoryColumn(type: 'id' | 'name') {
    return type === 'id' ? categories.id : categories.name;
  }
}
