export interface Project {
  title: string
  category: string
  shortDescription: string
  longDescription: string
  tags: string[]
  color: string
  image: string
  demoUrl?: string
  screenshots: string[]
  features: string[]
  stats?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    title: 'Nalar Architecture',
    category: 'Full Stack',
    shortDescription: 'Scalable cloud-native enterprise management system with real-time analytics.',
    longDescription: 'Nalar Architecture is a comprehensive enterprise solution designed to handle high-frequency data processing and real-time analytics. Built with a microservices-first approach, it ensures 99.99% uptime and horizontal scalability. The system integrates seamless data visualization pipelines and robust role-based access control.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    color: 'from-red-500/20 to-teal-500/20',
    image: 'https://placehold.co/1920x1080/1e293b/475569?text=Nalar+Main',
    demoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    features: [
      'Real-time WebSocket data streaming',
      'Customizable dashboard widgets',
      'Automated reporting pipelines',
      'Multi-tenant architecture'
    ],
    screenshots: [
      'https://placehold.co/1920x1080/1e293b/64748b?text=Dashboard+View',
      'https://placehold.co/1920x1080/0f172a/334155?text=Analytics+Panel',
      'https://placehold.co/1920x1080/334155/94a3b8?text=Mobile+Responsive'
    ],
    stats: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Daily Users', value: '50k+' },
      { label: 'Latency', value: '<50ms' }
    ]
  },
  {
    title: 'Zenith UI Kit',
    category: 'Design System',
    shortDescription: 'A professional-grade component library for modern SaaS applications.',
    longDescription: 'Zenith UI is a meticulously crafted component library focused on accessibility and performance. It provides a comprehensive set of React components styled with Tailwind CSS, fully themed and dark-mode ready out of the box. Designed for developers who value aesthetics without compromising on speed.',
    tags: ['Tailwind', 'Next.js', 'Figma'],
    color: 'from-teal-500/20 to-cyan-500/20',
    image: 'https://placehold.co/1920x1080/0f172a/334155?text=Zenith+UI+Kit',
    features: [
      'WCAG 2.1 AA Compliant',
      '30+ Custom Hooks',
      'Automatic Dark Mode',
      'Figma Design File Included'
    ],
    screenshots: [
      'https://placehold.co/1920x1080/064e3b/10b981?text=Component+Gallery',
      'https://placehold.co/1920x1080/065f46/34d399?text=Theming+Engine'
    ]
  },
  {
    title: 'Flux AI',
    category: 'Deep Learning',
    shortDescription: 'Real-time content analysis platform using transformer models.',
    longDescription: 'Flux AI leverages advanced transformer models to provide real-time content moderation and sentiment analysis. The platform exposes a low-latency API capable of processing thousands of requests per second, making it ideal for social media platforms and large-scale communities.',
    tags: ['Python', 'TensorFlow', 'Azure'],
    color: 'from-red-500/20 to-orange-500/20',
    image: 'https://placehold.co/1920x1080/312e81/4338ca?text=Flux+AI+Core',
    demoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    features: [
      'BERT-based Sentiment Analysis',
      'Image Recognition Pipeline',
      'Auto-scaling Inference Nodes',
      'GraphQL API'
    ],
    screenshots: [
      'https://placehold.co/1920x1080/4c1d95/a78bfa?text=Inference+Visualizer',
      'https://placehold.co/1920x1080/5b21b6/c4b5fd?text=API+Playground'
    ],
    stats: [
      { label: 'Accuracy', value: '98.5%' },
      { label: 'Req/Sec', value: '2500' }
    ]
  }
]
