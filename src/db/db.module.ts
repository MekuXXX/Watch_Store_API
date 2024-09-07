import { Global, Module } from '@nestjs/common';
import { db } from './db';

export const DRIZZLE = Symbol('drizzle-connetion');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => db,
    },
  ],

  exports: [DRIZZLE],
})
export class DbModule {}
