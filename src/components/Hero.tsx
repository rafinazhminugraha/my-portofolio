import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-48 pb-24 px-12 w-full">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[8rem] leading-[0.95] font-semibold tracking-tight text-[#1a1a1a] mb-12"
        style={{ fontFamily: "'Notica Serif', serif", fontStyle: 'normal' }}
      >
        Scalable Webflow<br />
        Development for SaaS
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-2xl text-gray-500 max-w-2xl font-light"
      >
        I build the robust, component-driven systems you need to rebrand, grow, and convert.
      </motion.p>
    </section>
  );
};

export default Hero;
