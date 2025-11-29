import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WorkList from '@/components/WorkList';
import About from '@/components/About';
import WhatIDo from '@/components/WhatIDo';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

const Separator = () => (
  <div className="w-full pl-12">
    <div className="h-0.5 bg-[#1a1a1a] w-full" />
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Navbar />
      <main>
        <Hero />
        <Separator />
        <WorkList />
        <Separator />
        <WhatIDo />
        <Separator />
        <Services />
        <Separator />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
