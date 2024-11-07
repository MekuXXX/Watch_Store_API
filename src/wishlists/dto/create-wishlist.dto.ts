import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @ApiProperty({ example: '562e4567-e89b-12d3-a456-897927957937' })
  @IsUUID()
  @IsNotEmpty()
  product_id: string;
}
