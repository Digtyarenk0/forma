import { useEffect, useState } from 'react'

import { Project } from '../../types/project'

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
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

  // useEffect(() => {
  //   fetchProjects()
  // }, [])

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
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold">{project.name}</h2>
                <p className="mb-4 text-gray-600">Owner: {project.owner}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {project.url}
                </a>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => fetchProjects()}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Stars</p>
                <p className="text-lg font-semibold">{project.stars}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Forks</p>
                <p className="text-lg font-semibold">{project.forks}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Open Issues</p>
                <p className="text-lg font-semibold">{project.openIssues}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-lg font-semibold">{new Date(project.createdAt * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
