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
  pinnedRepos: ['interview_analyser', 'NoopurTunes', 'streamify', 'ElectroDash', 'portfolio'],
  resume: '/Noopur_Yawalkar_Resume.pdf',
  photo: '/profile.jpg',
  location: 'Mumbai, India',
}

export const stats = [
  { value: '9.67', label: 'CGPA' },
  { value: '4', label: 'Projects built' },
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
    blurb: 'Next.js and React front ends on Flask and REST back ends, with auth, roles and real-time data.',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Flask', 'REST APIs', 'MongoDB', 'JWT + RBAC'],
  },
]

// art: 'cart' | 'ecg' | 'wave' | 'eye'  — picks the illustration on each card
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
      'Streams live ECG from an ESP32 + AD8232 sensor to a Next.js dashboard, with an ML pipeline for multi-class arrhythmia detection.',
    points: ['SMOTE + Random Forest', 'Class-imbalance handling', 'Clinical-style live dashboard'],
    tech: ['Next.js', 'ESP32', 'Python', 'Scikit-learn'],
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
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'HTML5', 'CSS3'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Responsive UI'] },
  { title: 'Backend', items: ['Flask', 'REST APIs', 'JWT Auth', 'RBAC', 'MongoDB'] },
  { title: 'AI / ML', items: ['PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'LLM Integration', 'Time-Series'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'ESP32 / IoT'] },
  { title: 'Fundamentals', items: ['DSA', 'OOP', 'Debugging'] },
]

export const education = [
  { title: 'B.E. Electronics & Telecommunication', place: 'Vidyalankar Institute of Technology', period: '2024 – 2028', score: 'CGPA 9.67' },
  { title: 'Higher Secondary (12th)', place: 'Seth Hirachand Mutha College, Mumbai', score: '76.54%' },
  { title: 'Secondary (10th)', place: 'K.C. Gandhi School', score: '96.20%' },
]
