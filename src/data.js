// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no need to touch the components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Noopur Yawalkar',
  firstName: 'Noopur',
  role: 'Software Developer · Full-Stack & AI/ML',
  intro:
    'Engineering undergrad who builds full-stack web apps, REST APIs and AI/ML-powered products end to end — from the model to the dashboard people actually use.',
  taglines: ['models that learn', 'apps people use', 'APIs that scale', 'AI that ships'],
  email: 'noopuratulyawalkar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/noopur-yawalkar-5833b3331/',
  github: 'https://github.com/NoopurY',
  githubUser: 'NoopurY',
  // repos shown as cards in the GitHub section (same as your pinned repos)
  pinnedRepos: ['interview_analyser', 'NoopurTunes', 'streamify', 'ElectroDash', 'RLDC_Digital_Twin', 'portfolio'],
  resume: '/Noopur_Yawalkar_Resume.pdf',
  photo: '/profile.webp',
  location: 'Mumbai, India',
}

export const stats = [
  { value: '9.67', label: 'CGPA' },
  { value: '7', label: 'Projects built' },
  { value: '2', label: 'AI/ML internships' },
]

export const sides = [
  {
    key: 'ai',
    title: 'AI / ML',
    blurb: 'Deep learning, NLP and time-series models — trained, benchmarked and wired into real products.',
    items: ['PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'LLMs (Groq SDK)', 'Time-Series'],
  },
  {
    key: 'web',
    title: 'Full Stack',
    blurb: 'Next.js and React front ends on Flask, Node and REST back ends, backed by PostgreSQL or MongoDB, with auth, roles and real-time data.',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Three.js', 'Flask', 'REST APIs', 'PostgreSQL', 'MongoDB', 'JWT + RBAC'],
  },
]

// art: 'cart' | 'ecg' | 'wave' | 'eye' | 'spectrum' | 'schema'  — picks the illustration on each card
export const projects = [
  {
    name: 'ElectroDash',
    kind: 'Full-stack e-commerce & delivery',
    art: 'cart',
    featured: true,
    description:
      'E-commerce and delivery platform with cart and checkout flows, role-based dashboards, real-time order tracking on a map and an AI support chatbot.',
    points: ['REST routes + MongoDB models for users, products, orders', 'JWT authentication with RBAC', 'Groq LLM support chatbot'],
    tech: ['Next.js', 'React', 'Tailwind', 'MongoDB', 'JWT'],
    link: 'https://github.com/NoopurY/ElectroDash',
    live: 'https://electrodash-phi.vercel.app/',
  },
  {
    name: 'CardioSense',
    kind: 'Real-time ECG monitoring',
    art: 'ecg',
    description:
      'Next.js dashboard that streams live ECG readings in real time, backed by an ML pipeline for multi-class arrhythmia detection.',
    points: ['SMOTE + Random Forest', 'Class-imbalance handling', 'Clinical-style live dashboard'],
    tech: ['Next.js', 'Python', 'Scikit-learn', 'Real-time data'],
    link: '',
  },
  {
    name: 'PrepAI',
    kind: 'AI interview analyser',
    art: 'wave',
    description:
      'Flask pipeline that transcribes interview answers and scores them on filler words, STAR structure, confidence and speaking patterns.',
    points: ['Speech transcription + NLP features', 'Hybrid scoring: Random Forest + rules', 'Real-time feedback'],
    tech: ['Python', 'Flask', 'NLP', 'Audio'],
    link: 'https://github.com/NoopurY/interview_analyser',
  },
  {
    name: 'Retinal Disease Detection',
    kind: 'Clinical decision support system',
    art: 'eye',
    featured: true,
    description:
      'End-to-end pipeline classifying OCT retinal scans into CNV, DME, Drusen and Normal, plus a rule-based recommendation engine for ophthalmologists.',
    points: ['MobileNetV3 classifier', 'Preprocessing → inference → evaluation', 'Clinical decision support'],
    tech: ['Python', 'Deep Learning', 'MobileNetV3'],
    link: '',
  },
  {
    name: 'RLDC Motor Digital Twin',
    kind: 'Interactive 3D simulation platform',
    art: 'spectrum',
    wide: true,
    description:
      'Web-based digital twin of an electric motor: a live 3D model, real-time telemetry dashboards and fault scenarios you can trigger, with an explainable rule-based engine that scores machine health.',
    points: [
      'Interactive 3D twin built with Three.js / React Three Fiber',
      'Real-time charts, side-by-side comparison views and a guided demo mode',
      'Explainable diagnosis engine with an automated self-test suite',
    ],
    tech: ['Next.js', 'React', 'Three.js', 'Framer Motion', 'MongoDB'],
    link: 'https://github.com/NoopurY/RLDC_Digital_Twin',
    live: 'https://rldc-digital-twin.vercel.app/',
  },
  {
    name: 'VerdeBase (PlantCare)',
    kind: 'PostgreSQL plant care platform + DBMS studio',
    art: 'schema',
    wide: true,
    description:
      'Team project: users log watering, growth and health for their plants, while the database itself calculates health scores, schedules the next watering and raises alerts. A companion DBMS Studio reads PostgreSQL system catalogs live to show the ER model, query plans, triggers and ACID transactions as they run.',
    points: [
      '14 tables (3NF), 6 views, 5 stored functions, 5 triggers, 20+ indexes',
      'DBMS Studio: ER explorer, read-only SQL Lab, EXPLAIN ANALYZE plans, COMMIT vs ROLLBACK demos',
      'Parameterised queries, bcrypt + JWT cookie sessions, care reminders and an AI plant assistant',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'SQL', 'Tailwind', 'Recharts'],
    link: 'https://github.com/NoopurY/plantcare_system',
    live: 'https://plantcare-system.vercel.app/',
  },
  {
    name: 'AquaSave',
    kind: 'IoT smart water monitoring',
    art: 'wave',
    description:
      'End-to-end IoT system where an ESP32 flow sensor streams live water usage through Azure IoT Hub to a per-user Next.js dashboard with usage charts and slab-based billing.',
    points: [
      'ESP32 pulse counting → litres, sent over Wi-Fi',
      'Azure IoT Hub + Azure Function forwarding to secured ingest APIs',
      'JWT auth, per-device tokens, live charts and bill estimates',
    ],
    tech: ['ESP32', 'Azure IoT', 'Next.js', 'Prisma', 'MongoDB'],
    link: 'https://github.com/NoopurY/aquasense',
  },
]

export const experience = [
  {
    role: 'Data Scientist Intern',
    org: 'Centre of Studies in Resources Engineering (CSRE), IIT Bombay',
    period: 'Oct 2026 – Present',
    now: true,
    points: ['Building deep learning models for research projects at CSRE (hybrid, Mumbai).'],
  },
  {
    role: 'AI/ML Intern',
    org: 'VJTI',
    period: 'May 2026 – Jul 2026',
    points: [
      'Developed a Health-Conditioned Window Attention (HCWA) framework in PyTorch for multivariate time-series anomaly detection.',
      'Benchmarked on NASA SMAP, MSL and SMD datasets for attention-based early fault detection in predictive maintenance.',
    ],
  },
  {
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code (GSSoC)',
    period: 'Jul 2025 – Sep 2025',
    points: ['Shipped contributions to real-world repos through issues, branches, pull requests and code reviews.'],
  },
  {
    role: 'Content Writing Volunteer',
    org: 'InAmigos Foundation',
    period: 'Jun 2025 – Jul 2025',
    points: ['Wrote content for a social-services NGO.'],
  },
]

export const skillGroups = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Recharts', 'Responsive UI'] },
  { title: 'Backend', items: ['Flask', 'Node.js', 'REST APIs', 'JWT Auth', 'RBAC'] },
  { title: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Schema Design (3NF)', 'Triggers & Views', 'Indexing / EXPLAIN'] },
  { title: 'AI / ML', items: ['PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'LLM Integration', 'Time-Series'] },
  { title: 'Tools & Fundamentals', items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'DSA', 'OOP', 'DBMS'] },
]

// Photo gallery ("Moments"), shown in this order.
// span: 'tall' | 'wide' | '' (large screens only); pos = which part of the photo stays in frame
export const moments = [
  { src: '/moments/presenting.webp', title: 'Presenting', caption: 'Walking the class through Min / Max Stacks', span: 'tall', pos: '62% 50%' },
  { src: '/moments/coding.webp', title: 'Heads-down building', caption: 'Debugging in the lab', span: 'wide', pos: '60% 22%' },
  { src: '/moments/iitb-research-park.webp', title: 'Research', caption: 'IITB Research Park Foundation', span: '', pos: '50% 45%' },
  { src: '/moments/convention-centre.webp', title: 'Out and about', caption: 'Tech events around Mumbai', span: 'tall', pos: '50% 60%' },
  { src: '/moments/exhibition-centre.webp', title: 'On the event floor', caption: 'Bombay Exhibition Centre', span: 'wide', pos: '45% 50%' },
]

export const education = [
  { title: 'B.E. Electronics & Telecommunication', place: 'Vidyalankar Institute of Technology', period: '2024 – 2028', score: 'CGPA 9.67' },
  { title: 'Higher Secondary (12th)', place: 'Seth Hirachand Mutha College, Mumbai', score: '76.54%' },
  { title: 'Secondary (10th)', place: 'K.C. Gandhi School', score: '96.20%' },
]
