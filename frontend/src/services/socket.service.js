import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

class SocketService {
  constructor() {
    this.socket = null
    this.connected = false
  }

  connect(token) {
    if (this.socket?.connected) {
      return this.socket
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    })

    this.socket.on('connect', () => {
      this.connected = true
      console.log('Socket connected:', this.socket.id)
    })

    this.socket.on('disconnect', () => {
      this.connected = false
      console.log('Socket disconnected')
    })

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
    }
  }

  // Join project collaboration session
  joinProject(projectId, userId) {
    if (this.socket) {
      this.socket.emit('join-project', { projectId, userId })
    }
  }

  // Leave project session
  leaveProject(projectId) {
    if (this.socket) {
      this.socket.emit('leave-project', { projectId })
    }
  }

  // Send code change
  sendCodeChange(projectId, filePath, content, changeId) {
    if (this.socket) {
      this.socket.emit('code-change', {
        projectId,
        filePath,
        content,
        changeId,
        timestamp: Date.now()
      })
    }
  }

  // Send cursor position
  sendCursorMove(projectId, filePath, position) {
    if (this.socket) {
      this.socket.emit('cursor-move', {
        projectId,
        filePath,
        position
      })
    }
  }

  // Send file selection
  sendFileSelect(projectId, filePath) {
    if (this.socket) {
      this.socket.emit('file-select', {
        projectId,
        filePath
      })
    }
  }

  // Listen for events
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  // Remove event listener
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket
  }

  // Check if connected
  isConnected() {
    return this.connected && this.socket?.connected
  }
}

// Create singleton instance
const socketService = new SocketService()

export default socketService

// Made with Bob
