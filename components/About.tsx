
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1000" 
                alt="Padel match" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-green-600 p-8 rounded-3xl hidden md:block">
              <p className="text-white font-black text-4xl">10+</p>
              <p className="text-white/80 text-sm font-bold uppercase tracking-tight">Anni di Passione</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-black mb-6 text-gray-900 leading-tight">
              PASSIONE SPORTIVA NEL <span className="text-green-600 underline decoration-4 underline-offset-8">CUORE DI PAITONE</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Il Paitone Sport Center nasce con un obiettivo chiaro: offrire agli appassionati di Tennis e Padel una struttura d'eccellenza in provincia di Brescia.
              </p>
              <p>
                Siamo orgogliosi di offrire una superficie da tennis in terreno veloce, ideale per chi ama il gioco ritmato e aggressivo, e tre campi da Padel firmati <strong>Italian Padel</strong>, completamente coperti per garantire il gioco 365 giorni all'anno.
              </p>
              <p>
                Oltre all'eccellenza tecnica, il nostro centro è un punto di ritrovo sociale, dove sport, benessere e amicizia si incontrano in un ambiente moderno e accogliente.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="font-bold text-gray-800">Corsi Federali</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="font-bold text-gray-800">Spogliatoi Deluxe</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="font-bold text-gray-800">Parcheggio Ampio</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="font-bold text-gray-800">Area Bar & Relax</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
