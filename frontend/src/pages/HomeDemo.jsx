import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, CodeBracketIcon, RocketLaunchIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const HomeDemo = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DevSprint AI
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Transform Ideas into Code Instantly
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            AI-powered project generation that creates complete, production-ready code structures from your descriptions. 
            No setup required, just describe and generate.
          </p>
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            <SparklesIcon className="w-6 h-6" />
            Try Demo Now
            <RocketLaunchIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="glass-strong rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Powered Generation</h3>
            <p className="text-gray-400 leading-relaxed">
              Describe your project in plain English and watch as AI generates complete file structures with production-ready code.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-strong rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
              <CodeBracketIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Detection</h3>
            <p className="text-gray-400 leading-relaxed">
              Intelligent keyword analysis automatically detects project types and generates appropriate tech stacks and architectures.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-strong rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-pink-500/50">
              <RocketLaunchIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Results</h3>
            <p className="text-gray-400 leading-relaxed">
              Get your complete project structure in seconds. Copy code instantly or download as a ready-to-use package.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center glass-strong rounded-2xl p-12 border border-cyan-500/30 max-w-4xl mx-auto">
          <CpuChipIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            No sign-up required. Start generating projects right now.
          </p>
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Launch Generator
            <SparklesIcon className="w-5 h-5" />
          </Link>
        </div>

        {/* Tech Stack Preview */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Supports popular technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Python', 'Django', 'Express', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Vue', 'Angular'].map((tech) => (
              <span key={tech} className="px-4 py-2 glass rounded-lg text-gray-300 text-sm border border-gray-700/50">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDemo;

// Made with Bob
