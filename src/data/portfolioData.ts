import { RealProject } from '../types/portfolio';

export const REAL_PROJECTS: RealProject[] = [
  {
    id: 'avenue-living',
    title: 'Avenue Living Asset Management',
    category: 'Web Development',
    client: 'Avenue Living',
    location: 'Calgary, Canada',
    year: '2023 — Present',
    role: 'Lead Web Designer & Developer',
    summary: 'Redesign and architecture of the corporate homepage and investor platforms with interactive maps and dynamic visualizations.',
    description: 'Led the comprehensive redesign and implementation of the company’s flagship website and multiple internal portals, improving UX, performance, and visual consistency. Engineered custom interactive maps with Mapbox, dynamic data visualizations, and integrated web workflows supporting investor relations and sales. Collaborated with marketing teams on HubSpot CRM automation and scalable WordPress CMS architecture.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'HTML5', 'CSS3', 'Mapbox', 'HubSpot', 'Figma', 'Adobe XD'],
    imageUrl: 'https://kennyrios.github.io/projects/images/avenue.gif',
    liveUrl: 'https://www.avenuelivingam.com/',
    featured: true,
    metrics: [
      { label: 'Page Load Speed', value: '+55%' },
      { label: 'Investor Inquiries', value: '+38%' },
      { label: 'Properties Mapped', value: '15,000+' },
    ],
    accentColor: '#38bdf8',
  },
  {
    id: 'mini-mall-storage',
    title: 'Mini Mall Storage Properties',
    category: 'Web Development',
    client: 'Mini Mall Storage',
    location: 'Canada & United States',
    year: '2023',
    role: 'Lead UI/UX & Web Developer',
    summary: 'Scalable self-storage web platform with interactive store locators and custom post architectures across North America.',
    description: 'Led the redesign and development of key website components for Mini Mall, an expanding self-storage enterprise operating across dozens of locations in Canada and the United States. Implemented custom post types, dynamic page architectures in WordPress, location-based unit search, and responsive reservation flows optimized for rapid customer conversions.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'Google Maps API', 'HTML5', 'SCSS', 'Figma'],
    imageUrl: 'https://kennyrios.github.io/projects/images/minimall.gif',
    liveUrl: 'https://www.minimallstorage.com/',
    featured: true,
    metrics: [
      { label: 'Locations Covered', value: '60+' },
      { label: 'Mobile Conversion', value: '+42%' },
      { label: 'Search Speed', value: '<200ms' },
    ],
    accentColor: '#fbbf24',
  },
  {
    id: 'madison-properties',
    title: 'Madison Properties Cincinnati',
    category: 'Web Development',
    client: 'Avenue Living / Madison Properties',
    location: 'Cincinnati, USA',
    year: '2022',
    role: 'Frontend Developer & UI Designer',
    summary: 'Custom digital real estate presence with dynamic filtering, rich media showcases, and tailored leasing experiences.',
    description: 'Spearheaded the implementation of a custom-designed web presence for Madison Properties in the United States. Integrated advanced real-time filters, custom property post types, interactive floor plans, and rich media formats to deliver a refined and frictionless residential leasing experience.',
    technologies: ['PHP', 'WordPress', 'JavaScript', 'CSS3', 'Figma', 'Responsive Design'],
    imageUrl: 'https://kennyrios.github.io/projects/images/madison.gif',
    liveUrl: 'https://madisoncincy.com/',
    featured: false,
    metrics: [
      { label: 'Lease Inquiries', value: '+29%' },
      { label: 'Time on Page', value: '3.4 min' },
    ],
    accentColor: '#a78bfa',
  },
  {
    id: 'snowberry-innovations',
    title: 'Snowberry & Able Group',
    category: 'Product & UI/UX',
    client: 'Able Group',
    location: 'Surrey, BC, Canada',
    year: '2022',
    role: 'Lead UX/UI Designer & Researcher',
    summary: 'End-to-end UX/UI research, design systems, and web architecture for a forward-thinking Canadian innovation group.',
    description: 'Spearheaded the entire UX/UI process for Able Group’s digital presence and sub-brands in Surrey, British Columbia. Conducted user research, wireframing, interactive prototyping in Figma from low-fidelity concepts to high-fidelity design systems, and oversaw the engineering and rollout phase.',
    technologies: ['Figma', 'UI/UX Research', 'Design Systems', 'Prototyping', 'HTML5', 'CSS3'],
    imageUrl: 'https://kennyrios.github.io/projects/images/snow/snowberry0.webp',
    liveUrl: 'http://snowberryinnovations.com/',
    featured: true,
    metrics: [
      { label: 'Figma Components', value: '250+' },
      { label: 'Brand Alignment', value: '100%' },
    ],
    accentColor: '#34d399',
  },
  {
    id: 'the-urban-secrets',
    title: 'The Urban Secrets',
    category: 'Web Development',
    client: 'The Urban Secrets',
    location: 'Vancouver, Canada',
    year: '2022',
    role: 'Full-Stack Web Developer & Designer',
    summary: 'Modern e-commerce platform for a Canadian premium skincare and beauty brand built with React and Shopify.',
    description: 'Developed an elegant e-commerce experience for an emerging Canadian beauty brand. Built custom React.js components integrated into a headless Shopify storefront with smooth cart transitions, Google Analytics tracking, and responsive mobile-first typography.',
    technologies: ['React.js', 'Shopify', 'HTML5', 'CSS3', 'Adobe XD', 'Google Analytics'],
    imageUrl: 'https://kennyrios.github.io/projects/images/urban.jpg',
    liveUrl: 'https://theurbansecrets.com/',
    featured: false,
    metrics: [
      { label: 'Mobile Bounce Rate', value: '-34%' },
      { label: 'Checkout Flow', value: '3-Step' },
    ],
    accentColor: '#f43f5e',
  },
  {
    id: 'jobmatch-app',
    title: 'JobMatch Mobile Experience',
    category: 'Product & UI/UX',
    client: 'Personal Product Concept',
    location: 'Canada',
    year: '2022',
    role: 'Product Designer & IA Lead',
    summary: 'Mobile app prototype designed to streamline hiring workflows through rapid candidate-matching heuristics.',
    description: 'Led the ideation, information architecture, and end-to-end UX/UI design for an intuitive mobile application focused on high-velocity hiring and job-seeking. Built comprehensive interactive prototypes in Figma with micro-interactions, swipeable job cards, and salary comparison views.',
    technologies: ['Figma', 'Mobile UI/UX', 'Information Architecture', 'Adobe Illustrator', 'Prototyping'],
    imageUrl: 'https://kennyrios.github.io/projects/images/Jobmatch/job.webp',
    figmaUrl: 'https://www.figma.com/proto/UcjJy7HXP3Rqq6O8Oe9h9f/W22_G7_Jobmatch?page-id=0%3A1&node-id=1%3A3&viewport=1443%2C-975%2C0.95&scaling=scale-down&starting-point-node-id=1%3A3&show-proto-sidebar=1',
    featured: true,
    metrics: [
      { label: 'User Test Success', value: '94%' },
      { label: 'Interactive Screens', value: '48' },
    ],
    accentColor: '#60a5fa',
  },
  {
    id: 'paul-vancouver',
    title: 'PAUL Bakery & Café Vancouver',
    category: 'Web Development',
    client: 'PAUL France / Vancouver',
    location: 'Vancouver, Canada',
    year: '2022 — 2023',
    role: 'Web Designer & Developer',
    summary: 'Digital flagship for the historic French bakery and patisserie established in 1889, for their premier Canadian location.',
    description: 'Entrusted with the digital design and web development for the French bakery and patisserie café chain established in 1889 in France. Crafted a refined digital culinary experience highlighting seasonal menus, catering requests, and Parisian brand heritage for their premier Vancouver flagship.',
    technologies: ['Web Design', 'WordPress', 'JavaScript', 'HTML5', 'CSS3', 'Brand Identity'],
    imageUrl: 'https://kennyrios.github.io/projects/images/paul/paul-001.jpg',
    featured: false,
    metrics: [
      { label: 'Online Inquiries', value: '+45%' },
      { label: 'Brand Heritage', value: 'Est. 1889' },
    ],
    accentColor: '#f59e0b',
  },
  {
    id: 'packaging-branding',
    title: 'Skincare Packaging & Brand Identity',
    category: 'Branding & Packaging',
    client: 'Able Group Canada',
    location: 'Surrey, BC, Canada',
    year: '2021 — 2022',
    role: 'Graphic & Brand Identity Designer',
    summary: 'Curated packaging design collections, visual brand marks, and typography systems for Canadian skincare labels.',
    description: 'Designed distinct packaging and brand identities for Able Group’s skincare and wellness brands. Seamlessly blended tactile print considerations with modern minimalist aesthetic guidelines, delivering distinctive product packaging, dielines, and logo marks.',
    technologies: ['Packaging Design', 'Adobe Illustrator', 'Adobe Photoshop', 'Brand Identity', 'Print Production'],
    imageUrl: 'https://kennyrios.github.io/projects/images/packaging/0.webp',
    featured: false,
    metrics: [
      { label: 'Packaging SKUs', value: '18+' },
      { label: 'Print Accuracy', value: '100%' },
    ],
    accentColor: '#e2e8f0',
  },
  {
    id: 'claro-disney',
    title: 'Claro Colombia & Disney Games',
    category: 'Interactive Apps',
    client: 'Claro Colombia / Disney / Eventos Efectivos',
    location: 'Bogotá, Colombia',
    year: '2021',
    role: 'Frontend & Game Developer',
    summary: 'Interactive web applications and gamified digital experiences for Claro and Disney campaigns.',
    description: 'Engineered promotional web applications and interactive JavaScript games for national digital campaigns co-branded with Claro Colombia and Disney. Included full content administration capabilities, dynamic leaderboards, and high-performance game logic running smoothly across all mobile devices.',
    technologies: ['Vue.js', 'JavaScript', 'HTML5 Canvas', 'CSS3', 'Laravel', 'REST API'],
    imageUrl: 'https://kennyrios.github.io/projects/images/navidad.svg',
    featured: false,
    metrics: [
      { label: 'Campaign Participants', value: '250K+' },
      { label: 'Avg Dwell Time', value: '6.2 min' },
    ],
    accentColor: '#ef4444',
  },
  {
    id: 'insumos-pimatex',
    title: 'Insumos Pimatex Digital Catalog',
    category: 'Web Development',
    client: 'Insumos Pimatex',
    location: 'Colombia',
    year: '2021',
    role: 'Web Designer & Developer',
    summary: 'Web platform and digital product catalog for a national textile and threads importer.',
    description: 'Designed and built a modern digital product catalog for an established textile company that imports and distributes fabrics and threads. Features intuitive categorization, sample request flows, and responsive layouts.',
    technologies: ['Vue.js', 'HTML5', 'CSS3', 'Adobe Photoshop', 'Figma'],
    imageUrl: 'https://kennyrios.github.io/projects/images/hilaza.jpg',
    liveUrl: 'https://hiloshilazas.com',
    featured: false,
    accentColor: '#10b981',
  },
];

