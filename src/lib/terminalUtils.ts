export type OutputType = 'normal' | 'success' | 'info' | 'error' | 'warning'

export interface TerminalOutput {
  type: OutputType
  content: string | React.ReactNode
  id: string
}

export function createOutput(
  content: string | React.ReactNode,
  type: OutputType = 'normal'
): TerminalOutput {
  return {
    type,
    content,
    id: `${Date.now()}-${Math.random()}`,
  }
}

export function parseCommand(input: string): {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
} {
  const parts = input.trim().split(/\s+/)
  const command = parts[0] || ''
  const args: string[] = []
  const flags: Record<string, string | boolean> = {}

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    if (part.startsWith('--')) {
      const flagName = part.slice(2)
      // Check if next part is a value (not a flag)
      if (i + 1 < parts.length && !parts[i + 1].startsWith('-')) {
        flags[flagName] = parts[i + 1]
        i++ // Skip the value
      } else {
        flags[flagName] = true
      }
    } else if (part.startsWith('-')) {
      flags[part.slice(1)] = true
    } else {
      args.push(part)
    }
  }

  return { command, args, flags }
}

export function formatLogMessage(level: 'INFO' | 'SUCCESS' | 'ERROR', message: string): string {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, -1)
  return `[${timestamp}] [${level}] ${message}`
}

