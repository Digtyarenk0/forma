export interface ICreateProjectResponse {
  id: string
}

export enum ProjectsStatus {
  quenue = 'quenue', // in quenue on parsing
  parsing = 'parsing', // proccessing
  parsed = 'parsed'
}

export interface IProjectParsing {
  id: string
  status: ProjectsStatus.parsing | ProjectsStatus.quenue
  url: string
  createdAt: string
}

export interface IProjectParsed {
  id: string
  name: string | null
  status: ProjectsStatus.parsed
  url: string
  stars: number
  forks: number
  openIssues: number
  createdAt: string
}

export type IProject = IProjectParsing | IProjectParsed
