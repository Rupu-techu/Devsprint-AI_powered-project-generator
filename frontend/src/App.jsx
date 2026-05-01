import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProjectProvider } from './contexts/ProjectContext'
import { SocketProvider } from './contexts/SocketContext'

// Pages
import HomeDemo from './pages/HomeDemo'
import AboutDemo from './pages/AboutDemo'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Generator from './pages/Generator'
import GeneratorDemo from './pages/GeneratorDemo'
import ProjectView from './pages/ProjectView'
import History from './pages/History'
import Templates from './pages/Templates'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/common/Layout'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <ProjectProvider>
            <Routes>
              {/* Public Routes with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomeDemo />} />
                <Route path="/generator" element={<GeneratorDemo />} />
                <Route path="/about" element={<AboutDemo />} />
              </Route>
              
              {/* Auth Routes (Optional - without Layout) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes (Optional - for full app) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/project/:id" element={<ProjectView />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/templates" element={<Templates />} />
                </Route>
              </Route>

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProjectProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

// Made with Bob
