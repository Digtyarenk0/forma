import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  private readonly logger = new Logger(JWTService.name);

  private readonly jwtSecretAccess: string;
  private readonly jwtSecretRefresh: string;
  private readonly jwtAccessExpire: string;
  private readonly jwtRefreshExpire: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecretAccess = this.configService.get('jwt.jwtSecretAccess');
    this.jwtSecretRefresh = this.configService.get('jwt.jwtSecretRefresh');
    this.jwtAccessExpire = this.configService.get('jwt.accessExpires');
    this.jwtRefreshExpire = this.configService.get('jwt.refreshExpires');
  }

  async generateTokens<T extends object>(payload: T) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.jwtSecretAccess,
        expiresIn: this.jwtAccessExpire,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.jwtSecretRefresh,
        expiresIn: this.jwtRefreshExpire,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async verifyAccessToken<T>(token: string): Promise<T | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecretAccess,
      });
      return payload;
    } catch {
      return null;
    }
  }

  async verifyRefreshToken<T>(token: string): Promise<T | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecretRefresh,
      });
      return payload;
    } catch {
      return null;
    }
  }
}
