import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import env from 'src/utils/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, payload.id),
    });

    if (!user) {
      throw new BadRequestException('User is not exist');
    }

    if (!user.is_active) {
      throw new ForbiddenException('Must activate user to obtain the data');
    }

    return { ...user };
  }
}
