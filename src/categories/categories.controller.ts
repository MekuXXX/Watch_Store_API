import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueriesDto } from 'src/dtos/queries.dto';
import {
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Roles } from 'src/decorators/role';
import { Public } from 'src/decorators/public';

@ApiTags('Categories')
@UseInterceptors(CacheInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(['admin'])
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({
    type: CreateCategoryDto,
  })
  @ApiOkResponse({
    description: 'Category created successfully',
    schema: {
      example: {
        success: true,
        message: 'Category created successfully',
        data: {
          category: {
            id: '1',
            name: 'Books',
            cover_url: 'https://example.com/book-cover.jpg',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or missing fields',
    schema: {
      example: {
        success: false,
        message: 'Must provide valid data to create a category',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    schema: {
      example: {
        success: false,
        message: 'Forbidden resource',
      },
    },
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all categories with pagination and search' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of categories per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Search term to filter categories by name',
  })
  @ApiOkResponse({
    description: 'Categories retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Got the categories successfully',
        data: {
          categories: [
            {
              id: '1',
              name: 'Books',
              cover_url: 'https://example.com/book-cover.jpg',
            },
          ],
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    schema: {
      example: {
        success: false,
        message: 'Invalid query parameters',
      },
    },
  })
  findAll(@Query() queriesDto: QueriesDto) {
    return this.categoriesService.findAll(queriesDto);
  }

  @Public()
  @Get(':value')
  @ApiOperation({ summary: 'Get a category by ID or name' })
  @ApiParam({
    name: 'value',
    description: 'ID or name of the category',
  })
  @ApiQuery({
    name: 'type',
    required: true,
    description: 'Search category by either id or name',
    enum: ['id', 'name'],
  })
  @ApiOkResponse({
    description: 'Category retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Getting the category successfully',
        data: {
          category: {
            id: '1',
            name: 'Books',
            cover_url: 'https://example.com/book-cover.jpg',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        success: false,
        message: 'Category is not found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid type query parameter',
    schema: {
      example: {
        success: false,
        message: 'Must provide the way to find the category',
      },
    },
  })
  findOne(@Param('value') value: string, @Query('type') type: 'id' | 'name') {
    if (type === 'id' || type === 'name') {
      return this.categoriesService.findOne(type, value);
    }
    throw new BadRequestException('Must provide the way to find the category');
  }

  @Roles(['admin'])
  @Patch(':value')
  @ApiOperation({ summary: 'Update a category by ID or name' })
  @ApiParam({
    name: 'value',
    description: 'ID or name of the category',
  })
  @ApiQuery({
    name: 'type',
    required: true,
    description: 'Update category by either id or name',
    enum: ['id', 'name'],
  })
  @ApiBody({
    type: UpdateCategoryDto,
  })
  @ApiOkResponse({
    description: 'Category updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Category updated successfully',
        data: {
          category: {
            id: '1',
            name: 'Updated Books',
            cover_url: 'https://example.com/updated-book-cover.jpg',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    schema: {
      example: {
        success: false,
        message: 'Forbidden resource',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Missing fields or invalid data',
    schema: {
      example: {
        success: false,
        message: 'Must provide data to update the category',
      },
    },
  })
  update(
    @Param('value') value: string,
    @Query('type') type: 'id' | 'name',
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    if (type === 'id' || type === 'name') {
      return this.categoriesService.update(type, value, updateCategoryDto);
    }
    throw new BadRequestException(
      'Must provide the way to update the category',
    );
  }

  @Roles(['admin'])
  @Delete(':value')
  @ApiOperation({ summary: 'Delete a category by ID or name' })
  @ApiParam({
    name: 'value',
    description: 'ID or name of the category',
  })
  @ApiQuery({
    name: 'type',
    required: true,
    description: 'Delete category by either id or name',
    enum: ['id', 'name'],
  })
  @ApiOkResponse({
    description: 'Category deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Category deleted successfully',
        data: {
          category: {
            id: '1',
            name: 'Books',
            cover_url: 'https://example.com/book-cover.jpg',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Category does not exist',
    schema: {
      example: {
        success: false,
        message: 'Category does not exist',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    schema: {
      example: {
        success: false,
        message: 'Forbidden resource',
      },
    },
  })
  remove(@Param('value') value: string, @Query('type') type: 'id' | 'name') {
    if (type === 'id' || type === 'name') {
      return this.categoriesService.remove(type, value);
    }
    throw new BadRequestException(
      'Must provide the way to remove the category',
    );
  }
}
