import { motion } from 'framer-motion';
import { Linkedin, X, Copy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-32 pb-12 overflow-hidden">
      {/* Marquee */}
      <div className="relative flex overflow-x-hidden mb-32">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[8rem] font-medium mx-8 tracking-tight">
              Let's work together!
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
          <div className="flex items-center gap-4 group cursor-pointer">
            <span className="text-2xl md:text-3xl font-light">contact@vladimirpetroski.com</span>
            <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors">
              <X className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>© All rights reserved 2025 Vladimir Petroski</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
