import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JWTService } from './service/jwt.service';

@Global()
@Module({
  imports: [ConfigService],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
