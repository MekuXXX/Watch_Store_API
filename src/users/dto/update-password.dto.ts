import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePasswordDto {
  @ApiProperty({ example: 'Old password' })
  @IsString()
  old_password?: string;

  @ApiProperty({ example: 'New password' })
  @IsString()
  new_password: string;
}
