import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from 'database/entities/projects/projects.entity';
import { User } from 'database/entities/users/user.entity';

import { JWTModule } from 'apps/common/jwt/jwt.module';

import { ProjectsService } from './service/projects.service';

@Module({
  imports: [JWTModule, TypeOrmModule.forFeature([User, Project])],
  controllers: [],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
