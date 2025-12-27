'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { journeyStops } from '@/data/journeyData'
import JourneyStop from './JourneyStop'
import StopCard from './StopCard'
import { JourneyStop as JourneyStopType } from '@/data/journeyData'

export default function JourneyTimeline() {
  const [selectedStop, setSelectedStop] = useState<JourneyStopType | null>(
    null
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Calculate progress for pipeline animation
  const pipelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      id="journey-timeline"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 bg-[#232F3E] dark:bg-[#1a1f2e]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            My Journey Pipeline
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Building my career, one stage at a time
          </p>
        </motion.div>

        {/* Pipeline Container */}
        <div className="relative py-12">
          {/* Desktop: Horizontal Scrollable Pipeline */}
          <div className="hidden lg:block overflow-x-auto pb-8 -mx-4 px-4">
            <div className="relative min-w-max px-4">
              {/* Pipeline Line - Desktop */}
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-700 dark:bg-slate-600 transform -translate-y-1/2">
                {/* Animated progress line */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#FF9900] origin-left"
                  style={{
                    width: useTransform(
                      pipelineProgress,
                      [0, 100],
                      ['0%', '100%']
                    ),
                  }}
                />
              </div>

              {/* Pipeline Stages */}
              <div className="flex items-center gap-8 relative">
                {journeyStops.map((stop, index) => {
                  const isCompleted = index < journeyStops.length - 1
                  const isLast = index === journeyStops.length - 1

                  return (
                    <div key={stop.id} className="flex items-center gap-8">
                      {/* Stage Box */}
                      <JourneyStop
                        stop={stop}
                        isActive={selectedStop?.id === stop.id}
                        onClick={() => setSelectedStop(stop)}
                        index={index}
                        isCompleted={isCompleted}
                      />

                      {/* Connector Arrow (not for last item) */}
                      {!isLast && (
                        <motion.div
                          className="w-8 h-0.5 bg-slate-600 relative flex-shrink-0"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-slate-600 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Pipeline */}
          <div className="lg:hidden">
            {/* Pipeline Line - Mobile Vertical */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 dark:bg-slate-600 transform -translate-x-1/2">
              {/* Animated progress line */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#FF9900] origin-top"
                style={{
                  height: useTransform(
                    pipelineProgress,
                    [0, 100],
                    ['0%', '100%']
                  ),
                }}
              />
            </div>

            {/* Pipeline Stages */}
            <div className="flex flex-col items-center gap-6 relative">
              {journeyStops.map((stop, index) => {
                const isCompleted = index < journeyStops.length - 1
                const isLast = index === journeyStops.length - 1

                return (
                  <div key={stop.id} className="flex flex-col items-center gap-4">
                    {/* Stage Box */}
                    <JourneyStop
                      stop={stop}
                      isActive={selectedStop?.id === stop.id}
                      onClick={() => setSelectedStop(stop)}
                      index={index}
                      isCompleted={isCompleted}
                    />

                    {/* Connector Arrow (not for last item) */}
                    {!isLast && (
                      <motion.div
                        className="h-8 w-0.5 bg-slate-600 relative"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-slate-600 border-l-4 border-l-transparent border-r-4 border-r-transparent" />
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stop Card Modal */}
      <StopCard stop={selectedStop} onClose={() => setSelectedStop(null)} />
    </section>
  )
}

