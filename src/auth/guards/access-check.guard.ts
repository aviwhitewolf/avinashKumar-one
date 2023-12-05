import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user.service';
import { PermissionMapping } from '../dto/create-role.dto';

@Injectable()
export class AccessCheckGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const userWithPermission = await this.userService.getUserPermission(
        req.user.username,
      );

      const permissions: string[] = userWithPermission.role
        .permission as unknown as string[];
      const method = req.method;

      for (let index = 0; index < permissions.length; index++) {
        const permission = permissions[index];
        if (PermissionMapping[permission] === method) return true;
      }

      return false;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }
}
