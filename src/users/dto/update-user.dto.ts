import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { UserAddressDto } from './user-address.dto';
import { Type } from 'class-transformer';
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

  @ApiProperty({ example: 'https://image_url.com' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ type: [UserAddressDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserAddressDto)
  addresses?: UserAddressDto[];
}
