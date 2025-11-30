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
          className="text-5xl font-medium"
        >
          What I do:
        </motion.h2>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={containerVariants}
          className="text-xl text-gray-600 font-light leading-relaxed"
        >
          <motion.p variants={itemVariants} className="mb-8">
            As a Senior Webflow Developer and Technical Strategist, I architect scalable, high-performance web platforms that enable high-growth SaaS companies to capture and convert their target market.
          </motion.p>
          <motion.p variants={itemVariants}>
            My focus is on translating ambitious business goals—from complete rebrands to positioning for acquisition—into future-proof digital assets.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