export const SKILLS_SERVICES = [
  {
    number: '01',
    title: 'Full-Stack Web Engineering',
    description: 'Engineering resilient, scalable web applications from database schema to responsive frontend. Deep expertise spanning React, Node.js, Python, PHP, modern JavaScript/TypeScript, RESTful APIs, and relational databases.',
    tags: ['React', 'Node.js', 'Python', 'PHP', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'PostgreSQL / MySQL'],
  },
  {
    number: '02',
    title: 'Dynamic CMS & Enterprise Platforms',
    description: 'Architecting high-performance enterprise platforms, custom post architectures, and modular component systems. Proven across large-scale WordPress, Crocoblock/JetEngine, Mapbox geospatial integration, and headless e-commerce.',
    tags: ['WordPress', 'Crocoblock / JetEngine', 'Elementor Pro', 'Custom Post Types', 'Mapbox API', 'Shopify'],
  },
  {
    number: '03',
    title: 'AI-Assisted Workflows & Product Design',
    description: 'Leveraging agentic AI tools (Claude Code, OpenAI Codex, Copilot, Google AI Studio) to accelerate development velocity while maintaining meticulous UI/UX craft, Figma design systems, and WCAG accessibility standards.',
    tags: ['Claude Code', 'OpenAI Codex', 'Copilot', 'Google AI Studio', 'Figma', 'Design Systems', 'WCAG'],
  },
];

