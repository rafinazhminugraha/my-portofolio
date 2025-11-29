import { motion } from 'framer-motion';
import { LayoutTemplate, Zap, Layers, Users } from 'lucide-react';

const services = [
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "Strategic Architecture & Scalability",
    description: "Instead of \"pixel-perfect,\" I deliver system-perfect architecture. I build robust, reusable component libraries that empower your marketing team to launch new, on-brand pages at scale."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance & Technical SEO",
    description: "\"User-friendly\" is meaningless if the site is slow. I prioritize clean, semantic HTML and technical SEO from the ground up, optimizing for Core Web Vitals and accessibility."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Complex Rebuilds & Rebrands",
    description: "This is where my experience shines. I specialize in navigating high-stakes projects, like a complete rebrand or a migration from legacy systems into future-proof digital assets."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Business-Driven Outcomes",
    description: "Ultimately, my work is measured by your success. I've seen firsthand how a well-architected, high-performing website becomes a core driver of growth and conversion."
  }
];

const Services = () => {
  return (
    <section className="py-24 px-12 w-full">
      <h2 className="text-5xl font-medium mb-16">What I offer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="mb-2">{service.icon}</div>
            <h3 className="text-2xl font-medium">{service.title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
