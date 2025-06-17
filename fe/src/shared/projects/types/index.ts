export interface ICreateProjectResponse {
  id: string
}

export enum ProjectsStatus {
  quenue = 'quenue', // in quenue on parsing
  parsing = 'parsing', // proccessing
  failed = 'failed',
  parsed = 'parsed'
}

export interface IProjectParsing {
  id: string
  status: ProjectsStatus.parsing | ProjectsStatus.quenue
  url: string
  createdAt: string
}
export interface IProjectFailed {
  id: string
  status: ProjectsStatus.failed
  url: string
  error: string
  createdAt: string
}

export interface IProjectParsed {
  id: string
  name: string | null
  status: ProjectsStatus.parsed
  url: string
  stars: number
  forks: number
  repOwner: string
  openIssues: number
  createdAt: string
}

export type IProject = IProjectParsing | IProjectParsed | IProjectFailed
