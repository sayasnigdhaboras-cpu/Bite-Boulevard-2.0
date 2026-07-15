import React, { useState } from 'react';
import { Calendar, Users, Info } from 'lucide-react';

interface ReservationSectionProps {
  setCurrentScreen: (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => void;
  bookingDraft: { date: string; guests: number };
  setBookingDraft: (draft: { date: string; guests: number }) => void;
}

export default function ReservationSection({
  setCurrentScreen,
  bookingDraft,
  setBookingDraft
}: ReservationSectionProps) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDraft.date) {
      setErrorMsg('Please select a date for your nocturnal experience.');
      return;
    }
    setErrorMsg('');
    setCurrentScreen('book');
  };

  return (
    <section className="bg-surface-container-lowest py-20" id="teaser-reservation-section">
      <div className="max-w-[1120px] mx-auto px-6 md:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-surface-container rounded-xl p-6 md:p-12 editorial-shadow border border-white/5">
          {/* Image visualizer */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative group">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ 
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEku8LM5dZRr4qAym1aAn4jN6rKfesku272hiuWWCPZIZ0RZZmN_sYKAPqSjqcWogaInQzABli3ymc7RUhwVNJAz9Iq38_LptK-gJ0LcjAng8OPKxTI--_NCUKfKeJoq03_Vcm8grSo5dsYKgNcs8ZPe7XXB9EbWHQxd9tTg5hIM8ilO4QdPxGsuYLokj5wigcPHfe0qfb2wm_yKjgeHGC7urzkeh2cgtttMKWiMo7QnDClGyT1iZp4KNqfPy7Qk4CpqT6CD_2j1I')" 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans tracking-wider">
                <span className="text-on-surface/90 font-medium font-serif italic">The Main Salon Booths</span>
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Level 1 Tonal</span>
              </div>
            </div>
          </div>

          {/* Booking Draft Inputs */}
          <div className="w-full lg:w-1/2">
            <span className="font-sans text-[10px] text-primary tracking-[0.25em] mb-3 block uppercase font-semibold">
              INTIMATE ATMOSPHERE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface mb-4 leading-tight">
              Reserve your evening <br />
              at the Boulevard.
            </h2>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-8 leading-relaxed">
              Our tables are carefully spaced to ensure a private and focused dining experience. We recommend booking at least 48 hours in advance for weekend service.
            </p>

            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block mb-2 font-semibold">
                    DATE
                  </label>
                  <div className="relative">
                    <input 
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDraft.date}
                      onChange={(e) => setBookingDraft({ ...bookingDraft, date: e.target.value })}
                      className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-sm text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all cursor-pointer"
                      id="teaser-input-date"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block mb-2 font-semibold">
                    GUESTS
                  </label>
                  <select 
                    value={bookingDraft.guests}
                    onChange={(e) => setBookingDraft({ ...bookingDraft, guests: Number(e.target.value) })}
                    className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-sm text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all cursor-pointer"
                    id="teaser-select-guests"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-400 text-xs flex items-center gap-1.5 animate-bounce">
                  <Info className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </p>
              )}

              <button 
                type="submit"
                className="w-full bg-primary text-on-primary font-sans text-xs font-bold py-4 rounded-lg hover:bg-primary-container transition-all cursor-pointer uppercase tracking-widest shadow-xl active:scale-[0.98]"
                id="teaser-confirm-btn"
              >
                Confirm Seating Area
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
