import { useState } from 'react'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { projectsApi } from '@/shared/projects/api'
import { AddProjectFormData } from '../../types/project'

const formInitData = {
  repositoryUrl: ''
}
export const AddProject = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<AddProjectFormData>(formInitData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatRepositoryUrl = (input: string): string => {
    // If input is already a full URL, return it
    if (input.startsWith('http')) {
      return input
    }

    // If input is in format "owner/repo", convert to full URL
    if (input.includes('/')) {
      return `https://github.com/${input}`
    }

    return input
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formattedUrl = formatRepositoryUrl(formData.repositoryUrl)
      const response = await projectsApi.create(formattedUrl)

      if (!response.id) {
        toast.error('Failed to add project')
        throw new Error('Failed to add project')
      }

      setFormData(formInitData)
      toast.success('The project has been created and added to the parsing queue.')
      // navigate('/projects')
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'An error occurred')
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Add New Project</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-6">
          <label htmlFor="repositoryUrl" className="mb-2 block text-sm font-medium text-gray-700">
            Repository URL or Owner/Repo
          </label>
          <input
            type="text"
            id="repositoryUrl"
            value={formData.repositoryUrl}
            onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
            placeholder="https://github.com/owner/repo or owner/repo"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="mt-2 text-sm text-gray-500">Enter a full GitHub URL or use the format owner/repo</p>
        </div>

        {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              Adding Project...
            </div>
          ) : (
            'Add Project'
          )}
        </button>
      </form>
    </div>
  )
}
