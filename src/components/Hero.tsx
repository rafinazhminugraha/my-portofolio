import { motion } from 'framer-motion';
import TechStack from './TechStack';

const Hero = () => {
  return (
    <section className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.1] font-semibold tracking-tight text-[#1a1a1a] mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        style={{ fontFamily: "'Aestera', serif", fontStyle: 'normal' }}
      >
        Cutting edge Frontent for Immersive Digital Products
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 max-w-2xl font-light mb-8 sm:mb-10 md:mb-12 lg:mb-16"
      >
        I bridge the gap between static design and fluid experience. Translate precious designs into pixel perfect code
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <TechStack />
      </motion.div>
    </section>
  );
};

export default Hero;

