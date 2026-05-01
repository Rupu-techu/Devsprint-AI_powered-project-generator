import { Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  // Bypass authentication - always render children for demo
  return <Outlet />
}

export default ProtectedRoute

// Made with Bob - Authentication bypassed for demo
