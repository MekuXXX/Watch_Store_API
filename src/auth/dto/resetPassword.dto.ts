import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ example: 'This is very secret' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be between 8 and 20 characters' })
  password: string;

  @ApiProperty({ example: 'This is very secret' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20, {
    message: 'Reset prassword has to be between 8 and 20 characters',
  })
  confirmPassword: string;
}
