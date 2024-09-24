import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
