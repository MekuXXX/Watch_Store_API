import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SearchProduct {
  @IsOptional()
  @ValidateIf((o) => o.category_type)
  @ApiProperty({ examples: ['man', 'women', 'man,women'] })
  @IsString()
  categories?: string;

  @ValidateIf((o) => o.categories && o.categories.length > 0)
  @IsString()
  @IsIn(['id', 'name'])
  category_type: 'id' | 'name';

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  minPrice?: number;

  @ApiProperty({ example: 999999 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  maxPrice?: number;

  @ApiProperty({ example: 75 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  minQuantity?: number;

  @ApiProperty({ example: 750 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  maxQuantity?: number;
}
