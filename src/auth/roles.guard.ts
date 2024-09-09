

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // if (!user) {
    //   console.error('User is not defined');
    //   return false; // User must be defined to check roles
    // }

    console.log('User:', user);

    if (!user.role) {
      console.error('User role is not defined');
      return false; // User role must be defined to check roles
    }

    return roles.includes(user.role);
  }
}
