import { IProject, ProjectsStatus } from '@/shared/projects/types'

interface IProjectItemProps {
  project: IProject
  handleDelete: (id: string) => Promise<void>
}

export const ProjectItem = (props: IProjectItemProps) => {
  const { project, handleDelete } = props
  const date = new Date(project.createdAt).toLocaleDateString()

  if (project.status !== ProjectsStatus.parsed) {
    return (
      <div key={project.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            {project.status === ProjectsStatus.failed ? (
              <h2 className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{project.error}</h2>
            ) : (
              <h2 className="mb-2 text-xl font-semibold">-</h2>
            )}
            <p className="mb-4 text-gray-600">Status: {project.status}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {project.url}
            </a>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {}}
              className="rounded-lg bg-red-400 px-4 py-2 text-sm font-medium text-red-600 transition-colors "
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Stars</p>
            <p className="text-lg font-semibold">-</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Forks</p>
            <p className="text-lg font-semibold">-</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Open Issues</p>
            <p className="text-lg font-semibold">-</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Created</p>
            <p className="text-lg font-semibold">{date}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div key={project.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-2 text-xl font-semibold">{project.name}</h2>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {project.url}
          </a>
        </div>
        <div className="flex space-x-4">
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
          <p className="text-sm text-gray-600">Owner</p>
          <p className="text-lg font-semibold">{project.repOwner}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Created</p>
          <p className="text-lg font-semibold">{date}</p>
        </div>
      </div>
    </div>
  )
}
