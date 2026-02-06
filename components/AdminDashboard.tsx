
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
  
  const [newBooking, setNewBooking] = useState({
    sport: 'tennis' as 'tennis' | 'padel',
    court: 'Campo 1',
    date: new Date().toISOString().split('T')[0],
    time: '',
    clientName: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qb = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribeBookings = onSnapshot(qb, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Firestore Bookings Error:", error));

    const qe = query(collection(db, "event_registrations"), orderBy("createdAt", "desc"));
    const unsubscribeEvents = onSnapshot(qe, (snapshot) => {
      setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Firestore Events Error:", error));

    return () => {
      unsubscribeBookings();
      unsubscribeEvents();
    };
  }, []);

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.date || !newBooking.time) return alert("Seleziona data e orario");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        sport: newBooking.sport,
        courtName: newBooking.court,
        date: newBooking.date,
        time: newBooking.time,
        clientName: newBooking.clientName || 'Prenotazione Manuale',
        status: 'manual',
        createdAt: serverTimestamp()
      });
      alert("Prenotazione salvata con successo!");
      setNewBooking({ ...newBooking, time: '', clientName: '' });
      setActiveTab('bookings');
    } catch (error) {
      console.error(error);
      alert("Errore durante il salvataggio. Verifica le regole di sicurezza di Firestore.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    if(confirm("Sei sicuro di voler eliminare questa prenotazione?")) {
      try {
        await deleteDoc(doc(db, "bookings", id));
      } catch (error) {
        alert("Errore durante l'eliminazione.");
      }
    }
  };

  // Genera orari Tennis: 1 ora, selezionabile ogni 30 minuti (es: 12:00-13:00 o 12:30-13:30)
  const tennisTimes = [];
  for(let h=8; h<22; h++) {
    const hh = h.toString().padStart(2, '0');
    const hhNext = (h+1).toString().padStart(2, '0');
    tennisTimes.push(`${hh}:00 - ${hhNext}:00`);
    tennisTimes.push(`${hh}:30 - ${hhNext}:30`);
  }

  // Genera orari Padel: Slot fissi da 90 minuti (1.5h)
  const padelTimes = [
    "08:00 - 09:30", "09:30 - 11:00", "11:00 - 12:30", "12:30 - 14:00", 
    "14:00 - 15:30", "15:30 - 17:00", "17:00 - 18:30", "18:30 - 20:00", 
    "20:00 - 21:30", "21:30 - 23:00"
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen animate-slide-up">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">AREA GESTIONALE</h1>
          <p className="text-gray-500 font-medium">Benvenuto, Paitonearena</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-2xl shadow-inner border border-gray-200">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase transition-all ${activeTab === 'bookings' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Agenda
            </button>
            <button 
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase transition-all ${activeTab === 'manual' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              + Inserimento
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase transition-all ${activeTab === 'events' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Iscritti
            </button>
          </div>
          
          <button onClick={onBackToSite} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Sito
          </button>
        </div>
      </div>

      {activeTab === 'manual' && (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-3xl mx-auto border border-gray-100 animate-slide-up">
          <h2 className="text-2xl font-black mb-8 text-center uppercase tracking-tight text-gray-800">Nuova Prenotazione Campo</h2>
          <form onSubmit={handleManualBooking} className="space-y-8">
            <div className="grid grid-cols-2 gap-4 p-1 bg-gray-50 rounded-2xl border border-gray-100">
              <button 
                type="button"
                onClick={() => setNewBooking({...newBooking, sport: 'tennis', court: 'Campo 1'})}
                className={`py-4 rounded-xl font-black uppercase text-xs transition-all flex flex-col items-center gap-2 ${newBooking.sport === 'tennis' ? 'bg-white text-green-600 shadow-md border-green-100 border' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="text-2xl">🎾</span> Tennis (1h)
              </button>
              <button 
                type="button"
                onClick={() => setNewBooking({...newBooking, sport: 'padel', court: 'Campo 1'})}
                className={`py-4 rounded-xl font-black uppercase text-xs transition-all flex flex-col items-center gap-2 ${newBooking.sport === 'padel' ? 'bg-white text-blue-600 shadow-md border-blue-100 border' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="text-2xl">🏸</span> Padel (1.5h)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-3 ml-1 tracking-widest">Campo</label>
                <div className="flex flex-wrap gap-2">
                  {(newBooking.sport === 'tennis' ? ['Campo 1', 'Campo 2'] : ['Campo 1', 'Campo 2', 'Campo 3']).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewBooking({...newBooking, court: c})}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${newBooking.court === c ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-3 ml-1 tracking-widest">Data</label>
                <input 
                  type="date"
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 font-bold text-gray-700"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-3 ml-1 tracking-widest">Orario Disponibile</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
                {(newBooking.sport === 'tennis' ? tennisTimes : padelTimes).map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setNewBooking({...newBooking, time})}
                    className={`py-3 rounded-xl text-[10px] font-black border-2 transition-all ${newBooking.time === time ? 'bg-green-600 border-green-600 text-white shadow-lg' : 'bg-white border-white text-gray-600 hover:border-green-400'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-3 ml-1 tracking-widest">Cliente / Nota</label>
              <input 
                type="text"
                placeholder="Es: Rossi Mario - 3331234567"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:outline-none focus:border-green-500 transition-all shadow-inner"
                value={newBooking.clientName}
                onChange={(e) => setNewBooking({...newBooking, clientName: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-900/10 transition-all uppercase tracking-widest text-lg disabled:opacity-50"
            >
              {loading ? 'Salvataggio...' : 'Conferma Prenotazione'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Sport</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Campo</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Data</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Ora</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Cliente</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">Nessun affitto in archivio</td></tr>
                )}
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${b.sport === 'tennis' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {b.sport}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900">{b.courtName}</td>
                    <td className="px-6 py-4 text-gray-600 font-bold">{b.date}</td>
                    <td className="px-6 py-4 text-gray-900 font-black">{b.time}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium truncate max-w-[200px]">{b.clientName}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => deleteBooking(b.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all group">
                        <svg className="w-5 h-5 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
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
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Evento</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Nome Iscritto</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Telefono</th>
                  <th className="px-6 py-5 text-xs font-black uppercase text-gray-400 tracking-wider">Registrazione</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {registrations.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">Nessun iscritto trovato</td></tr>
                )}
                {registrations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-black text-gray-900">{r.eventTitle}</td>
                    <td className="px-6 py-4 text-gray-700 font-bold uppercase">{r.userName}</td>
                    <td className="px-6 py-4 text-green-600 font-black">{r.userPhone}</td>
                    <td className="px-6 py-4 text-gray-400 text-[10px] uppercase font-bold">
                      {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString('it-IT') : 'Recente'}
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
