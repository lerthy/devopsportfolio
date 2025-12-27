'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Globe,
  Code,
  Server,
  Rocket,
  Compass,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react'
import { JourneyStop as JourneyStopType } from '@/data/journeyData'

interface JourneyStopProps {
  stop: JourneyStopType
  isActive: boolean
  onClick: () => void
  index: number
  isCompleted: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'graduation-cap': GraduationCap,
  globe: Globe,
  code: Code,
  server: Server,
  rocket: Rocket,
  compass: Compass,
}

const stageStatus = (index: number, total: number, isCompleted: boolean) => {
  // Last stage (Stage 6) is always pending
  if (index === total - 1) return 'pending'
  // All completed stages are succeeded
  if (isCompleted) return 'succeeded'
  // This shouldn't happen with current logic, but keep as fallback
  return 'in-progress'
}

export default function JourneyStop({
  stop,
  isActive,
  onClick,
  index,
  isCompleted,
}: JourneyStopProps) {
  const IconComponent = iconMap[stop.icon] || Circle
  const status = stageStatus(index, 6, isCompleted)

  const statusColors = {
    succeeded: 'bg-green-600 border-green-500',
    'in-progress': 'bg-[#FF9900] border-[#FF9900]',
    pending: 'bg-slate-600 border-slate-500',
  }

  const statusIcons = {
    succeeded: CheckCircle2,
    'in-progress': Clock,
    pending: Circle,
  }

  const StatusIcon = statusIcons[status]

  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* AWS Pipeline Stage Box */}
      <div
        className={`relative w-64 lg:w-72 bg-[#2d3a4b] dark:bg-[#1e2835] rounded-lg border-2 ${
          isActive
            ? 'border-[#FF9900] shadow-2xl shadow-[#FF9900]/20'
            : 'border-slate-600 hover:border-slate-500'
        } transition-all duration-300 overflow-hidden`}
      >
        {/* Status Indicator Bar */}
        <div
          className={`h-1 ${statusColors[status]} ${isActive ? 'h-2' : ''} transition-all`}
        />

        {/* Stage Content */}
        <div className="p-5">
          {/* Stage Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded ${
                  status === 'succeeded'
                    ? 'bg-green-600/20 text-green-400'
                    : status === 'in-progress'
                      ? 'bg-[#FF9900]/20 text-[#FF9900]'
                      : 'bg-slate-600/20 text-slate-400'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">
                  Stage {index + 1}
                </div>
                <div className="text-xs text-slate-500">{stop.date}</div>
              </div>
            </div>
            <StatusIcon
              className={`w-5 h-5 ${
                status === 'succeeded'
                  ? 'text-green-400'
                  : status === 'in-progress'
                    ? 'text-[#FF9900]'
                    : 'text-slate-500'
              }`}
            />
          </div>

          {/* Stage Title */}
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {stop.location}
          </h3>

          {/* Stage Description */}
          <p className="text-slate-300 text-sm line-clamp-2 mb-4">
            {stop.title}
          </p>

          {/* Stage Actions/Technologies Preview */}
          {stop.content.technologies && stop.content.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {stop.content.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
              {stop.content.technologies.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded">
                  +{stop.content.technologies.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Click Indicator */}
          <div className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <span>Click to view details</span>
            <span className="text-[#FF9900]">→</span>
          </div>
        </div>

        {/* Hover Glow Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-[#FF9900]/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>
    </motion.div>
  )
}

