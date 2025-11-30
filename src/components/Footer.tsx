import { motion } from 'framer-motion';
import { Linkedin, Copy } from 'lucide-react';
import { useState } from 'react';
import Toast from './Toast';

const Footer = () => {
  const [showToast, setShowToast] = useState(false);
  const email = 'rafinazhminugraha@upi.edu';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white pt-20 pb-8 overflow-hidden">
      {/* Toast Notification */}
      <Toast 
        message="Email copied to clipboard!"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden mb-16">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[8rem] font-bold mx-8 tracking-tight">
              Let's work together!
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12"
        >
          <div 
            onClick={handleCopyEmail}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <span className="text-2xl md:text-3xl font-light">{email}</span>
            <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/rafi-nazhmi-nugraha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center pt-8 border-t border-gray-800 text-sm text-gray-400"
        >
          <p>© All rights reserved 2025 Rafi Nazhmi Nugraha</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
