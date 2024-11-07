import { Module } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { MailerModule } from 'src/mailer/mailer.module';

export enum PAYMENT_TYPES {
  CASH_DELIVERY,
  STRIPE,
}

@Module({
  imports: [MailerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
