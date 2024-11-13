import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('coupons')
@UseInterceptors(CacheInterceptor)
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  // @Get()
  // findAll() {
  //   return this.couponsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.couponsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
  //   return this.couponsService.update(+id, updateCouponDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couponsService.remove(+id);
  // }
}