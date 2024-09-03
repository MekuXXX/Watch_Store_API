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

  @ApiProperty({ example: 'New very secret password' })
  @IsOptional()
  @IsString()
  @Length(8, 20, { message: 'Password has to be between 8 and 20 characters' })
  password?: string;
}
