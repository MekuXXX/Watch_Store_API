import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsDate,
  IsNumber,
} from 'class-validator';
import { COUPON_TYPE } from 'src/db/schema';

export class CreateCouponDto {
  @IsString()
  @IsOptional()
  coupon?: string;
  @IsEnum(COUPON_TYPE.enumValues)
  type: 'value' | 'percentage';

  @IsNumber()
  value: number;

  @IsBoolean()
  is_active: boolean;

  @IsDate()
  expiration_date: Date;

  @IsUUID()
  @IsOptional()
  product_id?: string;
}
