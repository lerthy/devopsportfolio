'use client'

import { motion } from 'framer-motion'
import { MapPin, Download, Github, Linkedin, ArrowDown } from 'lucide-react'

export default function Hero() {
  const scrollToTimeline = () => {
    const timeline = document.getElementById('journey-timeline')
    timeline?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Map-style background pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 800"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated pins */}
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <MapPin className="w-8 h-8 text-red-500 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/3"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <MapPin className="w-6 h-6 text-blue-500 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/4"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <MapPin className="w-7 h-7 text-green-500 opacity-60" />
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Lerdi Salihi
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Computer Science Student · DevOps Apprentice · Builder
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToTimeline}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDown className="w-5 h-5" />
              Start the Journey
            </motion.button>
            <motion.a
              href="/Lerdi_final_CV.pdf"
              download
              className="px-8 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download PDF CV
            </motion.a>
            <motion.a
              href="https://github.com/lerthy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/lerdi-salihi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </section>
    </>
  )
}

