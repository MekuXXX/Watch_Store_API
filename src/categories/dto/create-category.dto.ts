import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: "Men's" })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://category_cover_url.com' })
  @IsString()
  cover_url: string;
}
