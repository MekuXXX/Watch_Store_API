import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserType } from 'src/db/schema';

type UserField = keyof UserType;

export const User = createParamDecorator(
  (data: UserField[] | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as UserType;

    if (!data) {
      return user;
    }

    const selectedFields = {} as Partial<UserType>;

    data.forEach((field) => {
      selectedFields[field as string] = user[field];
    });

    return selectedFields;
  },
);
