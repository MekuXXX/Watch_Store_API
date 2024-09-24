import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsInt,
  IsNumber,
  Min,
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
}
