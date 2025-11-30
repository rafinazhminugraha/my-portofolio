import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { amount: 0.2 });

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
    <section id="about" className="py-24 px-12 w-full">
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        variants={itemVariants}
        className="text-5xl font-medium mb-16"
      >
        About me
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Image Column */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={itemVariants}
          className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-gray-100"
        >
            <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
                alt="Portrait" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
        </motion.div>

        {/* Text Column */}
        <motion.div 
          ref={textRef}
          initial="hidden"
          animate={isTextInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-xl text-gray-600 font-light leading-relaxed space-y-8"
        >
            <motion.p variants={itemVariants}>
                My career path began in customer service, which provided the foundational insight for my entire development philosophy: <span className="font-medium text-[#1a1a1a]">empathy</span> is a strategic tool.
            </motion.p>
            <motion.p variants={itemVariants}>
                That experience, rooted in understanding user pain points and business objectives, is my key differentiator. I don't just translate a design from Figma to Webflow; I translate a business goal into a digital platform.
            </motion.p>
            <motion.p variants={itemVariants}>
                My focus is on architecting high-performance web assets for high-growth companies. I thrive in high-stakes environments—like rebrands and pre-acquisition readiness—where success is defined by more than just aesthetics.
            </motion.p>
            <motion.p variants={itemVariants}>
                My goal is to act as a technical partner, bridging the gap between creative vision and technical reality.
            </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
