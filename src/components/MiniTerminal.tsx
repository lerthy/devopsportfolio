'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalOutput, parseCommand, createOutput } from '@/lib/terminalUtils'
import { commandHandlers, getRecommendationIdFromFileName } from '@/data/terminalCommands'
import { recommendations } from '@/data/recommendationsData'
import { journeyStops } from '@/data/journeyData'
import RecommendationModal from './RecommendationModal'

export default function MiniTerminal() {
  const [outputHistory, setOutputHistory] = useState<TerminalOutput[]>([
    createOutput('Welcome to Lerdi\'s Portfolio Terminal!', 'info'),
    createOutput('Type `help` to see available commands.', 'info'),
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentDirectory, setCurrentDirectory] = useState('~')
  const [isExecuting, setIsExecuting] = useState(false)
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputEndRef = useRef<HTMLDivElement>(null)
  const terminalContainerRef = useRef<HTMLDivElement>(null)
  const terminalState = { currentDirectory }

  // Auto-scroll to bottom when output changes (only within terminal container)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight
    }
  }, [outputHistory])

  // Focus input on mount (only when user clicks/tabs into terminal)
  // Removed auto-focus to prevent page scrolling to terminal on load

  const addOutput = useCallback((outputs: TerminalOutput[]) => {
    setOutputHistory((prev) => [...prev, ...outputs])
  }, [])

  const addCommandToHistory = useCallback((command: string) => {
    if (command.trim()) {
      setCommandHistory((prev) => [...prev, command.trim()])
      setHistoryIndex(-1)
    }
  }, [])

  const handleCommand = useCallback(async (input: string) => {
    if (!input.trim()) return

    const trimmedInput = input.trim()
    addCommandToHistory(trimmedInput)

    // Add command to output
    setOutputHistory((prev) => [
      ...prev,
      createOutput(`lerdi@portfolio:${currentDirectory}$ ${trimmedInput}`, 'normal'),
    ])

    setIsExecuting(true)

    // Small delay for realism
    await new Promise((resolve) => setTimeout(resolve, 50))

    const { command, args, flags } = parseCommand(trimmedInput)
    const terminalState = { currentDirectory }

    try {
      // Handle clear separately
      if (command === 'clear') {
        setOutputHistory([])
        setIsExecuting(false)
        return
      }

      // Handle cd separately to update state
      if (command === 'cd') {
        const dir = args[0] || '~'
        if (dir === '~' || dir === '') {
          setCurrentDirectory('~')
          setIsExecuting(false)
          return
        }

        const validDirs = ['journey', 'projects', 'recommendations']
        if (validDirs.includes(dir)) {
          setCurrentDirectory(dir)
          setIsExecuting(false)
          return
        }

        addOutput([createOutput(`cd: ${dir}: No such file or directory`, 'error')])
        setIsExecuting(false)
        return
      }

      // Handle open letter command
      if (command === 'open' && args[0] === 'letter') {
        const fileName = args[1]
        if (fileName) {
          const recId = getRecommendationIdFromFileName(fileName)
          if (recId) {
            setSelectedRecommendation(recId)
            addOutput([createOutput(`Opening ${fileName}...`, 'info')])
            setIsExecuting(false)
            return
          }
        }
        addOutput([createOutput(`open letter: ${fileName || 'missing filename'}: No such file`, 'error')])
        setIsExecuting(false)
        return
      }

      // Handle deploy command with confetti and link opening
      if (command === 'deploy') {
        const handler = commandHandlers.deploy
        if (handler) {
          const projectName = args[0]?.toLowerCase()
          const projectsStop = journeyStops.find((stop) => stop.id === 'projects')
          const project = projectsStop?.content.projects?.find(
            (p) => p.title.toLowerCase() === projectName
          )

          const outputs = await handler(args, flags, terminalState)
          
          // Add outputs with delay for animation
          for (let i = 0; i < outputs.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            addOutput([outputs[i]])
          }

          // Trigger confetti and open link after success message
          setTimeout(async () => {
            const confetti = (await import('canvas-confetti')).default
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })

            // Open project link if available
            if (project) {
              const url = project.url || project.githubUrl
              if (url) {
                setTimeout(() => {
                  window.open(url, '_blank', 'noopener,noreferrer')
                }, 500)
              }
            }
          }, 100)
        }
        setIsExecuting(false)
        return
      }

      // Handle other commands
      const handler = commandHandlers[command]
      if (handler) {
        const outputs = await handler(args, flags, terminalState)
        
        // Add typing delay for longer outputs
        if (outputs.length > 3) {
          for (const output of outputs) {
            await new Promise((resolve) => setTimeout(resolve, 30))
            addOutput([output])
          }
        } else {
          addOutput(outputs)
        }
      } else {
        addOutput([createOutput(`command not found: ${command}`, 'error')])
      }
    } catch (error) {
      addOutput([createOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')])
    } finally {
      setIsExecuting(false)
    }
  }, [currentDirectory, addOutput, addCommandToHistory])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!currentInput.trim() || isExecuting) return

      const input = currentInput
      setCurrentInput('')
      await handleCommand(input)
      
      // Keep focus on input
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    },
    [currentInput, isExecuting, handleCommand]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex >= 0) {
          const newIndex = historyIndex + 1
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1)
            setCurrentInput('')
          } else {
            setHistoryIndex(newIndex)
            setCurrentInput(commandHistory[newIndex])
          }
        }
      }
    },
    [commandHistory, historyIndex]
  )

  const getOutputColor = (type: TerminalOutput['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400'
      case 'info':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      case 'warning':
        return 'text-orange-400'
      default:
        return 'text-gray-100'
    }
  }

  const commandSuggestions = [
    'help',
    'whoami',
    'ls',
    'cat summary.txt',
    'cd journey',
    'ls projects',
    'deploy appointly',
    'aws iam list-roles',
  ]

  const recommendation = selectedRecommendation
    ? recommendations.find((r) => r.id === selectedRecommendation) || null
    : null

  return (
    <>
      <section className="relative py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Mini Terminal
            </h2>
            <p className="text-xl text-slate-300">
              Explore my profile through commands
            </p>
          </motion.div>

          {/* Terminal Container */}
          <motion.div
            className="bg-black rounded-lg shadow-2xl border border-slate-700 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Terminal Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-slate-400 font-mono">Terminal</div>
              <button
                onClick={() => handleCommand('clear')}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-700 transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalContainerRef} 
              className="p-4 h-[500px] md:h-[600px] overflow-y-auto font-mono text-sm cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Output History */}
              <div className="space-y-1">
                <AnimatePresence>
                  {outputHistory.map((output) => (
                    <motion.div
                      key={output.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={getOutputColor(output.type)}
                    >
                      {typeof output.content === 'string' ? (
                        <pre className="whitespace-pre-wrap break-words">{output.content}</pre>
                      ) : (
                        output.content
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={outputEndRef} />
              </div>

              {/* Command Input */}
              <form onSubmit={handleSubmit} className="mt-2 flex items-center" onKeyDown={(e) => e.stopPropagation()}>
                <span className="text-green-400 mr-2">{`lerdi@portfolio:${currentDirectory}$`}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isExecuting}
                  className="flex-1 bg-transparent text-gray-100 outline-none focus:outline-none caret-green-400"
                  autoComplete="off"
                  spellCheck="false"
                  onFocus={(e) => e.stopPropagation()}
                  onClick={() => inputRef.current?.focus()}
                />
                {!isExecuting && (
                  <motion.span
                    className="w-2 h-5 bg-green-400 ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
              </form>
            </div>

            {/* Mobile Command Suggestions */}
            <div className="md:hidden bg-slate-800 px-4 py-3 border-t border-slate-700">
              <div className="text-xs text-slate-400 mb-2">Quick commands:</div>
              <div className="flex flex-wrap gap-2">
                {commandSuggestions.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setCurrentInput(cmd)
                      inputRef.current?.focus()
                    }}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendation Modal */}
      <RecommendationModal
        recommendation={recommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </>
  )
}

