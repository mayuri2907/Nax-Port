export interface Milestone {
  id: string;
  year: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  type: 'Flagship' | 'Innovation' | 'Architecture' | 'Ecosystem';
}

export const JOURNEY_MILESTONES: Milestone[] = [
  {
    id: 'm-ai-skillpath',
    year: '2025',
    phase: 'Phase 04',
    title: 'Adaptive AI & Dynamic Graph Architectures',
    subtitle: 'Building AI SkillPath Platform',
    description: 'Engineered an adaptive learning ecosystem using Gemini API LLM pipelines to generate personalized learning graphs, automated skill assessments, and dynamic technical roadmaps in real time.',
    tags: ['Gemini API', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
    type: 'Flagship'
  },
  {
    id: 'm-nexussync',
    year: '2024',
    phase: 'Phase 03',
    title: 'Distributed Systems & Conflict Resolution',
    subtitle: 'Developing NexusSync CRDT Engine',
    description: 'Pioneered low-latency document synchronization utilizing Conflict-Free Replicated Data Types (CRDTs), vector clocks, and WebSocket event buses for zero-lock concurrent collaboration.',
    tags: ['Distributed Systems', 'CRDTs', 'WebSockets', 'Redis', 'TypeScript'],
    type: 'Architecture'
  },
  {
    id: 'm-pocketexpense',
    year: '2024',
    phase: 'Phase 02',
    title: 'Native Android & On-Device Intelligence',
    subtitle: 'Architecting PocketExpense Application',
    description: 'Engineered a privacy-centric Android finance application with Kotlin and Jetpack Compose, featuring an on-device heuristic engine to parse banking transactional alerts with zero cloud dependency.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Material 3', 'Android'],
    type: 'Innovation'
  },
  {
    id: 'm-jarvis-assistant',
    year: '2023 - 2024',
    phase: 'Phase 01',
    title: 'Autonomous System Agents & Voice Automation',
    subtitle: 'Crafting the Jarvis Desktop Assistant',
    description: 'Designed an autonomous personal desktop assistant combining speech recognition pipelines, OS automation hooks, and LLM reasoning to automate developer tasks and screen analysis.',
    tags: ['Python', 'LangChain', 'FastAPI', 'Automation', 'Voice AI'],
    type: 'Ecosystem'
  }
];
