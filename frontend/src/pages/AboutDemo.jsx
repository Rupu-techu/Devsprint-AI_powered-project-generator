import React from 'react';
import { SparklesIcon, CodeBracketIcon, CpuChipIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const AboutDemo = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <SparklesIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                About This Project
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              AI-powered project generation made simple and beautiful
            </p>
          </div>

          {/* What It Does */}
          <div className="glass-strong rounded-2xl p-8 border border-cyan-500/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <LightBulbIcon className="w-7 h-7 text-cyan-400" />
              What It Does
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The AI Project Generator transforms your project ideas into complete, production-ready code structures. 
              Simply describe what you want to build, and our intelligent system analyzes your requirements to generate:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Complete project file structures tailored to your needs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Production-ready code with best practices and clean architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Smart detection of project types (AI/ML, E-commerce, Task Management, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Instant code generation with copy-to-clipboard functionality</span>
              </li>
            </ul>
          </div>

          {/* How IBM Bob Was Used */}
          <div className="glass-strong rounded-2xl p-8 border border-purple-500/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CpuChipIcon className="w-7 h-7 text-purple-400" />
              How IBM Bob Was Used
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This entire project was built with the assistance of <span className="text-purple-400 font-semibold">IBM Bob</span>, 
              an AI coding assistant that helped accelerate development and ensure code quality.
            </p>
            
            <div className="space-y-4">
              <div className="glass rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">🎨 UI/UX Design</h3>
                <p className="text-gray-400 text-sm">
                  Bob helped create the stunning neon glassmorphism design, including custom animations, 
                  color schemes, and responsive layouts that work seamlessly across devices.
                </p>
              </div>

              <div className="glass rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">🧠 Smart Logic Implementation</h3>
                <p className="text-gray-400 text-sm">
                  The intelligent keyword detection system and project type classification were developed 
                  with Bob's assistance, ensuring accurate and relevant code generation.
                </p>
              </div>

              <div className="glass rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">⚡ Performance Optimization</h3>
                <p className="text-gray-400 text-sm">
                  Bob helped implement React best practices including useCallback, useMemo, and proper 
                  state management to ensure optimal performance and minimal re-renders.
                </p>
              </div>

              <div className="glass rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">🔧 Backend Development</h3>
                <p className="text-gray-400 text-sm">
                  The Express.js backend with smart response logic and error handling was built efficiently 
                  with Bob's guidance, ensuring robust API functionality.
                </p>
              </div>

              <div className="glass rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">🐛 Debugging & Testing</h3>
                <p className="text-gray-400 text-sm">
                  Bob assisted in identifying and fixing bugs, demonstrating the "break and fix" capability 
                  that showcases real-world development workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="glass-strong rounded-2xl p-8 border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CodeBracketIcon className="w-7 h-7 text-cyan-400" />
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• React 18 with Hooks</li>
                  <li>• React Router for navigation</li>
                  <li>• TailwindCSS for styling</li>
                  <li>• Heroicons for icons</li>
                  <li>• Custom CSS animations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Backend</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Node.js & Express.js</li>
                  <li>• CORS enabled API</li>
                  <li>• Smart keyword detection</li>
                  <li>• RESTful endpoints</li>
                  <li>• Error handling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p className="flex items-center justify-center gap-2">
              <SparklesIcon className="w-4 h-4 text-cyan-400" />
              Built with IBM Bob • Powered by AI
              <SparklesIcon className="w-4 h-4 text-purple-400" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDemo;

// Made with Bob
