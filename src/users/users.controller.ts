import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { QueriesDto } from 'src/dtos/queries.dto';
import { Roles } from 'src/decorators/role';
import { User, User as UserType } from 'src/db/schema';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['admin'])
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'limit', type: Number, example: 10 })
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @ApiQuery({ name: 'query', type: String, example: 'John' })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Got the users successfully',
        data: {
          users: [
            {
              id: '1',
              username: 'john_doe',
              email: 'john@example.com',
              avatar_url: 'http://example.com/avatar.jpg',
              cover_url: 'http://example.com/cover.jpg',
              phone: '+123456789',
              role: 'user',
            },
          ],
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user is not admin',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  findAll(@Query() queriesDto: QueriesDto) {
    return this.usersService.findAll(queriesDto);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiOkResponse({
    description: 'Current user information retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'User has been obtained successfully',
        data: {
          userData: {
            id: '1',
            username: 'john_doe',
            email: 'john@example.com',
            avatar_url: 'http://example.com/avatar.jpg',
            cover_url: 'http://example.com/cover.jpg',
            phone: '+123456789',
          },
        },
      },
    },
  })
  current(@Req() req: Request) {
    return this.usersService.current(req.user as UserType);
  }

  @Roles(['admin'])
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: String, example: '1' })
  @ApiOkResponse({
    description: 'User retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'User has been obtained successfully',
        data: {
          userData: {
            id: '1',
            username: 'john_doe',
            email: 'john@example.com',
            avatar_url: 'http://example.com/avatar.jpg',
            cover_url: 'http://example.com/cover.jpg',
            phone: '+123456789',
            addresses: [],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: { success: false, message: 'User does not exist' },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user is not admin',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('current')
  @ApiOperation({ summary: 'Update current user information' })
  @ApiBody({
    description: 'Data for updating user information',
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'User updated successfully',
    schema: {
      example: {
        success: true,
        message: 'User has been updated successfully',
        data: {
          userData: {
            id: '1',
            username: 'john_updated',
            email: 'john_updated@example.com',
            avatar_url: 'http://example.com/avatar.jpg',
            cover_url: 'http://example.com/cover.jpg',
            phone: '+123456789',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: { success: false, message: 'User does not exist' },
    },
  })
  updateCurrent(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user as UserType;
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(['admin'])
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by admin' })
  @ApiParam({ name: 'id', type: String, example: '1' })
  @ApiBody({
    description: 'Data for updating user information',
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'User updated successfully',
    schema: {
      example: {
        success: true,
        message: 'User has been updated successfully',
        data: {
          userData: {
            id: '1',
            username: 'john_updated',
            email: 'john_updated@example.com',
            avatar_url: 'http://example.com/avatar.jpg',
            cover_url: 'http://example.com/cover.jpg',
            phone: '+123456789',
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: { success: false, message: 'User does not exist' },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user is not admin',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  updateAdmin(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('current/password')
  @ApiOperation({ summary: 'Update current user password' })
  @ApiBody({
    description: 'Data for updating password',
    type: UpdatePasswordDto,
  })
  @ApiOkResponse({
    description: 'Password updated successfully',
    schema: {
      example: { success: true, message: 'User password updated successfully' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Old password is wrong',
    schema: {
      example: { success: false, message: 'Old password is wrong' },
    },
  })
  updatePassword(
    @Req() req: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { id, password } = req.user as User;
    return this.usersService.updatePassword(id, password, updatePasswordDto);
  }

  @Delete('current')
  @ApiOperation({ summary: 'Delete current user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    schema: {
      example: {
        success: true,
        data: { user: { id: '1', username: 'john_doe' } },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: { success: false, message: 'User does not exist' },
    },
  })
  remove(@Req() req: Request) {
    const { id } = req.user as User;
    return this.usersService.remove(id);
  }

  @Roles(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by admin' })
  @ApiParam({ name: 'id', type: String, example: '1' })
  @ApiForbiddenResponse({
    description: 'Forbidden if user is not admin',
    schema: {
      example: { success: false, message: 'Forbidden' },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: { success: false, message: 'User does not exist' },
    },
  })
  removeAdmin(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
