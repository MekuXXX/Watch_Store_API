import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, ilike } from 'drizzle-orm';
import { AuthService } from 'src/auth/auth.service';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { User, UserAddresses, user_addresses, users } from 'src/db/schema';

import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { QueriesDto } from 'src/dtos/queries.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private authService: AuthService,
  ) {}

  async findAll(queries: QueriesDto) {
    const dbUsers = await this.db.query.users.findMany({
      columns: {
        id: true,
        username: true,
        email: true,
        avatar_url: true,
        cover_url: true,
        phone: true,
        role: true,
      },
      limit: queries.limit,
      offset: queries.limit * (queries.page - 1),
      where: ilike(users.username, `%${queries.query}%`),
    });

    return {
      success: true,
      message: 'Got the usesrs successfully',
      data: { users: dbUsers },
    };
  }

  async current(user: User) {
    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return {
      success: true,
      message: 'User has been obtained successfully',
      data: {
        userData: user,
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
        cover_url: true,
        phone: true,
        role: true,
      },
      with: {
        addresses: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not exist');
    }

    return {
      success: true,
      message: 'User has been obtained successfully',
      data: {
        userData: user,
      },
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { addresses, ...userData } = updateUserDto;
    let checkValues = true;
    let updatedUserId = undefined;

    if (Object.keys(userData).length > 0) {
      const user = (
        await this.db
          .update(users)
          .set(userData)
          .where(eq(users.id, id))
          .returning({ id: users.id })
      )[0];

      updatedUserId = user.id;

      checkValues = false;
    }

    if (addresses?.length > 0) {
      for (let i = 0; i < addresses.length; ++i) {
        (addresses[i] as unknown as any).user_id = id;
      }
      const user_address = (
        await this.db
          .insert(user_addresses)
          .values(addresses as UserAddresses[])
          .returning()
      )[0];

      updatedUserId = user_address.user_id;

      checkValues = false;
    }

    if (checkValues) {
      throw new BadRequestException('Must provide a data to update the user');
    }

    if (!updatedUserId) {
      throw new NotFoundException('User is not exit');
    }

    console.log(id, updatedUserId);

    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, updatedUserId),
      columns: {
        id: true,
        username: true,
        email: true,
        avatar_url: true,
        cover_url: true,
        phone: true,
      },
      with: {
        addresses: true,
      },
    });

    return {
      success: true,
      message: 'User has been updated successfully',
      data: { userData: user },
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
    const user = (
      await this.db.delete(users).where(eq(users.id, id)).returning()
    )[0];

    if (!user) {
      throw new NotFoundException('User is not exist');
    }

    return { success: true, data: { user } };
  }
}
