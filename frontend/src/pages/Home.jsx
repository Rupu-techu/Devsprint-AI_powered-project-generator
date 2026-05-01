import { Link } from 'react-router-dom'
import { SparklesIcon, CodeBracketIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            AI Project Generator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your ideas into complete project structures with production-ready code using AI.
            Generate, customize, and download full-stack applications in minutes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Generation</h3>
            <p className="text-gray-400">
              Leverage OpenAI's GPT-4 to generate complete project structures and production-ready code from your ideas.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-4">
              <CodeBracketIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Collaboration</h3>
            <p className="text-gray-400">
              Work together with your team in real-time. See changes instantly and collaborate seamlessly.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <RocketLaunchIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Download</h3>
            <p className="text-gray-400">
              Download your generated projects as ZIP files and start developing immediately on your local machine.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Supported Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Python', 'Django', 'MongoDB', 'PostgreSQL', 'TypeScript'].map((tech) => (
              <span key={tech} className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of developers using AI to accelerate their development workflow.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Start Building Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

// Made with Bob
