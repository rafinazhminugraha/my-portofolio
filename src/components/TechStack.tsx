import { motion } from 'framer-motion';
import motionIcon from '../assets/images/motion-icon.png';

const techStack = [
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Motion', logo: motionIcon },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/000000' },
];

const TechStack = () => {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 max-w-6xl mx-auto">
      {techStack.map((tech, index) => {
        // Create zigzag effect - alternate items up and down
        const yOffset = index % 2 === 0 ? -12 : 12;
        
        // Random animation values for organic feel
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2; // 3-5 seconds
        const randomYRange = 8 + Math.random() * 8; // 8-16px movement
        
        return (
          <motion.div
            key={tech.name}
            className="px-5 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm"
            style={{
              transform: `translateY(${yOffset}px)`,
            }}
            animate={{
              y: [0, -randomYRange, 0],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: [0.45, 0.05, 0.55, 0.95], // Custom easing for smooth bounce
              delay: randomDelay,
            }}
          >
            <div className="flex items-center gap-2">
              <img src={tech.logo} alt={tech.name} className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">{tech.name}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechStack;
