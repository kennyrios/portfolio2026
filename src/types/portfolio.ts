export interface RealProject {
  id: string;
  title: string;
  category: 'Web Development' | 'Product & UI/UX' | 'Branding & Packaging' | 'Interactive Apps';
  client: string;
  location: string;
  year: string;
  role: string;
  summary: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  figmaUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  accentColor?: string;
}

export interface TechnicalCapabilityRow {
  domain: string;
  focus: string;
  toolkit: {
    text: string;
    isPrimary: boolean;
  }[];
}

export type PlainBrushColorKey = 'sunlight' | 'peach' | 'mint' | 'lavender' | 'sand';
