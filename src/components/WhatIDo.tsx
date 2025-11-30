import { motion } from 'framer-motion';

const WhatIDo = () => {
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
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section id="what-i-do" className="py-24 px-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          variants={itemVariants}
          className="text-5xl font-bold"
        >
          What I do
        </motion.h2>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={containerVariants}
          className="text-xl text-gray-600 font-light leading-relaxed"
        >
          <motion.p variants={itemVariants} className="mb-8">
            As a Frontend Developer with a keen eye for detail, I bridge the gap between static creative vision and dynamic user experience.
          </motion.p>
          <motion.p variants={itemVariants}>
            I don't just write code. I architect polished, high performance web interfaces that feel alive. My focus is on translating precious designs into clean, responsive code, ensuring that the final product is not only visually stunning but also technically robust, fast, and scalable across the modern web ecosystem.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
