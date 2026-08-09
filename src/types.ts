export type PageTab = 'home' | 'about' | 'programs' | 'showcase' | 'faq' | 'contact';

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  studentGrade: string;
  category: 'Animation' | 'Games' | 'Music' | 'Videos' | 'Coding';
  thumbnailUrl?: string;
  badgeColor: string;
  tools: string[];
  description: string;
  fullContent?: {
    promptUsed?: string;
    storyline?: string;
    audioTrackSample?: string;
    keyFeatures?: string[];
    teacherNotes?: string;
  };
  featured?: boolean;
}

export interface Program {
  id: string;
  title: string;
  status: string;
  subtitle: string;
  description: string;
  duration: string;
  schedule: string;
  targetAudience: string;
  highlights: string[];
  iconName: string;
  badge: string;
  gradient: string;
  signupUrl?: string;
  signupText?: string;
  showQrCode?: boolean;
}

export interface CurriculumStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  detailedOutcome: string;
  toolsUsed: string[];
  sampleProject: string;
  iconName: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Beginner AI Guides' | 'Recommended AI Tools' | 'Internet Safety' | 'Responsible AI' | 'Creative Inspiration' | 'Student Tutorials';
  summary: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'All Ages';
  format: 'Article' | 'Cheatsheet' | 'Video Guide' | 'Interactive';
  contentSnippet: string;
  linkText: string;
  downloadable?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Enrollment' | 'Tech Requirements' | 'Safety & Ethics';
}

export interface Testimonial {
  id: string;
  quote: string;
  parentName: string;
  studentDetail: string;
  avatarBg: string;
  rating: number;
}

export interface ContactFormData {
  parentName: string;
  studentName: string;
  email: string;
  programInterest: string;
  message: string;
}
