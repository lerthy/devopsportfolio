'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Tagline */}
          <motion.p
            className="text-slate-600 dark:text-slate-400 text-center md:text-left italic"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            "Building reliable systems, one step at a time."
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href="https://github.com/lerthy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/lerdi-salihi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </motion.a>
            <motion.a
              href="mailto:lerdi890@gmail.com"
              className="p-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-8 text-center text-sm text-slate-500 dark:text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          © {new Date().getFullYear()} Lerdi Salihi. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

