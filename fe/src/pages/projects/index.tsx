import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'

import { projectsApi } from '@/shared/projects/api'
import { IProject } from '@/shared/projects/types'

import { ProjectItem } from './item'

export const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getProjects()
      if (response.length) {
        setProjects(response)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || error.message || 'An error occurred')
      } else {
        setError(error instanceof Error ? error.message : 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setProjects(projects.filter((project) => project.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectItem project={project} handleDelete={handleDelete} key={project.id} />
        ))}
      </div>
    </div>
  )
}
