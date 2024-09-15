import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { categories } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoriesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = (
      await this.db.insert(categories).values([createCategoryDto]).returning({
        id: categories.id,
        name: categories.name,
        cover_url: categories.cover_url,
      })
    )[0];

    return {
      success: true,
      message: 'Category created successfully',
      data: { category },
    };
  }

  async findAll() {
    const categories = await this.db.query.categories.findMany({
      columns: { id: true, name: true, cover_url: true },
    });
    return {
      success: true,
      message: 'Got the categories successfully',
      data: { categories },
    };
  }

  async findOne(type: 'id' | 'name', value: string) {
    const category = await this.db.query.categories.findFirst({
      where: (category, { eq }) =>
        eq(type === 'id' ? category.id : category.name, value),
      columns: {
        id: true,
        name: true,
        cover_url: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category is not found');
    }

    return {
      success: true,
      message: 'Gettint the category successfully',
      data: { category },
    };
  }

  async update(
    type: 'id' | 'name',
    value: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    let checkValues = false;

    for (const category of Object.keys(updateCategoryDto)) {
      if (updateCategoryDto[category]) {
        checkValues = true;
      }
    }

    if (!checkValues) {
      throw new BadRequestException('Must provide the to update the category');
    }

    const category = (
      await this.db
        .update(categories)
        .set({ ...updateCategoryDto })
        .where(eq(type === 'id' ? categories.id : categories.name, value))
        .returning({
          id: categories.id,
          name: categories.name,
          cover_url: categories.cover_url,
        })
    )[0];

    if (!category) {
      throw new InternalServerErrorException(
        'Error happened during updating the category',
      );
    }

    return {
      success: true,
      message: 'Category updated successfully',
      data: { category },
    };
  }

  async remove(type: 'id' | 'name', value: string) {
    const category = (
      await this.db
        .delete(categories)
        .where(eq(type === 'id' ? categories.id : categories.name, value))
        .returning()
    )[0];

    if (!category) {
      throw new BadRequestException('Category is not exist');
    }

    return {
      success: true,
      message: 'Category deleted successfully',
      data: { category },
    };
  }
}
