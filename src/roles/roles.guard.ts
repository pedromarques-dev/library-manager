import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { getRole } from 'src/utils/get-role';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }
        const { headers } = context.switchToHttp().getRequest();
        if (!headers.authorization?.split('Bearer')[1]) {
            throw new UnauthorizedException();
        }
        const userRole = await getRole(headers.authorization);
        const teste = requiredRoles.some((role) => userRole === role);
        return teste;
    }
}
