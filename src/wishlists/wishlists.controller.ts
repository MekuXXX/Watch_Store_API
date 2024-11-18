import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { Roles } from 'src/decorators/role';
import { Request } from 'express';
import { User } from '../db/schema';
import { QueriesDto } from 'src/dtos/queries.dto';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Wishlists')
@UseInterceptors(CacheInterceptor)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current user wishlists' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiOkResponse({
    description: 'The list of current user wishlists',
    schema: {
      example: {
        success: true,
        data: {
          wishlists: [
            {
              created_at: '2024-11-14T00:00:00Z',
              updated_at: '2024-11-14T00:00:00Z',
              product: {
                id: 'product-id',
                name: 'Product 1',
                description: 'Description of Product 1',
                image_url: 'https://example.com/image.jpg',
                price: 99.99,
                quantity: 10,
              },
              user: {
                id: 'user-id',
                username: 'user123',
                email: 'user@example.com',
                avatar_url: 'https://example.com/avatar.jpg',
                role: 'user',
              },
            },
          ],
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: { success: false, message: 'User not found' },
    },
  })
  getCurrentUserWishlists(@Req() req: Request, @Query() queryDto: QueriesDto) {
    const { id } = req.user as User;
    return this.wishlistsService.findAll(queryDto, id);
  }

  @Roles(['admin'])
  @Get()
  @ApiOperation({ summary: 'Get all wishlists in the system (Admin only)' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Admin role required',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  @ApiOkResponse({
    description: 'The list of all wishlists in the system',
    schema: {
      example: {
        success: true,
        data: {
          wishlists: [
            {
              created_at: '2024-11-14T00:00:00Z',
              updated_at: '2024-11-14T00:00:00Z',
              product: {
                id: 'product-id',
                name: 'Product 1',
                description: 'Description of Product 1',
                image_url: 'https://example.com/image.jpg',
                price: 99.99,
                quantity: 10,
              },
              user: {
                id: 'user-id',
                username: 'user123',
                email: 'user@example.com',
                avatar_url: 'https://example.com/avatar.jpg',
                role: 'user',
              },
            },
          ],
        },
      },
    },
  })
  getSystemWishlists(@Query() queryDto: QueriesDto) {
    return this.wishlistsService.findAll(queryDto);
  }

  @Roles(['admin'])
  @Get('users/:userId')
  @ApiOperation({ summary: 'Get specific user wishlists (Admin only)' })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Admin role required',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  @ApiOkResponse({
    description: 'The list of wishlists for the specified user',
    schema: {
      example: {
        success: true,
        data: {
          wishlists: [
            {
              created_at: '2024-11-14T00:00:00Z',
              updated_at: '2024-11-14T00:00:00Z',
              product: {
                id: 'product-id',
                name: 'Product 1',
                description: 'Description of Product 1',
                image_url: 'https://example.com/image.jpg',
                price: 99.99,
                quantity: 10,
              },
              user: {
                id: 'user-id',
                username: 'user123',
                email: 'user@example.com',
                avatar_url: 'https://example.com/avatar.jpg',
                role: 'user',
              },
            },
          ],
        },
      },
    },
  })
  getUserWishlists(
    @Query() queryDto: QueriesDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.wishlistsService.findAll(queryDto, userId);
  }

  @Get('current/:productId')
  @ApiOperation({ summary: 'Get current user wishlist for a specific product' })
  @ApiParam({ name: 'productId', type: String, description: 'Product ID' })
  @ApiOkResponse({
    description: 'The wishlist entry for the specified product',
    schema: {
      example: {
        success: true,
        data: {
          wishlist: {
            created_at: '2024-11-14T00:00:00Z',
            updated_at: '2024-11-14T00:00:00Z',
            product: {
              id: 'product-id',
              name: 'Product 1',
              description: 'Description of Product 1',
              image_url: 'https://example.com/image.jpg',
              price: 99.99,
              quantity: 10,
            },
            user: {
              id: 'user-id',
              username: 'user123',
              email: 'user@example.com',
              avatar_url: 'https://example.com/avatar.jpg',
              role: 'user',
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Wishlist entry not found',
    schema: {
      example: { success: false, message: 'Wishlist is not found' },
    },
  })
  getCurrentUserWishlist(
    @Req() req: Request,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    const { id } = req.user as User;
    return this.wishlistsService.findOne(id, productId);
  }

  @Roles(['admin'])
  @Get(':userId/:productId')
  @ApiOperation({
    summary: 'Get a specific user wishlist for a specific product (Admin only)',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @ApiParam({ name: 'productId', type: String, description: 'Product ID' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Admin role required',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  @ApiOkResponse({
    description: 'The wishlist entry for the specified product and user',
    schema: {
      example: {
        success: true,
        data: {
          wishlist: {
            created_at: '2024-11-14T00:00:00Z',
            updated_at: '2024-11-14T00:00:00Z',
            product: {
              id: 'product-id',
              name: 'Product 1',
              description: 'Description of Product 1',
              image_url: 'https://example.com/image.jpg',
              price: 99.99,
              quantity: 10,
            },
            user: {
              id: 'user-id',
              username: 'user123',
              email: 'user@example.com',
              avatar_url: 'https://example.com/avatar.jpg',
              role: 'user',
            },
          },
        },
      },
    },
  })
  getUserWishlist(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.wishlistsService.findOne(userId, productId);
  }

  @Post('current/:productId')
  @ApiOperation({ summary: 'Create wishlist for current user' })
  @ApiParam({ name: 'productId', type: String, description: 'Product ID' })
  @ApiBody({
    description: 'Request body to create a wishlist',
    type: Object,
  })
  @ApiOkResponse({
    description: 'Wishlist created successfully',
    schema: {
      example: {
        success: true,
        data: {
          created_at: '2024-11-14T00:00:00Z',
          updated_at: '2024-11-14T00:00:00Z',
          product: {
            id: 'product-id',
            name: 'Product 1',
            description: 'Description of Product 1',
            image_url: 'https://example.com/image.jpg',
            price: 99.99,
            quantity: 10,
          },
          user: {
            id: 'user-id',
            username: 'user123',
            email: 'user@example.com',
            avatar_url: 'https://example.com/avatar.jpg',
            role: 'user',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: { success: false, message: 'Product not found' },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Invalid request',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  addProductToCurrentUserWishlist(
    @Req() req: Request,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    const { id } = req.user as User;
    return this.wishlistsService.create(id, productId);
  }

  @Roles(['admin'])
  @Post(':userId/:productId')
  @ApiOperation({ summary: 'Create wishlist for a specific user (Admin only)' })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @ApiParam({ name: 'productId', type: String, description: 'Product ID' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Admin role required',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  @ApiOkResponse({
    description: 'Wishlist created successfully',
    schema: {
      example: {
        success: true,
        data: {
          created_at: '2024-11-14T00:00:00Z',
          updated_at: '2024-11-14T00:00:00Z',
          product: {
            id: 'product-id',
            name: 'Product 1',
            description: 'Description of Product 1',
            image_url: 'https://example.com/image.jpg',
            price: 99.99,
            quantity: 10,
          },
          user: {
            id: 'user-id',
            username: 'user123',
            email: 'user@example.com',
            avatar_url: 'https://example.com/avatar.jpg',
            role: 'user',
          },
        },
      },
    },
  })
  addProductToUserWishlist(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.wishlistsService.create(userId, productId);
  }

  @Delete('current/:productId')
  @ApiOperation({ summary: 'Remove product from current user wishlist' })
  @ApiParam({ name: 'productId', type: String, description: 'Product ID' })
  @ApiOkResponse({
    description: 'Wishlist removed successfully',
    schema: {
      example: {
        success: true,
        message: 'Product removed from wishlist',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Wishlist entry not found',
    schema: {
      example: { success: false, message: 'Wishlist entry not found' },
    },
  })
  removeProductFromCurrentUserWishlist(
    @Req() req: Request,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    const { id } = req.user as User;
    return this.wishlistsService.remove(id, productId);
  }

  @Roles(['admin'])
  @Delete(':userId/:productId')
  @ApiOperation({
    summary: 'Remove product from specific user wishlist (Admin only)',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @ApiParam({ name: 'productId', type: String, description: 'Product ID' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Admin role required',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  @ApiOkResponse({
    description: 'Wishlist entry removed successfully',
    schema: {
      example: {
        success: true,
        message: 'Product removed from wishlist',
      },
    },
  })
  removeProductFromUserWishlist(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.wishlistsService.remove(userId, productId);
  }
}
