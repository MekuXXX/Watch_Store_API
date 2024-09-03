import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DbModule } from './db/db.module';
import { RolesGuard } from './guards/role';
import env from './utils/env';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: env.MAX_THROTTLER_TIME,
        limit: env.MAX_THROTTLER_LIMIT,
      },
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          ttl: env.MAX_CACHE_TIME,
          url: env.REDIS_URL,
        });

        return { store };
      },
    }),
    MailerModule,
    AuthModule,
    UsersModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
