import { useState } from 'react';
import { ArrowRight, Flame, Wine, Sparkles, X } from 'lucide-react';
import truffleChitarra from '@/assets/truffle_chitarra.jpg';


interface BentoGridProps {
  setCurrentScreen: (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => void;
  setMenuCategoryFilter: (category: 'all' | 'appetizer' | 'main' | 'dessert' | 'cocktail') => void;
}

export default function BentoGrid({ setCurrentScreen, setMenuCategoryFilter }: BentoGridProps) {
  const [grillModalOpen, setGrillModalOpen] = useState(false);

  const handleTruffleClick = () => {
    setMenuCategoryFilter('main');
    setCurrentScreen('menu');
  };

  const handleMixologyClick = () => {
    setMenuCategoryFilter('cocktail');
    setCurrentScreen('menu');
  };

  return (
    <section className="py-20 max-w-[1120px] mx-auto px-6 md:px-16" id="bento-grid-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <span className="font-sans text-[10px] text-secondary tracking-[0.25em] mb-2 block uppercase">
            CURATIONS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-on-surface">The Evening Selection</h2>
        </div>
        <button 
          onClick={() => {
            setMenuCategoryFilter('all');
            setCurrentScreen('menu');
          }}
          className="text-primary font-sans text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:underline transition-all cursor-pointer group"
          id="view-full-menu-link"
        >
          <span>View full menu</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-auto md:h-[600px]">
        {/* Main Feature: Truffle Pasta */}
        <div 
          onClick={handleTruffleClick}
          className="col-span-12 md:col-span-7 h-[350px] md:h-full group relative overflow-hidden rounded-xl bg-surface-container-high border border-white/5 transition-all duration-500 hover:border-primary/30 cursor-pointer"
          id="bento-card-truffle"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ 
              backgroundImage: `url(${truffleChitarra})` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-primary/20 text-primary border border-primary/20 text-[9px] font-bold tracking-widest px-2.5 py-1 rounded mb-3 inline-block uppercase">
              Seasonal Feature
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-on-surface mb-2">The Truffle Series</h3>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-md leading-relaxed">
              Limited seasonal curations featuring rare Earth elements, brass-molded Chitarra pasta, and fresh grated Umbrian black diamonds.
            </p>
          </div>
        </div>

        {/* Secondary Stacks */}
        <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-6 h-auto md:h-full">
          {/* Cocktail Grid */}
          <div 
            onClick={handleMixologyClick}
            className="group relative overflow-hidden rounded-xl bg-surface-container-high border border-white/5 h-[250px] md:h-full cursor-pointer transition-all duration-500 hover:border-primary/30"
            id="bento-card-mixology"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ 
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAM_wxEpQ4_aKc5uNVFXrYwCUwstYw0li0pZehyKCfcIt98LgK55SFp4xfKBEqI961WQLI-WBdpXTXl0OF4H4c9U2JPKISKhuxx12re5KxkGyT5ziM6G18XHh7i5BisJg0zjb-TGPUnfbNIKyVOxFJZVZHDNTqR6XGxu7wfIRVqS2dlNHnQuEpJ-_4ltf5LS83ZHx0MnEhEUzZlFrHClvjM0ark-BRlAJ-t547jtCz7sk7Z6zU8PTEJXInp7nOTP1Iyys_R7jPQs0c')" 
              }}
            />
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] transition-all duration-500 group-hover:backdrop-blur-none group-hover:bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
              <div>
                <h3 className="font-serif text-2xl text-on-surface mb-3 tracking-wide">Botanical Mixology</h3>
                <span className="text-primary font-sans text-[10px] font-bold tracking-[0.2em] border-b border-primary/40 pb-1 uppercase group-hover:border-primary transition-all">
                  Drinks List
                </span>
              </div>
            </div>
          </div>

          {/* Flame Grilling Grid */}
          <div 
            onClick={() => setGrillModalOpen(true)}
            className="group relative overflow-hidden rounded-xl bg-surface-container-high border border-white/5 p-8 flex flex-col justify-end h-[250px] md:h-full cursor-pointer transition-all duration-500 hover:border-primary/30"
            id="bento-card-grilling"
          >
            <div className="absolute top-8 right-8 text-primary group-hover:scale-110 transition-transform duration-500">
              <Flame className="w-10 h-10 stroke-1" />
            </div>
            <div>
              <span className="text-primary font-sans text-[10px] font-bold tracking-[0.2em] block uppercase mb-2">
                Hearth Fire Cooking
              </span>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Live Fire Grilling</h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Traditional hearth cooking meets modern precision. Every wood ember tells a deep, smoky story. Click to view techniques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grilling details modal */}
      {grillModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-surface-container border border-white/10 p-8 rounded-xl max-w-lg w-full relative editorial-shadow">
            <button 
              onClick={() => setGrillModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer text-xs font-semibold tracking-wider uppercase bg-white/5 px-3 py-1.5 rounded"
              id="grill-modal-close"
            >
              Close
            </button>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary-container/20 p-2.5 rounded-lg border border-primary-container/20">
                  <Flame className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-sans text-[10px] text-primary tracking-[0.2em] uppercase block">Technique Spotlight</span>
                  <h3 className="font-serif text-2xl text-on-surface">The Open Hearth Philosophy</h3>
                </div>
              </div>

              <div className="w-full h-40 rounded-lg overflow-hidden relative">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEku8LM5dZRr4qAym1aAn4jN6rKfesku272hiuWWCPZIZ0RZZmN_sYKAPqSjqcWogaInQzABli3ymc7RUhwVNJAz9Iq38_LptK-gJ0LcjAng8OPKxTI--_NCUKfKeJoq03_Vcm8grSo5dsYKgNcs8ZPe7XXB9EbWHQxd9tTg5hIM8ilO4QdPxGsuYLokj5wigcPHfe0qfb2wm_yKjgeHGC7urzkeh2cgtttMKWiMo7QnDClGyT1iZp4KNqfPy7Qk4CpqT6CD_2j1I')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="space-y-4 font-sans text-xs text-on-surface-variant leading-relaxed">
                <p>
                  At Bite Boulevard, we use zero gas or electric heating elements in our primary cooking line. Everything is seared or roasted over live coals.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-surface-container-high rounded border border-white/5">
                    <span className="font-serif italic text-primary block text-sm mb-1">Oak & Hickory</span>
                    <p className="text-[11px]">Provides stable high-heat, yielding a deep classic woodshed aroma and uniform sear.</p>
                  </div>
                  <div className="p-3 bg-surface-container-high rounded border border-white/5">
                    <span className="font-serif italic text-secondary block text-sm mb-1">Cherry & Apple</span>
                    <p className="text-[11px]">Infuses game birds and pork with sweet, fruity flavor notes and beautiful caramelized glazing.</p>
                  </div>
                </div>
                <p className="text-[11px] italic text-primary/80">
                  Chef Ethan Sterling recommends our Oak-Grilled Duck Breast to experience the full density of hearth fire cooking.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setGrillModalOpen(false);
                    setMenuCategoryFilter('main');
                    setCurrentScreen('menu');
                  }}
                  className="bg-primary text-on-primary font-sans text-xs font-semibold py-3 px-6 rounded uppercase tracking-widest hover:bg-primary-container transition-all cursor-pointer"
                  id="grill-modal-view-mains"
                >
                  Explore Mains
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
