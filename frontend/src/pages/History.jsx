import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../hooks/useProject'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { MagnifyingGlassIcon, FolderIcon } from '@heroicons/react/24/outline'

const History = () => {
  const { projects, fetchProjects, loading } = useProject()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProjects(filtered)
    } else {
      setFilteredProjects(projects)
    }
  }, [searchTerm, projects])

  const loadProjects = async () => {
    try {
      await fetchProjects()
    } catch (error) {
      console.error('Failed to load projects:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Project History</h1>
        <p className="text-gray-400">View and manage all your generated projects</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" text="Loading projects..." />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <FolderIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">
            {searchTerm ? 'No projects found matching your search' : 'No projects yet'}
          </p>
          {!searchTerm && (
            <Link
              to="/generator"
              className="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Create Your First Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              to={`/project/${project._id}`}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                  {project.name}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'generating' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {project.description || 'No description'}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.frontend?.slice(0, 2).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-primary-600/20 text-primary-400 rounded text-xs">
                    {tech}
                  </span>
                ))}
                {project.techStack?.backend?.slice(0, 1).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">
                    {tech}
                  </span>
                ))}
                {project.techStack?.database && (
                  <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">
                    {project.techStack.database}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{project.files?.length || 0} files</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default History

// Made with Bob
