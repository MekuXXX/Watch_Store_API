import { PartialType } from '@nestjs/swagger';
import {
  ValidateIf,
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsIn,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ValidateIf((o) => o.category_type)
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @ValidateIf((o) => o.categories && o.categories.length > 0)
  @IsString()
  @IsIn(['id', 'name'])
  category_type: 'id' | 'name';
}

// export class UpdateProductDto extends PartialType(
//   OmitType(CreateProductDto, ['categories', 'category_type'] as const),
// ) {}
