import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateStripeSessionDto } from './dto/create-stripe-session.dto';
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
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('stripe/checkout-session')
  @ApiOperation({
    summary: 'Create a new Stripe checkout session for the user',
  })
  @ApiBody({
    description: 'Data required to create a Stripe session',
    type: CreateStripeSessionDto,
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
    @Body() createStripeSessionDto: CreateStripeSessionDto,
  ) {
    return this.paymentService.createStripeSession(
      req.user as User,
      createStripeSessionDto,
    );
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
}
