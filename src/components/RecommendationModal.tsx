'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Download, FileText, Quote } from 'lucide-react'
import { RecommendationLetter } from '@/data/recommendationsData'

interface RecommendationModalProps {
  recommendation: RecommendationLetter | null
  onClose: () => void
}

// Helper function to bold important phrases in the text
function formatTextWithBold(text: string, paragraphIndex: number): React.ReactNode[] {
  // Important phrases to bold (order matters - longer phrases first)
  const importantPhrases = [
    { pattern: /second place/gi, className: "font-bold text-white" },
    { pattern: /more than 50 international teams/gi, className: "font-bold text-white" },
    { pattern: /Amazon University Engagement Program/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /Minor Future of Technology and Society/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /Hanze University/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /full-stack web application/gi, className: "font-bold text-white" },
    { pattern: /AI\/LLM scheduling assistant/gi, className: "font-bold text-white" },
    { pattern: /augmented reality applications/gi, className: "font-bold text-white" },
    { pattern: /Pokémon Go/gi, className: "font-bold text-white" },
    { pattern: /talented, enthusiastic and creative/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /\bteam player\b/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /creative ideas/gi, className: "font-bold text-white" },
    { pattern: /\bleadership\b/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /technical vision/gi, className: "font-bold text-white" },
    { pattern: /\bperseverance\b/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /\bresiliency\b/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /outside his comfort zone/gi, className: "font-bold text-white" },
    { pattern: /result driven creative thinking/gi, className: "font-bold text-white" },
    { pattern: /valuable asset/gi, className: "font-bold text-white" },
    { pattern: /professional recommendation/gi, className: "font-bold text-white" },
    { pattern: /capable and responsive leader/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /successful project/gi, className: "font-bold text-white" },
    { pattern: /futures thinking/gi, className: "font-bold text-white" },
    { pattern: /original, novel ideas/gi, className: "font-bold text-white" },
    { pattern: /sense-making and futures literacy/gi, className: "font-bold text-white" },
    { pattern: /questioning existing assumptions/gi, className: "font-bold text-white" },
    { pattern: /solid, self-disciplined/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /high eagerness to learn/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /excellent analytical and communication skills/gi, className: "font-bold text-[#FF9900]" },
    { pattern: /pleasure to work with/gi, className: "font-bold text-white" },
  ]

  let parts: React.ReactNode[] = [text]
  let keyCounter = 0
  
  importantPhrases.forEach(({ pattern, className }) => {
    const newParts: React.ReactNode[] = []
    
    parts.forEach((part) => {
      if (typeof part === 'string') {
        const regex = new RegExp(pattern.source, pattern.flags)
        const matches = Array.from(part.matchAll(regex))
        
        if (matches.length === 0) {
          newParts.push(part)
        } else {
          let lastIndex = 0
          matches.forEach((match) => {
            if (match.index !== undefined) {
              // Add text before match
              if (match.index > lastIndex) {
                newParts.push(part.substring(lastIndex, match.index))
              }
              // Add bolded match
              newParts.push(
                <strong key={`bold-${paragraphIndex}-${keyCounter++}`} className={className}>
                  {match[0]}
                </strong>
              )
              lastIndex = match.index + match[0].length
            }
          })
          // Add remaining text
          if (lastIndex < part.length) {
            newParts.push(part.substring(lastIndex))
          }
        }
      } else {
        newParts.push(part)
      }
    })
    
    parts = newParts
  })
  
  return parts
}

export default function RecommendationModal({
  recommendation,
  onClose,
}: RecommendationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // ESC key handler
  useEffect(() => {
    if (!recommendation) return

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
  }, [recommendation, onClose])

  // Prevent body scroll when modal is open (but allow modal content to scroll)
  useEffect(() => {
    if (recommendation) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [recommendation])

  if (!recommendation) return null

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
        aria-labelledby="recommendation-modal-title"
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Card - AWS Style */}
        <motion.div
          ref={modalRef}
          className="relative bg-[#232F3E] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] md:max-h-[90vh] h-[90vh] md:h-auto overflow-hidden z-10 border border-slate-600/50 flex flex-col"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Status Bar at Top */}
          <div className="h-1 bg-gradient-to-r from-[#FF9900] via-[#FF8800] to-[#FF9900]" />

          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-[#1a2332] to-[#232F3E] border-b border-slate-700/50 p-6 flex items-start justify-between z-10 backdrop-blur-sm">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#FF9900]/20 rounded-lg">
                  <FileText className="w-5 h-5 text-[#FF9900]" />
                </div>
                <div className="px-3 py-1 bg-[#FF9900]/20 border border-[#FF9900]/30 rounded text-xs text-[#FF9900] font-semibold uppercase tracking-wide">
                  Recommendation Letter
                </div>
              </div>
              <h2
                id="recommendation-modal-title"
                className="text-3xl font-bold text-white mb-2 leading-tight"
              >
                {recommendation.recommenderName}
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-300 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-700/50 rounded">
                    <User className="w-3.5 h-3.5 text-[#FF9900]" />
                  </div>
                  <span className="font-medium">{recommendation.recommenderTitle}</span>
                </div>
                {recommendation.date && (
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-700/50 rounded">
                      <Calendar className="w-3.5 h-3.5 text-[#FF9900]" />
                    </div>
                    <span>{recommendation.date}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-all hover:scale-110 active:scale-95 ml-4 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:ring-offset-2 focus:ring-offset-[#232F3E]"
              aria-label="Close recommendation modal"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1 overscroll-contain -webkit-overflow-scrolling-touch">
            <div className="p-4 md:p-8 space-y-6 pb-8">
              {/* Letter Body */}
              <motion.div
                className="relative bg-gradient-to-br from-slate-800/70 to-slate-800/50 rounded-xl p-8 border border-slate-700/50 shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Decorative quote icon */}
                <div className="absolute top-4 left-4 opacity-10">
                  <Quote className="w-16 h-16 text-[#FF9900]" />
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-slate-100 leading-7 text-base font-light tracking-wide">
                      {recommendation.body.split('\n').map((paragraph, index) => {
                        // Don't render empty paragraphs
                        if (!paragraph.trim()) {
                          return <br key={index} className="my-2" />
                        }
                        return (
                          <p key={index} className="mb-4 last:mb-0">
                            {formatTextWithBold(paragraph, index)}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Download Button */}
              {recommendation.pdfUrl && (
                <motion.div
                  className="flex justify-end pt-4 border-t border-slate-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href={recommendation.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF9900] to-[#FF8800] hover:from-[#FF8800] hover:to-[#FF7700] text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:shadow-[#FF9900]/20 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:ring-offset-2 focus:ring-offset-[#232F3E] cursor-pointer"
                    aria-label="Download recommendation letter as PDF"
                    onClick={(e) => {
                      e.stopPropagation()
                      // The download attribute will handle the download
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

