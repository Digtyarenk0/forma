import { Global, Module } from '@nestjs/common';

import { CacheService } from './redis/service/cache.service';

import { JWTModule } from './jwt/jwt.module';

@Global()
@Module({
  imports: [],
  providers: [CacheService, JWTModule],
  exports: [CacheService, JWTModule],
})
export class CommonModule {}
