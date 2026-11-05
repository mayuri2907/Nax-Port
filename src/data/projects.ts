export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Full-Stack' | 'Distributed Systems' | 'Android & Mobile' | 'AI & Automation';
  year: string;
  description: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  badge: string;
  accent: string;
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-skillpath',
    title: 'AI SkillPath',
    subtitle: 'Adaptive Career Roadmap & Skill Optimization Engine',
    category: 'AI & Full-Stack',
    year: '2025',
    description: 'An AI-powered skill development platform that evaluates technical competencies, detects industry knowledge gaps, and dynamically synthesizes personalized step-by-step career roadmaps.',
    challenge: 'Aspiring engineers often struggle with disorganized learning resources, vague roadmaps, and difficulty measuring tangible mastery against real industry expectations.',
    solution: 'Engineered an intelligent curriculum generator utilizing LLM prompt pipelines, dynamic skill trees, and interactive evaluation modules to assess real progress and adapt dynamically.',
    keyFeatures: [
      'Interactive visual skill graph with prerequisite dependency trees',
      'Dynamic LLM curriculum synthesis tailored to individual target roles',
      'Automated competency quiz generator with real-time feedback loops',
      'Milestone tracking with exportable progress reports and portfolio builders'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Gemini API', 'Tailwind CSS', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/Nax46/ai-skillpath',
    badge: 'Flagship AI Project',
    accent: '#F47B35',
    metrics: [
      { label: 'Skill Graph Nodes', value: '150+' },
      { label: 'Roadmap Generation', value: '< 2.4s' },
      { label: 'Evaluation Accuracy', value: '94%' }
    ]
  },
  {
    id: 'nexussync',
    title: 'NexusSync',
    subtitle: 'Conflict-Aware Distributed Collaboration Engine',
    category: 'Distributed Systems',
    year: '2024',
    description: 'High-throughput, real-time synchronization engine engineered for multi-user collaborative editors, featuring conflict-free replicated data types (CRDTs) and optimistic state merging.',
    challenge: 'Concurrent multi-client state mutation under high latency or intermittent disconnection frequently leads to race conditions, dropped edits, and severe document corruption.',
    solution: 'Developed a robust distributed event bus using WebSockets, vector clocks, and local CRDT operation buffers that reconcile divergent client trees seamlessly without server locks.',
    keyFeatures: [
      'Lock-free concurrent document editing with CRDT-backed text buffers',
      'Vector clock causality tracking for deterministic order resolution',
      'Sub-50ms sync latency over WebSockets with automatic retry backoff',
      'Offline-first offline storage queue with seamless background re-sync'
    ],
    techStack: ['TypeScript', 'Node.js', 'WebSockets', 'Redis', 'CRDTs', 'Docker'],
    githubUrl: 'https://github.com/Nax46/NexusSync',
    badge: 'Distributed Systems',
    accent: '#171717',
    metrics: [
      { label: 'Sync Latency', value: '< 45ms' },
      { label: 'Concurrent Peers', value: '1,000+' },
      { label: 'Data Loss Rate', value: '0.00%' }
    ]
  },
  {
    id: 'pocketexpense',
    title: 'PocketExpense',
    subtitle: 'Smart Android Expense Intelligence with Auto-Detection',
    category: 'Android & Mobile',
    year: '2024',
    description: 'A privacy-first Android financial utility that automatically parses incoming banking SMS notifications to catalog transactions, track categorized budgets, and forecast expenses.',
    challenge: 'Manual financial logging suffers from extreme user fatigue, while cloud-scraping budgeting apps expose sensitive banking credentials and personal financial data.',
    solution: 'Built a 100% on-device Android application leveraging regex-based heuristic SMS parsers, Jetpack Room SQLite encryption, and Material 3 design to deliver zero-cloud financial intelligence.',
    keyFeatures: [
      'Zero-cloud local SMS pattern analyzer supporting top banking formats',
      'Category classification engine with custom recurring bill reminders',
      'Dynamic analytics dashboard with interactive spending heatmaps',
      'Biometric authentication and SQLCipher database encryption'
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Coroutines', 'Material 3', 'Android SDK'],
    githubUrl: 'https://github.com/Nax46/PocketExpense',
    badge: 'Native Android',
    accent: '#2DA44E',
    metrics: [
      { label: 'SMS Parse Rate', value: '98.6%' },
      { label: 'Cloud Leakage', value: '0 bytes' },
      { label: 'App Startup Time', value: '380ms' }
    ]
  },
  {
    id: 'jarvis-ai-assistant',
    title: 'Jarvis AI Assistant',
    subtitle: 'Multimodal Desktop Automation & Context-Aware Assistant',
    category: 'AI & Automation',
    year: '2024',
    description: 'Personal AI assistant system combining voice recognition, system automation hooks, and large language models to automate complex workflows and manage desktop environments.',
    challenge: 'Conventional voice assistants are restricted to walled-garden commands and cannot parse visual screen states or execute custom developer CLI workflows.',
    solution: 'Architected a modular Python daemon linking speech-to-text, LLM function calling, and OS-level API integrations to execute multi-step bash commands and screen queries.',
    keyFeatures: [
      'Real-time voice query pipeline with local hotword detection',
      'Autonomous system task execution via secured function calling',
      'Multimodal screen inspection and context-driven troubleshooting',
      'Custom webhook triggers for IoT and developer workflow scripts'
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Gemini API', 'SpeechRecognition', 'PyAutoGUI'],
    githubUrl: 'https://github.com/Nax46/Jarvis-AI-Assistant',
    badge: 'AI Automation',
    accent: '#F5D77E',
    metrics: [
      { label: 'Voice Response', value: '750ms' },
      { label: 'Automation Tasks', value: '40+' },
      { label: 'Accuracy', value: '96%' }
    ]
  }
];
