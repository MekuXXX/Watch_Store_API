import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  HttpStatus,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { User, User as UserType } from 'src/db/schema';
import { Roles } from 'src/decorators/role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get the current user data',
    schema: {
      example: {
        success: true,
        message: 'User has been obtained successfully',
        data: {
          userData: {
            id: 'custan313128149nisc81',
            username: 'John Doe',
            email: 'example@example.com',
            avatar_url: 'https://image_url.com',
          },
        },
      },
    },
  })
  @Get('current')
  current(@Req() req: Request) {
    return this.usersService.current(req.user as UserType);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get any user data for admin',
    schema: {
      example: {
        success: true,
        message: 'User has been obtained successfully',
        data: {
          userData: {
            id: 'custan313128149nisc81',
            username: 'John Doe',
            email: 'example@example.com',
            avatar_url: 'https://image_url.com',
          },
        },
      },
    },
  })
  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update the current user data',
    schema: {
      example: {
        success: true,
        message: 'User has been updated successfully',
        data: {
          userData: {
            id: 'custan313128149nisc81',
            username: 'New name',
            email: 'example@example.com',
            avatar_url: 'https://new_image_url.com',
          },
        },
      },
    },
  })
  @Patch('current')
  updateCurrent(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const { id, password } = req.user as UserType;
    return this.usersService.update(id, password, updateUserDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update the user data for admin to update any user',
    schema: {
      example: {
        success: true,
        message: 'User has been updated successfully',
        data: {
          userData: {
            id: 'custan313128149nisc81',
            username: 'New name',
            email: 'example@example.com',
            avatar_url: 'https://new_image_url.com',
          },
        },
      },
    },
  })
  @Patch(':id')
  @Roles(['admin'])
  updateAdmin(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const { password } = req.user as UserType;
    return this.usersService.update(id, password as string, updateUserDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete the user account',
  })
  @Delete('current')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: Request) {
    const { id } = req.user as User;
    return this.usersService.remove(id);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete any user account by the admin',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(['admin'])
  removeAdmin(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
