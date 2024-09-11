import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { AuthService } from 'src/auth/auth.service';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { User, users } from 'src/db/schema';

import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private authService: AuthService,
  ) {}

  async current(user: User) {
    const { id, username, email, avatar_url } = user;

    return {
      success: true,
      message: 'User has been obtained successfully',
      data: {
        userData: {
          id,
          username,
          email,
          avatar_url,
        },
      },
    };
  }

  async findOne(id: string) {
    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
      columns: {
        id: true,
        username: true,
        email: true,
        avatar_url: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not exist');
    }

    return {
      success: true,
      message: 'User has been obtained successfully',
      data: {
        userData: {
          ...user,
        },
      },
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (
      !updateUserDto.username &&
      !updateUserDto.avatar_url &&
      !updateUserDto.cover_url
    ) {
      throw new BadRequestException('Must provide a data to update the user');
    }

    const updatedUser = await this.db
      .update(users)
      .set({
        ...updateUserDto,
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        avatar_url: users.avatar_url,
        cover_url: users.cover_url,
      });

    if (!updatedUser) {
      throw new NotFoundException('User is not exit');
    }

    return {
      success: true,
      message: 'User has been updated successfully',
      data: { userData: updatedUser },
    };
  }

  async updatePassword(
    id: string,
    password: string,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const { old_password, new_password } = updatePasswordDto;
    const isOldPassMatch = await this.authService.comparePassword(
      old_password,
      password,
    );

    if (!isOldPassMatch) {
      throw new BadRequestException('Old password is wrong');
    }

    password = await this.authService.hashPassword(new_password);

    await this.db.update(users).set({ password }).where(eq(users.id, id));

    return { success: true, message: 'User password updated successfully' };
  }

  async remove(id: string) {
    const user = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException('User is not exist');
    }
  }
}
