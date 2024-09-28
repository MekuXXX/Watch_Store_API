import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
