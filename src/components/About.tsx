import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 px-12 w-full">
      <h2 className="text-5xl font-medium mb-16">About me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Image Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 font-light leading-relaxed space-y-8"
        >
            <p>
                My career path began in customer service, which provided the foundational insight for my entire development philosophy: <span className="font-medium text-[#1a1a1a]">empathy</span> is a strategic tool.
            </p>
            <p>
                That experience, rooted in understanding user pain points and business objectives, is my key differentiator. I don't just translate a design from Figma to Webflow; I translate a business goal into a digital platform.
            </p>
            <p>
                My focus is on architecting high-performance web assets for high-growth companies. I thrive in high-stakes environments—like rebrands and pre-acquisition readiness—where success is defined by more than just aesthetics.
            </p>
            <p>
                My goal is to act as a technical partner, bridging the gap between creative vision and technical reality.
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
