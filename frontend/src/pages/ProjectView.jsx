import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProject } from '../hooks/useProject'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Button from '../components/common/Button'
import { ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/outline'

const ProjectView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentProject, fetchProjectById, downloadProject, deleteProject, loading } = useProject()
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    if (id) {
      loadProject()
    }
  }, [id])

  const loadProject = async () => {
    try {
      await fetchProjectById(id)
    } catch (error) {
      console.error('Failed to load project:', error)
    }
  }

  const handleDownload = async () => {
    try {
      await downloadProject(id, currentProject?.name)
    } catch (error) {
      console.error('Failed to download project:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id)
        navigate('/history')
      } catch (error) {
        console.error('Failed to delete project:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading project..." />
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Project not found</p>
        <Button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{currentProject.name}</h1>
          <p className="text-gray-400">{currentProject.description}</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleDownload} variant="success">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2 inline" />
            Download
          </Button>
          <Button onClick={handleDelete} variant="danger">
            <TrashIcon className="w-5 h-5 mr-2 inline" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {currentProject.techStack?.frontend?.map(tech => (
            <span key={tech} className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">
              {tech}
            </span>
          ))}
          {currentProject.techStack?.backend?.map(tech => (
            <span key={tech} className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
              {tech}
            </span>
          ))}
          {currentProject.techStack?.database && (
            <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm">
              {currentProject.techStack.database}
            </span>
          )}
          {currentProject.techStack?.other?.map(tech => (
            <span key={tech} className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* File Explorer and Code Viewer */}
      <div className="grid grid-cols-12 gap-6">
        {/* File Tree */}
        <div className="col-span-3 bg-gray-800 rounded-xl p-4 border border-gray-700 h-[600px] overflow-y-auto">
          <h3 className="text-sm font-bold text-white mb-3">Files</h3>
          <div className="space-y-1">
            {currentProject.files?.map((file, index) => (
              <button
                key={index}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  selectedFile?.path === file.path
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {file.path}
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewer */}
        <div className="col-span-9 bg-gray-800 rounded-xl border border-gray-700 h-[600px] overflow-hidden">
          {selectedFile ? (
            <div className="h-full flex flex-col">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <span className="text-sm font-medium text-white">{selectedFile.path}</span>
                <span className="text-xs text-gray-400">{selectedFile.language}</span>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <pre className="text-sm text-gray-300">
                  <code>{selectedFile.content}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a file to view its content
            </div>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-3">Project Idea</h2>
        <p className="text-gray-400">{currentProject.idea}</p>
      </div>
    </div>
  )
}

export default ProjectView

// Made with Bob
