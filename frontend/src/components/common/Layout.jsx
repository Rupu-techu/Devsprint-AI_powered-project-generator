import { Outlet } from 'react-router-dom'
import Navigation from '../Navigation'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-blue-950">
      {/* Top Navigation Bar */}
      <Navigation />
      
      {/* Main Content Area */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

// Made with Bob
