export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'devtools' | 'systems';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'fullstack' | 'frontend' | 'devtools' | 'systems';
  description: string;
  problem: string;
  solution: string;
  architecture: string[];
  metrics: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  year: string;
  codeSnippet: string;
  asciiFlow?: string;
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'devops';
  level: 'Expert' | 'Advanced' | 'Proficient';
  years: number;
  highlight: string;
  popularProjects?: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  accomplishments: string[];
  technologies: string[];
}

export type ThemeMode = 'dark' | 'light';
