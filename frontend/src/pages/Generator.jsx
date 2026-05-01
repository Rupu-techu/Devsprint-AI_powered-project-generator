import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ClipboardDocumentIcon,
  CheckIcon,
  SparklesIcon,
  CodeBracketIcon,
  FolderIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

const Generator = () => {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [generationStep, setGenerationStep] = useState('')
  const [output, setOutput] = useState(null)
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)
  
  const navigate = useNavigate()

  // AI Magic steps for demo effect
  const aiSteps = useMemo(() => [
    { message: '🧠 Analyzing your idea...', duration: 1000 },
    { message: '🏗️ Generating project structure...', duration: 1500 },
    { message: '💻 Writing code files...', duration: 1800 },
    { message: '🎨 Applying best practices...', duration: 1200 },
    { message: '✨ Finalizing your project...', duration: 800 }
  ], [])

  // Simulate AI generation with step-by-step feedback
  const simulateAIGeneration = useCallback(async () => {
    for (const step of aiSteps) {
      setGenerationStep(step.message)
      await new Promise(resolve => setTimeout(resolve, step.duration))
    }
  }, [aiSteps])

  // Generate project function with backend connection
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
      // Run AI magic effect
      await simulateAIGeneration()

      // Send request to backend
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

  // Copy code to clipboard
  const copyToClipboard = useCallback(async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="w-12 h-12 text-primary-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            AI Project Generator
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Describe your project idea and watch AI create a complete project structure with code in seconds
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Input Section */}
          <div className="p-8">
            <form onSubmit={generateProject} className="space-y-6">
              <div>
                <label htmlFor="idea" className="block text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CodeBracketIcon className="w-5 h-5 text-primary-500" />
                  Your Project Idea
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
                  className="w-full px-6 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none text-lg"
                  placeholder="Example: Create a task management app with user authentication, real-time updates, and a dashboard showing task statistics..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  💡 Tip: Be specific! Mention features, technologies, or functionality you want.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl text-red-400 animate-shake">
                  <p className="font-medium">⚠️ {error}</p>
                </div>
              )}

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="w-full py-4 px-8 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
              >
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
            <div className="px-8 pb-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-primary-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                  <p className="text-primary-400 font-semibold text-lg animate-pulse">
                    {generationStep}
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full animate-progress" />
                </div>
              </div>
            </div>
          )}

          {/* Output Display */}
          {output && !loading && (
            <div className="px-8 pb-8 space-y-6 animate-fade-in">
              {/* Success Message */}
              <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-4">
                <p className="text-green-400 font-semibold flex items-center gap-2">
                  <CheckIcon className="w-5 h-5" />
                  {generationStep}
                </p>
              </div>

              {/* Project Name */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <SparklesIcon className="w-6 h-6 text-primary-500" />
                  {output.projectName}
                </h2>
                <p className="text-gray-400">{output.description || 'AI-generated project structure'}</p>
              </div>

              {/* File Structure */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FolderIcon className="w-5 h-5 text-secondary-500" />
                  Project Structure
                </h3>
                <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
                  {output.structure && output.structure.length > 0 ? (
                    <ul className="space-y-1">
                      {output.structure.map((file, index) => (
                        <li key={index} className="text-gray-300 hover:text-white transition-colors">
                          <span className="text-primary-500">├──</span> {file}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No structure available</p>
                  )}
                </div>
              </div>

              {/* Generated Code */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CodeBracketIcon className="w-5 h-5 text-primary-500" />
                    Generated Code
                  </h3>
                  <button
                    onClick={() => copyToClipboard(output.code || '')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    {copiedCode ? (
                      <>
                        <CheckIcon className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-950 rounded-lg p-6 overflow-x-auto">
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
                  className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Generate Another
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>✨ Powered by AI • Made with IBM Bob</p>
        </div>
      </div>
    </div>
  )
}

export default Generator

// Made with Bob
