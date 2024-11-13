import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserAddressDto {
  @ApiProperty({ example: 'USA' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'NY' })
  @IsString({ message: 'State must be of type string' })
  @IsOptional()
  state?: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '10001' })
  @IsString()
  @IsNotEmpty()
  zipcode: string;
}
