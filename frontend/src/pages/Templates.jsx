import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import templateService from '../services/template.service'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Button from '../components/common/Button'
import { DocumentDuplicateIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Templates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTemplates(filtered)
    } else {
      setFilteredTemplates(templates)
    }
  }, [searchTerm, templates])

  const loadTemplates = async () => {
    try {
      const response = await templateService.getTemplates()
      setTemplates(response.data.templates || response.data || [])
    } catch (error) {
      console.error('Failed to load templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUseTemplate = async (templateId) => {
    try {
      const projectName = prompt('Enter a name for your new project:')
      if (!projectName) return

      const response = await templateService.useTemplate(templateId, {
        projectName,
        description: 'Project created from template'
      })
      
      navigate(`/project/${response.data._id}`)
    } catch (error) {
      console.error('Failed to use template:', error)
      alert('Failed to create project from template')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Template Library</h1>
        <p className="text-gray-400">Browse and use pre-built project templates</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" text="Loading templates..." />
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <DocumentDuplicateIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">
            {searchTerm ? 'No templates found matching your search' : 'No templates available yet'}
          </p>
          <p className="text-sm text-gray-500">
            Templates will appear here once they are created
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template._id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">
                  {template.name}
                </h3>
                {template.isPublic && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                    Public
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {template.description || 'No description'}
              </p>

              {template.category && (
                <div className="mb-4">
                  <span className="px-2 py-1 bg-secondary-600/20 text-secondary-400 rounded text-xs">
                    {template.category}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {template.techStack?.slice(0, 4).map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
                {template.techStack?.length > 4 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    +{template.techStack.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>By {template.createdBy?.name || 'Unknown'}</span>
                <span>{template.usageCount || 0} uses</span>
              </div>

              <Button
                onClick={() => handleUseTemplate(template._id)}
                className="w-full"
                variant="primary"
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-primary-600/10 border border-primary-600/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">💡 Pro Tip</h3>
        <p className="text-gray-300 text-sm">
          You can save any of your generated projects as a template from the project view page. 
          Templates help you quickly start new projects with similar structures.
        </p>
      </div>
    </div>
  )
}

export default Templates

// Made with Bob
