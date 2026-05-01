import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProject } from '../hooks/useProject'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { SparklesIcon, ClockIcon, DocumentDuplicateIcon, FolderIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { user } = useAuth()
  const { projects, fetchProjects, loading } = useProject()
  const [stats, setStats] = useState({
    totalProjects: 0,
    recentProjects: 0,
    templates: 0
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await fetchProjects({ limit: 5 })
      setStats({
        totalProjects: data.pagination?.totalItems || projects.length,
        recentProjects: projects.filter(p => {
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
          return new Date(p.createdAt) > dayAgo
        }).length,
        templates: 0 // Will be updated when templates are loaded
      })
    } catch (error) {
      console.error('Failed to load projects:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Projects</p>
              <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <FolderIcon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Recent (24h)</p>
              <p className="text-3xl font-bold text-white">{stats.recentProjects}</p>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Templates</p>
              <p className="text-3xl font-bold text-white">{stats.templates}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-600/20 rounded-lg flex items-center justify-center">
              <DocumentDuplicateIcon className="w-6 h-6 text-secondary-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/generator"
            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all"
          >
            <SparklesIcon className="w-8 h-8 text-white" />
            <div>
              <h3 className="font-semibold text-white">Generate New Project</h3>
              <p className="text-sm text-gray-200">Create a project from your idea</p>
            </div>
          </Link>

          <Link
            to="/templates"
            className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <DocumentDuplicateIcon className="w-8 h-8 text-gray-300" />
            <div>
              <h3 className="font-semibold text-white">Browse Templates</h3>
              <p className="text-sm text-gray-400">Start from a template</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Recent Projects</h2>
          <Link to="/history" className="text-primary-500 hover:text-primary-400 text-sm font-medium">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="py-8">
            <LoadingSpinner text="Loading projects..." />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No projects yet</p>
            <Link
              to="/generator"
              className="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project._id}
                to={`/project/${project._id}`}
                className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'generating' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {project.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

// Made with Bob
