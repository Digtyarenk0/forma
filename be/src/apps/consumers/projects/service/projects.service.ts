import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  Project,
  ProjectsStatus,
} from 'database/entities/projects/projects.entity';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    this.processQueuedProjects();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async processQueuedProjects() {
    try {
      const queuedProjects = await this.projectRepository.find({
        where: { status: ProjectsStatus.quenue },
      });

      if (queuedProjects.length > 0) {
        this.logger.log(`Found ${queuedProjects.length} projects in queue`);
        queuedProjects.forEach((project) => {
          this.logger.log(`Project ID: ${project.id}`);
        });
      } else {
        this.logger.log('No projects in queue');
      }
    } catch (error) {
      this.logger.error(`Error processing queued projects: ${error.message}`);
    }
  }
}
