import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ example: 'Mahmoud' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'https://image_url.com' })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiProperty({ example: 'https://image_url.com' })
  @IsOptional()
  @IsString()
  cover_url?: string;
}
