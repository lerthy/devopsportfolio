export interface Project {
  title: string
  description: string
  technologies: string[]
  challenges?: string[]
  url?: string
  githubUrl?: string
}

// Import for potential future use
export type { RecommendationLetter } from './recommendationsData'

export interface JourneyStop {
  id: string
  title: string
  location: string
  date?: string
  icon: string
  position: number // 0-100 percentage along timeline
  content: {
    description: string
    technologies?: string[]
    keyTakeaway?: string
    projects?: Project[]
    topics?: string[]
  }
}

export const journeyStops: JourneyStop[] = [
  {
    id: "prishtina",
    title: "University of Prishtina FSHMN | Computer Science",
    location: "Prishtina",
    date: "2021 - Present",
    icon: "graduation-cap",
    position: 10,
    content: {
      description: "Foundations",
      technologies: ["Java", "Database", "SQL", "Object-Oriented Programming", "Programming Fundamentals"],
      keyTakeaway: "This is where I learned how computers really work",
    },
  },
  {
    id: "netherlands",
    title: "Hanze University | Exchange Program",
    location: "Netherlands",
    date: "2023",
    icon: "globe",
    position: 30,
    content: {
      description: "Exchange Program",
      topics: [
        "Technology & society",
        "Futures Literacy",
        "Scenario building",
        "CRISPR",
        "Emerging tech",
        "Design-based problem solving",
      ],
      keyTakeaway: "I learned to think long-term, globally, and beyond code",
    },
  },
  {
    id: "projects",
    title: "Academic & Personal Projects",
    location: "Projects",
    date: "2022 - Present",
    icon: "code",
    position: 50,
    content: {
      description: "Projects Phase",
      projects: [
        {
          title: "Appointly",
          description: "Appointment booking platform with UX focus",
          technologies: ["React", "Node.js", "Supabase  "],
          challenges: ["User experience design", "Real-time scheduling"],
          url: "https://appointly-ks.com/",
        },
        {
          title: "TeamDashboardWeb",
          description: "DevOps-style dashboard with CI/CD integration",
          technologies: ["Grafana", "Uptime Kuma", "Terraform", "Docker", "AWS CICD"],
          challenges: ["CI/CD pipeline setup", "Monitoring integration"],
          githubUrl: "https://github.com/lerthy/TeamDashboard",
        },
        {
          title: "KosovARi",
          description: "An augmented reality platform that highlights social and civic issues in Kosovo, allowing users to interact with digital content overlaid on real-world locations.",
          technologies: ["React", "Node.js", "Supabase", "AR Foundation", "Adobe Aero"],
          challenges: ["AR object placement and tracking", "Cross-platform performance optimization", "User interaction design"],
          url: "https://kosovar.netlify.app/",
        },
      ],
    },
  },
  {
    id: "devops",
    title: "DevOps Apprentice",
    location: "DevOps", 
    date: "2024 - Present",
    icon: "server",
    position: 70,
    content: {
      description: "DevOps Apprenticeship",
      technologies: [
        "Linux",
        "AWS",
        "Pipelines",
        "ECS Fargate",
        "Grafana",
        "Uptime Kuma",
      ],
      keyTakeaway: "From writing code → to running systems",
    },
  },
  {
    id: "startup",
    title: "Startup & Side Projects | Bytefull & Friends",
    location: "DevOps/Dev",
    date: "2024 - Present",
    icon: "rocket",
    position: 85,
    content: {
      description: "Startup & Side Projects",
      technologies: ["Full Stack", "E-commerce", "Team Collaboration"],
      keyTakeaway:
        "Small team, fast iteration, ownership of full stack. Skills: decision making, shipping code, problem solving",
    },
  },
  {
    id: "next",
    title: "Where I'm Going",
    location: "Future",
    date: "2025+",
    icon: "compass",
    position: 100,
    content: {
      description: "Next Destination",
      keyTakeaway:
        "Looking for Junior DevOps / Software Engineer roles. Focus on reliability, automation, clean systems",
    },
  },
]

