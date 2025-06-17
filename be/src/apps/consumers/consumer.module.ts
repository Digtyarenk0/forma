import { Module } from '@nestjs/common';

import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [],
  providers: [ProjectsModule],
  exports: [ProjectsModule],
})
export class ConsumerModule {}
