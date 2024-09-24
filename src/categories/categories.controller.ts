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
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/decorators/role';
import { Public } from 'src/decorators/public';
import { QueriesDto } from 'src/dtos/queries.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Categories')
@Controller('categories')
@UseInterceptors(CacheInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(['admin'])
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created successfully',
    schema: {
      example: {
        success: true,
        message: 'Category created successfully',
        data: {
          category: {
            id: '123',
            name: "Men's",
            cover_url: 'https://category_cover_url.com',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    example: {
      success: false,
      message: 'Bad request',
    },
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve all categories',
    schema: {
      example: {
        success: true,
        message: 'Got the categories successfully',
        data: {
          categories: [
            {
              id: '123',
              name: "Men's",
              cover_url: 'https://category_cover_url.com',
            },
            {
              id: '124',
              name: "Women's",
              cover_url: 'https://category_cover_url.com',
            },
          ],
        },
      },
    },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Pagination page' })
  @ApiQuery({ name: 'query', required: false, description: 'Search query' })
  @Get()
  findAll(
    @Query()
    queriesDto: QueriesDto,
  ) {
    return this.categoriesService.findAll(queriesDto);
  }

  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve category by ID or name',
    schema: {
      example: {
        success: true,
        message: 'Category found successfully',
        data: {
          category: {
            id: '123',
            name: "Men's",
            cover_url: 'https://category_cover_url.com',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    example: {
      success: false,
      message: 'Category not found',
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid type query parameter',
    example: {
      success: false,
      message: 'Must provide a valid "type" query parameter (id or name)',
    },
  })
  @Get(':value')
  findOne(@Param('value') value: string, @Query('type') type: 'id' | 'name') {
    if (type === 'id' || type === 'name') {
      return this.categoriesService.findOne(type, value);
    }
    throw new BadRequestException('Must provide the way to find the category');
  }

  @Roles(['admin'])
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Category updated successfully',
        data: {
          category: {
            id: '123',
            name: 'Updated Name',
            cover_url: 'https://updated_cover_url.com',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data',
    example: {
      success: false,
      message: 'Must provide valid data to update the category',
    },
  })
  @Patch(':value')
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
  @ApiOkResponse({
    description: 'Category deleted successfully',
    example: {
      success: true,
      meessage: 'Category deleted successfully',
      data: {
        category: {
          id: '1d432vrad312415134214cvra',
          name: 'Men',
          cover: 'https://cover_url.com',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    example: {
      success: false,
      message: 'Category is not exist',
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid type for deletion',
    example: {
      success: false,
      message: 'Must provide a valid "type" query parameter (id or name)',
    },
  })
  @Delete(':value')
  remove(@Param('value') value: string, @Query('type') type: 'id' | 'name') {
    if (type === 'id' || type === 'name') {
      return this.categoriesService.remove(type, value);
    }
    throw new BadRequestException(
      'Must provide the way to remove the category',
    );
  }
}
