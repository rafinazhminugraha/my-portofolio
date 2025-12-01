import { motion } from 'framer-motion';
import { techStack } from '../data/techStack';

const TechStack = () => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-12 lg:gap-4 max-w-6xl mx-auto pb-4 lg:pb-0">
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
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm shrink-0"
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
                <img src={tech.logo} alt={tech.name} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">{tech.name}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;

