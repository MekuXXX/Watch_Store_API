import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { DrizzleDB } from 'src/db/drizzle';
import { User, users } from 'src/db/schema';
import { DRIZZLE } from 'src/db/db.module';
import { eq } from 'drizzle-orm';

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
      throw new BadRequestException('User is not exist');
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

  async update(id: string, password: string, updateUserDto: UpdateUserDto) {
    if (
      !updateUserDto.username &&
      !updateUserDto.avatar_url &&
      !updateUserDto.password
    ) {
      throw new BadRequestException('Must provide a data to update the user');
    }

    if (updateUserDto.password) {
      password = await this.authService.hashPassword(updateUserDto.password);
    }

    delete updateUserDto.password;

    const updatedUser = await this.db
      .update(users)
      .set({
        ...updateUserDto,
        password,
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        avatar_url: users.avatar_url,
      });

    return {
      success: true,
      message: 'User has been updated successfully',
      data: { userData: updatedUser },
    };
  }

  async remove(id: string) {
    // const user = await this.prisma.user.findUnique({ where: { id } });
    const user = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new BadRequestException('User is not exist');
    }
  }
}
