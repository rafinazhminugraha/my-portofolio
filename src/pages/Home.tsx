import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4"
      >
        Welcome to My Portfolio
      </motion.h1>
      <p className="text-lg text-gray-400">
        Built with React, Tailwind v4, and Framer Motion.
      </p>
    </div>
  );
};

export default Home;
