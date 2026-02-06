
import React from 'react';
import { Section } from '../types';

interface HeroProps {
  onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?auto=format&fit=crop&q=80&w=2000" 
          alt="Tennis and Padel Courts" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-green-400 font-bold uppercase tracking-widest mb-4">Paitone Sport Center</h2>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            DOMINA IL <span className="text-green-500">CAMPO</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
            Il cuore dello sport a Paitone. Tennis veloce e Padel indoor di ultima generazione per un'esperienza di gioco senza eguali.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onBookClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-green-900/20"
            >
              PRENOTA IL TUO CAMPO
            </button>
            <a 
              href="#about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg text-center transition-all"
            >
              SCOPRI DI PIÙ
            </a>
          </div>
        </div>
      </div>

      {/* Floating features */}
      <div className="absolute bottom-12 right-12 hidden lg:flex space-x-8">
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <div className="text-green-500 text-4xl font-bold mb-1">2</div>
          <div className="text-xs uppercase tracking-tighter text-gray-400 font-bold">Campi Tennis Veloce</div>
        </div>
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <div className="text-blue-500 text-4xl font-bold mb-1">3</div>
          <div className="text-xs uppercase tracking-tighter text-gray-400 font-bold">Padel Indoor Italian Padel</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
