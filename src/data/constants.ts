import { SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiAmazonwebservices, SiFigma, SiGithubactions } from 'react-icons/si'
import { FaProjectDiagram } from 'react-icons/fa'

export const NAV_ITEMS = ['hero', 'about', 'projects', 'skills', 'contact'] as const

export const HERO_TEXT = {
  greeting: "I'm",
  title: "Game Developer",
  name: "Muhammad Zaiimun Nabil",
  description: "A full-stack developer crafting high-performance, minimalist digital experiences with precision and care.",
  actions: {
    primary: "VIEW WORK",
    secondary: "LET'S CONNECT"
  }
}

export const SKILLS_DATA = [
  { name: 'React Ecosystem', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Cloud Architecture', icon: SiAmazonwebservices },
  { name: 'Figma', icon: SiFigma },
  { name: 'CI/CD Pipeline', icon: SiGithubactions },
  { name: 'System Design', icon: FaProjectDiagram }
]

export const TECH_STACK_AREAS = ['Frontend', 'Backend', 'DevOps']
