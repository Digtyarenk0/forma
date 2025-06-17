import { Module } from '@nestjs/common';

import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ProjectsModule],
  providers: [ProjectsModule],
})
export class ConsumerModule {}
