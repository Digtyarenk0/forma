import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/users.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Project name' })
  name: string;

  @Column({ comment: 'Project URL' })
  url: string;

  @Column({ comment: 'Number of stars' })
  stars: number;

  @Column({ comment: 'Number of forks' })
  forks: number;

  @Column({ comment: 'Number of open issues' })
  openIssues: number;

  @CreateDateColumn({ comment: 'Creation date in UTC Unix timestamp format' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ comment: 'Project owner' })
  ownerId: string;
}
