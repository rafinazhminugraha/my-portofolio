import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { projects } from '../data/projects';
import { useNavbar } from '../contexts/NavbarContext';

// Image Preview Component with Cursor Following Effect
const ImagePreview = ({ activeIndex, onHoverChange }: { activeIndex: number, onHoverChange: (hovered: boolean) => void }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <motion.div
      className="relative w-full h-full bg-gray-900 rounded-3xl overflow-hidden cursor-none shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -8, 0],
      }}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 0.4,
          ease: "easeOut",
        },
      }}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Animated Gradient Border Glow - Disabled on Hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0, // Completely disabled
        }}
        style={{
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          padding: '2px',
        }}
      />

      {/* Stack images absolutely for crossfade */}
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          style={{ pointerEvents: index === activeIndex ? 'auto' : 'none' }}
        >
          <motion.img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </a>
      ))}

      {/* Custom Cursor with Dot and Label */}
      <motion.div
        className="absolute pointer-events-none z-20"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Label at bottom-right of dot */}
        <motion.div
          className="absolute left-4 top-4"
          animate={{
            scale: isHovered ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.05,
          }}
        >
          <div className="px-3 py-1.5 bg-white rounded-full font-medium text-black text-xs shadow-lg whitespace-nowrap border border-black">
            View Live
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


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
      className="project-section min-h-[60vh] md:min-h-screen flex flex-col justify-center py-12 md:py-24"
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
        {/* Mobile/Tablet Image - shown only on small screens */}
        <div className="md:hidden mb-6 rounded-2xl overflow-hidden shadow-xl">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-[16/10] w-full bg-gray-900"
          >
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </a>
        </div>

        <motion.h3 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
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
          className="text-base sm:text-lg font-light text-gray-500 mb-4 md:mb-6"
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
          className="flex gap-2 sm:gap-3 mb-4 md:mb-6 flex-wrap"
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
            <div key={idx} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
              <img src={logo} alt="tech" className="w-full h-full object-contain" />
            </div>
          ))}
        </motion.div>

        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-4 md:mb-6"
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
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black backdrop-blur-sm border border-black shadow-sm hover:border-gray-200/50 hover:shadow-lg transition-all duration-500 font-medium group overflow-hidden"
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
          whileTap={{ scale: 0.95 }}
        >
          {/* Sliding white background */}
          <div className="absolute inset-0 bg-white rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          
          <span className="relative z-10 text-sm sm:text-base text-white group-hover:text-black transition-colors duration-300 delay-100">View Project</span>
          <motion.svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-4 h-4 sm:w-4 sm:h-4"
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
  const [isImageHovered, setIsImageHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setForceHidden } = useNavbar();

  const handleImageHoverChange = (hovered: boolean) => {
    setIsImageHovered(hovered);
    setForceHidden(hovered);
  };

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
    <section id="work" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 w-full -mb-0 md:-mb-[42vh] relative">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 md:mb-24">Latest work</h2>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
        {/* Left Column - Scrolling Text with Fade Animation */}
        <motion.div 
          className="pb-0 md:pb-[50vh] relative"
          animate={{
            filter: isImageHovered ? 'blur(4px)' : 'blur(0px)',
            opacity: isImageHovered ? 0.3 : 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          {projects.map((project, index) => (
            <ProjectSection 
              key={index} 
              project={project} 
              isLast={index === projects.length - 1}
            />
          ))}
        </motion.div>

        {/* Right Column - Sticky Preview (Desktop only) */}
        <div className="relative hidden md:block pt-0 md:pt-48 z-30">
          <div className="sticky top-1/2 -translate-y-1/2 h-[70vh] md:h-[85vh]">
            <ImagePreview activeIndex={activeIndex} onHoverChange={handleImageHoverChange} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkList;