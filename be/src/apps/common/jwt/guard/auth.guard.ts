import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JWTService } from '../service/jwt.service';
import { UserService } from 'apps/user/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userRepo: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAccessToken<{ id: string }>(
        token,
      );
      if (!payload?.id) throw new UnauthorizedException('Invalid token');
      const user = await this.userRepo.getUserById(payload.id);
      if (!user) throw new UnauthorizedException('User is not registered.');

      request['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export const UseAuthGuard = () => {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth('access-token'));
};
