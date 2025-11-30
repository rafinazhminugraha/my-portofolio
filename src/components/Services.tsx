import { motion } from 'framer-motion';
import { services } from '../data/services';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 md:mb-16"
      >
        What I offer
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-12 sm:gap-y-16 md:gap-y-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={containerVariants}
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-4 sm:gap-5 md:gap-6"
            >
              <div className="mb-1 sm:mb-2">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">{service.title}</h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Services;
