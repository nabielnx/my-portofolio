import { SiReact, SiTypescript, SiLaravel, SiMysql, SiUnity, SiTailwindcss, SiBootstrap, SiFigma } from 'react-icons/si'


export const NAV_ITEMS = ['hero', 'about', 'projects', 'skills', 'contact'] as const

export const HERO_TEXT = {
  greeting: "I'm ",
  title: "Just a Student",
  name: "Muhammad Zaiimun Nabil",
  description: "A Computer Science student (Semester 4) passionate about game development, software engineering, and modern web technologies. I love building practical, scalable, and impactful digital products.",
  actions: {
    primary: "VIEW WORK",
    secondary: "LET'S CONNECT"
  }
}

export const SKILLS_DATA = [
  { name: 'React Ecosystem', icon: SiReact },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'Unity Engine', icon: SiUnity },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Figma', icon: SiFigma }
]

export const TECH_STACK_AREAS = ['Frontend', 'Backend', 'Game Dev']

export const JOURNEY_DATA = [
  {
    period: '2024 - Present',
    title: 'Soegijapranata Catholic University',
    role: 'Computer Science Student',
    description: 'Undergraduate student in Computer Science, focusing on Software Engineering and Game Development.'
  },
  {
    period: '2021 - 2024',
    title: 'SMA Negeri 1 Godong',
    role: 'Student',
    description: 'Focusing on STEM or related fields'
  },
]
