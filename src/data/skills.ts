export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming' | 'AI & Integration' | 'Mobile' | 'Tools';
  level: string; // e.g. "Primary", "Advanced", "Proficient"
  description: string;
  icon?: string;
  color?: string;
  isFavorite?: boolean;
}

export const SKILL_CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Programming',
  'AI & Integration',
  'Mobile',
  'Tools'
] as const;

export const SKILLS: SkillItem[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 'Primary', description: 'Component architecture, custom hooks, state management', color: '#61DAFB', isFavorite: true },
  { name: 'TypeScript', category: 'Frontend', level: 'Primary', description: 'Type-safe interfaces, generics, scalable codebase contracts', color: '#3178C6', isFavorite: true },
  { name: 'JavaScript', category: 'Frontend', level: 'Primary', description: 'ESNext, async/await, DOM APIs, event loop performance', color: '#F7DF1E' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Primary', description: 'Utility-first layout, custom design tokens, responsive typography', color: '#38BDF8', isFavorite: true },
  { name: 'HTML & CSS', category: 'Frontend', level: 'Primary', description: 'Semantic structure, CSS Grid, Flexbox, accessible markup', color: '#E34F26' },

  // Backend
  { name: 'Node.js', category: 'Backend', level: 'Primary', description: 'Event-driven server runtimes, stream processing, performance', color: '#5FA04E', isFavorite: true },
  { name: 'Express.js', category: 'Backend', level: 'Primary', description: 'RESTful architecture, custom middleware, route pipeline', color: '#171717' },
  { name: 'REST APIs', category: 'Backend', level: 'Primary', description: 'Clean endpoint contracts, status conventions, caching strategies', color: '#F47B35' },

  // Database
  { name: 'MongoDB', category: 'Database', level: 'Proficient', description: 'Document schemas, aggregation pipelines, indexing', color: '#47A248' },
  { name: 'Mongoose', category: 'Database', level: 'Proficient', description: 'Data modeling, schema validation, middleware hooks', color: '#880000' },
  { name: 'SQL', category: 'Database', level: 'Proficient', description: 'Relational query design, normalization, ACID transactions', color: '#00758F' },

  // Programming
  { name: 'Python', category: 'Programming', level: 'Primary', description: 'AI workflows, automation scripting, FastAPI, data handling', color: '#3776AB', isFavorite: true },
  { name: 'Kotlin', category: 'Programming', level: 'Primary', description: 'Modern expressive Android language, coroutines, null-safety', color: '#7F52FF', isFavorite: true },
  { name: 'Java', category: 'Programming', level: 'Proficient', description: 'Object-oriented patterns, data structures, concurrency', color: '#007396' },

  // AI & Integration
  { name: 'Gemini API', category: 'AI & Integration', level: 'Primary', description: 'Multimodal prompt orchestration, function calling, agents', color: '#8E75FF', isFavorite: true },
  { name: 'AI Integration', category: 'AI & Integration', level: 'Primary', description: 'LLM pipelines, context injection, semantic processing', color: '#F47B35', isFavorite: true },
  { name: 'Intelligent Automation', category: 'AI & Integration', level: 'Proficient', description: 'Task pipelines, automated triage, system hooks', color: '#2DA44E' },

  // Mobile
  { name: 'Android Development', category: 'Mobile', level: 'Primary', description: 'Native app lifecycle, modern architecture guidelines', color: '#3DDC84', isFavorite: true },
  { name: 'Jetpack Compose', category: 'Mobile', level: 'Primary', description: 'Declarative UI, state hoisting, Material 3 theming', color: '#4285F4', isFavorite: true },

  // Tools
  { name: 'Git', category: 'Tools', level: 'Primary', description: 'Version control, atomic commits, branch workflows', color: '#F05032' },
  { name: 'GitHub', category: 'Tools', level: 'Primary', description: 'Repository management, actions, CI/CD, collaborative reviews', color: '#171717' },
  { name: 'VS Code', category: 'Tools', level: 'Primary', description: 'Custom debugging pipelines, extension ecosystem', color: '#007ACC' },
  { name: 'Android Studio', category: 'Tools', level: 'Primary', description: 'Layout inspector, memory profiling, emulator debugging', color: '#3DDC84' }
];

export const PLAYGROUND_STICKERS = [
  { id: 'stk-1', label: 'React 19', color: '#61DAFB', text: '#000000', rotate: -6 },
  { id: 'stk-2', label: 'TypeScript', color: '#3178C6', text: '#ffffff', rotate: 4 },
  { id: 'stk-3', label: 'Gemini AI', color: '#F47B35', text: '#ffffff', rotate: -3 },
  { id: 'stk-4', label: 'Kotlin', color: '#7F52FF', text: '#ffffff', rotate: 8 },
  { id: 'stk-5', label: 'Clean Code ⚡', color: '#F5D77E', text: '#171717', rotate: -10 },
  { id: 'stk-6', label: 'Node.js', color: '#5FA04E', text: '#ffffff', rotate: 5 },
  { id: 'stk-7', label: 'Jetpack Compose', color: '#171717', text: '#ffffff', rotate: -4 },
  { id: 'stk-8', label: 'Keep Building 🚀', color: '#FFFFFF', text: '#171717', rotate: 7 }
];

