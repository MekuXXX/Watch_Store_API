import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from 'src/mailer/mailer.module';
import env from 'src/utils/env';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: env.JWT_SECRET,
    }),
    PassportModule,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
