
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'events' | 'manual'>('bookings');
  
  // State per nuova prenotazione manuale
  const [newBooking, setNewBooking] = useState({
    sport: 'tennis',
    court: 'Campo 1',
    date: '',
    time: '',
    clientName: 'Prenotazione Manuale'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qb = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribeBookings = onSnapshot(qb, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qe = query(collection(db, "event_registrations"), orderBy("createdAt", "desc"));
    const unsubscribeEvents = onSnapshot(qe, (snapshot) => {
      setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeBookings();
      unsubscribeEvents();
    };
  }, []);

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.date || !newBooking.time) return alert("Compila tutti i campi");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        sport: newBooking.sport,
        courtName: newBooking.court,
        date: newBooking.date,
        time: newBooking.time,
        clientName: newBooking.clientName,
        status: 'manual',
        createdAt: serverTimestamp()
      });
      alert("Prenotazione salvata!");
      setActiveTab('bookings');
    } catch (error) {
      console.error(error);
      alert("Errore nel salvataggio");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    if(confirm("Eliminare questa prenotazione?")) {
      await deleteDoc(doc(db, "bookings", id));
    }
  };

  // Genera orari Tennis (ogni 30 min per flessibilità 12:00 o 12:30)
  const tennisTimes = [];
  for(let h=8; h<23; h++) {
    tennisTimes.push(`${h.toString().padStart(2, '0')}:00 - ${(h+1).toString().padStart(2, '0')}:00`);
    tennisTimes.push(`${h.toString().padStart(2, '0')}:30 - ${(h+1).toString().padStart(2, '0')}:30`);
  }

  // Genera orari Padel (Slot fissi da 90 min)
  const padelTimes = [
    "08:00 - 09:30", "09:30 - 11:00", "11:00 - 12:30", "12:30 - 14:00", 
    "14:00 - 15:30", "15:30 - 17:00", "17:00 - 18:30", "18:30 - 20:00", 
    "20:00 - 21:30", "21:30 - 23:00"
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen animate-slide-up">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase">Gestione Centro</h1>
          <p className="text-gray-500 font-medium italic">Dashboard Operativa Paitonearena</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Lista Campi
            </button>
            <button 
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'manual' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Nuova Prenot.
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'events' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Eventi
            </button>
          </div>
          
          <button 
            onClick={onBackToSite}
            className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span>Sito Pubblico</span>
          </button>
        </div>
      </div>

      {activeTab === 'manual' && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-green-100 animate-slide-up">
          <h2 className="text-2xl font-black mb-6 uppercase">Inserimento Rapido Campo</h2>
          <form onSubmit={handleManualBooking} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setNewBooking({...newBooking, sport: 'tennis', court: 'Campo 1'})}
                className={`py-4 rounded-2xl border-2 font-black uppercase text-sm transition-all ${newBooking.sport === 'tennis' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}
              >
                🎾 Tennis (1h)
              </button>
              <button 
                type="button"
                onClick={() => setNewBooking({...newBooking, sport: 'padel', court: 'Campo 1'})}
                className={`py-4 rounded-2xl border-2 font-black uppercase text-sm transition-all ${newBooking.sport === 'padel' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-400'}`}
              >
                🏸 Padel (1.5h)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Seleziona Campo</label>
                <select 
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold"
                  value={newBooking.court}
                  onChange={(e) => setNewBooking({...newBooking, court: e.target.value})}
                >
                  {newBooking.sport === 'tennis' ? (
                    <>
                      <option value="Campo 1">Campo 1 (Veloce)</option>
                      <option value="Campo 2">Campo 2 (Veloce)</option>
                    </>
                  ) : (
                    <>
                      <option value="Campo 1">Campo 1 (Indoor)</option>
                      <option value="Campo 2">Campo 2 (Indoor)</option>
                      <option value="Campo 3">Campo 3 (Indoor)</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Data</label>
                <input 
                  type="date"
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Seleziona Orario ({newBooking.sport === 'tennis' ? 'Flessibile 1h' : 'Fisso 1.5h'})</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border-2 border-gray-50 rounded-xl">
                {(newBooking.sport === 'tennis' ? tennisTimes : padelTimes).map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setNewBooking({...newBooking, time})}
                    className={`py-2 px-1 rounded-lg text-[10px] font-black border transition-all ${newBooking.time === time ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-100 hover:border-green-500'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Nome Cliente / Nota</label>
              <input 
                type="text"
                placeholder="Es: Mario Rossi (Tel: 333...)"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold"
                value={newBooking.clientName}
                onChange={(e) => setNewBooking({...newBooking, clientName: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-900/10 transition-all uppercase tracking-widest"
            >
              {loading ? 'Salvataggio...' : 'Conferma Prenotazione Admin'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Sport</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Campo</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Data</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Ora</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 italic">Nessuna prenotazione trovata</td></tr>
                )}
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${b.sport === 'tennis' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {b.sport}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900">{b.courtName}</td>
                    <td className="px-6 py-4 text-gray-600 font-bold">{b.date}</td>
                    <td className="px-6 py-4 text-gray-900 font-black">{b.time}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium truncate max-w-[150px]">{b.clientName || 'Utente Web'}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => deleteBooking(b.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Evento Pubblicato</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Iscritto</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Telefono</th>
                  <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Data Iscr.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {registrations.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">Nessun iscritto agli eventi</td></tr>
                )}
                {registrations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-black text-gray-900">{r.eventTitle}</td>
                    <td className="px-6 py-4 text-gray-700 font-bold uppercase">{r.userName}</td>
                    <td className="px-6 py-4 text-green-600 font-black tracking-tighter">{r.userPhone}</td>
                    <td className="px-6 py-4 text-gray-400 text-[10px] uppercase font-bold">
                      {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString('it-IT') : 'Recente'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
