'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Cloud } from 'lucide-react'

interface AWSConsoleModalProps {
  onClose: () => void
}

export default function AWSConsoleModal({ onClose }: AWSConsoleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    // Focus trap: focus close button when modal opens
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aws-console-title"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* AWS Console Modal */}
        <motion.div
          ref={modalRef}
          className="relative bg-[#232F3E] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden z-10 border border-slate-600/50"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* AWS Orange Status Bar */}
          <div className="h-1 bg-gradient-to-r from-[#FF9900] via-[#FF8800] to-[#FF9900]" />

          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-[#1a2332] to-[#232F3E] border-b border-slate-700/50 p-6 flex items-center justify-between z-10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF9900]/20 rounded-lg">
                <Cloud className="w-6 h-6 text-[#FF9900]" />
              </div>
              <div>
                <h2
                  id="aws-console-title"
                  className="text-2xl font-bold text-white"
                >
                  AWS Management Console
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Request Management
                </p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:ring-offset-2 focus:ring-offset-[#232F3E]"
              aria-label="Close AWS console"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Active Requests Section */}
            <motion.div
              className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Active Requests
                </h3>
                <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-semibold">
                  1 Active
                </div>
              </div>

              {/* Request Card */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-slate-300">
                        Request Status: Active
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">
                      Request ID: <span className="text-[#FF9900]">Lerdi-Request-123</span>
                    </p>
                    <p className="text-sm text-slate-400">
                      Created: {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions Section */}
            <motion.div
              className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Actions
              </h3>
              <motion.button
                onClick={onClose}
                className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#232F3E]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-5 h-5" />
                Terminate Request
              </motion.button>
            </motion.div>

            {/* Info Section */}
            <motion.div
              className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-blue-300">
                <span className="font-semibold">Note:</span> This is a simulated AWS console interface. 
                Your actual contact requests are processed securely through the contact form.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

