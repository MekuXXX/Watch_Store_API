import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsDate,
  IsNumber,
  ValidateNested,
  IsArray,
  IsPositive,
  ArrayNotEmpty,
} from 'class-validator';
import { COUPON_TYPE } from 'src/db/schema';

export class CreateCouponDto {
  @IsString()
  @IsOptional()
  coupon?: string;
  @IsEnum(COUPON_TYPE.enumValues)
  type: 'value' | 'percentage';

  @IsPositive()
  value: number;

  @IsBoolean()
  is_active: boolean;

  @IsDate()
  expiration_date: Date;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  products_id?: string[];
}
