import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/db/schema';

export const ROLE_KEY = Symbol('role-key');
export const Roles = (roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
