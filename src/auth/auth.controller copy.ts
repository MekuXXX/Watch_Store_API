import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@ApiTags('Authentication')
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
  @ApiBadRequestResponse({
    description: 'The email user tried to create is already exist',
    example: {
      success: false,
      message: 'Email is already exists',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'User not created after hitting the database with the query',
    example: {
      success: false,
      message: 'Error happen during creating the user',
    },
  })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
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
  @ApiNotFoundResponse({
    description: 'The email user trying to signin is not exist',
    example: {
      success: false,
      message: 'Email is not exist',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User must activate his account before try to signin',
    example: {
      success: false,
      message: 'Activate the account to login',
    },
  })
  @ApiBadRequestResponse({
    description: 'User entered wrong credentials email or password',
    example: {
      success: false,
      message: 'Email or Password is not correct',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error happen that access token for user not created',
    example: {
      succes: false,
      message: 'Error happend during create user session',
    },
  })
  @Post('signin')
  signin(@Body() signInUserDto: SignInUserDto) {
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
  @ApiBadRequestResponse({
    description: 'Verifying token is not exist',
    example: {
      success: false,
      message: 'The token is not exist',
    },
  })
  @ApiBadRequestResponse({
    description: 'Verifying token is expired',
    example: {
      success: false,
      message: 'Token is expired, We have sent a new one',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error happen during update the user',
    example: {
      success: false,
      message: 'Error happened during verifying the user',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error happen that access token for user not created',
    example: {
      succes: false,
      message: 'Error during creating user session',
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
  @ApiNotFoundResponse({
    description:
      'The email user trying to change the password for is not exist',
    example: {
      success: false,
      message: 'Email is not exist',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error happend during creating the user forget password token',
    example: {
      success: false,
      message: 'Error happend during in forget password',
    },
  })
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update the user password',
    schema: {
      example: {
        success: true,
        message: 'Reset mail has sent successfully',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'The user entered password different from the confirm password',
    example: {
      status: false,
      message: 'Password must be the same as reset password',
    },
  })
  @ApiBadRequestResponse({
    description:
      'The token that user use in resetting the passsword is not exist',
    example: {
      status: false,
      message: 'Password must be the same as reset password',
    },
  })
  @ApiBadRequestResponse({
    description: 'The token the user used to reset the password is expired',
    example: {
      status: false,
      message: 'Token is expired, We have sent a new one',
    },
  })
  @ApiInternalServerErrorResponse({
    description: "The user didn't update correctly",
    example: {
      success: false,
      message: 'Error during updating the user',
    },
  })
  @Post('reset-password/:token')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @ApiOkResponse({
    description:
      'The token is valid to be used by the user to reset the password',
    example: {
      success: true,
      message: 'Token is valid to be used',
    },
  })
  @ApiBadRequestResponse({
    description: 'The token that user user is not exist',
    example: {
      status: false,
      message: 'Token is not exist',
    },
  })
  @ApiBadRequestResponse({
    description: 'The token that used by the user has been used before',
    example: {
      status: false,
      message: 'Token is expired',
    },
  })
  @Get('validate-reset/:token')
  validateResetToken(@Param('token') token: string) {
    return this.authService.validateResetToken(token);
  }
}
