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
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@UseInterceptors(CacheInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(['admin'])
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'Product created successfully',
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
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    schema: {
      example: {
        success: false,
        message: 'Validation failed: name should not be empty',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Pagination page' })
  @ApiQuery({ name: 'query', required: false, description: 'Search query' })
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
            },
          ],
        },
      },
    },
  })
  findAll(@Query() queriesDto: QueriesDto) {
    return this.productsService.findAll(queriesDto);
  }

  @Get(':id')
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
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Product is not found',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
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
        statusCode: 404,
        message: 'Product is not found',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Delete a product by ID' })
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
        statusCode: 404,
        message: 'Product is not found',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
