import {
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { QueriesDto } from 'src/dtos/queries.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/decorators/role';
import { Request } from 'express';
import { ORDER_STATUS, User } from 'src/db/schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Orders')
@UseInterceptors(CacheInterceptor)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders (Admin)' })
  @ApiQuery({ type: QueriesDto })
  @ApiOkResponse({
    description: 'Got the orders successfully',
    schema: {
      example: {
        success: true,
        message: 'Got the orders successfully',
        data: {
          orders: [
            {
              id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
              user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              checkout_id: '',
              price: 0,
              status: 'shipping',
              created_at: '2024-09-28T15:39:52.701Z',
              updated_at: '2024-09-28T15:39:52.701Z',
              user: {
                id: '7854e4d4-344e-4dfd-969c-141060c90c28',
                username: 'Mahmoud',
                email: 'ridadi4756@sgatra.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'admin',
              },
              order_items: [
                {
                  product: {
                    id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                    name: 'Bespoke Fresh Gloves',
                    description: 'New ABC 13 9370...',
                    image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                    quantity: 811700361,
                    price: 0.08724776655435562,
                    created_at: '2024-09-28T14:49:31.592Z',
                    updated_at: '2024-09-28T14:49:31.592Z',
                  },
                },
              ],
            },
          ],
        },
      },
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden, user is not an admin' })
  @Roles(['admin'])
  @Get()
  findAll(@Query() queriesDto: QueriesDto) {
    return this.ordersService.findAll(queriesDto);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current user orders' })
  @ApiQuery({ type: QueriesDto })
  @ApiOkResponse({
    description: 'Got the orders successfully for the current user',
    schema: {
      example: {
        success: true,
        message: 'Got the orders successfully',
        data: {
          orders: [
            {
              id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
              user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              checkout_id: '',
              price: 0,
              status: 'shipping',
              created_at: '2024-09-28T15:39:52.701Z',
              updated_at: '2024-09-28T15:39:52.701Z',
              user: {
                id: '7854e4d4-344e-4dfd-969c-141060c90c28',
                username: 'Mahmoud',
                email: 'ridadi4756@sgatra.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'admin',
              },
              order_items: [
                {
                  product: {
                    id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                    name: 'Bespoke Fresh Gloves',
                    description: 'New ABC 13 9370...',
                    image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                    quantity: 811700361,
                    price: 0.08724776655435562,
                    created_at: '2024-09-28T14:49:31.592Z',
                    updated_at: '2024-09-28T14:49:31.592Z',
                  },
                },
              ],
            },
          ],
        },
      },
    },
  })
  findUserAll(@Req() req: Request, @Query() queriesDto: QueriesDto) {
    const { id } = req.user as User;
    return this.ordersService.findAll(queriesDto, id);
  }

  @Roles(['admin'])
  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID (Admin)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Got the order successfully',
    schema: {
      example: {
        success: true,
        message: 'Getting the order successfully',
        data: {
          order: {
            id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
            user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
            checkout_id: '',
            price: 0,
            status: 'shipping',
            created_at: '2024-09-28T15:39:52.701Z',
            updated_at: '2024-09-28T15:39:52.701Z',
            user: {
              id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              username: 'Mahmoud',
              email: 'ridadi4756@sgatra.com',
              avatar_url: null,
              cover_url: null,
              phone: null,
              role: 'admin',
            },
            order_items: [
              {
                product: {
                  id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                  name: 'Bespoke Fresh Gloves',
                  description: 'New ABC 13 9370...',
                  image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                  quantity: 811700361,
                  price: 0.08724776655435562,
                  created_at: '2024-09-28T14:49:31.592Z',
                  updated_at: '2024-09-28T14:49:31.592Z',
                },
              },
            ],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Order not found or does not belong to the user',
    schema: {
      example: {
        statusCode: 404,
        message: 'Checkout data is not exist',
        error: 'Not Found',
      },
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden, user is not an admin' })
  findOne(@Param('id') orderId: string) {
    return this.ordersService.findOne(orderId);
  }

  @Get('current/:id')
  @ApiOperation({ summary: 'Get a specific order for the current user' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Got the order successfully for the current user',
    schema: {
      example: {
        success: true,
        message: 'Getting the order successfully',
        data: {
          order: {
            id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
            user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
            checkout_id: '',
            price: 0,
            status: 'shipping',
            created_at: '2024-09-28T15:39:52.701Z',
            updated_at: '2024-09-28T15:39:52.701Z',
            user: {
              id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              username: 'Mahmoud',
              email: 'ridadi4756@sgatra.com',
              avatar_url: null,
              cover_url: null,
              phone: null,
              role: 'user',
            },
            order_items: [
              {
                product: {
                  id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                  name: 'Bespoke Fresh Gloves',
                  description: 'New ABC 13 9370...',
                  image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                  quantity: 811700361,
                  price: 0.08724776655435562,
                  created_at: '2024-09-28T14:49:31.592Z',
                  updated_at: '2024-09-28T14:49:31.592Z',
                },
              },
            ],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Order not found or does not belong to the user',
    schema: {
      example: {
        statusCode: 404,
        message: 'Checkout data is not exist',
        error: 'Not Found',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized access, user does not own this order',
  })
  findUserOrder(@Param('id') orderId: string, @Req() req: Request) {
    const { id } = req.user as User;
    return this.ordersService.findOne(orderId, id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @ApiOperation({
    summary: `Update an order by ID ( ${ORDER_STATUS.enumValues.filter((status) => status !== 'await_payment').join(', ')} ) (Admin)`,
  })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Updated the order successfully',
    schema: {
      example: {
        success: true,
        message: 'Updated the order successfully',
        data: {
          order: {
            id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
            user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
            checkout_id: '',
            price: 0,
            status: 'preparing',
            created_at: '2024-09-28T15:39:52.701Z',
            updated_at: '2024-09-29T15:39:52.701Z',
            user: {
              id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              username: 'Mahmoud',
              email: 'ridadi4756@sgatra.com',
              avatar_url: null,
              cover_url: null,
              phone: null,
              role: 'admin',
            },
            order_items: [
              {
                product: {
                  id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                  name: 'Bespoke Fresh Gloves',
                  description: 'New ABC 13 9370...',
                  image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                  quantity: 811700361,
                  price: 0.08724776655435562,
                  created_at: '2024-09-28T14:49:31.592Z',
                  updated_at: '2024-09-28T14:49:31.592Z',
                },
              },
            ],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  updateAdmin(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, updateOrderDto);
  }

  @Patch('current/:id')
  @ApiOperation({
    summary: `Update the order status for the current user ( canceled )`,
  })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Updated the order successfully',
    schema: {
      example: {
        success: true,
        message: 'Updated the order successfully',
        data: {
          order: {
            id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
            user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
            checkout_id: '',
            price: 0,
            status: 'cancelled',
            created_at: '2024-09-28T15:39:52.701Z',
            updated_at: '2024-09-29T15:39:52.701Z',
            user: {
              id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              username: 'Mahmoud',
              email: 'ridadi4756@sgatra.com',
              avatar_url: null,
              cover_url: null,
              phone: null,
              role: 'admin',
            },
            order_items: [
              {
                product: {
                  id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                  name: 'Bespoke Fresh Gloves',
                  description: 'New ABC 13 9370...',
                  image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                  quantity: 811700361,
                  price: 0.08724776655435562,
                  created_at: '2024-09-28T14:49:31.592Z',
                  updated_at: '2024-09-28T14:49:31.592Z',
                },
              },
            ],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Order is not found' })
  updateUser(
    @Req() req: Request,
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const { id } = req.user as User;
    return this.ordersService.update(orderId, updateOrderDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Deleted the order successfully',
    schema: {
      example: {
        success: true,
        message: 'Deleted the order successfully',
        data: {
          order: {
            order: {
              id: '003b8d1d-c261-4f87-8347-0f8116bd86ab',
              user_id: '7854e4d4-344e-4dfd-969c-141060c90c28',
              checkout_id: '',
              price: 0,
              status: 'shipping',
              created_at: '2024-09-28T15:39:52.701Z',
              updated_at: '2024-09-28T15:39:52.701Z',
              user: {
                id: '7854e4d4-344e-4dfd-969c-141060c90c28',
                username: 'Mahmoud',
                email: 'ridadi4756@sgatra.com',
                avatar_url: null,
                cover_url: null,
                phone: null,
                role: 'admin',
              },
              order_items: [
                {
                  product: {
                    id: 'b2d652b0-af99-49d5-8dfe-6cfef785d033',
                    name: 'Bespoke Fresh Gloves',
                    description: 'New ABC 13 9370...',
                    image_url: 'https://picsum.photos/seed/aPqsmYPQ/640/480',
                    quantity: 811700361,
                    price: 0.08724776655435562,
                    created_at: '2024-09-28T14:49:31.592Z',
                    updated_at: '2024-09-28T14:49:31.592Z',
                  },
                },
              ],
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  remove(@Param('id') orderId: string) {
    return this.ordersService.remove(orderId);
  }
}
