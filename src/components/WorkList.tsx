import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { projects } from '../data/projects';

const ProjectSection = ({ project, isLast }: { project: typeof projects[0], isLast: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const lockScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Calculate distance from viewport center
      const distance = Math.abs(sectionCenter - viewportCenter);
      
      // Activation threshold - when to first activate
      const activationThreshold = windowHeight * 0.3;
      
      // Lock threshold - how much to scroll before unlocking (in pixels)
      const lockScrollThreshold = windowHeight * 0.4;
      
      const shouldActivate = distance < activationThreshold;
      
      if (shouldActivate && !isLocked && !isActive) {
        // First activation - lock it in place
        setIsActive(true);
        setIsLocked(true);
        lockScrollY.current = window.scrollY;
      } else if (isLocked) {
        // Check if we've scrolled enough to unlock
        const scrollDelta = Math.abs(window.scrollY - lockScrollY.current);
        const isScrollingDown = window.scrollY > lockScrollY.current;

        // If it's the last project and we're scrolling down, don't unlock/disappear
        if (isLast && isScrollingDown) return;
        
        if (scrollDelta > lockScrollThreshold) {
          // Unlock and check if we should deactivate
          setIsLocked(false);
          if (!shouldActivate) {
            setIsActive(false);
          }
        }
        // While locked, stay active regardless of position
      } else if (!isLocked) {
        // Not locked, follow normal activation logic
        setIsActive(shouldActivate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, isLocked, isLast]);

  return (
    <div 
      ref={sectionRef}
      className="project-section min-h-screen flex flex-col justify-center py-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 80 }}
        animate={isActive ? {
          opacity: 1,
          scale: 1,
          y: 0,
        } : {
          opacity: 0,
          scale: 0.85,
          y: 60,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.5,
        }}
      >
        <motion.h3 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? {
            opacity: 1,
            y: 0,
          } : {
            opacity: 0,
            y: 30,
          }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 30,
            delay: 0.02,
          }}
        >
          {project.name}
        </motion.h3>
        <motion.p 
          className="text-lg text-gray-500 mb-6 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? {
            opacity: 1,
            y: 0,
          } : {
            opacity: 0,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 550,
            damping: 30,
            delay: 0.04,
          }}
        >
        </motion.p>
        
        {/* Tech Stack Logos */}
        <motion.div 
          className="flex gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? {
            opacity: 1,
            y: 0,
          } : {
            opacity: 0,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 550,
            damping: 30,
            delay: 0.05,
          }}
        >
          {project.techStack.map((logo, idx) => (
            <div key={idx} className="w-8 h-8 flex items-center justify-center">
              <img src={logo} alt="tech" className="w-full h-full object-contain" />
            </div>
          ))}
        </motion.div>

        <motion.p 
          className="text-xl text-gray-600 leading-relaxed font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? {
            opacity: 1,
            y: 0,
          } : {
            opacity: 0,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 550,
            damping: 30,
            delay: 0.07,
          }}
        >
          {project.description}
        </motion.p>

        {/* View Button - Glass Design with Slide Effect */}
        <motion.a
          href="#"
          className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black backdrop-blur-sm border border-black shadow-sm hover:border-gray-200/50 hover:shadow-lg transition-all duration-500 font-medium group overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? {
            opacity: 1,
            y: 0,
          } : {
            opacity: 0,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 550,
            damping: 30,
            delay: 0.09,
          }}
        >
          {/* Sliding white background */}
          <div className="absolute inset-0 bg-white rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          
          <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 delay-100">View Project</span>
          <motion.svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
            animate={{
              x: [0, 3, 0],
            }}
            whileHover={{
              x: 6,
            }}
            transition={{
              x: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <path 
              d="M6 3L11 8L6 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white group-hover:text-black transition-colors duration-300 delay-100"
            />
          </motion.svg>
        </motion.a>
      </motion.div>
    </div>
  );
};

const WorkList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const sections = container.querySelectorAll('.project-section');
      const viewportCenter = window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        
        // Check if section center is close to viewport center
        if (Math.abs(sectionCenter - viewportCenter) < rect.height / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="work" className="py-24 px-12 w-full -mb-[42vh]">
      <h2 className="text-5xl font-bold mb-24">Latest work</h2>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column - Scrolling Text with Fade Animation */}
        <div className="pb-[50vh]">
          {projects.map((project, index) => (
            <ProjectSection 
              key={index} 
              project={project} 
              isLast={index === projects.length - 1}
            />
          ))}
        </div>

        {/* Right Column - Sticky Preview */}
        <div className="relative hidden md:block pt-48">
          <div className="sticky top-1/2 -translate-y-1/2 h-[85vh]">
            <div className="relative w-full h-full bg-gray-900 rounded-3xl overflow-hidden">
              {/* Stack images absolutely for crossfade */}
              {projects.map((project, index) => (
                <motion.img
                  key={index}
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === activeIndex ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkList;
