import { Share2, Video, Camera } from 'lucide-react';

interface FooterProps {
  setCurrentScreen: (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => void;
  setSelectedArticleId: (id: string | null) => void;
}

export default function Footer({ setCurrentScreen, setSelectedArticleId }: FooterProps) {
  
  const handleNav = (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => {
    setSelectedArticleId(null);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAlert = (topic: string) => {
    alert(`Bite Boulevard ${topic} portal is simulated. Thank you for examining our nocturnal elegance concept!`);
  };

  return (
    <footer className="w-full mt-24 bg-surface-container border-t border-white/5 py-16 text-xs md:text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 max-w-[1120px] mx-auto">
        {/* Brand column */}
        <div className="space-y-4">
          <div 
            onClick={() => handleNav('home')}
            className="font-serif text-lg md:text-xl text-on-surface font-bold cursor-pointer hover:text-primary transition-colors inline-block"
            id="footer-logo"
          >
            Bite Boulevard
          </div>
          <p className="font-sans text-xs text-on-surface-variant max-w-xs leading-relaxed">
            Elevating the nocturnal dining experience through editorial precision and culinary mastery.
          </p>
          <div className="flex space-x-4 text-on-surface-variant">
            <button 
              onClick={() => handleAlert('Share')} 
              className="p-2 hover:text-primary hover:bg-white/5 rounded-full transition-all cursor-pointer"
              title="Share Portal"
              id="footer-social-share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleAlert('Video')} 
              className="p-2 hover:text-primary hover:bg-white/5 rounded-full transition-all cursor-pointer"
              title="The Kitchen Cinema"
              id="footer-social-video"
            >
              <Video className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleAlert('Gallery')} 
              className="p-2 hover:text-primary hover:bg-white/5 rounded-full transition-all cursor-pointer"
              title="Nocturnal Photography"
              id="footer-social-camera"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 1: Navigate */}
        <div className="flex flex-col space-y-3">
          <h5 className="font-sans text-[10px] text-on-surface font-semibold tracking-widest uppercase border-b border-white/10 pb-2 mb-1">
            Navigate
          </h5>
          <button onClick={() => handleNav('home')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={() => handleNav('menu')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Menu
          </button>
          <button onClick={() => handleNav('book')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Book a Table
          </button>
          <button onClick={() => handleNav('orders')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Orders
          </button>
        </div>

        {/* Column 2: Experience */}
        <div className="flex flex-col space-y-3">
          <h5 className="font-sans text-[10px] text-on-surface font-semibold tracking-widest uppercase border-b border-white/10 pb-2 mb-1">
            Experience
          </h5>
          <button onClick={() => handleNav('journal')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            The Journal
          </button>
          <button onClick={() => handleAlert('Locations')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Locations
          </button>
          <button onClick={() => handleAlert('Careers')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Careers
          </button>
          <button onClick={() => handleAlert('Gift Cards')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Gift Cards
          </button>
        </div>

        {/* Column 3: Legal */}
        <div className="flex flex-col space-y-3">
          <h5 className="font-sans text-[10px] text-on-surface font-semibold tracking-widest uppercase border-b border-white/10 pb-2 mb-1">
            Legal
          </h5>
          <button onClick={() => handleAlert('Privacy Policy')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => handleAlert('Terms of Service')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Terms of Service
          </button>
          <button onClick={() => handleAlert('Contact Us')} className="text-left font-sans text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>

      {/* Underbar */}
      <div className="max-w-[1120px] mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-on-surface-variant text-xs gap-4">
        <p className="font-sans text-[11px]">© 2024 Bite Boulevard. All rights reserved.</p>
        <div className="flex items-center space-x-6 text-[11px] font-sans">
          <span>Established in NYC</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="italic text-primary font-serif font-semibold">Nocturnal Elegance System v1.0</span>
        </div>
      </div>
    </footer>
  );
}
