import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import * as moment from 'moment';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import {
  activate_tokens,
  ActivateToken,
  forget_password_tokens,
  User,
  UserRole,
  users,
} from 'src/db/schema';
import { MailerService } from 'src/mailer/mailer.service';
import env from 'src/utils/env';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwt: JwtService,
    private mailer: MailerService,
  ) {}

  async signup(userDto: CreateUserDto) {
    const { username, email, password } = userDto;
    const dbUser = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (dbUser) {
      throw new BadRequestException('Email is already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = (
      await this.db
        .insert(users)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning()
    )[0];

    if (!user) {
      throw new InternalServerErrorException(
        'Error happen during creating the user',
      );
    }

    const token = (
      await this.db
        .insert(activate_tokens)
        .values({
          user_id: user.id,
          expiration_date: moment()
            .add(env.ACTIVATE_TOKENS_EXPIRATION, 'milliseconds')
            .toDate(),
        })
        .returning()
    )[0];

    await this.mailer.sendMail({
      recipients: [{ name: user.username, address: user.email }],
      subject: 'Verify Watch Store Account',
      html: `<h1>Verify email: <a href="${env.APP_CLIENT_URL}/verify-email/${
        token.token
      }">Click here</a></h1>`,
    });

    return {
      success: true,
      message: 'User signed up correctly',
    };
  }

  async signin(userDto: SignInUserDto) {
    const { email, password } = userDto;
    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      throw new NotFoundException('Email is not exist');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Activate the account to login');
    }

    const isMatch = await this.comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Email or Password is not correct');
    }

    const token = await this.createToken({ id: user.id, role: user.role });

    if (!token) {
      throw new InternalServerErrorException(
        'Error during creating user session',
      );
    }

    return {
      success: true,
      message: 'User signed in correctly',
      data: {
        token,
        userData: {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.avatar_url,
        },
      },
    };
  }

  async verifyEmail(token: string) {
    const dbToken = await this.db.query.activate_tokens.findFirst({
      where: (dbToken, { eq }) => eq(dbToken.token, token),
    });

    if (!dbToken) {
      throw new BadRequestException('The token is not exist');
    }

    if (new Date(Date.now()) > new Date(dbToken.expiration_date)) {
      const { tokenId } = (
        await this.db
          .insert(activate_tokens)
          .values({
            user_id: dbToken.user_id,
            expiration_date: moment()
              .add(env.ACTIVATE_TOKENS_EXPIRATION, 'milliseconds')
              .toDate(),
          })
          .returning({ tokenId: activate_tokens.id })
      )[0];

      const data = (
        await this.db
          .select({
            activateToken: activate_tokens,
            user: users,
          })
          .from(activate_tokens)
          .innerJoin(users, eq(activate_tokens.user_id, users.id))
          .where(eq(activate_tokens.id, tokenId))
      )[0];

      await this.mailer.sendMail({
        recipients: [{ name: data.user.username, address: data.user.email }],
        subject: 'Verify Watch Store Account',
        html: `<h1>Verify email: <a href="${env.APP_CLIENT_URL}/verify-email/${
          data.activateToken.token
        }">Click here</a></h1>`,
      });

      throw new BadRequestException('Token is expired, We have sent a new one');
    }

    const user = (
      await this.db
        .update(users)
        .set({ is_active: true } as Partial<User>)
        .where(eq(users.id, dbToken.user_id))
        .returning({
          id: users.id,
          username: users.username,
          email: users.email,
          avatar_url: users.avatar_url,
          role: users.role,
        })
    )[0];

    if (!user) {
      throw new InternalServerErrorException(
        'Error happened during verifying the user',
      );
    }

    await this.db
      .update(activate_tokens)
      .set({
        is_used: true,
      } as Partial<ActivateToken>)
      .where(
        and(
          eq(activate_tokens.token, token),
          eq(activate_tokens.is_used, false),
        ),
      );

    this.db
      .delete(activate_tokens)
      .where(
        and(
          eq(activate_tokens.user_id, dbToken.user_id),
          eq(activate_tokens.is_used, false),
        ),
      );

    const jwtToken = await this.createToken({ id: user.id, role: user.role });

    if (!jwtToken) {
      throw new InternalServerErrorException(
        'Error happend during create user session',
      );
    }

    return {
      success: true,
      messa: 'User has been activated successfully',
      data: {
        token: jwtToken,
        userData: user,
      },
    };
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, forgetPasswordDto.email),
    });

    if (!user) {
      throw new NotFoundException('Email is not exist');
    }

    const forgetToken = (
      await this.db
        .insert(forget_password_tokens)
        .values({
          user_id: user.id,
          expiration_date: moment()
            .add(env.FORGET_PASSWORD_TOKENS_EXPIRATION, 'milliseconds')
            .toDate(),
        })
        .returning()
    )[0];

    if (!forgetToken) {
      throw new InternalServerErrorException(
        'Error happend during in forget password',
      );
    }

    await this.mailer.sendMail({
      recipients: [{ name: user.username, address: user.email }],
      subject: 'Forget Password of Watch Store Account',
      html: `<h1>Forget password: <a href="${env.APP_CLIENT_URL}/reset-password/${
        forgetToken.token
      }">Click Here</a></h1>`,
    });

    return { success: true, message: 'Reset mail has sent successfully' };
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const { password, confirmPassword } = resetPasswordDto;

    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password must be the same as reset password',
      );
    }

    const dbToken = await this.db.query.forget_password_tokens.findFirst({
      where: (dbToken, { eq }) => eq(dbToken.token, token),
    });

    if (!dbToken) {
      throw new BadRequestException('Token is not exist, Please try again');
    }

    if (new Date(Date.now()) > new Date(dbToken.expiration_date)) {
      const { tokenId } = (
        await this.db
          .insert(forget_password_tokens)
          .values({
            user_id: dbToken.user_id,
            expiration_date: moment()
              .add(env.FORGET_PASSWORD_TOKENS_EXPIRATION, 'milliseconds')
              .toDate(),
          })
          .returning({ tokenId: forget_password_tokens.id })
      )[0];

      const data = (
        await this.db
          .select({
            forgetToken: forget_password_tokens,
            user: users,
          })
          .from(forget_password_tokens)
          .innerJoin(users, eq(forget_password_tokens.user_id, users.id))
          .where(eq(forget_password_tokens.id, tokenId))
      )[0];

      await this.mailer.sendMail({
        recipients: [{ name: data.user.username, address: data.user.email }],
        subject: 'Forget Password of Watch Store Account',
        html: `<h1>Forget password: <a href="${
          env.APP_CLIENT_URL
        }/reset-password/${data.forgetToken.token}">Click Here</a></h1>`,
      });

      throw new BadRequestException('Token is expired, We have sent a new one');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = (
      await this.db
        .update(users)
        .set({ password: hashedPassword } as Partial<User>)
        .where(eq(users.id, dbToken.user_id))
        .returning({
          id: users.id,
          username: users.username,
          email: users.email,
          avatar_url: users.avatar_url,
        })
    )[0];

    if (!user) {
      throw new InternalServerErrorException('Error during updating the user');
    }

    await this.db
      .update(forget_password_tokens)
      .set({
        is_used: true,
      } as Partial<ActivateToken>)
      .where(
        and(
          eq(forget_password_tokens.token, token),
          eq(forget_password_tokens.is_used, false),
        ),
      );

    this.db
      .delete(forget_password_tokens)
      .where(
        and(
          eq(forget_password_tokens.user_id, dbToken.user_id),
          eq(forget_password_tokens.is_used, false),
        ),
      );

    return { success: true, message: 'Password has been reseted successfully' };
  }

  async validateResetToken(token: string) {
    const dbToken = await this.db.query.forget_password_tokens.findFirst({
      where: (dbToken, { eq }) => eq(dbToken.token, token),
    });

    if (!dbToken) {
      throw new BadRequestException('Token is not exist');
    }

    if (dbToken.is_used) {
      throw new BadRequestException('Token is expired');
    }

    if (new Date(Date.now()) > new Date(dbToken.expiration_date)) {
      throw new BadRequestException('Token is expired');
    }

    return { success: true, message: 'Token is valid to be used' };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createToken(payload: { id: string; role: UserRole }) {
    return await this.jwt.signAsync(payload, {
      secret: env.JWT_SECRET,
    });
  }
}
