'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, CheckCircle2, Code2, BookOpen, ExternalLink, Github } from 'lucide-react'
import { JourneyStop } from '@/data/journeyData'

interface StopCardProps {
  stop: JourneyStop | null
  onClose: () => void
}

export default function StopCard({ stop, onClose }: StopCardProps) {
  if (!stop) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Card - Enhanced AWS Style */}
        <motion.div
          className="relative bg-[#232F3E] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-10 border border-slate-600/50"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Status Bar at Top */}
          <div className="h-1 bg-gradient-to-r from-[#FF9900] via-[#FF8800] to-[#FF9900]" />

          {/* AWS Header Bar */}
          <div className="sticky top-0 bg-gradient-to-b from-[#1a2332] to-[#232F3E] border-b border-slate-700/50 p-6 flex items-start justify-between z-10 backdrop-blur-sm">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-1 bg-[#FF9900]/20 border border-[#FF9900]/30 rounded text-xs text-[#FF9900] font-semibold uppercase tracking-wide">
                  Stage Details
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span>Completed</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                {stop.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{stop.location}</span>
                </div>
                {stop.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{stop.date}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-all hover:scale-110 active:scale-95 ml-4"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6 space-y-6">
              {/* Description Section */}
              <motion.div
                className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 rounded-lg p-5 border border-slate-700/50 shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FF9900]/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#FF9900]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">
                      Overview
                    </h3>
                    <p className="text-slate-200 leading-relaxed">
                      {stop.content.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Technologies */}
              {stop.content.technologies && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-[#FF9900]" />
                    <h3 className="text-base font-semibold text-slate-300 uppercase tracking-wide">
                      Technologies & Tools
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {stop.content.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-br from-[#FF9900]/20 to-[#FF9900]/10 border border-[#FF9900]/40 text-[#FF9900] rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-default"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Topics */}
              {stop.content.topics && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-300 uppercase tracking-wide">
                      Focus Areas
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {stop.content.topics.map((topic, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 bg-slate-700/40 border border-slate-600/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.03 }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Projects */}
              {stop.content.projects && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-green-500/20 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-300 uppercase tracking-wide">
                      Actions & Projects
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {stop.content.projects.map((project, idx) => (
                      <motion.div
                        key={idx}
                        className="group p-5 bg-gradient-to-br from-slate-800/40 to-slate-800/20 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-3 h-3 rounded-full bg-[#FF9900] group-hover:scale-125 transition-transform" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              {(project.url || project.githubUrl) ? (
                                <a
                                  href={project.url || project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-white text-lg hover:text-[#FF9900] transition-colors flex items-center gap-1.5"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {project.title}
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ) : (
                                <h4 className="font-bold text-white text-lg">
                                  {project.title}
                                </h4>
                              )}
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#FF9900]/20 hover:bg-[#FF9900]/30 border border-[#FF9900]/40 rounded text-xs text-[#FF9900] transition-all hover:scale-105"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Visit Site
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/60 hover:bg-slate-700/80 border border-slate-600/50 rounded text-xs text-slate-200 transition-all hover:scale-105"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github className="w-3 h-3" />
                                  GitHub
                                </a>
                              )}
                            </div>
                            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                              {project.description}
                            </p>
                            {project.technologies && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, techIdx) => (
                                  <span
                                    key={techIdx}
                                    className="px-3 py-1 bg-slate-700/60 border border-slate-600/50 text-slate-200 rounded-md text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            {project.challenges && (
                              <div className="mt-4 pt-4 border-t border-slate-700/50">
                                <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-green-400" />
                                  Challenges Solved
                                </p>
                                <ul className="space-y-2">
                                  {project.challenges.map((challenge, chIdx) => (
                                    <li
                                      key={chIdx}
                                      className="text-sm text-slate-300 flex items-start gap-2"
                                    >
                                      <span className="text-green-400 mt-1.5">✓</span>
                                      <span>{challenge}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Key Takeaway */}
              {stop.content.keyTakeaway && (
                <motion.div
                  className="relative p-5 bg-gradient-to-r from-[#FF9900]/10 via-[#FF9900]/5 to-transparent border border-[#FF9900]/30 rounded-lg border-l-4 border-[#FF9900] shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div className="flex-1">
                      <p className="text-slate-200 italic leading-relaxed text-base">
                        "{stop.content.keyTakeaway}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Special CTA for last stop */}
              {stop.id === 'next' && (
                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="mailto:lerdi890@gmail.com"
                    className="block w-full text-center px-6 py-4 bg-gradient-to-r from-[#FF9900] to-[#FF8800] hover:from-[#FF8800] hover:to-[#FF7700] text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Let's build something together
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

