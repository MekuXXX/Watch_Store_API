import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { User, User as UserType } from 'src/db/schema';
import { Roles } from 'src/decorators/role';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { QueriesDto } from 'src/dtos/queries.dto';

@Controller('users')
@UseInterceptors(CacheInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['admin'])
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve all categories',
    schema: {
      example: {
        success: true,
        message: 'Got the users successfully',
        data: {
          categories: [
            {
              id: '123',
              name: "Men's",
              cover_url: 'https://category_cover_url.com',
            },
            {
              id: '124',
              name: "Women's",
              cover_url: 'https://category_cover_url.com',
            },
          ],
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      "User don't have the permision to access this route or don't provide the access token",
    example: { success: false, message: 'Unauthorized' },
  })
  @Get()
  findAll(
    @Query()
    queriesDto: QueriesDto,
  ) {
    return this.usersService.findAll(queriesDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get the current user data',
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
  })
  @ApiUnauthorizedResponse({
    example: { status: false, message: 'Unauthorized' },
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
  @ApiNotFoundResponse({
    description: "Can't found the user in the Database",
    example: {
      success: false,
      message: 'User is not exist',
    },
  })
  @ApiUnauthorizedResponse({
    description: "Normal user can't hit this route to get any user data",
    example: {
      success: false,
      message: 'Unauthorized',
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
  @ApiNotFoundResponse({
    description: "Can't found the user in the Database",
    example: {
      success: false,
      message: 'User is not exist',
    },
  })
  @ApiBadRequestResponse({
    description: "Can't found any data to update user with it",
    example: {
      success: false,
      message: 'Must provide a data to update the user',
    },
  })
  @Patch('current')
  updateCurrent(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user as UserType;
    return this.usersService.update(id, updateUserDto);
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
  @ApiNotFoundResponse({
    description: "Can't found the user in the Database",
    example: {
      success: false,
      message: 'User is not exist',
    },
  })
  @ApiBadRequestResponse({
    description: "Can't found any data to update user with it",
    example: {
      success: false,
      message: 'Must provide a data to update the user',
    },
  })
  @ApiUnauthorizedResponse({
    description: "Normal user can't hit this route to update any user",
    example: {
      success: false,
      message: 'Unauthorized',
    },
  })
  @Patch(':id')
  @Roles(['admin'])
  updateAdmin(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('current/password')
  updatePassword(
    @Req() req: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { id, password } = req.user as User;
    return this.usersService.updatePassword(id, password, updatePasswordDto);
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
  @ApiNotFoundResponse({
    description: "Can't found the user in the Database",
    example: {
      success: false,
      message: 'User is not exist',
    },
  })
  @ApiUnauthorizedResponse({
    description: "Normal user can't hit this route to delete any user",
    example: {
      success: false,
      message: 'Unauthorized',
    },
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(['admin'])
  removeAdmin(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
