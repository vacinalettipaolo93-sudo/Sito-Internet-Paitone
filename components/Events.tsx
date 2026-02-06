
import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const events = [
    {
      title: "Torneo Open d'Inverno",
      date: "15-20 Marzo 2024",
      type: "Tennis",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Padel Night - Social Game",
      date: "Ogni Venerdì sera",
      type: "Padel",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Clinic con Maestro Nazionale",
      date: "10 Aprile 2024",
      type: "Tennis/Padel",
      image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !formData.name || !formData.phone) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "event_registrations"), {
        eventTitle: selectedEvent,
        userName: formData.name,
        userPhone: formData.phone,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedEvent(null);
        setFormData({ name: '', phone: '' });
      }, 3000);
    } catch (error) {
      console.error("Errore iscrizione evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase">EVENTI E TORNEI</h2>
            <p className="text-gray-600">Non solo gioco libero: entra nel circuito competitivo del Paitone Sport Center. Tornei ufficiali e amatoriali per tutti i livelli.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 transition-all hover:bg-gray-100 group">
              <div className="aspect-video rounded-xl overflow-hidden mb-6 shadow-md">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="px-2">
                <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{ev.type}</span>
                <h3 className="text-xl font-black text-gray-900 mt-1 mb-2 leading-tight">{ev.title}</h3>
                <p className="text-sm text-gray-500 font-medium mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  {ev.date}
                </p>
                <button 
                  onClick={() => setSelectedEvent(ev.title)}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-colors"
                >
                  ISCRIVITI ORA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Iscrizione */}
        {selectedEvent && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
              {success ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Iscrizione Completata!</h3>
                  <p className="text-gray-500 mt-2">Ti aspettiamo in campo per l'evento.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black uppercase text-gray-900 leading-tight">Iscrizione a:<br/><span className="text-green-600 text-lg">{selectedEvent}</span></h3>
                    <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
                  </div>
                  <form onSubmit={handleRegistration} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Nome Completo</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="Es: Mario Rossi"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Telefono</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="Es: +39 333 1234567"
                      />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center"
                    >
                      {loading ? 'INVIO IN CORSO...' : 'CONFERMA ISCRIZIONE'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
