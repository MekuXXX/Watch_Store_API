import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { products } from 'src/db/schema';
import { QueriesDto } from 'src/dtos/queries.dto';
import { eq, ilike } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createProductDto: CreateProductDto) {
    const product = (
      await this.db.insert(products).values(createProductDto).returning()
    )[0];

    return {
      success: true,
      data: { product },
    };
  }

  async findAll(queries: QueriesDto) {
    const dbProducts = await this.db.query.products.findMany({
      columns: {
        id: true,
        name: true,
        description: true,
        image_url: true,
        price: true,
        quantity: true,
      },
      limit: queries.limit,
      offset: queries.limit * (queries.page - 1),
      where: ilike(products.name, `%${queries.query}%`),
    });

    return {
      success: true,
      message: 'Got the categories successfully',
      data: { products: dbProducts },
    };
  }

  async findOne(id: string) {
    const product = await this.db.query.products.findFirst({
      where: (product, { eq }) => eq(product.id, id),
    });

    if (!product) {
      throw new NotFoundException('Product is not found');
    }

    return { success: true, data: { product } };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = (
      await this.db
        .update(products)
        .set(updateProductDto)
        .where(eq(products.id, id))
        .returning()
    )[0];

    if (!product) {
      throw new NotFoundException('Product is not found');
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
}
