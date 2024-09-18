import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'Youssef' })
  @IsNotEmpty()
  @IsString()
  public username: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'This is very secret' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({ minLength: 12 })
  @Length(12, 20, { message: 'Password has to be between 8 and 20 characters' })
  public password: string;
}
