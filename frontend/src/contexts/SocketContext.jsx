import { createContext, useState, useEffect, useContext } from 'react'
import socketService from '../services/socket.service'
import { AuthContext } from './AuthContext'
import authService from '../services/auth.service'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const [connected, setConnected] = useState(false)
  const [activeUsers, setActiveUsers] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      const token = authService.getToken()
      if (token) {
        const socket = socketService.connect(token)

        socket.on('connect', () => {
          setConnected(true)
        })

        socket.on('disconnect', () => {
          setConnected(false)
        })

        socket.on('user-joined', (data) => {
          setActiveUsers(prev => [...prev, data])
        })

        socket.on('user-left', (data) => {
          setActiveUsers(prev => prev.filter(u => u.userId !== data.userId))
        })
      }
    } else {
      socketService.disconnect()
      setConnected(false)
      setActiveUsers([])
    }

    return () => {
      socketService.disconnect()
    }
  }, [isAuthenticated])

  const joinProject = (projectId, userId) => {
    socketService.joinProject(projectId, userId)
  }

  const leaveProject = (projectId) => {
    socketService.leaveProject(projectId)
    setActiveUsers([])
  }

  const sendCodeChange = (projectId, filePath, content, changeId) => {
    socketService.sendCodeChange(projectId, filePath, content, changeId)
  }

  const sendCursorMove = (projectId, filePath, position) => {
    socketService.sendCursorMove(projectId, filePath, position)
  }

  const sendFileSelect = (projectId, filePath) => {
    socketService.sendFileSelect(projectId, filePath)
  }

  const onCodeUpdated = (callback) => {
    socketService.on('code-updated', callback)
    return () => socketService.off('code-updated', callback)
  }

  const onCursorUpdated = (callback) => {
    socketService.on('cursor-updated', callback)
    return () => socketService.off('cursor-updated', callback)
  }

  const onFileSelected = (callback) => {
    socketService.on('file-selected', callback)
    return () => socketService.off('file-selected', callback)
  }

  const value = {
    connected,
    activeUsers,
    joinProject,
    leaveProject,
    sendCodeChange,
    sendCursorMove,
    sendFileSelect,
    onCodeUpdated,
    onCursorUpdated,
    onFileSelected,
    socket: socketService.getSocket()
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

// Made with Bob
