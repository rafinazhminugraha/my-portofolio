import { useState, useEffect } from 'react';
import Toast from './Toast';

const MobileParticleToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    // Show once after 15 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(showTimer);
  }, [isMobile]);

  // Auto hide after 5 seconds if it's currently visible
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  if (!isMobile) return null;

  return (
    <Toast
      message="If you touch any blank screen, the particles will follow you. Give it a try!"
      type="magic"
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
      className="left-auto! right-6!"
    />
  );
};

export default MobileParticleToast;
