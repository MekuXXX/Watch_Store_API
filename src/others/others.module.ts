import { Module } from '@nestjs/common';
import { OthersService } from './others.service';
import { OthersController } from './others.controller';

@Module({
  controllers: [OthersController],
  providers: [OthersService],
})
export class OthersModule {}
