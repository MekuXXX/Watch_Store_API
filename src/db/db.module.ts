import { Global, Module } from '@nestjs/common';
import { createDB } from './db';

export const DRIZZLE = Symbol('drizzle-connetion');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: createDB,
    },
  ],

  exports: [DRIZZLE],
})
export class DbModule {}
