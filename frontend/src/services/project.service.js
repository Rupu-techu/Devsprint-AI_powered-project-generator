import api from './api'

const projectService = {
  // Generate new project
  generateProject: async (projectData) => {
    const response = await api.post('/projects/generate', projectData)
    return response.data
  },

  // Get all user projects
  getProjects: async (params = {}) => {
    const response = await api.get('/projects', { params })
    return response.data
  },

  // Get project by ID
  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`)
    return response.data
  },

  // Update project
  updateProject: async (id, updates) => {
    const response = await api.put(`/projects/${id}`, updates)
    return response.data
  },

  // Delete project
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  },

  // Download project as ZIP
  downloadProject: async (id, projectName) => {
    const response = await api.get(`/projects/${id}/download`, {
      responseType: 'blob'
    })
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${projectName || 'project'}.zip`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    return true
  }
}

export default projectService

// Made with Bob
