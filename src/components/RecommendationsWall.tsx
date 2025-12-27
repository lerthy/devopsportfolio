'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, User, Calendar } from 'lucide-react'
import { recommendations, RecommendationLetter } from '@/data/recommendationsData'
import RecommendationModal from './RecommendationModal'

export default function RecommendationsWall() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationLetter | null>(
    null
  )

  return (
    <section
      id="recommendations-wall"
      className="relative min-h-screen py-20 px-4 bg-[#232F3E] dark:bg-[#1a1f2e]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            What Others Say About Me
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Recommendations and testimonials from colleagues, professors, and mentors
          </p>
        </motion.div>

        {/* Recommendations Grid */}
        {recommendations.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Recommendations will appear here</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group cursor-pointer"
              >
                <motion.button
                  className="w-full h-full text-left p-6 bg-[#2d3a4b] dark:bg-[#1e2835] rounded-lg border-2 border-slate-600 hover:border-[#FF9900] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#FF9900]/10 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:ring-offset-2 focus:ring-offset-[#232F3E]"
                  onClick={() => setSelectedRecommendation(recommendation)}
                  aria-label={`View recommendation from ${recommendation.recommenderName}`}
                >
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="p-3 bg-[#FF9900]/20 rounded-lg">
                      <FileText className="w-6 h-6 text-[#FF9900]" />
                    </div>
                    {recommendation.date && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>{recommendation.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Recommender Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <h3 className="text-white font-bold text-lg group-hover:text-[#FF9900] transition-colors">
                        {recommendation.recommenderName}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm">{recommendation.recommenderTitle}</p>
                  </div>

                  {/* Snippet */}
                  <div className="relative">
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                      {recommendation.snippet}
                    </p>
                    <div className="absolute bottom-0 right-0 w-1/2 h-6 bg-gradient-to-r from-transparent to-[#2d3a4b] dark:to-[#1e2835] pointer-events-none" />
                  </div>

                  {/* Read More Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-[#FF9900] text-sm font-medium">
                    <span>Read full letter</span>
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendation Modal */}
      <RecommendationModal
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </section>
  )
}

