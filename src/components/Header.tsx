import React, { useState } from 'react';
import { ShoppingBag, Calendar, User, Menu, X, LogIn, ChevronRight, LogOut } from 'lucide-react';
import { OrderItem } from '../types';

interface HeaderProps {
  currentScreen: 'home' | 'menu' | 'book' | 'orders' | 'journal';
  setCurrentScreen: (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => void;
  cart: OrderItem[];
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  setSelectedArticleId: (id: string | null) => void;
}

export default function Header({
  currentScreen,
  setCurrentScreen,
  cart,
  user,
  setUser,
  setSelectedArticleId
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginName) {
      setUser({ name: loginName, email: loginEmail });
      setAuthModalOpen(false);
    }
  };

  const navigateTo = (screen: 'home' | 'menu' | 'book' | 'orders' | 'journal') => {
    if (screen !== 'journal') {
      setSelectedArticleId(null);
    }
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 max-w-[1120px] mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('home')} 
          className="font-serif text-2xl font-bold text-primary tracking-tight cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
          id="brand-logo"
        >
          Bite Boulevard
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'Home' },
            { id: 'menu', label: 'Menu' },
            { id: 'book', label: 'Book a Table' },
            { id: 'orders', label: 'Orders' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as any)}
              className={`font-sans text-xs font-semibold tracking-widest uppercase pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                currentScreen === item.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-white/10'
              }`}
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Cart Icon */}
          <button 
            onClick={() => navigateTo('orders')}
            className={`relative p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer rounded-full hover:bg-white/5 ${
              currentScreen === 'orders' ? 'text-primary' : ''
            }`}
            title="Cart & Active Orders"
            id="cart-icon-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Log In */}
          {user ? (
            <div className="hidden md:flex items-center space-x-3 text-xs tracking-wider">
              <span className="text-on-surface-variant font-medium">Hello, <span className="text-on-surface">{user.name.split(' ')[0]}</span></span>
              <button 
                onClick={() => setUser(null)}
                className="text-primary-container hover:text-primary transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                title="Log out"
                id="logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="hidden md:flex items-center space-x-1.5 font-sans text-xs font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              id="login-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
          )}

          {/* Book a Table Primary CTA */}
          <button 
            onClick={() => navigateTo('book')}
            className="hidden sm:inline-flex bg-primary-container text-on-primary-container hover:bg-primary-container/90 px-5 py-2.5 rounded-lg font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-200 active:scale-[0.97] cursor-pointer shadow-lg"
            id="header-cta-book"
          >
            Book a Table
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface cursor-pointer"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bg-surface-container border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          <div className="flex flex-col space-y-4">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Menu' },
              { id: 'book', label: 'Book a Table' },
              { id: 'orders', label: 'Orders & Cart' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as any)}
                className={`text-left font-sans text-sm font-semibold tracking-widest uppercase py-2 border-b border-white/5 ${
                  currentScreen === item.id ? 'text-primary' : 'text-on-surface-variant'
                }`}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 flex items-center justify-between">
            {user ? (
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-on-surface-variant">Active: <span className="text-on-surface">{user.name}</span></span>
                <button 
                  onClick={() => setUser(null)}
                  className="text-primary-container hover:text-primary transition-colors font-bold"
                  id="mobile-logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="flex items-center space-x-1.5 text-xs font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary"
                id="mobile-login-btn"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>
            )}
            <button
              onClick={() => navigateTo('book')}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase"
              id="mobile-cta-book"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-surface-container border border-white/10 p-8 rounded-xl max-w-md w-full relative editorial-shadow">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
              id="auth-modal-close"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="font-sans text-[10px] text-primary tracking-[0.2em] uppercase block mb-2">Nocturnal Elegance System</span>
            <h3 className="font-serif text-2xl text-on-surface mb-2">Welcome to Bite Boulevard</h3>
            <p className="font-sans text-xs text-on-surface-variant mb-6">Create or enter your profile to access premium table seating reservations and real-time order summaries.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1.5">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sterling Archer"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-sm text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all placeholder:text-white/20"
                  id="auth-input-name"
                />
              </div>
              <div>
                <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. sterling@boulevard.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-sm text-on-surface focus:border-primary focus:ring-0 focus:outline-none transition-all placeholder:text-white/20"
                  id="auth-input-email"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary font-sans text-xs font-semibold py-3.5 rounded-lg uppercase tracking-widest hover:bg-primary-container transition-all cursor-pointer shadow-lg mt-4"
                id="auth-submit-btn"
              >
                Access Account
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
