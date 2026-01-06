import { SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiAmazonwebservices, SiFigma, SiGithubactions } from 'react-icons/si'
import { FaProjectDiagram } from 'react-icons/fa'

export const NAV_ITEMS = ['hero', 'about', 'projects', 'skills', 'contact'] as const

export const HERO_TEXT = {
  greeting: "I'm ",
  title: "NabielNx",
  name: "Muhammad Zaiimun Nabil",
  description: "A Computer Science student (Semester 4) passionate about game development, software engineering, and modern web technologies. I love building practical, scalable, and impactful digital products.",
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

export const JOURNEY_DATA = [
  {
    period: '2024 - Present',
    title: 'Soegijapranata Catholic University',
    role: 'Computer Science Student',
    description: 'Currently pursuing a Bachelor\'s degree in Computer Science, focusing on Software Engineering and Game Development.'
  },
  {
    period: '2021 - 2024',
    title: 'SMA Negeri 1 Godong',
    role: 'Student',
    description: 'Focusing on STEM or related fields'
  },
]
