import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsInt,
  IsNumber,
  Min,
  IsArray,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Headphones' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'High-quality wireless headphones with noise cancellation.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://image_url.com/headphones.jpg' })
  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 199.99 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    type: [String],
    example: [
      '7b5b7a69-9a10-4a53-8f63-b1e4f487437e',
      '92b1113c-52e4-46f8-9ae7-b9eb69c1e373',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty({ example: 'id', enum: ['id', 'name'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['id', 'name'])
  category_type: 'id' | 'name';
}
