import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { OthersService } from './others.service';
import { Request } from 'express';
import { User } from 'src/db/schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Others')
@UseInterceptors(CacheInterceptor)
@Controller('others')
export class OthersController {
  constructor(private readonly othersService: OthersService) {}

  @Get('numbers')
  @ApiOperation({
    summary: 'Get the number of wishlists for a specific user',
    description:
      'Returns the total number of wishlists associated with the specified user. Restricted to admin users.',
  })
  @ApiOkResponse({
    description: 'The count of wishlists retrieved successfully.',
    schema: {
      example: {
        success: true,
        message: 'Numbers got successfully',
        data: { wishlists: 5 },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        success: false,
        message: 'User not found',
      },
    },
  })
  numbers(@Req() req: Request) {
    const { id } = req.user as User;
    return this.othersService.numbers(id);
  }
}
