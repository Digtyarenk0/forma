export interface Project {
  id: string
  owner: string
  name: string
  url: string
  stars: number
  forks: number
  openIssues: number
  createdAt: number
}

export interface AddProjectFormData {
  repositoryUrl: string
}
