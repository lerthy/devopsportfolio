import { TerminalOutput, createOutput, formatLogMessage } from '@/lib/terminalUtils'
import { recommendations } from './recommendationsData'
import { journeyStops } from './journeyData'

export type CommandHandler = (
  args: string[],
  flags: Record<string, string | boolean>,
  state: TerminalState
) => TerminalOutput[] | Promise<TerminalOutput[]>

export interface TerminalState {
  currentDirectory: string
}

const recommendationMap: Record<string, string> = {
  'devops-mentor.txt': 'recommendation-1',
  'professor-hanze.txt': 'recommendation-2',
  'senior-lecturer-hanze.txt': 'recommendation-3',
}

export const commandHandlers: Record<string, CommandHandler> = {
  whoami: () => [
    createOutput('Lerdi Salihi', 'normal'),
    createOutput('Computer Science Student | DevOps Apprentice | Builder', 'normal'),
    createOutput('Location: Prishtina / Remote', 'normal'),
  ],

  help: () => [
    createOutput('Available commands:', 'info'),
    createOutput('', 'normal'),
    createOutput('  whoami          - Display profile information', 'normal'),
    createOutput('  ls [path]       - List directories and files', 'normal'),
    createOutput('  cat [file]      - Display file contents', 'normal'),
    createOutput('  cd [directory]  - Change directory', 'normal'),
    createOutput('  projects        - Show projects', 'normal'),
    createOutput('  journey         - Explore journey timeline', 'normal'),
    createOutput('  aws             - AWS CLI commands', 'normal'),
    createOutput('  recommendations - View recommendations', 'normal'),
    createOutput('  clear           - Clear terminal', 'normal'),
    createOutput('  help            - Show this help message', 'normal'),
  ],

  clear: () => [],

  pwd: (_, __, state) => [createOutput(state.currentDirectory || '~', 'normal')],

  ls: (args, flags, state) => {
    const path = args[0] || state.currentDirectory || ''

    if (path === 'skills' || (!path && !state.currentDirectory)) {
      return [
        createOutput('bash   linux   docker   java   git', 'normal'),
        createOutput('ci-cd  grafana  uptimekuma', 'normal'),
      ]
    }

    if (path === 'projects' || state.currentDirectory === 'projects') {
      return [createOutput('appointly  teamdashboardweb  kosovari', 'normal')]
    }

    if (path === 'journey' || state.currentDirectory === 'journey') {
      return [createOutput('prishtina  netherlands  projects  devops  startup', 'normal')]
    }

    if (path === 'recommendations' || state.currentDirectory === 'recommendations') {
      return [
        createOutput('devops-mentor.txt', 'normal'),
        createOutput('professor-hanze.txt', 'normal'),
        createOutput('senior-lecturer-hanze.txt', 'normal'),
      ]
    }

    return [createOutput(`ls: cannot access '${path}': No such file or directory`, 'error')]
  },

  cat: async (args, flags, state) => {
    if (args.length === 0) {
      return [createOutput('cat: missing file operand', 'error')]
    }

    const filePath = args[0]
    const parts = filePath.split('/')
    const fileName = parts[parts.length - 1]

    if (fileName === 'summary.txt') {
      return [
        createOutput(
          'I build reliable systems, automate workflows,',
          'normal'
        ),
        createOutput('and turn ideas into production-ready solutions.', 'normal'),
      ]
    }

    if (filePath === 'journey/devops.log' || (state.currentDirectory === 'journey' && fileName === 'devops.log')) {
      return [
        createOutput(formatLogMessage('INFO', 'Setting up Linux VMs'), 'info'),
        createOutput(formatLogMessage('INFO', 'Securing file transfers'), 'info'),
        createOutput(formatLogMessage('INFO', 'Configuring system services'), 'info'),
        createOutput(formatLogMessage('SUCCESS', 'Production mindset acquired'), 'success'),
      ]
    }

    // Handle recommendation files
    if (fileName.endsWith('.txt') && (filePath.startsWith('recommendations/') || state.currentDirectory === 'recommendations')) {
      const recId = recommendationMap[fileName]
      if (recId) {
        const recommendation = recommendations.find((r) => r.id === recId)
        if (recommendation) {
          return [
            createOutput('', 'normal'),
            createOutput(`"${recommendation.snippet}..."`, 'info'),
            createOutput('', 'normal'),
            createOutput('Type `open letter ' + fileName + '` to view full recommendation', 'info'),
          ]
        }
      }
      return [createOutput(`cat: ${fileName}: No such file or directory`, 'error')]
    }

    return [createOutput(`cat: ${filePath}: No such file or directory`, 'error')]
  },

  cd: (args, flags, state) => {
    const dir = args[0] || '~'
    
    if (dir === '~' || dir === '') {
      return [] // Directory change handled in component state
    }

    const validDirs = ['journey', 'projects', 'recommendations']
    if (validDirs.includes(dir)) {
      return [] // Directory change handled in component state
    }

    return [createOutput(`cd: ${dir}: No such file or directory`, 'error')]
  },

  projects: () => {
    const projectsStop = journeyStops.find((stop) => stop.id === 'projects')
    if (!projectsStop?.content.projects) {
      return [createOutput('No projects found', 'error')]
    }

    const outputs: TerminalOutput[] = []
    projectsStop.content.projects.forEach((project) => {
      outputs.push(createOutput(`\n${project.title}`, 'success'))
      outputs.push(createOutput(`  ${project.description}`, 'normal'))
      if (project.technologies) {
        outputs.push(createOutput(`  Tech: ${project.technologies.join(', ')}`, 'info'))
      }
    })

    return outputs
  },

  journey: () => {
    const outputs: TerminalOutput[] = [
      createOutput('Navigate my journey timeline:', 'info'),
      createOutput('', 'normal'),
    ]

    journeyStops.forEach((stop) => {
      outputs.push(createOutput(`${stop.location.padEnd(15)} - ${stop.title}`, 'normal'))
    })

    return outputs
  },

  deploy: async (args) => {
    const projectName = args[0]?.toLowerCase()
    const projectsStop = journeyStops.find((stop) => stop.id === 'projects')
    const project = projectsStop?.content.projects?.find(
      (p) => p.title.toLowerCase() === projectName
    )

    if (!project) {
      return [createOutput(`deploy: unknown project '${args[0]}'`, 'error')]
    }

    const projectTitle = project.title
    return [
      createOutput('[INFO] Running pipeline...', 'info'),
      createOutput('[INFO] Tests passed', 'info'),
      createOutput('[INFO] Deploying to production', 'info'),
      createOutput(`[SUCCESS] ${projectTitle} deployed`, 'success'),
    ]
  },

  aws: (args) => {
    if (args[0] === 'iam' && args[1] === 'list-roles') {
      return [
        createOutput('Lerdi-DevOps', 'normal'),
        createOutput('Lerdi-Automation', 'normal'),
        createOutput('Lerdi-Builder', 'normal'),
      ]
    }

    if (args[0] === 'iam' && args[1] === 'create-role') {
      const nameFlag = args.find((arg) => arg.startsWith('--name='))
      const name = nameFlag ? nameFlag.split('=')[1] : args[args.indexOf('--name') + 1]

      if (name === 'hire-lerdi') {
        return [
          createOutput('[SUCCESS] Role created', 'success'),
          createOutput('Attached policies:', 'info'),
          createOutput('  - Reliability', 'normal'),
          createOutput('  - Ownership', 'normal'),
          createOutput('  - Continuous Learning', 'normal'),
        ]
      }
    }

    return [createOutput('AWS CLI - Use: aws iam list-roles | aws iam create-role --name <name>', 'info')]
  },

  recommendations: () => {
    return [
      createOutput('Available recommendation letters:', 'info'),
      createOutput('', 'normal'),
      createOutput('  devops-mentor.txt          - Wren Priest, Software Engineer II, Amazon', 'normal'),
      createOutput('  professor-hanze.txt        - Floris Maathuis, Coordinator, Hanze University', 'normal'),
      createOutput('  senior-lecturer-hanze.txt  - Nick Lumatalale, Senior Lecturer, Hanze University', 'normal'),
      createOutput('', 'normal'),
      createOutput('Use: cat recommendations/<filename> to preview', 'info'),
    ]
  },


  sudo: (args) => {
    if (args[0] === 'hire' && args[1] === 'lerdi') {
      return [
        createOutput('Permission granted.', 'success'),
        createOutput('Welcome aboard 🚀', 'success'),
      ]
    }

    return [createOutput('sudo: incorrect password', 'error')]
  },

  rm: (args) => {
    if (args.includes('-rf') && args.includes('/')) {
      return [
        createOutput('Nice try 😄', 'warning'),
        createOutput('This system is read-only.', 'warning'),
      ]
    }

    return [createOutput('rm: missing operand', 'error')]
  },
}

export function getRecommendationIdFromFileName(fileName: string): string | null {
  return recommendationMap[fileName] || null
}

