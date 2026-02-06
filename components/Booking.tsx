
import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Booking: React.FC = () => {
  const [sport, setSport] = useState<'tennis' | 'padel'>('padel');
  const [court, setCourt] = useState<string>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    '09:00', '10:30', '12:00', '14:30', '16:00', '17:30', '19:00', '20:30', '22:00'
  ];

  const tennisCourts = ['Campo 1', 'Campo 2'];
  const padelCourts = ['Campo 1', 'Campo 2', 'Campo 3'];

  const handleBooking = async () => {
    if (!court || !date || !time) {
      alert("Seleziona campo, data e orario");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        sport,
        courtName: court,
        date,
        time,
        status: 'confirmed',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setCourt('');
        setDate('');
        setTime('');
      }, 3000);
    } catch (error) {
      console.error("Errore salvataggio prenotazione:", error);
      alert("Errore durante la prenotazione. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-green-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-green-100">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">PRENOTA IL TUO CAMPO</h2>
              <p className="text-gray-600">Gestisci la tua sessione sportiva in pochi click.</p>
            </div>

            {success ? (
              <div className="text-center py-12 animate-slide-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Prenotazione Inviata!</h3>
                <p className="text-gray-500">I dati sono stati salvati correttamente.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Sport Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { setSport('tennis'); setCourt(''); }}
                    className={`py-4 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                      sport === 'tennis' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'
                    }`}
                  >
                    <span className={`text-2xl mb-1 ${sport === 'tennis' ? 'opacity-100' : 'opacity-30'}`}>🎾</span>
                    <span className={`font-black uppercase text-sm ${sport === 'tennis' ? 'text-green-700' : 'text-gray-400'}`}>Tennis Veloce</span>
                  </button>
                  <button 
                    onClick={() => { setSport('padel'); setCourt(''); }}
                    className={`py-4 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                      sport === 'padel' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <span className={`text-2xl mb-1 ${sport === 'padel' ? 'opacity-100' : 'opacity-30'}`}>🏸</span>
                    <span className={`font-black uppercase text-sm ${sport === 'padel' ? 'text-blue-700' : 'text-gray-400'}`}>Padel Indoor</span>
                  </button>
                </div>

                {/* Court Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-3 tracking-widest">Scegli il Campo</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(sport === 'tennis' ? tennisCourts : padelCourts).map((c) => (
                      <button 
                        key={c}
                        onClick={() => setCourt(c)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all ${
                          court === c ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-3 tracking-widest">Data</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-green-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-3 tracking-widest">Orario</label>
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-green-500 focus:outline-none transition-all appearance-none"
                    >
                      <option value="">Seleziona...</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-green-900/10 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center"
                  >
                    {loading ? (
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "CONFERMA PRENOTAZIONE"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
