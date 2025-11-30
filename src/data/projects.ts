import motionIcon from '../assets/images/motion-icon.png';

export const projects = [
  { 
    name: 'Brainwave', 
    description: 'A modern, high-performance landing page for an AI application built using React, Vite, and Tailwind CSS.',
    image: new URL('../assets/images/brainwave-preview.png', import.meta.url).href,
    link: 'https://brainwave-rafi-nazhmi-nugraha.vercel.app/',
    techStack: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'https://cdn.simpleicons.org/tailwindcss/06B6D4', motionIcon]
  },
  { 
    name: 'Xora', 
    description: 'A modern, high-performance SaaS landing page built using React, Vite, and Tailwind CSS.',
    image: new URL('../assets/images/xora-preview.png', import.meta.url).href,
    link: 'https://xora-rafi-nazhmi-nugraha.vercel.app/',
    techStack: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'https://cdn.simpleicons.org/tailwindcss/06B6D4']
  },
  { 
    name: 'Nike Landing Page', 
    description: 'A modern, high-performance landing page for Nike built using React, Vite, Tailwind CSS, and Framer Motion.',
    image: new URL('../assets/images/nike-preview.png', import.meta.url).href,
    link: 'https://nike-landing-page-rafi-nazhmi-nugraha.vercel.app/',
    techStack: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'https://cdn.simpleicons.org/tailwindcss/06B6D4', motionIcon]
  },
  { 
    name: 'IMDB Clone', 
    description: 'A single-page IMDB-like app built using React, Vite, Tailwind CSS, Appwrite, and TMDB API.',
    image: new URL('../assets/images/imdb-preview.png', import.meta.url).href,
    link: 'https://imdb-clone-app-rafi-nazhmi-nugraha.vercel.app/',
    techStack: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'https://cdn.simpleicons.org/tailwindcss/06B6D4', 'https://cdn.simpleicons.org/appwrite/F02E65']
  },
];
