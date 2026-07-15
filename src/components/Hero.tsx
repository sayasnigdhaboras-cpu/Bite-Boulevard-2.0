import { useState } from 'react';
import { ArrowRight, Sparkles, Flame, ShieldAlert, Award } from 'lucide-react';

interface HeroProps {
  setCurrentScreen: (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => void;
}

export default function Hero({ setCurrentScreen }: HeroProps) {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section className="relative w-full h-[650px] md:h-[870px] flex items-center overflow-hidden">
      {/* Background with zoom parallax-ish entry */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] scale-110 hover:scale-100" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZV9Ja2LmNc7R87_s_urMy0HcDAk8-sO0K3AI-YCXjiWH3A4_JthyedLq5HxBbsVVR52iC9UaBTu91eRj-4Io0kVDbNYmMwsckSBgj1JdzAU8XD76VNqm1JKL5LV2X_cQ=s400')",
          }}
          id="hero-bg-img"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-16 w-full">
        <div className="max-w-2xl animate-in fade-in slide-in-from-left-6 duration-700">
          <span className="font-sans text-xs text-primary font-bold tracking-[0.25em] mb-6 block uppercase">
            Culinaria Obscura
          </span>
          <h1 className="font-serif text-4xl md:text-[52px] text-on-surface mb-4 leading-tight">
            Artistry in every <br />
            <span className="italic text-primary-fixed-dim">Nocturnal</span> bite.
          </h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            Experience a refined journey where traditional culinary techniques meet the modern editorial precision of Bite Boulevard.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={() => setCurrentScreen('menu')}
              className="terracotta-gradient text-white px-10 py-4 rounded-lg font-sans text-xs font-bold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-xl uppercase cursor-pointer"
              id="hero-explore-menu-btn"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => setStoryOpen(true)}
              className="ghost-border text-on-surface hover:bg-white/5 px-10 py-4 rounded-lg font-sans text-xs font-bold tracking-widest active:scale-[0.98] transition-all uppercase text-center cursor-pointer"
              id="hero-our-story-btn"
            >
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Our Story Modal */}
      {storyOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-surface-container border border-white/10 p-8 rounded-xl max-w-2xl w-full relative max-h-[85vh] overflow-y-auto editorial-shadow">
            <button 
              onClick={() => setStoryOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer text-sm font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
              id="story-modal-close"
            >
              Close
            </button>
            
            <div className="space-y-6">
              <div>
                <span className="font-sans text-[10px] text-primary tracking-[0.25em] uppercase block mb-1">Our Philosophy</span>
                <h3 className="font-serif text-3xl text-on-surface">The Story of Bite Boulevard</h3>
              </div>
              
              <div className="w-full h-48 rounded-lg overflow-hidden relative">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMU4zvYWkJ4IQv_x_Y0dQiV4Goh6E9PPGW5l7-qvVs7QKfcVRchWUYCRsXYDy9F89bFDlo-RDUWeAUDlhAczvJTVmxxYyi35EXgn9QnKf9SEwMCZq5DhiNrVOqcfNpLw=s400')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-primary font-serif italic text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Established NYC • Two Michelin Stars Aspirations</span>
                </div>
              </div>

              <div className="font-sans text-sm text-on-surface-variant space-y-4 leading-relaxed">
                <p>
                  Founded in the twilight of 2022 in Manhattan, <strong className="text-on-surface font-semibold">Bite Boulevard</strong> was conceived as a reaction against standard, bright, sterile dining establishments. We reimagined what an editorial restaurant could be.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-surface-container-high rounded-lg border border-white/5 flex gap-3">
                    <Flame className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="text-on-surface font-semibold text-xs tracking-wider uppercase mb-1">Hearth & Ember</h4>
                      <p className="text-xs text-on-surface-variant">We cook strictly over hardwood charcoal, oak, and cherry wood coals to preserve elemental flavors.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-high rounded-lg border border-white/5 flex gap-3">
                    <Sparkles className="w-6 h-6 text-secondary flex-shrink-0" />
                    <div>
                      <h4 className="text-on-surface font-semibold text-xs tracking-wider uppercase mb-1">Acoustic Intimacy</h4>
                      <p className="text-xs text-on-surface-variant">Booths are acoustically insulated so that whisper-soft conversations remain private and clear.</p>
                    </div>
                  </div>
                </div>

                <p>
                  Our executive chef, Ethan Sterling, sources rare minerals, salt cultures, and vintage grapes from isolated terroirs worldwide. Bite Boulevard remains a testament to what happens when artistry meets nocturnal elegance.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    setStoryOpen(false);
                    setCurrentScreen('book');
                  }}
                  className="bg-primary text-on-primary font-sans text-xs font-bold py-3 px-6 rounded-lg uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
                  id="story-modal-reserve-btn"
                >
                  <span>Experience it tonight</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
