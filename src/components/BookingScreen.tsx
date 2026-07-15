import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Users, Clock, Info, CheckCircle2, ChevronRight, MapPin, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { Reservation, SeatingZone } from '../types';
import { seatingZones } from '../data';

interface BookingScreenProps {
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  bookingDraft: { date: string; guests: number };
  setBookingDraft: (draft: { date: string; guests: number }) => void;
}

export default function BookingScreen({
  user,
  setUser,
  bookingDraft,
  setBookingDraft
}: BookingScreenProps) {
  // Fetch existing reservations from localStorage
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>('z4'); // Default Main Salon
  const [selectedTime, setSelectedTime] = useState<string>('19:30');
  
  // Contact details
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  
  // Feedback
  const [bookingSuccess, setBookingSuccess] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = ['17:30', '18:00', '19:00', '19:30', '20:30', '21:00', '22:00', '22:30'];

  useEffect(() => {
    const stored = localStorage.getItem('bite_boulevard_reservations');
    if (stored) {
      try {
        setReservations(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync user info if logged in
  useEffect(() => {
    if (user) {
      setContactName(user.name);
      setContactEmail(user.email);
    }
  }, [user]);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDraft.date) {
      setErrorMsg('Please select a valid date.');
      return;
    }
    if (!contactName || !contactEmail || !contactPhone) {
      setErrorMsg('Please complete all contact details to secure your booking.');
      return;
    }

    // Generate random reservation code
    const resCode = 'BB-' + Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
    const zoneName = seatingZones.find(z => z.id === selectedZone)?.name || 'Main Salon';

    const newReservation: Reservation = {
      id: resCode,
      date: bookingDraft.date,
      time: selectedTime,
      guests: bookingDraft.guests,
      seatingZone: zoneName,
      specialRequest: specialRequest,
      contactName: contactName,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updated = [newReservation, ...reservations];
    setReservations(updated);
    localStorage.setItem('bite_boulevard_reservations', JSON.stringify(updated));
    setBookingSuccess(newReservation);
    setErrorMsg('');

    // If user wasn't logged in, log them in for session continuity
    if (!user) {
      setUser({ name: contactName, email: contactEmail });
    }
  };

  const handleCancelBooking = (id: string) => {
    if (window.confirm(`Are you sure you want to cancel reservation ${id}?`)) {
      const updated = reservations.map(r => 
        r.id === id ? { ...r, status: 'cancelled' as const } : r
      );
      setReservations(updated);
      localStorage.setItem('bite_boulevard_reservations', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-16 py-12 md:py-20 animate-in fade-in duration-300" id="booking-screen-view">
      
      {bookingSuccess ? (
        /* Success Screen / Digital Ticket Pass Card */
        <div className="max-w-xl mx-auto space-y-8 animate-in zoom-in-95 duration-300" id="booking-success-ticket">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold block uppercase">
              CONFIRMED EXPERIENCED
            </span>
            <h2 className="font-serif text-3xl text-on-surface">Your evening is secured.</h2>
            <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto">
              An elegant confirmation pass has been dispatched to <strong className="text-on-surface font-medium">{bookingSuccess.contactEmail}</strong>.
            </p>
          </div>

          {/* Digital Ticket Pass */}
          <div className="bg-surface-container border border-white/10 rounded-xl overflow-hidden editorial-shadow">
            {/* Header branding */}
            <div className="bg-surface-container-high border-b border-white/5 p-6 flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg text-primary font-bold">Bite Boulevard</h4>
                <p className="font-sans text-[9px] text-on-surface-variant tracking-wider uppercase">NOCTURNAL RESERVATION PASS</p>
              </div>
              <div className="text-right">
                <span className="font-sans text-[9px] text-on-surface-variant block uppercase">CODE</span>
                <span className="font-mono text-sm font-bold text-on-surface">{bookingSuccess.id}</span>
              </div>
            </div>

            {/* Ticket details */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-[10px] text-on-surface-variant font-sans tracking-widest block uppercase mb-1">DATE</span>
                  <p className="font-serif italic text-on-surface font-medium">{bookingSuccess.date}</p>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant font-sans tracking-widest block uppercase mb-1">TIME</span>
                  <p className="font-sans text-on-surface font-semibold">{bookingSuccess.time} PM</p>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant font-sans tracking-widest block uppercase mb-1">TABLE FOR</span>
                  <p className="font-sans text-on-surface font-semibold">{bookingSuccess.guests} {bookingSuccess.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant font-sans tracking-widest block uppercase mb-1">ZONE</span>
                  <p className="font-sans text-primary font-semibold text-xs tracking-wide">{bookingSuccess.seatingZone}</p>
                </div>
              </div>

              {bookingSuccess.specialRequest && (
                <div className="pt-4 border-t border-white/5 text-xs text-on-surface-variant">
                  <span className="font-sans text-[9px] tracking-widest block uppercase mb-1 font-semibold">DIRECTIONS FOR CHEF</span>
                  <p className="italic bg-surface-container-low p-3 rounded border border-white/5">{bookingSuccess.specialRequest}</p>
                </div>
              )}

              {/* Graphic barcode/QR block */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Nocturnal Elegance Confirmed</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant max-w-[280px]">Please arrive exactly 10 minutes prior to reservation. We hold tables for a maximum of 15 minutes.</p>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded flex-shrink-0 flex flex-col justify-between items-center border border-white/10" title="Validation QR Code">
                  {/* Stylized custom QR block */}
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full bg-black">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-full h-full ${
                          (i % 3 === 0 || i % 5 === 2 || i === 0 || i === 15) ? 'bg-white' : 'bg-black'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom links */}
            <div className="bg-surface-container-high border-t border-white/5 p-4 flex justify-between items-center text-xs">
              <button 
                onClick={() => {
                  alert('Added BB Reservation pass to system calendar.');
                }}
                className="text-primary hover:underline font-semibold tracking-wider uppercase text-[10px] cursor-pointer"
              >
                + Google Calendar
              </button>
              <button 
                onClick={() => setBookingSuccess(null)}
                className="text-on-surface-variant hover:text-on-surface font-semibold tracking-wider uppercase text-[10px] cursor-pointer"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Form & History Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="booking-form-and-history">
          
          {/* Main reservation form column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold block uppercase">
                TABLE MANAGEMENT
              </span>
              <h2 className="font-serif text-4xl text-on-surface leading-tight">Secure your evening</h2>
              <p className="font-sans text-xs text-on-surface-variant">
                Experience a hand-tailored nocturnal dining service. Each seating zone offers distinct architectural and sensory immersion.
              </p>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-8">
              
              {/* Seating Zones Selection cards */}
              <div className="space-y-4">
                <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block font-semibold">
                  SELECT SEATING SPACE
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seatingZones.map((zone) => (
                    <div 
                      key={zone.id}
                      onClick={() => setSelectedZone(zone.id)}
                      className={`group border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 relative ${
                        selectedZone === zone.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-white/5 bg-surface-container hover:border-white/10'
                      }`}
                      id={`zone-card-${zone.id}`}
                    >
                      <div className="h-32 relative overflow-hidden bg-surface-container-high">
                        <img 
                          src={zone.image} 
                          alt={zone.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-[10px] font-sans font-semibold text-on-surface bg-black/50 px-2 py-0.5 rounded">
                          {zone.capacityInfo}
                        </span>
                        {zone.additionalCost ? (
                          <span className="absolute top-3 right-3 text-[9px] font-sans font-bold bg-primary text-on-primary px-2 py-1 rounded uppercase tracking-widest">
                            +${zone.additionalCost} Booking Fee
                          </span>
                        ) : (
                          <span className="absolute top-3 right-3 text-[9px] font-sans font-bold bg-white/10 text-on-surface px-2 py-1 rounded uppercase tracking-widest">
                            Standard
                          </span>
                        )}
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h4 className="font-serif text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {zone.name}
                        </h4>
                        <p className="text-[11px] font-sans text-on-surface-variant leading-relaxed">
                          {zone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Guests Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container p-6 rounded-xl border border-white/5">
                <div>
                  <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block mb-2 font-semibold">
                    DATE FOR THE NOCTURNAL
                  </label>
                  <input 
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDraft.date}
                    onChange={(e) => setBookingDraft({ ...bookingDraft, date: e.target.value })}
                    className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all cursor-pointer"
                    id="booking-input-date"
                  />
                </div>
                <div>
                  <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block mb-2 font-semibold">
                    PORTIONS / GUESTS
                  </label>
                  <select 
                    value={bookingDraft.guests}
                    onChange={(e) => setBookingDraft({ ...bookingDraft, guests: Number(e.target.value) })}
                    className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all cursor-pointer"
                    id="booking-select-guests"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots Selection */}
              <div className="space-y-4">
                <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block font-semibold">
                  SELECT DINING HOUR
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3.5 rounded-lg font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                        selectedTime === slot 
                          ? 'bg-primary border-primary text-on-primary font-bold shadow-lg shadow-primary/15' 
                          : 'bg-surface-container border-white/5 text-on-surface-variant hover:text-on-surface hover:border-white/10'
                      }`}
                      id={`time-slot-${slot}`}
                    >
                      {slot} PM
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4">
                <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block font-semibold">
                  CONTACT DETAILS
                </label>
                <div className="bg-surface-container p-6 rounded-xl border border-white/5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Marcus Aurelius"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-surface-container-high border border-white/5 rounded-lg p-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all placeholder:text-white/20"
                        id="booking-contact-name"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1">Contact Phone</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. (212) 555-1990"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-surface-container-high border border-white/5 rounded-lg p-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all placeholder:text-white/20"
                        id="booking-contact-phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1">Email Address (for Digital Confirmation Pass)</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. marcus@stoic.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-surface-container-high border border-white/5 rounded-lg p-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all placeholder:text-white/20"
                      id="booking-contact-email"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block font-semibold">
                  SPECIAL INSTRUCTIONS OR DIETARY RESTRICTIONS (OPTIONAL)
                </label>
                <textarea 
                  placeholder="e.g. Celebrating our anniversary, severe shellfish allergen, request table closer to hearthfire..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-surface-container-high border border-white/10 rounded-lg p-4 text-xs text-on-surface focus:border-primary focus:outline-none transition-all placeholder:text-white/20 h-24 resize-none"
                  id="booking-special-requests"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/5 p-4 rounded border border-red-400/15">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Book Table Action Button */}
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary font-sans text-xs font-bold py-4 rounded-lg hover:bg-primary-container transition-all cursor-pointer uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                id="booking-form-submit"
              >
                <span>Confirm reservation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Sidebar Booking History / Details card column */}
          <div className="space-y-6">
            <div className="bg-surface-container border border-white/5 p-6 rounded-xl space-y-6">
              <h3 className="font-serif text-lg text-on-surface flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Your Active Bookings</span>
              </h3>

              {reservations.length > 0 ? (
                <div className="space-y-4" id="reservations-list">
                  {reservations.map((res) => (
                    <div 
                      key={res.id}
                      className={`p-4 rounded-lg border flex flex-col justify-between ${
                        res.status === 'cancelled' 
                          ? 'bg-black/20 border-white/5 opacity-50' 
                          : 'bg-surface-container-high border-white/10'
                      }`}
                      id={`history-res-card-${res.id}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-on-surface">{res.id}</span>
                          <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider">{res.seatingZone}</span>
                        </div>
                        <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          res.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                        }`}>
                          {res.status}
                        </span>
                      </div>
                      
                      <div className="text-xs text-on-surface-variant space-y-1 mb-3">
                        <p>Date: <strong className="text-on-surface font-semibold">{res.date}</strong></p>
                        <p>Time: <strong className="text-on-surface font-semibold">{res.time} PM</strong></p>
                        <p>Guests: <strong className="text-on-surface font-semibold">{res.guests} port.</strong></p>
                      </div>

                      {res.status === 'confirmed' && (
                        <div className="flex justify-end pt-2 border-t border-white/5">
                          <button 
                            onClick={() => handleCancelBooking(res.id)}
                            className="text-red-400 hover:text-red-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            id={`cancel-res-btn-${res.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel Booking</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-on-surface-variant text-xs space-y-1.5 border border-dashed border-white/10 rounded-lg">
                  <p>No active reservations.</p>
                  <p className="text-[10px]">Secure a table on the left form to see details here.</p>
                </div>
              )}
            </div>

            <div className="bg-surface-container-low border border-white/5 p-6 rounded-xl space-y-3.5">
              <span className="text-primary font-sans text-[9px] font-bold tracking-[0.2em] block uppercase">POLICY RULES</span>
              <h4 className="font-serif text-sm text-on-surface font-semibold">Important Dining Policies</h4>
              <ul className="text-xs text-on-surface-variant space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>We hold reserved slots for up to <strong className="text-on-surface font-semibold">15 minutes</strong> after scheduled hours.</li>
                <li>Hearth Seating is restricted to guests aged 12 and above due to active open fire proximity.</li>
                <li>Cancellations requested under 24 hours can be completed on this page at zero cost.</li>
                <li>Please dress in modern nocturnal editorial / smart casual attire.</li>
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
