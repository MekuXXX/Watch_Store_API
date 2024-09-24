import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
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
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  @Length(8, 20, { message: 'Password has to be between 8 and 20 characters' })
  public password: string;
}
