import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';

import { PROJECT_QUENUE_KEY } from 'apps/common/quenue/constants';

interface ProjectParsingData {
  id: string;
  url: string;
}

@Processor(PROJECT_QUENUE_KEY)
export class ProjectParsingConsumer {
  private readonly logger = new Logger(ProjectParsingConsumer.name);

  @Process({ concurrency: 1 })
  async handleParsing(job: Job<ProjectParsingData>) {
    const project = job.data;
    this.logger.debug(
      `Processing project ${project.id} with URL ${project.url}`,
    );

    try {
      console.log('PPOPO');

      return;
    } catch (error) {
      this.logger.error(`Error processing project ${project.id}:`, error);
      throw error;
    }
  }
}