export const CV_PDF_URL = '/assets/aistudio/Kenny_Rios_Avila_AI_Full_Stack_Developer_CV_b85c2e16.pdf';

export const KENNY_PROFILE = {
  fullName: 'Kenny Alejandro Rios Avila',
  preferredName: 'Kenny Rios',
  title: 'AI-Enabled Full-Stack Developer | Web Applications & Digital Solutions',
  location: 'Calgary, Alberta, Canada',
  phone: '+1 587 836 9256',
  email: 'kennyrgrafico@gmail.com',
  portfolioUrl: 'https://kennyrios.github.io/portfolio2026/',
  archiveUrl: 'https://kennyrios.github.io/projects/',
  githubUrl: 'https://github.com/kennyrios',
  summary:
    'Full-stack web developer and digital product specialist with 14+ years of experience across web development, UX/UI, CMS platforms, e-commerce, and digital production. Combines hands-on front-end development with practical back-end customization, API/marketing-platform integrations, analytics, and performance optimization. Currently uses generative AI and AI-assisted coding tools including Copilot, Claude Code, Codex, and Google AI Studio to accelerate development and problem-solving. Brings a product-minded approach: translating business needs into usable interfaces, reusable web systems, and measurable digital outcomes. Experienced collaborating across creative, marketing, and technical teams and explaining web technologies to learners and stakeholders.',
};

