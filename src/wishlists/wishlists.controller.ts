import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Roles } from 'src/decorators/role';
import { Request } from 'express';
import { User } from '../db/schema';
import { QueriesDto } from 'src/dtos/queries.dto';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Wishlists')
@UseInterceptors(CacheInterceptor)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @ApiOperation({ summary: 'Get wishlists of the current user' })
  @ApiQuery({ name: 'limit', example: 10 })
  @ApiQuery({ name: 'page', example: 1 })
  @ApiOkResponse({
    description: 'Successfully retrieved wishlists.',
    schema: {
      example: {
        success: true,
        data: {
          wishlists: [
            {
              product: { id: 'uuid', name: 'Product A', price: 100 },
              user: { id: 'uuid', username: 'User A' },
              created_at: '2024-09-01T00:00:00.000Z',
              updated_at: '2024-09-01T00:00:00.000Z',
            },
          ],
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Get('current')
  getCurrentUserWishlists(@Req() req: Request, @Query() queryDto: QueriesDto) {
    const { id } = req.user as User;
    return this.wishlistsService.findAll(queryDto, id);
  }

  @Roles(['admin'])
  @ApiOperation({ summary: 'Get all system wishlists (Admin only)' })
  @ApiQuery({ name: 'limit', example: 10 })
  @ApiQuery({ name: 'page', example: 1 })
  @ApiOkResponse({
    description: 'Successfully retrieved all system wishlists.',
    schema: {
      example: {
        success: true,
        data: {
          wishlists: [
            {
              id: '52827b32-9182-46c1-a622-d6296fe4500f',
              created_at: '2024-10-14T12:23:34.752Z',
              updated_at: '2024-10-14T12:23:34.752Z',
              product: {
                id: 'b7d1ac0f-fd98-4a29-aad0-e8afc41a6ea7',
                name: 'Bespoke Concrete Chips',
                description:
                  'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
                image_url:
                  'https://loremflickr.com/640/480?lock=819500450578432',
                price: 33123886.733985655,
                quantity: 44228475,
              },
              user: {
                id: 'b00a29a9-5bf2-4a5b-a08d-d0c915b60395',
                username: 'Dan Miller',
                email: 'Dagmar57@yahoo.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'user',
              },
            },
            {
              id: 'c37c07e1-ad93-4c70-9a41-4690b8f234aa',
              created_at: '2024-10-14T12:23:34.752Z',
              updated_at: '2024-10-14T12:23:34.752Z',
              product: {
                id: '9a813d27-7682-4d8b-b290-be28b751ff2b',
                name: 'Sleek Bronze Salad',
                description:
                  'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
                image_url: 'https://picsum.photos/seed/UVsE6nHQM/640/480',
                price: 88911873.5358168,
                quantity: 79060905,
              },
              user: {
                id: 'b00a29a9-5bf2-4a5b-a08d-d0c915b60395',
                username: 'Dan Miller',
                email: 'Dagmar57@yahoo.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'user',
              },
            },
          ],
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not an admin.',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Get()
  getSystemWishlists(@Query() queryDto: QueriesDto) {
    return this.wishlistsService.findAll(queryDto);
  }

  @Roles(['admin'])
  @ApiOperation({ summary: 'Get wishlists of a specific user (Admin only)' })
  @ApiParam({ name: 'userId', type: 'string', example: 'uuid' })
  @ApiQuery({ name: 'limit', example: 10 })
  @ApiQuery({ name: 'page', example: 1 })
  @ApiOkResponse({
    description: 'Successfully retrieved all system wishlists.',
    schema: {
      example: {
        success: true,
        data: {
          wishlists: [
            {
              id: '52827b32-9182-46c1-a622-d6296fe4500f',
              created_at: '2024-10-14T12:23:34.752Z',
              updated_at: '2024-10-14T12:23:34.752Z',
              product: {
                id: 'b7d1ac0f-fd98-4a29-aad0-e8afc41a6ea7',
                name: 'Bespoke Concrete Chips',
                description:
                  'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
                image_url:
                  'https://loremflickr.com/640/480?lock=819500450578432',
                price: 33123886.733985655,
                quantity: 44228475,
              },
              user: {
                id: 'b00a29a9-5bf2-4a5b-a08d-d0c915b60395',
                username: 'Dan Miller',
                email: 'Dagmar57@yahoo.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'user',
              },
            },
            {
              id: 'c37c07e1-ad93-4c70-9a41-4690b8f234aa',
              created_at: '2024-10-14T12:23:34.752Z',
              updated_at: '2024-10-14T12:23:34.752Z',
              product: {
                id: '9a813d27-7682-4d8b-b290-be28b751ff2b',
                name: 'Sleek Bronze Salad',
                description:
                  'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
                image_url: 'https://picsum.photos/seed/UVsE6nHQM/640/480',
                price: 88911873.5358168,
                quantity: 79060905,
              },
              user: {
                id: 'b00a29a9-5bf2-4a5b-a08d-d0c915b60395',
                username: 'Dan Miller',
                email: 'Dagmar57@yahoo.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'user',
              },
            },
          ],
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not an admin.',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Get('users/:userId')
  getUserWishlists(
    @Query() queryDto: QueriesDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.wishlistsService.findAll(queryDto, userId);
  }

  @ApiOperation({ summary: 'Get a specific wishlist of the current user' })
  @ApiParam({ name: 'wishlistId', type: 'string', example: 'uuid' })
  @ApiOkResponse({
    description: 'Successfully retrieved wishlist.',
    schema: {
      example: {
        success: true,
        data: {
          user: { id: 'uuid', username: 'User A' },
          product: { id: 'uuid', name: 'Product A' },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Wishlist not found.',
    schema: { example: { success: false, message: 'Wishlist is not exist' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Get('current/:wishlistId')
  getCurrentUserWishlist(
    @Req() req: Request,
    @Param('wishlistId', ParseUUIDPipe) wishlistId: string,
  ) {
    const { id } = req.user as User;
    return this.wishlistsService.findOne(wishlistId, id);
  }

  @Roles(['admin'])
  @ApiOperation({ summary: 'Get a specific wishlist (Admin only)' })
  @ApiParam({ name: 'wishlistId', type: 'string', example: 'uuid' })
  @ApiOkResponse({
    description: 'Successfully retrieved wishlist.',
    schema: {
      example: {
        success: true,
        data: {
          user: { id: 'uuid', username: 'User A' },
          product: { id: 'uuid', name: 'Product A' },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not an admin.',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @ApiNotFoundResponse({
    description: 'Wishlist not found.',
    schema: { example: { success: false, message: 'Wishlist is not exist' } },
  })
  @Get(':wishlistId')
  getUserWishlist(@Param('wishlistId', ParseUUIDPipe) wishlistId: string) {
    return this.wishlistsService.findOne(wishlistId);
  }

  @ApiOperation({ summary: 'Create a wishlist for the current user' })
  @ApiBody({ type: CreateWishlistDto })
  @ApiCreatedResponse({
    description: 'Wishlist created successfully.',
    schema: {
      example: {
        success: true,
        data: {
          wishlist: { user_id: 'uuid', product_id: 'uuid' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User or product does not exist.',
    schema: {
      example: { success: false, message: 'User/Product does not exist' },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Post('current')
  createWishlistForCurrentUser(
    @Req() req: Request,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    const { id } = req.user as User;
    return this.wishlistsService.create(id, createWishlistDto);
  }

  @Roles(['admin'])
  @ApiOperation({
    summary: 'Create a wishlist for a specific user (Admin only)',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    required: true,
    example: 'afc81383-2f9f-4af9-906e-e8cd09c1d96e',
  })
  @ApiQuery({
    name: 'productId',
    type: 'string',
    required: true,
    example: 'afc81383-2f9f-4af9-906e-e8cd09c1d96e',
  })
  @ApiCreatedResponse({
    description: 'Wishlist created successfully.',
    schema: {
      example: {
        success: true,
        data: {
          wishlist: { user_id: 'uuid', product_id: 'uuid' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User or product does not exist.',
    schema: {
      example: { success: false, message: 'User/Product does not exist' },
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not an admin.',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Post(':userId')
  createWishlistForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('productId') productId: string,
  ) {
    return this.wishlistsService.create(userId, productId);
  }

  @ApiOperation({ summary: 'Delete a wishlist for the current user' })
  @ApiParam({ name: 'wishlistId', type: 'string', example: 'uuid' })
  @ApiOkResponse({
    description: 'Wishlist deleted successfully.',
    schema: { example: { success: true, data: { wishlist: {} } } },
  })
  @ApiNotFoundResponse({
    description: 'Wishlist not found.',
    schema: { example: { success: false, message: 'Wishlist is not exist' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @Delete('current/:wishlistId')
  deleteCurrentUserWishlist(
    @Req() req: Request,
    @Param('wishlistId', ParseUUIDPipe) wishlistId: string,
  ) {
    const { id } = req.user as User;
    return this.wishlistsService.remove(wishlistId, id);
  }

  @Roles(['admin'])
  @ApiOperation({ summary: 'Delete a wishlist (Admin only)' })
  @ApiParam({ name: 'wishlistId', type: 'string', example: 'uuid' })
  @ApiOkResponse({
    description: 'Wishlist deleted successfully.',
    schema: { example: { success: true, data: { wishlist: {} } } },
  })
  @ApiForbiddenResponse({
    description: 'User is not an admin.',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    schema: { example: { success: false, message: 'Unauthorized' } },
  })
  @ApiNotFoundResponse({
    description: 'Wishlist not found.',
    schema: { example: { success: false, message: 'Wishlist is not exist' } },
  })
  @Delete(':wishlistId')
  deleteUserWishlist(@Param('wishlistId', ParseUUIDPipe) wishlistId: string) {
    return this.wishlistsService.remove(wishlistId);
  }
}
