import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public';
import {
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'User signed up successfully',
    schema: { example: { success: true, message: 'User signed up correctly' } },
  })
  @ApiBadRequestResponse({
    description: 'Email is already exists',
    schema: { example: { success: false, message: 'Email is already exists' } },
  })
  @ApiBadRequestResponse({
    description: 'Error occurred during creating the user',
    schema: {
      example: {
        success: false,
        message: 'Error happened during creating the user',
      },
    },
  })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User Signin' })
  @ApiBody({ type: SignInUserDto })
  @ApiOkResponse({
    description: 'User signed in successfully',
    schema: {
      example: {
        success: true,
        message: 'User signed in correctly',
        data: {
          token: 'jwt-token',
          userData: {
            id: 'user-id',
            username: 'Youssef',
            email: 'example@example.com',
            image: 'user-avatar-url',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Email does not exist',
    schema: { example: { success: false, message: 'Email is not exist' } },
  })
  @ApiBadRequestResponse({
    description: 'Incorrect email or password',
    schema: {
      example: { success: false, message: 'Email or Password is not correct' },
    },
  })
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }

  @Post('verify-email/:token')
  @ApiOperation({ summary: 'Verify User Email' })
  @ApiParam({ name: 'token', required: true })
  @ApiOkResponse({
    description: 'User has been activated successfully',
    schema: {
      example: {
        success: true,
        message: 'User has been activated successfully',
        data: {
          token: 'jwt-token',
          userData: {
            id: 'user-id',
            username: 'Youssef',
            email: 'example@example.com',
            avatar_url: 'user-avatar-url',
            role: 'user-role',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The token does not exist or is expired',
    schema: { example: { success: false, message: 'The token is not exist' } },
  })
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Request Password Reset' })
  @ApiBody({ type: ForgetPasswordDto })
  @ApiOkResponse({
    description: 'Reset mail has been sent successfully',
    schema: {
      example: { success: true, message: 'Reset mail has sent successfully' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Email does not exist',
    schema: { example: { success: false, message: 'Email is not exist' } },
  })
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('reset-password/:token')
  @ApiOperation({ summary: 'Reset User Password' })
  @ApiParam({ name: 'token', required: true })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({
    description: 'Password has been reset successfully',
    schema: {
      example: {
        success: true,
        message: 'Password has been reseted successfully',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Token is not exist or has expired',
    schema: {
      example: {
        success: false,
        message: 'Token is not exist, Please try again',
      },
    },
  })
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @Get('validate-reset/:token')
  @ApiOperation({ summary: 'Validate Password Reset Token' })
  @ApiParam({ name: 'token', required: true })
  @ApiOkResponse({
    description: 'Token is valid for use',
    schema: {
      example: { success: true, message: 'Token is valid to be used' },
    },
  })
  @ApiBadRequestResponse({
    description: 'Token is not exist or has expired',
    schema: { example: { success: false, message: 'Token is expired' } },
  })
  validateResetToken(@Param('token') token: string) {
    return this.authService.validateResetToken(token);
  }
}
