
import React, { useState } from 'react';
import { Section } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courts from './components/Courts';
import Events from './components/Events';
import Contact from './components/Contact';
import Booking from './components/Booking';
import AIChatAssistant from './components/AIChatAssistant';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('home');

  const scrollToSection = (id: Section) => {
    setSection(id);
    if (id !== 'admin') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentSection={section} setSection={scrollToSection} />
      
      {section === 'admin' ? (
        <AdminDashboard onBackToSite={() => scrollToSection('home')} />
      ) : (
        <main>
          <Hero onBookClick={() => scrollToSection('booking')} />
          <About />
          <Courts />
          <Events />
          <Booking />
          <Contact />
        </main>
      )}

      <footer className="bg-black text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="text-3xl font-black tracking-tighter">
              PAITONE<span className="text-green-600">SPORT</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-center space-x-8 mb-8 text-gray-400 font-bold uppercase text-xs tracking-widest">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Chi Siamo</button>
            <button onClick={() => scrollToSection('courts')} className="hover:text-white transition-colors">I Campi</button>
            <button onClick={() => scrollToSection('booking')} className="hover:text-white transition-colors">Prenota</button>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 Paitone Sport Center. Tutti i diritti riservati. P.IVA 0123456789
          </p>
        </div>
      </footer>

      {/* Gemini Powered Assistant */}
      <AIChatAssistant />
    </div>
  );
};

export default App;
