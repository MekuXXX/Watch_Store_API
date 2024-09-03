import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User, UserRole } from 'src/db/schema';
import { ROLE_KEY } from 'src/decorators/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const acceptedRoles = this.reflector.getAllAndOverride<
      UserRole[] | undefined
    >(ROLE_KEY, [context.getHandler(), context.getClass()]);
    let role: UserRole = 'user';

    if (req.user) {
      const user: User = req.user;
      role = user.role;
    }

    return acceptedRoles ? acceptedRoles.includes(role) : true;
  }
}
