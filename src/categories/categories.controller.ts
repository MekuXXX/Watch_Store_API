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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/decorators/role';
import { Public } from 'src/decorators/public';

@ApiTags('Categories')
@Controller('categories')
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
  @Get()
  findAll() {
    return this.categoriesService.findAll();
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Category deleted successfully',
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
  @HttpCode(HttpStatus.NO_CONTENT)
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
