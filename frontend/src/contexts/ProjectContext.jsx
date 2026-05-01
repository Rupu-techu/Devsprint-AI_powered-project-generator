import { createContext, useState, useCallback } from 'react'
import projectService from '../services/project.service'

export const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Generate new project
  const generateProject = async (projectData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await projectService.generateProject(projectData)
      const newProject = response.data
      setProjects(prev => [newProject, ...prev])
      setCurrentProject(newProject)
      return newProject
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fetch all projects
  const fetchProjects = async (params) => {
    setLoading(true)
    setError(null)
    try {
      const response = await projectService.getProjects(params)
      setProjects(response.data.projects || response.data)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fetch project by ID
  const fetchProjectById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await projectService.getProjectById(id)
      setCurrentProject(response.data)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update project
  const updateProject = async (id, updates) => {
    setLoading(true)
    setError(null)
    try {
      const response = await projectService.updateProject(id, updates)
      const updatedProject = response.data
      
      // Update in projects list
      setProjects(prev => 
        prev.map(p => p._id === id ? updatedProject : p)
      )
      
      // Update current project if it's the one being updated
      if (currentProject?._id === id) {
        setCurrentProject(updatedProject)
      }
      
      return updatedProject
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete project
  const deleteProject = async (id) => {
    setLoading(true)
    setError(null)
    try {
      await projectService.deleteProject(id)
      setProjects(prev => prev.filter(p => p._id !== id))
      if (currentProject?._id === id) {
        setCurrentProject(null)
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Download project
  const downloadProject = async (id, projectName) => {
    setLoading(true)
    setError(null)
    try {
      await projectService.downloadProject(id, projectName)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Clear current project
  const clearCurrentProject = useCallback(() => {
    setCurrentProject(null)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    projects,
    currentProject,
    loading,
    error,
    generateProject,
    fetchProjects,
    fetchProjectById,
    updateProject,
    deleteProject,
    downloadProject,
    clearCurrentProject,
    clearError,
    setCurrentProject
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

// Made with Bob
