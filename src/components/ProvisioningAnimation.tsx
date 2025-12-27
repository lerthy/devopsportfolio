'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Server, CheckCircle, X } from 'lucide-react'

interface ProvisioningAnimationProps {
  onComplete: () => void
}

interface LogMessage {
  id: number
  type: 'info' | 'success'
  message: string
  timestamp: number
}

export default function ProvisioningAnimation({ onComplete }: ProvisioningAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [logMessages, setLogMessages] = useState<LogMessage[]>([])
  const [activeServers, setActiveServers] = useState<number[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [requestId] = useState(() => `Lerdi-Request-${Math.floor(Math.random() * 1000)}`)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Log messages sequence
    const logSequence = [
      { delay: 500, type: 'info' as const, message: 'Validating request...' },
      { delay: 1000, type: 'info' as const, message: 'Creating IAM role...' },
      { delay: 1500, type: 'info' as const, message: 'Attaching policies...' },
      { delay: 2000, type: 'info' as const, message: 'Deploying resources...' },
      { delay: 2500, type: 'success' as const, message: 'Deployment complete!' },
    ]

    logSequence.forEach(({ delay, type, message }) => {
      setTimeout(() => {
        setLogMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            type,
            message,
            timestamp: Date.now(),
          },
        ])
      }, delay)
    })

    // Server activation sequence
    const serverSequence = [0, 1, 2, 3]
    serverSequence.forEach((serverIndex, index) => {
      setTimeout(() => {
        setActiveServers((prev) => [...prev, serverIndex])
      }, 800 + index * 400)
    })

    // Show success message
    setTimeout(() => {
      setShowSuccess(true)
    }, 3000)

    // Complete after showing success
    setTimeout(() => {
      onComplete()
    }, 5000)

    return () => {
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onComplete}
        role="dialog"
        aria-modal="true"
        aria-labelledby="provisioning-title"
      >
        <motion.div
          className="bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-slate-700"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3
              id="provisioning-title"
              className="text-2xl font-bold text-white flex items-center gap-3"
            >
              <Cloud className="w-6 h-6 text-blue-400" />
              Creating resources...
            </h3>
            <button
              onClick={onComplete}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close provisioning animation"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Progress</span>
              <span className="text-sm font-bold text-blue-400">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Server Icons */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: activeServers.includes(index) ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`p-4 rounded-lg ${
                    activeServers.includes(index)
                      ? 'bg-blue-500/20 border-2 border-blue-500'
                      : 'bg-slate-800 border-2 border-slate-700'
                  } transition-all`}
                >
                  <Server
                    className={`w-8 h-8 ${
                      activeServers.includes(index)
                        ? 'text-blue-400'
                        : 'text-slate-600'
                    } transition-colors`}
                  />
                </div>
                {activeServers.includes(index) && (
                  <motion.div
                    className="mt-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Terminal Log */}
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm mb-6 max-h-48 overflow-y-auto">
            <div className="space-y-1">
              <AnimatePresence>
                {logMessages.map((log) => (
                  <motion.div
                    key={log.id}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-slate-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span
                      className={
                        log.type === 'success'
                          ? 'text-green-400 font-semibold'
                          : 'text-blue-400'
                      }
                    >
                      [{log.type.toUpperCase()}]
                    </span>
                    <span className="text-slate-300">{log.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-semibold">
                    IAM Role '{requestId}' successfully provisioned!
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Your request has been received and will be processed soon.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

