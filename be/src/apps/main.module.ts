import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'nestjs-pino';

import { CommonModule } from './common/common.module';

import configuration from 'config/configuration';
import {
  ConfigAppType,
  Database,
  RedisConfig,
} from 'config/configuration/config.type';

import { ApiModule } from './api/api.module';
import { ConsumerModule } from './consumers/consumer.module';
import { CronModule } from './cron/cron.module';

const configImports = [
  LoggerModule.forRoot(),
  ScheduleModule.forRoot(),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),

  CacheModule.registerAsync({
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<ConfigAppType>) => ({
      store: redisStore,
      url: configService.get<RedisConfig>('redis').url,
      password: configService.get<RedisConfig>('redis').password,
    }),
  }),
  BullModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService<ConfigAppType>) => ({
      url: configService.get<RedisConfig>('redis').url,
      redis: {
        password: configService.get<RedisConfig>('redis').password,
      },
    }),
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<ConfigAppType>) => ({
      ...configService.get<Database>('database').connection,
      autoLoadEntities: true,
    }),
    inject: [ConfigService],
  }),
];

const appModules = [ApiModule, CronModule, ConsumerModule, CommonModule];
@Module({
  imports: [...configImports, ...appModules],
})
export class MainModule {}
