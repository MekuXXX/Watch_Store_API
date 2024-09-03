import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { SignInUserDTO } from './dto/signInUser.dto';
import { ForgetPasswordDTO } from './dto/forgetPassword.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { Public } from 'src/decorators/public';
import { ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sign up a new user',
    schema: {
      example: {
        success: true,
        message: 'User signed up correctly',
      },
    },
  })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signup(createUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sign in the user to get the credentials',
    schema: {
      example: {
        success: true,
        message: 'User signed in correctly',
        data: {
          token: 'cuznt49481209841841stnaitnar',
          userData: {
            id: 'cuzin98424n4l24k4k1l',
            username: 'John Doe',
            email: 'example@example.com',
            image: 'https://image_url.com',
          },
        },
      },
    },
  })
  @Post('signin')
  signin(@Body() signInUserDto: SignInUserDTO) {
    return this.authService.signin(signInUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Activate the user account',
    schema: {
      example: {
        success: true,
        message: 'User has been activated successfully',
        data: {
          token: 'cucze239813098nen23cc',
          userData: {
            id: 'cuzin98424n4l24k4k1l',
            username: 'John Doe',
            email: 'example@example.com',
            image: 'https://image_url.com',
          },
        },
      },
    },
  })
  @Post('verify-email/:token')
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Send email to reset the user password',
    schema: {
      example: {
        success: true,
        message: 'Password has been reseted successfully',
      },
    },
  })
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDTO) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update the user password',
    schema: {
      example: {
        success: true,
        message: 'Password has been reseted successfully',
      },
    },
  })
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
