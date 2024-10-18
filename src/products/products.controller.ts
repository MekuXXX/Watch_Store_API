import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/role';
import { QueriesDto } from 'src/dtos/queries.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiQuery,
  ApiParam,
  ApiCreatedResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { SearchProduct } from './dto/search-product.dto';
import { Public } from 'src/decorators/public';
import { Request } from 'express';
import { User } from 'src/db/schema';

@ApiTags('Products')
@UseInterceptors(CacheInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(['admin'])
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    schema: {
      example: {
        success: true,
        message: 'Product created successfully',
        data: {
          product: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Wireless Headphones',
            description:
              'High-quality wireless headphones with noise cancellation.',
            image_url: 'http://example.com/headphones.jpg',
            quantity: 50,
            price: 199.99,
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Some category names do not exist',
    schema: {
      example: {
        success: false,
        message: 'Some category names do not exist',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error occurred during product creation',
    schema: {
      example: {
        success: false,
        message: 'Error occurred during product creation: <error message>',
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
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Pagination page' })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Search in name and description of the product',
  })
  @ApiQuery({
    name: 'minPrice',
    description: 'Search in with this minimum price',
  })
  @ApiQuery({
    name: 'maxPrice',
    description: 'Search in with this maximum price',
  })
  @ApiQuery({
    name: 'minQuantity',
    description: 'Search in with this minimum quantity',
  })
  @ApiQuery({
    name: 'maxQunatity',
    description: 'Search in with this maximum quantity',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved products',
    schema: {
      example: {
        success: true,
        message: 'Got the products successfully',
        data: {
          products: [
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'Sample Product',
              description: 'This is a sample product',
              image_url: 'http://example.com/product.png',
              quantity: 100,
              price: 25.5,
              categories: ['Electronics', 'Accessories'],
            },
          ],
        },
      },
    },
  })
  @Get()
  @Public()
  findAll(
    @Query() queriesDto: QueriesDto,
    @Query() searchProductDto: SearchProduct,
    @Req() req: Request,
  ) {
    return this.productsService.findAll(
      queriesDto,
      searchProductDto,
      req.user as User,
    );
  }

  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({
    description: 'Product found',
    schema: {
      example: {
        success: true,
        data: {
          product: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Sample Product',
            description: 'This is a sample product',
            image_url: 'http://example.com/product.png',
            quantity: 100,
            price: 25.5,
            categories: ['Electronics', 'Accessories'],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        success: false,
        message: 'Product is not found',
      },
    },
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Update a product by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    type: UpdateProductDto,
  })
  @ApiOkResponse({
    description: 'Product updated successfully',
    schema: {
      example: {
        success: true,
        data: {
          product: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Updated Product',
            description: 'This is an updated product',
            image_url: 'http://example.com/product-updated.png',
            quantity: 80,
            price: 30.0,
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        success: false,
        message: 'Product is not found',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Some category names do not exist',
    schema: {
      example: {
        success: false,
        message: 'Some category names do not exist',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error occurred during updating product relations',
    schema: {
      example: {
        success: false,
        message:
          'Error occurred during updating product relations: <error message>',
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
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Delete a product by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({
    description: 'Product deleted successfully',
    schema: {
      example: {
        success: true,
        data: {
          product: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Deleted Product',
            description: 'This is a deleted product',
            image_url: 'http://example.com/product.png',
            quantity: 0,
            price: 0,
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        success: false,
        message: 'Product is not found',
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
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
