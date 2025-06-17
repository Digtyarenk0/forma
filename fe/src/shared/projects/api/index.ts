import { $api } from '../../api/api'
import { ICreateProjectResponse, IProject } from '../types'

export const projectsApi = {
  create: async (path: string): Promise<ICreateProjectResponse> => {
    const response = await $api.post<ICreateProjectResponse>('/projects', { path })
    return response.data
  },

  getProjects: async (): Promise<IProject[]> => {
    const response = await $api.get<IProject[]>('/projects')
    return response.data
  }
}