export const TECHNICAL_CAPABILITIES_MATRIX = [
  {
    domain: 'Full-Stack & Web Development',
    focus: 'Engineering responsive, accessible user interfaces and robust web applications with clean component architecture and DOM manipulation.',
    toolkit: [
      { text: 'React', isPrimary: true },
      { text: 'Node.js', isPrimary: true },
      { text: 'Python', isPrimary: true },
      { text: 'PHP', isPrimary: true },
      { text: 'JavaScript (ES6+)', isPrimary: true },
      { text: 'TypeScript', isPrimary: false },
      { text: 'HTML5', isPrimary: false },
      { text: 'CSS3/SCSS', isPrimary: false },
      { text: 'Tailwind CSS', isPrimary: true },
      { text: 'REST/JSON', isPrimary: false },
    ],
  },
  {
    domain: 'AI-Assisted Development & Integration',
    focus: 'Accelerating development cycles, debugging, and solution prototyping using cutting-edge generative AI models and agentic workflows.',
    toolkit: [
      { text: 'Claude Code', isPrimary: true },
      { text: 'OpenAI Codex', isPrimary: true },
      { text: 'Google AI Studio', isPrimary: true },
      { text: 'GitHub Copilot', isPrimary: true },
      { text: 'ChatGPT', isPrimary: false },
      { text: 'Agentic Workflows', isPrimary: false },
      { text: 'Business Data & API Integration', isPrimary: true },
    ],
  },
  {
    domain: 'APIs & Data Architecture',
    focus: 'Handling third-party API integrations, JSON transformations, database queries, and structured data record management.',
    toolkit: [
      { text: 'REST APIs', isPrimary: true },
      { text: 'JSON Data Transformation', isPrimary: true },
      { text: 'MySQL', isPrimary: true },
      { text: 'PostgreSQL', isPrimary: true },
      { text: 'MongoDB', isPrimary: false },
      { text: 'SQL Query Optimization', isPrimary: false },
    ],
  },
  {
    domain: 'Web Platforms & Dynamic Content',
    focus: 'Designing modular CMS systems, custom post types, dynamic templates, and enterprise content systems for fast deployment.',
    toolkit: [
      { text: 'WordPress', isPrimary: true },
      { text: 'Elementor Pro', isPrimary: true },
      { text: 'Crocoblock / JetEngine', isPrimary: true },
      { text: 'Drupal', isPrimary: false },
      { text: 'HubSpot CMS', isPrimary: false },
      { text: 'SharePoint', isPrimary: false },
      { text: 'Shopify', isPrimary: true },
    ],
  },
  {
    domain: 'Integrations & Digital Operations',
    focus: 'Implementing marketing automation, behavioral event tracking, interactive location mapping, and conversion pipelines.',
    toolkit: [
      { text: 'Google Tag Manager (GTM)', isPrimary: true },
      { text: 'Google Analytics 4 (GA4)', isPrimary: true },
      { text: 'HubSpot CRM', isPrimary: true },
      { text: 'Mapbox API', isPrimary: true },
      { text: 'Mailchimp', isPrimary: false },
      { text: 'CRM Automation', isPrimary: false },
    ],
  },
  {
    domain: 'Product Experience & Delivery',
    focus: 'End-to-end UX/UI design, interactive Figma prototypes, design systems, web performance, accessibility, and SEO.',
    toolkit: [
      { text: 'Figma', isPrimary: true },
      { text: 'Adobe XD', isPrimary: false },
      { text: 'Adobe Creative Suite', isPrimary: false },
      { text: 'Design Systems', isPrimary: true },
      { text: 'WCAG Accessibility', isPrimary: true },
      { text: 'Web Performance Optimization', isPrimary: true },
      { text: 'SEO & Cross-Browser Testing', isPrimary: false },
    ],
  },
];

