import { useState, useCallback, useMemo } from 'react'
import { 
  ClipboardDocumentIcon, 
  CheckIcon, 
  SparklesIcon, 
  CodeBracketIcon, 
  FolderIcon, 
  BoltIcon 
} from '@heroicons/react/24/outline'

const GeneratorDemo = () => {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [generationStep, setGenerationStep] = useState('')
  const [output, setOutput] = useState(null)
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)

  const aiSteps = useMemo(() => [
    { message: '🧠 Analyzing your idea...', duration: 1000 },
    { message: '🏗️ Generating project structure...', duration: 1500 },
    { message: '💻 Writing code files...', duration: 1800 },
    { message: '🎨 Applying best practices...', duration: 1200 },
    { message: '✨ Finalizing your project...', duration: 800 }
  ], [])

  const simulateAIGeneration = useCallback(async () => {
    for (const step of aiSteps) {
      setGenerationStep(step.message)
      await new Promise(resolve => setTimeout(resolve, step.duration))
    }
  }, [aiSteps])

  const generateProject = useCallback(async (e) => {
    e.preventDefault()
    
    if (!idea.trim()) {
      setError('Please enter your project idea')
      return
    }

    setError('')
    setLoading(true)
    setOutput(null)
    setGenerationStep('🚀 Starting generation...')

    try {
      await simulateAIGeneration()

      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: idea.trim() })
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      setOutput(data)
      setGenerationStep('✅ Project generated successfully!')
      
    } catch (err) {
      console.error('Generation error:', err)
      setError(err.message || 'Failed to generate project. Make sure the backend server is running on http://localhost:5000')
      setGenerationStep('')
    } finally {
      setLoading(false)
    }
  }, [idea, simulateAIGeneration])

  const copyToClipboard = useCallback(async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  // Sample data for sidebar
  const recentProjects = [
    { id: 1, name: 'AI Chat Bot', idea: 'Create an AI-powered chatbot with natural language processing' },
    { id: 2, name: 'E-commerce Store', idea: 'Build an online shopping platform with cart and payment integration' },
    { id: 3, name: 'Task Manager', idea: 'Develop a productivity app for managing daily tasks with categories' }
  ]

  const exampleIdeas = [
    'Create a machine learning model for image classification',
    'Build a real-time chat application with WebSocket',
    'Develop a blog platform with markdown support',
    'Create a weather dashboard with API integration',
    'Build a social media analytics tool'
  ]

  const handleExampleClick = (exampleIdea) => {
    setIdea(exampleIdea)
    setError('')
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="flex relative z-10">
        {/* Left Sidebar */}
        <aside className="w-64 min-h-screen p-4 glass border-r border-cyan-500/20 sticky top-0">
          {/* Recent Projects Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-cyan-400" />
              Recent Projects
            </h3>
            <div className="space-y-2">
              {recentProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleExampleClick(project.idea)}
                  className="w-full text-left p-3 glass rounded-lg border border-purple-500/20 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-200 group"
                >
                  <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {project.idea}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Example Ideas Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CodeBracketIcon className="w-5 h-5 text-purple-400" />
              Example Ideas
            </h3>
            <div className="space-y-2">
              {exampleIdeas.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left p-3 glass rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-white/5 transition-all duration-200 group"
                >
                  <p className="text-sm text-gray-300 group-hover:text-cyan-300 transition-colors">
                    {example}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
        {/* Header with "No login required" badge */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <div className="glass px-4 py-2 rounded-full border border-cyan-500/30 neon-border-cyan">
              <p className="text-sm text-cyan-300 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                No login required • Instant demo
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <SparklesIcon className="w-16 h-16 text-cyan-400 animate-neon-glow" />
              <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 animate-neon-glow">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Project Generator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Describe your project idea and watch AI create a complete project structure with code in seconds
          </p>
        </div>

        {/* Main Content Card - Glassmorphism */}
        <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/20 backdrop-blur-xl">
          {/* Input Section */}
          <div className="p-8">
            <form onSubmit={generateProject} className="space-y-6">
              <div>
                <label htmlFor="idea" className="block text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CodeBracketIcon className="w-6 h-6 text-cyan-400" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Your Project Idea
                  </span>
                </label>
                <textarea
                  id="idea"
                  value={idea}
                  onChange={(e) => {
                    setIdea(e.target.value)
                    setError('')
                  }}
                  disabled={loading}
                  rows={6}
                  className="w-full px-6 py-4 glass rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none text-lg neon-border-cyan"
                  placeholder="Example: Create a task management app with user authentication, real-time updates, and a dashboard showing task statistics..."
                />
                <p className="mt-3 text-sm text-gray-400 flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-cyan-400" />
                  Tip: Be specific! Mention features, technologies, or functionality you want.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 glass rounded-2xl border-2 border-red-500/50 text-red-400 animate-fade-in-up">
                  <p className="font-medium flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    {error}
                  </p>
                </div>
              )}

              {/* Generate Button - Floating with Glow */}
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg relative overflow-hidden group animate-float neon-cyan"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <BoltIcon className="w-6 h-6" />
                    <span>Generate Project</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Loading State with AI Steps */}
          {loading && (
            <div className="px-8 pb-8 animate-fade-in-up">
              <div className="glass rounded-2xl p-6 border border-cyan-500/30 neon-cyan">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-glow-pulse" />
                  <p className="text-cyan-300 font-semibold text-lg animate-pulse">
                    {generationStep}
                  </p>
                </div>
                <div className="w-full glass rounded-full h-3 overflow-hidden border border-cyan-500/30">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-progress neon-cyan" />
                </div>
              </div>
            </div>
          )}

          {/* Output Display */}
          {output && !loading && (
            <div className="px-8 pb-8 space-y-6 animate-fade-in-up">
              {/* Success Message */}
              <div className="glass rounded-2xl p-4 border-2 border-green-500/50 neon-border-cyan">
                <p className="text-green-300 font-semibold flex items-center gap-2">
                  <CheckIcon className="w-5 h-5" />
                  {generationStep}
                </p>
              </div>

              {/* Project Name */}
              <div className="glass-strong rounded-2xl p-6 border border-purple-500/30 neon-border-purple hover:border-purple-500/50 transition-all duration-300">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <SparklesIcon className="w-8 h-8 text-purple-400 animate-pulse" />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {output.projectName}
                  </span>
                </h2>
                <p className="text-gray-300 ml-11">{output.description || 'AI-generated project structure'}</p>
              </div>

              {/* File Structure */}
              <div className="glass-strong rounded-2xl p-6 border border-cyan-500/30 neon-border-cyan hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FolderIcon className="w-6 h-6 text-cyan-400" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Project Structure
                  </span>
                </h3>
                <div className="glass rounded-xl p-4 font-mono text-sm border border-cyan-500/20">
                  {output.structure && output.structure.length > 0 ? (
                    <ul className="space-y-2">
                      {output.structure.map((file, index) => (
                        <li key={index} className="text-gray-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2">
                          <span className="text-cyan-400">├──</span>
                          <span>{file}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No structure available</p>
                  )}
                </div>
              </div>

              {/* Generated Code */}
              <div className="glass-strong rounded-2xl p-6 border border-purple-500/30 neon-border-purple hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CodeBracketIcon className="w-6 h-6 text-purple-400" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Generated Code
                    </span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(output.code || '')}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 border border-cyan-500/30 hover:border-cyan-500/50 neon-border-cyan"
                  >
                    {copiedCode ? (
                      <>
                        <CheckIcon className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="w-4 h-4 text-cyan-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="glass rounded-xl p-6 overflow-x-auto border border-purple-500/20">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {output.code || '// No code generated'}
                  </pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setOutput(null)
                    setIdea('')
                    setGenerationStep('')
                  }}
                  className="flex-1 py-4 px-6 glass rounded-2xl text-white font-semibold hover:bg-white/10 transition-all duration-300 border border-gray-500/30 hover:border-cyan-500/50"
                >
                  Generate Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-400 text-sm animate-fade-in-up">
          <p className="flex items-center justify-center gap-2">
            <SparklesIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
            Powered by AI • Made with IBM Bob
            <SparklesIcon className="w-4 h-4 text-purple-400 animate-pulse" />
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneratorDemo

// Made with Bob
