import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import '@/App.css';
import { NavbarProvider } from '@/contexts/NavbarContext';

function App() {
  return (
    <NavbarProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here later, e.g.: */}
        {/* <Route path="/projects" element={<Projects />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </NavbarProvider>
  );
}

export default App;