export interface CareerExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  highlights: string[];
  tags: string[];
}

export const CAREER_EXPERIENCE: CareerExperience[] = [
  {
    role: 'Web Designer & Web Developer',
    company: 'Avenue Living Asset Management',
    location: 'Calgary, AB, Canada',
    period: 'Oct 2022 – Present',
    isCurrent: true,
    highlights: [
      'Lead technical implementation and ongoing management of multiple corporate websites, partnering with creative and marketing stakeholders to deliver digital experiences aligned with business objectives.',
      'Build responsive interfaces, campaign landing pages, reusable templates, and scalable content systems using HTML, CSS, JavaScript/jQuery, WordPress, Elementor, Drupal, HubSpot CMS, and SharePoint.',
      'Integrate websites and digital workflows with third-party services, handling API requests and JSON data to support connected digital experiences and business processes.',
      'Use AI-assisted development tools (Claude Code, Copilot, ChatGPT, Codex) to accelerate coding, debugging, and explore opportunities to connect AI tools with business data.',
      'Develop custom WordPress functionality with PHP and Crocoblock/JetEngine, including custom post types and dynamic content features.',
      'Implement and maintain marketing technology and analytics workflows using HubSpot, Mailchimp, Google Tag Manager, and Google Analytics 4 to support campaign measurement and lead generation.',
      'Optimize usability, SEO, performance, and cross-browser behavior; troubleshoot publishing, indexing, layout, and front-end issues across production websites.',
    ],
    tags: ['WordPress', 'PHP', 'JavaScript', 'Mapbox', 'HubSpot', 'GTM / GA4', 'Crocoblock', 'AI Tooling'],
  },
  {
    role: 'Graphic Designer and Webmaster',
    company: "Paul's Bakery (PAUL Vancouver)",
    location: 'Vancouver, BC, Canada',
    period: 'Jul 2022 – Sep 2024',
    highlights: [
      'Designed digital and print campaign assets, social content, packaging concepts, and promotional materials for the historic French bakery chain (Est. 1889).',
      'Maintained website content and promotional graphics, supporting Parisian brand consistency and customer engagement.',
      'Engineered responsive layouts, menu showcases, and catering inquiry workflows.',
    ],
    tags: ['Web Design', 'WordPress', 'Brand Identity', 'Packaging Concepts', 'Print & Digital'],
  },
  {
    role: 'Graphic Designer / E-commerce Web Developer',
    company: 'MoltonRox Solutions Inc.',
    location: 'Surrey, BC, Canada',
    period: 'Oct 2021 – Jun 2022',
    highlights: [
      'Designed and developed e-commerce experiences using React and Shopify, with attention to performance, loading speed, and SEO.',
      'Created brand identity, packaging, and digital assets for products distributed through major retailers including Walmart, London Drugs, and Amazon.',
      'Conducted discovery, Figma prototyping, and responsive storefront implementation.',
    ],
    tags: ['React', 'Shopify', 'E-commerce', 'Brand Identity', 'Packaging Design', 'SEO'],
  },
  {
    role: 'Web Development Instructor / Sensei',
    company: 'Devf',
    location: 'Mexico & Remote',
    period: 'Apr 2021 – Oct 2021',
    highlights: [
      'Taught HTML5, CSS3, JavaScript, and React through hands-on lessons, coding exercises, and practical real-world projects.',
      'Mentored learners in debugging, responsive design, algorithmic problem-solving, and professional front-end development practices.',
    ],
    tags: ['React', 'JavaScript', 'Instruction', 'Mentorship', 'Code Reviews', 'Git'],
  },
  {
    role: 'WorldSkills Web Technologies Expert & International Jury Member',
    company: 'Workskills / WorldSkills International',
    location: 'Bogotá, Colombia & Kazan, Russia',
    period: 'May 2018 – Dec 2020',
    highlights: [
      'Trained and mentored competitors representing Colombia for national and international web technology competitions.',
      'Developed elite training programs covering HTML, CSS, JavaScript, responsive design, and modern web development practices.',
      'Served as Colombian Web Technologies Expert and official jury member at the 45th WorldSkills International Competition in Kazan, Russia (2019).',
    ],
    tags: ['WorldSkills Kazan 2019', 'Web Standards', 'Jury Member', 'PHP', 'JavaScript', 'CMS Standards'],
  },
  {
    role: 'Graphic Design & Multimedia Instructor',
    company: 'SENA (Servicio Nacional de Aprendizaje)',
    location: 'Bogotá, Colombia',
    period: 'Nov 2014 – Dec 2020',
    highlights: [
      'Delivered instruction in graphic design, front-end development, web usability, interface design, and digital technologies to hundreds of students.',
      'Integrated SEO, Google Analytics, accessibility, and practical digital production concepts into the official technical curriculum.',
      'Coached national skill competition competitors to top podium placements.',
    ],
    tags: ['Curriculum Design', 'Frontend Development', 'Web Usability', 'Analytics', 'Multimedia'],
  },
  {
    role: 'Web Designer & Web Developer',
    company: 'Webhouse',
    location: 'Bogotá, Colombia',
    period: 'Jul 2013 – Nov 2014',
    highlights: [
      'Led web design delivery for client websites, developing responsive front ends with HTML5, CSS, and JavaScript.',
      'Implemented and customized WordPress and Joomla websites, contributing to improvements associated with approximately 25% growth in client online revenue.',
    ],
    tags: ['WordPress', 'Joomla', 'HTML5/CSS', 'Client Solutions', 'Responsive Design'],
  },
  {
    role: 'Earlier Experience & Agency Craft',
    company: 'BBB Equipos; Imágenes y Textos',
    location: 'Bogotá, Colombia',
    period: '2007 – 2013',
    highlights: [
      'Produced brand, promotional, print, event, and web graphics, building a rock-solid foundation in visual communication, typography, and digital production.',
    ],
    tags: ['Visual Communication', 'Print Production', 'Typography', 'Brand Identity'],
  },
];

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  note?: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Computer and Information Systems, Post-Degree Diploma (Data Analytics)',
    institution: 'Douglas College',
    location: 'New Westminster, BC, Canada',
    period: '2021 – 2022',
    note: 'Focused on data analytics, software development, relational databases, and enterprise systems.',
  },
  {
    degree: 'Graphic Design, Bachelor’s Degree',
    institution: 'Fundación Universidad Jorge Tadeo Lozano',
    location: 'Bogotá, Colombia',
    period: '2008 – 2012',
    note: 'Rigorous foundation in typography, composition, digital media, user research, and visual systems.',
  },
  {
    degree: 'Development and Design, Skilled Trade Certificate',
    institution: 'Universidad Piloto de Colombia',
    location: 'Bogotá, Colombia',
    period: '2013',
    note: 'Specialized certificate in multimedia production and interactive web design.',
  },
];

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
  isAi?: boolean;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    year: '2026',
    description: 'Practical generative AI applications, responsible AI principles, AI-assisted workflows, and solution prototyping.',
    isAi: true,
  },
  {
    title: 'Certified Web Technologies Expert & Competition Jury Member',
    issuer: 'WorldSkills International',
    year: '2019',
    description: '45th WorldSkills International Competition in Kazan, Russia — Certified expert evaluating international web engineering standards.',
    isAi: false,
  },
];

export const LANGUAGES_DATA = [
  { language: 'Spanish', proficiency: 'Native' },
  { language: 'English', proficiency: 'Fluent' },
];

