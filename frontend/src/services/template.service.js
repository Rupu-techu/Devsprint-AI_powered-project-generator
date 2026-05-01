import api from './api'

const templateService = {
  // Get all templates
  getTemplates: async (params = {}) => {
    const response = await api.get('/templates', { params })
    return response.data
  },

  // Get template by ID
  getTemplateById: async (id) => {
    const response = await api.get(`/templates/${id}`)
    return response.data
  },

  // Create new template
  createTemplate: async (templateData) => {
    const response = await api.post('/templates', templateData)
    return response.data
  },

  // Update template
  updateTemplate: async (id, updates) => {
    const response = await api.put(`/templates/${id}`, updates)
    return response.data
  },

  // Delete template
  deleteTemplate: async (id) => {
    const response = await api.delete(`/templates/${id}`)
    return response.data
  },

  // Use template to create project
  useTemplate: async (id, projectData) => {
    const response = await api.post(`/templates/${id}/use`, projectData)
    return response.data
  }
}

export default templateService

// Made with Bob
