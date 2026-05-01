import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import robotLogo from '../assets/robot-logo.svg';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass border-b border-cyan-500/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={robotLogo}
              alt="DevSprint AI Robot"
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              DevSprint AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/generator"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/generator')
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
              }`}
            >
              Generator
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/about')
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/50'
                  : 'text-gray-300 hover:text-pink-300 hover:bg-white/5'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

// Made with Bob
