import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  RawBodyRequest,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { Request } from 'express';
import { User } from 'src/db/schema';
import { Public } from 'src/decorators/public';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Payments')
@UseInterceptors(CacheInterceptor)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('stripe/checkout-session')
  @ApiOperation({
    summary: 'Create a new Stripe checkout session for the user',
  })
  @ApiBody({
    description: 'Data required to create a Stripe session',
    type: CreatePaymentOrderDto,
  })
  @ApiOkResponse({
    description: 'Stripe session created successfully',
    schema: {
      example: {
        success: true,
        data: {
          session_url: 'https://checkout.stripe.com/pay/cs_test_123',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'One of the products does not exist',
    schema: {
      example: {
        success: false,
        message: 'One of the products is not exist',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. User is not authorized to perform this action.',
    schema: {
      example: {
        success: false,
        message: 'Forbidden',
      },
    },
  })
  createStripeSession(
    @Req() req: Request,
    @Body() paymentOredrDto: CreatePaymentOrderDto,
  ) {
    return this.paymentService.createStripeSession(
      req.user as User,
      paymentOredrDto,
    );
  }

  @ApiOperation({
    summary: 'Retrieve Stripe checkout session data by session ID',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Stripe session ID',
    example: 'cs_test_a1b2c3d4e5f6g7h8i9j0',
  })
  @ApiOkResponse({
    description: 'Retrieved checkout data successfully.',
    schema: {
      example: {
        success: true,
        message: 'Getted the checkout data successfully',
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
    description: 'Checkout session or associated order not found.',
    schema: {
      example: { success: false, message: 'Checkout data is not exist' },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error retrieving Stripe checkout session data.',
    schema: {
      example: {
        success: false,
        message: 'An error occurred during retrieval',
      },
    },
  })
  @Get('stripe/checkout-data/:id')
  stripeSessionData(@Param('id') id: string) {
    return this.paymentService.checkoutData(id);
  }

  @Public()
  @Post('stripe/webhook')
  @ApiOperation({ summary: 'Stripe webhook to handle session events' })
  @ApiHeader({
    name: 'stripe-signature',
    description: 'Stripe webhook signature for validation',
    required: true,
  })
  @ApiBody({
    description: 'Raw body from Stripe webhook event',
    examples: {
      validRequest: {
        summary: 'Valid Request',
        value: {
          event: {
            id: 'evt_1HKBmB2eZvKYlo2CcA4pmXma',
            type: 'checkout.session.completed',
            data: {
              object: {
                metadata: {
                  order_id: 'order_1Gq2k2eZvKYlo2CC2poHp8n',
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Stripe webhook event handled successfully',
    schema: {
      example: {
        success: true,
        message: 'Event is handled correctly',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Webhook event is not found',
    schema: {
      example: {
        success: false,
        message: 'Event is not exist',
      },
    },
  })
  stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentService.stripeWebhook(req.rawBody!, signature);
  }

  @ApiOperation({
    summary: 'Create a cash on delivery order',
  })
  @ApiBody({
    description: 'Details of the order being created',
    type: CreatePaymentOrderDto,
  })
  @ApiOkResponse({
    description: 'Order created successfully',
    schema: {
      example: {
        success: true,
        message: 'Order created successfully',
        data: {
          order: {
            id: 'order_1Gq2k2eZvKYlo2CC2poHp8n',
            user_id: 'user_1',
            status: 'cash_delivery',
            price: 150,
            order_items: [
              {
                product_id: 'prod_123',
                quantity: 2,
              },
              {
                product_id: 'prod_456',
                quantity: 1,
              },
            ],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'One of the products does not exist',
    schema: {
      example: {
        success: false,
        message: 'One of the products is not exist',
      },
    },
  })
  @Post('cash-delivery')
  cashOnDelivery(
    @Req() req: Request,
    @Body() paymentOrder: CreatePaymentOrderDto,
  ) {
    return this.paymentService.cashOnDeliviry(req.user as User, paymentOrder);
  }
}
