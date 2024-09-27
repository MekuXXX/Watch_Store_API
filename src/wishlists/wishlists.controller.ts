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

@ApiTags('Wishlists')
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
    schema: { example: { success: true, data: { wishlists: [] } } },
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
    description: 'Successfully retrieved user wishlists.',
    schema: { example: { success: true, data: { wishlists: [] } } },
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
  @ApiParam({ name: 'userId', type: 'string', required: true, example: 'afc81383-2f9f-4af9-906e-e8cd09c1d96e' })
  @ApiQuery({ name: 'productId', type: 'string', required: true, example: 'afc81383-2f9f-4af9-906e-e8cd09c1d96e' })
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
    @Query('productId') productId: string
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
