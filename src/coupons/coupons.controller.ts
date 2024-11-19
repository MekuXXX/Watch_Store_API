import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { QueriesDto } from 'src/dtos/queries.dto';

@Controller('coupons')
@UseInterceptors(CacheInterceptor)
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll(@Query() queriesDto: QueriesDto) {
    return this.couponsService.findAll(queriesDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('type') type: 'coupon' | 'id' = 'coupon',
  ) {
    return this.couponsService.findOne(id, type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}
