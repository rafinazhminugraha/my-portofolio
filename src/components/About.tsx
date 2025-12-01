import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import personalPhoto from '../assets/images/personal-photo.jpg';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else {
      // Check if we scrolled past it (down) or above it (up)
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // If rect.top > 0, it means the element is below the viewport (we scrolled up). Hide it.
        // If rect.top < 0, it means the element is above the viewport (we scrolled down). Keep it visible.
        if (rect.top > 0) {
          setIsVisible(false);
        }
      }
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 md:mb-16"
      >
        About me
      </motion.h2>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
        {/* Image Column */}
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={itemVariants}
          className="relative aspect-4/5 w-full max-h-[50vh] md:max-h-[80vh] overflow-hidden rounded-lg bg-gray-100"
        >
            <img 
                src={personalPhoto} 
                alt="Portrait" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
        </motion.div>

        {/* Text Column */}
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-base sm:text-lg md:text-xl text-gray-600 font-light leading-relaxed space-y-6 sm:space-y-8"
        >
            <motion.p variants={itemVariants}>
                Hi i'm Rafi Nazhmi Nugraha, you can call me Rafi. My drive is simple, I love seeing people enjoy the digital products I build. <span className="font-medium text-[#1a1a1a]">Empathy</span> is a strategic tool.
            </motion.p>
            <motion.p variants={itemVariants}>
                That specific goal has made me a "constructive perfectionist." I don't just write code to make it work, I obsess over the details because I believe users can feel the difference.
            </motion.p>
            <motion.p variants={itemVariants}>
                Whether it's a seamless page transition or a button that responds naturally to a click, I refuse to ship "good enough." If there's a flaw in the experience, I fix it, so the user never has to encounter it.
            </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
