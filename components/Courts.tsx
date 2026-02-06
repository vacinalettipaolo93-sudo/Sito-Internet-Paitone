
import React from 'react';

const Courts: React.FC = () => {
  const courtData = [
    {
      title: "Tennis Veloce",
      count: 2,
      surface: "Hard Court (Cemento)",
      description: "Campi outdoor veloci, perfetti per migliorare il servizio e il gioco a rete.",
      image: "https://images.unsplash.com/photo-1595435064214-0da067d05f32?auto=format&fit=crop&q=80&w=800",
      color: "border-green-500"
    },
    {
      title: "Padel Italian Padel",
      count: 3,
      surface: "Erba Sintetica Pro",
      description: "Campi panoramici indoor con copertura integrale e vetri di ultima generazione.",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
      color: "border-blue-500"
    }
  ];

  return (
    <section id="courts" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">LE NOSTRE STRUTTURE</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Qualità costruttiva al servizio della performance. Ogni campo è manutenuto quotidianamente per garantire standard eccellenti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {courtData.map((court, idx) => (
            <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-b-8 hover:-translate-y-2">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={court.image} 
                  alt={court.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold">
                  {court.count} CAMPI DISPONIBILI
                </div>
              </div>
              <div className={`p-8 border-t-4 ${court.color}`}>
                <h3 className="text-3xl font-black text-gray-900 mb-3">{court.title}</h3>
                <div className="flex items-center text-gray-500 mb-4 font-semibold text-sm uppercase tracking-wider">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  {court.surface}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {court.description}
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span> Illuminazione LED Philips
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span> Spazi di fuga a norma FIT
                  </li>
                </ul>
                <button className="w-full py-4 border-2 border-gray-900 rounded-xl font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                  DETTAGLI TECNICI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courts;
