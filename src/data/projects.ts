export interface Project {
  title: string
  category: string
  shortDescription: string
  longDescription: string
  tags: string[]
  color: string
  image: string
  demoUrl?: string
  externalLink?: string
  externalLinkText?: string
  screenshots: string[]
  features: string[]
  stats?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    title: 'PakMan Motor',
    category: 'Web Ecommerce',
    shortDescription: 'A comprehensive ecommerce platform for motorcycle spare parts.',
    longDescription: 'PakMan Motor is a full-featured ecommerce solution designed for motorcycle spare parts retail. It offers a seamless shopping experience with product categorization, wishlist functionality, and secure checkout. The platform includes a powerful Admin Dashboard and a built-in Point of Sale (POS) system (Cashier) to streamline inventory management and offline sales.',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    color: 'from-teal-500/20 to-cyan-500/20',
    image: '/images/Projects/PakMan_Motor/profile.png',
    externalLink: 'https://pakmanmotor.shop/',
    externalLinkText: 'Visit Website',
    features: [
      'Comprehensive Admin Dashboard',
      'Integrated POS System',
      'Wishlist & Shopping Cart',
      'Product Categorization'
    ],
    screenshots: [
      '/images/Projects/PakMan_Motor/first.png',
      '/images/Projects/PakMan_Motor/login.png',
      '/images/Projects/PakMan_Motor/product.png',
      '/images/Projects/PakMan_Motor/category.png',
      '/images/Projects/PakMan_Motor/wishlist.png',
      '/images/Projects/PakMan_Motor/checkout.png',
      '/images/Projects/PakMan_Motor/admin.png',
      '/images/Projects/PakMan_Motor/POS.png',
    ]
  },
  {
    title: 'Hook Life',
    category: 'Game Development',
    shortDescription: 'An exciting game project available on Itch.io.',
    longDescription: 'This is a placeholder for your game description. Replace this text with details about your game, its mechanics, and the experience you created.',
    tags: ['Unity', 'C#', 'Game Design'],
    color: 'from-purple-500/20 to-pink-500/20',
    image: '/images/Projects/Hook_Life/profil.png',
    externalLink: 'https://zaiimunnabil1.itch.io/hook-life',
    externalLinkText: 'Play on Itch.io',
    features: [
      'Engaging Gameplay Loop',
      'Original Soundtrack',
      'Unique Art Style',
      'Challenging Levels'
    ],
    screenshots: [
      '/images/Projects/Hook_Life/first.png',
      '/images/Projects/Hook_Life/sec.png',
      '/images/Projects/Hook_Life/third.png'
    ],
    stats: [
      { label: 'Rating', value: '5.0' },
      { label: 'Downloads', value: '7' }
    ]
  },
  {
    title: 'Nalar',
    category: 'Deep Learning',
    shortDescription: 'On Progress',
    longDescription: 'Flux AI leverages advanced transformer models to provide real-time content moderation and sentiment analysis. The platform exposes a low-latency API capable of processing thousands of requests per second, making it ideal for social media platforms and large-scale communities.',
    tags: ['TypeScript', 'Grok API'],
    color: 'from-red-500/20 to-orange-500/20',
    image: 'https://placehold.co/1920x1080/312e81/4338ca?text=Nalar',
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
      { label: 'Accuracy', value: '0%' },
      { label: 'Req/Sec', value: '0' }
    ]
  },
  {
    title: 'Project Alpha',
    category: 'Future Concept',
    shortDescription: 'Experimental interface design for next-gen inputs.',
    longDescription: 'Project Alpha is a conceptual playground for exploring new user interaction models, including gesture-based controls and neural interface mockups. It serves as a testbed for bleeding-edge UI patterns.',
    tags: ['Prototype', 'WebGL', 'Three.js'],
    color: 'from-amber-500/20 to-yellow-500/20',
    image: 'https://placehold.co/1920x1080/1e293b/475569?text=Project+Alpha',
    features: [
      'Neural Interface Mockup',
      'Gesture Recognition',
      '3D Data Visualization',
      'Holographic UI Elements'
    ],
    screenshots: [
      'https://placehold.co/1920x1080/1e293b/475569?text=Interface+Demo',
      'https://placehold.co/1920x1080/334155/64748b?text=Settings+Panel'
    ],
    stats: [
      { label: 'Progress', value: '45%' },
      { label: 'Concept', value: 'v0.1' }
    ]
  }
]
