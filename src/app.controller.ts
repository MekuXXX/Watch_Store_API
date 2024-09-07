import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags("Welcome")
export class AppController {
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Welcome API route',
    schema: {
      example: {
        success: true,
        message: 'Welocme to watch store application API',
      },
    },
  })
  @Get('/')
  welcomeMessage() {
    return {
      success: true,
      message: 'Welocme to watch store application API ' + process.env.TEST,
    };
  }
}