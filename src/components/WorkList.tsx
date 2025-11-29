import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const projects = [
  { 
    name: 'Amplifii', 
    tags: 'Webflow Development',
    description: 'A comprehensive SaaS platform redesign focused on scalability and modern design patterns.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  { 
    name: 'Tekst', 
    tags: 'Webflow Development, GSAP',
    description: 'Interactive content platform with advanced animations and smooth user experience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
  { 
    name: 'Nyton Design', 
    tags: 'Webflow Development, GSAP',
    description: 'Creative agency portfolio showcasing dynamic transitions and scroll-based effects.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80'
  },
  { 
    name: 'LexSelect', 
    tags: 'Webflow Development, Custom integrations',
    description: 'Legal tech platform with complex data integrations and responsive architecture.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80'
  },
  { 
    name: 'AdAuris', 
    tags: 'Webflow Development, Custom integrations',
    description: 'Marketing automation platform built for enterprise-level scalability.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'
  },
  { 
    name: 'Alterscope', 
    tags: 'Webflow Development, Custom integrations',
    description: 'Data analytics dashboard with real-time updates and interactive visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
];

const ProjectSection = ({ project }: { project: typeof projects[0] }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Calculate distance from viewport center
      const distance = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = windowHeight / 2;

      // Calculate opacity: 1 when centered, 0 when far away
      const calculatedOpacity = Math.max(0, 1 - distance / maxDistance);
      setOpacity(calculatedOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="project-section min-h-screen flex flex-col justify-center py-24"
    >
      <motion.div
        style={{ opacity }}
        transition={{ duration: 0.1 }}
      >
        <h3 className="text-4xl font-medium mb-4">{project.name}</h3>
        <p className="text-lg text-gray-500 mb-6 font-light">{project.tags}</p>
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          {project.description}
        </p>
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
    <section className="py-24 px-12 w-full">
      <h2 className="text-5xl font-medium mb-24">Latest work</h2>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column - Scrolling Text with Fade Animation */}
        <div>
          {projects.map((project, index) => (
            <ProjectSection key={index} project={project} />
          ))}
        </div>

        {/* Right Column - Sticky Preview */}
        <div className="relative hidden md:block pt-48">
          <div className="sticky top-1/2 -translate-y-1/2 h-[95vh]">
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
