import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertCircle, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'magic';
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

const Toast = ({ message, type = 'success', isVisible, onClose, className = '' }: ToastProps) => {
  const icons = {
    success: <Check className="w-4 h-4" />,
    error: <X className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />,
    magic: <Sparkles className="w-4 h-4" />,
  };

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    magic: 'text-purple-600',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="toast-notification"
          initial={{ scale: 0, opacity: 0, y: 50, rotate: -10 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            rotate: 0,
          }}
          exit={{ 
            scale: 0.5, 
            opacity: 0, 
            y: 20,
            rotate: 10,
            transition: { duration: 0.3, ease: "backIn" }
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            mass: 1,
          }}
          className={`fixed bottom-6 left-6 z-100 ${className}`}
        >
          <div 
            className="flex items-center gap-3 bg-white rounded-full shadow-lg px-5 py-3 border border-gray-200"
            style={{
              minWidth: '280px',
              maxWidth: '400px',
            }}
          >
            {/* Icon */}
            <div className={`${iconColors[type]} shrink-0`}>
              {icons[type]}
            </div>
            
            {/* Message */}
            <p className="text-gray-700 font-medium text-sm flex-1">{message}</p>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
