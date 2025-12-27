'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Cloud } from 'lucide-react'

interface SocialNode {
  id: string
  icon: React.ReactNode
  label: string
  url: string
  status: string
  x: number
  y: number
}

const socialNodes: SocialNode[] = [
  {
    id: 'github',
    icon: <Github className="w-6 h-6" />,
    label: 'GitHub',
    url: 'https://github.com/lerthy',
    status: 'Profile active',
    x: 20,
    y: 30,
  },
  {
    id: 'linkedin',
    icon: <Linkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lerdi-salihi',
    status: 'Open for messages',
    x: 80,
    y: 30,
  },
  {
    id: 'email',
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    url: 'mailto:lerdi890@gmail.com',
    status: 'Always available',
    x: 50,
    y: 70,
  },
]

export default function CloudNetwork() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Calculate connection lines between nodes
  const connections = [
    { from: socialNodes[0], to: socialNodes[1] }, // GitHub to LinkedIn
    { from: socialNodes[0], to: socialNodes[2] }, // GitHub to Email
    { from: socialNodes[1], to: socialNodes[2] }, // LinkedIn to Email
  ]

  return (
    <div className="relative w-full h-64">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Animated connection lines */}
        {connections.map((conn, index) => (
          <motion.line
            key={`${conn.from.id}-${conn.to.id}`}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-400/30 dark:text-blue-500/30"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Social Nodes */}
      <div className="relative w-full h-full">
        {socialNodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.a
              href={node.url}
              target={node.id === 'email' ? undefined : '_blank'}
              rel={node.id === 'email' ? undefined : 'noopener noreferrer'}
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full shadow-lg hover:shadow-xl transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={node.label}
            >
              {/* Cloud background effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/20"
                animate={{
                  scale: hoveredNode === node.id ? [1, 1.3, 1] : 1,
                  opacity: hoveredNode === node.id ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredNode === node.id ? Infinity : 0,
                }}
              />
              <div className="relative z-10 text-white">
                {node.icon}
              </div>

              {/* Tooltip */}
              {hoveredNode === node.id && (
                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-20"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-semibold">{node.label}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">
                    {node.status}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                </motion.div>
              )}
            </motion.a>
          </motion.div>
        ))}

        {/* Central Cloud Icon (decorative) */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Cloud className="w-24 h-24 text-blue-400" />
        </motion.div>
      </div>
    </div>
  )
}

