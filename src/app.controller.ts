import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
@UseInterceptors(CacheInterceptor)
@ApiTags('Welcome')
export class AppController {
  @ApiOperation({ summary: 'Welcome API route for the watch store APIs' })
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
