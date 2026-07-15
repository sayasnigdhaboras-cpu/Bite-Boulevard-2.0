import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ReservationSection from './components/ReservationSection';
import MenuScreen from './components/MenuScreen';
import BookingScreen from './components/BookingScreen';
import OrdersScreen from './components/OrdersScreen';
import JournalScreen from './components/JournalScreen';
import Footer from './components/Footer';
import { OrderItem, MenuItem } from './types';
import { journalArticles } from './data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'menu' | 'book' | 'orders' | 'journal'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  // Shared cart state
  const [cart, setCart] = useState<OrderItem[]>([]);
  
  // Shared user profile state
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Shared booking reservation draft
  const [bookingDraft, setBookingDraft] = useState({
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days in the future by default
    guests: 2
  });

  // Menu Category Filter (shares actions from bento grid)
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<'all' | 'appetizer' | 'main' | 'dessert' | 'cocktail'>('all');

  // Load cart from session/local storage
  useEffect(() => {
    const storedCart = localStorage.getItem('bite_boulevard_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }
    const storedUser = localStorage.getItem('bite_boulevard_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error loading user', e);
      }
    }
  }, []);

  // Sync cart to local storage
  const syncCart = (newCart: OrderItem[]) => {
    setCart(newCart);
    localStorage.setItem('bite_boulevard_cart', JSON.stringify(newCart));
  };

  const handleSetUser = (u: { name: string; email: string } | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('bite_boulevard_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('bite_boulevard_user');
    }
  };

  const addToCart = (menuItem: MenuItem, quantity: number, customizations?: string) => {
    const existingIndex = cart.findIndex(item => item.menuItemId === menuItem.id);
    let updated: OrderItem[] = [];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
      if (customizations) {
        updated[existingIndex].customizations = customizations;
      }
    } else {
      const newItem: OrderItem = {
        id: 'cart-' + Math.random().toString(36).substr(2, 9),
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        imageUrl: menuItem.imageUrl,
        customizations
      };
      updated = [...cart, newItem];
    }
    syncCart(updated);
  };

  const updateCartQuantity = (menuItemId: string, change: number) => {
    const existingIndex = cart.findIndex(item => item.menuItemId === menuItemId);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += change;
      if (updated[existingIndex].quantity <= 0) {
        updated.splice(existingIndex, 1);
      }
      syncCart(updated);
    }
  };

  const removeFromCart = (menuItemId: string) => {
    const updated = cart.filter(item => item.menuItemId !== menuItemId);
    syncCart(updated);
  };

  const clearCart = () => {
    syncCart([]);
  };

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id);
    setCurrentScreen('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between selection:bg-primary selection:text-on-primary">
      
      {/* Navigation Header */}
      <Header 
        currentScreen={currentScreen} 
        setCurrentScreen={setCurrentScreen} 
        cart={cart}
        user={user}
        setUser={handleSetUser}
        setSelectedArticleId={setSelectedArticleId}
      />

      {/* Main Dynamic Screen Render */}
      <main className="flex-grow">
        {currentScreen === 'home' && (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <Hero setCurrentScreen={setCurrentScreen} />

            {/* Bento Grid Featured Curations */}
            <BentoGrid 
              setCurrentScreen={setCurrentScreen} 
              setMenuCategoryFilter={setMenuCategoryFilter} 
            />

            {/* Reservation Booking Teaser */}
            <ReservationSection 
              setCurrentScreen={setCurrentScreen}
              bookingDraft={bookingDraft}
              setBookingDraft={setBookingDraft}
            />

            {/* Editorial journal preview exactly matching mockup layout */}
            <section className="py-20 max-w-[1120px] mx-auto px-6 md:px-16" id="journal-preview-section">
              <div className="text-center mb-16 space-y-2">
                <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold block uppercase">
                  LATEST FROM THE JOURNAL
                </span>
                <h2 className="font-serif text-4xl text-on-surface italic">Bite Journal</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {journalArticles.map((article) => (
                  <div 
                    key={article.id}
                    onClick={() => handleOpenArticle(article.id)}
                    className="flex flex-col group cursor-pointer"
                    id={`journal-preview-card-${article.id}`}
                  >
                    <div className="h-64 mb-6 overflow-hidden rounded-lg bg-surface-container border border-white/5 relative">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-sans text-[10px] text-secondary font-bold tracking-wider mb-2 uppercase">
                      {article.category}
                    </span>
                    <h4 className="font-serif text-xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                      {article.description}
                    </p>
                    <span className="text-xs text-primary font-bold uppercase tracking-wider group-hover:underline flex items-center gap-1 mt-auto">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentScreen === 'menu' && (
          <MenuScreen 
            cart={cart}
            addToCart={addToCart}
            categoryFilter={menuCategoryFilter}
            setCategoryFilter={setMenuCategoryFilter}
          />
        )}

        {currentScreen === 'book' && (
          <BookingScreen 
            user={user}
            setUser={handleSetUser}
            bookingDraft={bookingDraft}
            setBookingDraft={setBookingDraft}
          />
        )}

        {currentScreen === 'orders' && (
          <OrdersScreen 
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            user={user}
          />
        )}

        {currentScreen === 'journal' && (
          <JournalScreen 
            selectedArticleId={selectedArticleId}
            setSelectedArticleId={setSelectedArticleId}
          />
        )}
      </main>

      {/* Footer Branding Navigation */}
      <Footer setCurrentScreen={setCurrentScreen} setSelectedArticleId={setSelectedArticleId} />
    </div>
  );
}
