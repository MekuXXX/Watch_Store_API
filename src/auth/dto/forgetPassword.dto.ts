import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordDTO {
  @ApiProperty({ example: 'example@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
