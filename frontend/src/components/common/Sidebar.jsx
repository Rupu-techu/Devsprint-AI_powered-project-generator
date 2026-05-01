import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  SparklesIcon, 
  ClockIcon, 
  DocumentDuplicateIcon,
  Squares2X2Icon 
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  const navItems = [
    { to: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { to: '/generator', icon: SparklesIcon, label: 'Generate Project' },
    { to: '/history', icon: ClockIcon, label: 'History' },
    { to: '/templates', icon: DocumentDuplicateIcon, label: 'Templates' },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 border-r border-gray-700">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

// Made with Bob
