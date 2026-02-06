
import React, { useState } from 'react';
import { Section } from '../types';

interface NavbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState('');

  const menuItems: { id: Section; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Chi Siamo' },
    { id: 'courts', label: 'I Campi' },
    { id: 'events', label: 'Eventi' },
    { id: 'contact', label: 'Contatti' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "Paitonearena" && adminPass === "Paitone2026") {
      setSection('admin');
      setShowLoginModal(false);
      setAdminUser('');
      setAdminPass('');
      setError('');
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setSection('home')}>
              <span className="text-2xl font-black text-gray-800 tracking-tighter">
                PAITONE<span className="text-green-600">SPORT</span>
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      currentSection === item.id ? 'text-green-600' : 'text-gray-600 hover:text-green-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setSection('booking')}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-green-700 transition-all shadow-md active:scale-95"
                >
                  Prenota Ora
                </button>
                
                {/* Bottone Admin (Rotellina) */}
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className={`p-2 ml-4 rounded-full transition-all duration-300 ${currentSection === 'admin' ? 'text-green-600 bg-green-50 rotate-90' : 'text-gray-400 hover:text-green-600 hover:bg-gray-50'}`}
                  title="Area Amministratore"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={isOpen ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={isOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSection(item.id); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setShowLoginModal(true); setIsOpen(false); }}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Area Admin
              </button>
              <button
                onClick={() => { setSection('booking'); setIsOpen(false); }}
                className="block w-full text-center bg-green-600 text-white px-3 py-4 rounded-md text-base font-bold"
              >
                Prenota Ora
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal Custom */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-slide-up relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900">ACCESSO ADMIN</h3>
              <p className="text-gray-500 text-sm mt-1">Inserisci le tue credenziali</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Username</label>
                <input 
                  type="text" 
                  autoFocus
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-all text-gray-900 font-medium"
                  placeholder="Nome utente"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Password</label>
                <input 
                  type="password" 
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-all text-gray-900 font-medium"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg active:scale-95"
              >
                Accedi
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
