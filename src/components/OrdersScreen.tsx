import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Tag, ChevronRight, Clock, Flame, Utensils, CheckCircle2, AlertCircle, Sparkles, Info } from 'lucide-react';
import { OrderItem, Order, MenuItem } from '../types';

interface OrdersScreenProps {
  cart: OrderItem[];
  updateCartQuantity: (menuItemId: string, change: number) => void;
  removeFromCart: (menuItemId: string) => void;
  clearCart: () => void;
  user: { name: string; email: string } | null;
}

export default function OrdersScreen({
  cart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  user
}: OrdersScreenProps) {
  // Promo codes
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number; flat: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout inputs
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [deliveryType, setDeliveryType] = useState<'dine-in' | 'curated-takeout'>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  // Active Order Tracker State
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderStep, setOrderStep] = useState<number>(0);

  // Sync user details
  useEffect(() => {
    if (user) {
      setContactName(user.name);
      setContactEmail(user.email);
    }
  }, [user]);

  // Handle auto progress simulation for active order
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeOrder && orderStep < 5) {
      timer = setTimeout(() => {
        setOrderStep(prev => prev + 1);
      }, 5000); // Progress every 5 seconds
    }
    return () => clearTimeout(timer);
  }, [activeOrder, orderStep]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Number((subtotal * 0.08875).toFixed(2)); // NYC Sales Tax

  let discountAmount = 0;
  if (activeDiscount) {
    if (activeDiscount.percent > 0) {
      discountAmount = Number((subtotal * (activeDiscount.percent / 100)).toFixed(2));
    } else if (activeDiscount.flat > 0) {
      discountAmount = Math.min(activeDiscount.flat, subtotal);
    }
  }

  const total = Number((subtotal + tax - discountAmount).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const codeUpper = promoCode.toUpperCase().trim();
    if (codeUpper === 'NOCTURNAL20') {
      setActiveDiscount({ code: 'NOCTURNAL20', percent: 20, flat: 0 });
      setPromoSuccess('Promo Code NOCTURNAL20 Applied (20% off subtotal)');
      setPromoError('');
    } else if (codeUpper === 'BOULEVARD') {
      setActiveDiscount({ code: 'BOULEVARD', percent: 0, flat: 10 });
      setPromoSuccess('Promo Code BOULEVARD Applied ($10.00 flat discount)');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try NOCTURNAL20 or BOULEVARD');
      setPromoSuccess('');
    }
    setPromoCode('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setCheckoutError('Your order selection basket is empty.');
      return;
    }
    if (!contactName || !contactEmail) {
      setCheckoutError('Please provide guest contact details to proceed.');
      return;
    }
    if (deliveryType === 'dine-in' && !tableNumber) {
      setCheckoutError('Please provide your table number to ensure exact fire presentation.');
      return;
    }

    const orderId = 'BB-ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      subtotal,
      tax,
      discount: discountAmount,
      total,
      promoCode: activeDiscount?.code,
      status: 'received',
      contactName,
      contactEmail,
      deliveryType,
      tableNumber: deliveryType === 'dine-in' ? tableNumber : undefined,
      createdAt: new Date().toISOString()
    };

    setActiveOrder(newOrder);
    setOrderStep(0);
    clearCart();
    setCheckoutError('');
    setActiveDiscount(null);
  };

  // Tracking Timeline steps description
  const trackerSteps = [
    { label: 'Ember Lit / Confirmed', desc: 'Order received. Kitchen embers activated.' },
    { label: 'Ingredient Selection', desc: 'Hand-selecting truffles, wagyu, and fresh botanicals.' },
    { label: 'Live Fire Cooking', desc: 'Searing proteins and infusing aromatics over hickory wood coals.' },
    { label: 'Artisanal Plating', desc: 'Chef Ethan is assembling final presentation and gold leaf garnishes.' },
    { label: 'Nocturnal Presentation', desc: 'Dine-In delivery underway or curated takeout insulated.' },
    { label: 'Exquisite Dining', desc: 'Service completed. Savor your nocturnal bite.' }
  ];

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-16 py-12 md:py-20 animate-in fade-in duration-300" id="orders-screen-view">
      
      {activeOrder ? (
        /* Order Tracking View */
        <div className="max-w-3xl mx-auto space-y-12" id="order-tracking-panel">
          <div className="text-center space-y-3">
            <span className="bg-primary/20 text-primary border border-primary/20 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase inline-block animate-pulse">
              Active Culinary Preparation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface">Tracking your curation</h2>
            <p className="font-sans text-xs text-on-surface-variant">
              Order ID: <strong className="text-on-surface font-mono text-sm">{activeOrder.id}</strong> • Prepped for <strong className="text-on-surface font-medium">{activeOrder.contactName}</strong>
            </p>
          </div>

          {/* Kitchen progress tracker */}
          <div className="bg-surface-container border border-white/5 p-6 md:p-10 rounded-xl editorial-shadow space-y-8">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase">KITCHEN STATUS TIMELINE</span>
              <span className="font-sans text-[10px] text-primary tracking-widest uppercase font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Simulating Prep Live</span>
              </span>
            </div>

            {/* Custom high fidelity timeline diagram */}
            <div className="relative pl-8 space-y-8 border-l border-white/10 ml-3">
              {trackerSteps.map((step, idx) => {
                const isCompleted = orderStep > idx;
                const isActive = orderStep === idx;
                const isPending = orderStep < idx;

                return (
                  <div key={idx} className="relative group" id={`timeline-step-${idx}`}>
                    {/* Circle icon indicators */}
                    <div className={`absolute -left-[41px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-400 border-green-400 text-on-primary-container' 
                        : isActive 
                          ? 'bg-primary border-primary text-on-primary font-bold shadow-lg shadow-primary/20 animate-bounce' 
                          : 'bg-surface-container-high border-white/10 text-on-surface-variant'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-on-primary-container" />
                      ) : isActive ? (
                        <Flame className="w-3 h-3 text-on-primary fill-on-primary" />
                      ) : (
                        <span className="text-[10px] font-sans">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step descriptions */}
                    <div className="space-y-1">
                      <h4 className={`font-serif text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-primary' : isCompleted ? 'text-on-surface' : 'text-on-surface-variant'
                      }`}>
                        {step.label}
                      </h4>
                      <p className="text-xs font-sans text-on-surface-variant max-w-lg leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated actions to test state changes instantly */}
            {orderStep < 5 && (
              <div className="bg-surface-container-high border border-white/5 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <Info className="w-4 h-4 text-primary" />
                  <span>The timeline progresses automatically, or you can expedite it.</span>
                </div>
                <button
                  onClick={() => setOrderStep(prev => Math.min(prev + 1, 5))}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded text-[10px] font-sans font-bold uppercase tracking-widest cursor-pointer text-on-surface"
                  id="expedite-kitchen-btn"
                >
                  Expedite Kitchen
                </button>
              </div>
            )}
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-surface-container border border-white/5 rounded-xl overflow-hidden">
            <div className="p-6 bg-surface-container-high border-b border-white/5 font-serif text-sm font-semibold text-on-surface uppercase tracking-wider">
              Bespoke Order Receipt Summary
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="divide-y divide-white/5">
                {activeOrder.items.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between items-start text-xs font-sans">
                    <div>
                      <h5 className="font-serif text-sm text-on-surface">{item.name}</h5>
                      <span className="text-on-surface-variant block mt-0.5">Portions: {item.quantity} • ${item.price} each</span>
                      {item.customizations && (
                        <span className="text-[10px] italic text-primary block mt-1">Note: "{item.customizations}"</span>
                      )}
                    </div>
                    <span className="font-serif font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 text-xs font-sans space-y-2">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal Portion</span>
                  <span className="font-serif">${activeOrder.subtotal.toFixed(2)}</span>
                </div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between text-primary font-semibold">
                    <span>Nocturnal discount</span>
                    <span className="font-serif">-${activeOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>NYC Sales Tax (8.875%)</span>
                  <span className="font-serif">${activeOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-primary pt-3 border-t border-dashed border-white/10">
                  <span>Total Settled</span>
                  <span>${activeOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-sans text-on-surface-variant gap-2">
                <div>
                  <p>Fireside Service: <strong className="text-on-surface font-semibold">{activeOrder.deliveryType === 'dine-in' ? `Dine-In (Table ${activeOrder.tableNumber})` : 'Curated Takeout'}</strong></p>
                  <p>Confirmation dispatch: <strong className="text-on-surface font-semibold">{activeOrder.contactEmail}</strong></p>
                </div>
                <button 
                  onClick={() => setActiveOrder(null)}
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-lg font-sans text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                  id="order-another-curation-btn"
                >
                  Order Another Curation
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Cart Basket View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="cart-selection-panel">
          
          {/* Left Portion: Items selected list */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold block uppercase">
                PORTION BASKET
              </span>
              <h2 className="font-serif text-4xl text-on-surface leading-tight">Your Custom Curation</h2>
              <p className="font-sans text-xs text-on-surface-variant">
                Assemble and edit your course portions before committing them to Chef Ethan's oak wood fires.
              </p>
            </div>

            {cart.length > 0 ? (
              <div className="space-y-4" id="cart-items-list">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface-container border border-white/5 rounded-xl gap-4"
                    id={`cart-item-card-${item.menuItemId}`}
                  >
                    {/* Item Thumbnail & Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high border border-white/5">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-on-surface font-semibold">{item.name}</h4>
                        <span className="text-primary font-serif text-sm font-bold block mt-0.5">${item.price}</span>
                        {item.customizations && (
                          <span className="text-[10px] text-primary-fixed italic mt-1 block">Direction: "{item.customizations}"</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity selectors and Delete option */}
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center space-x-3 bg-surface-container-high border border-white/5 rounded-lg p-1">
                        <button 
                          onClick={() => updateCartQuantity(item.menuItemId, -1)}
                          className="p-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer"
                          id={`cart-qty-minus-${item.menuItemId}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-sans text-xs font-bold text-on-surface w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.menuItemId, 1)}
                          className="p-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer"
                          id={`cart-qty-plus-${item.menuItemId}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif text-sm font-bold text-on-surface w-16 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.menuItemId)}
                          className="p-2 text-on-surface-variant hover:text-red-400 rounded-full hover:bg-white/5 transition-all cursor-pointer"
                          title="Remove item"
                          id={`cart-delete-${item.menuItemId}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <span className="font-sans text-xs text-on-surface-variant">Selected Portion Categories: {cart.length}</span>
                  <button 
                    onClick={clearCart}
                    className="text-on-surface-variant hover:text-red-400 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
                    id="clear-all-portions-btn"
                  >
                    Clear All Portions
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-surface-container rounded-xl border border-dashed border-white/10 space-y-4">
                <ShoppingBag className="w-12 h-12 text-on-surface-variant mx-auto stroke-1" />
                <div>
                  <h4 className="font-serif text-lg text-on-surface font-semibold">Your selection basket is empty</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-2 max-w-xs mx-auto">
                    Please visit our interactive digital menu to curate fine appetizers, entrees, desserts, or mixology cocktails.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Portion: Math calculations and checkout details */}
          <div className="space-y-6">
            <div className="bg-surface-container border border-white/5 p-6 rounded-xl space-y-6">
              <h3 className="font-serif text-lg text-on-surface">Portion Calculus</h3>
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block font-semibold">PROMO CODE</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. NOCTURNAL20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-surface-container-high border border-white/5 rounded p-2.5 text-xs text-on-surface uppercase focus:border-primary focus:outline-none placeholder:text-white/20"
                    id="input-promo-code"
                  />
                  <button 
                    type="submit"
                    className="bg-surface-container-high border border-white/10 hover:bg-white/5 px-4 rounded text-xs font-sans font-semibold uppercase text-on-surface tracking-wider cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-400 text-[10px] font-sans">{promoError}</p>}
                {promoSuccess && <p className="text-green-400 text-[10px] font-sans">{promoSuccess}</p>}
              </form>

              {/* Formula breakdowns */}
              <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs font-sans">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal Portion</span>
                  <span className="font-serif">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-primary font-semibold">
                    <span>Discount ({activeDiscount?.code})</span>
                    <span className="font-serif">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>NYC Sales Tax (8.875%)</span>
                  <span className="font-serif">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-primary pt-3 border-t border-dashed border-white/10">
                  <span>Total Calculated</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Inline promo code tips */}
              <div className="p-3 bg-white/5 border border-white/5 rounded text-[10px] text-on-surface-variant space-y-1">
                <p className="font-semibold text-on-surface uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-primary" />
                  <span>Available Nocturnal Codes:</span>
                </p>
                <p>• <strong className="text-primary">NOCTURNAL20</strong>: Get 20% off portion total.</p>
                <p>• <strong className="text-primary">BOULEVARD</strong>: Save flat $10.00 off order.</p>
              </div>
            </div>

            {/* Simulated Checkout Box */}
            <div className="bg-surface-container border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="font-serif text-lg text-on-surface">Commit Order Fire</h3>
              <form onSubmit={handleCheckout} className="space-y-4">
                
                {/* Dine-In or Takeout selection */}
                <div>
                  <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block mb-2 font-semibold">PRESENTATION STYLE</label>
                  <div className="grid grid-cols-2 gap-2 bg-surface-container-high border border-white/5 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('dine-in')}
                      className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                        deliveryType === 'dine-in' 
                          ? 'bg-primary text-on-primary shadow' 
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Dine-In Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('curated-takeout')}
                      className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                        deliveryType === 'curated-takeout' 
                          ? 'bg-primary text-on-primary shadow' 
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Curated Takeout
                    </button>
                  </div>
                </div>

                {deliveryType === 'dine-in' ? (
                  <div>
                    <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1">Your Table Number</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 14"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-surface-container-high border border-white/5 rounded p-2.5 text-xs text-on-surface focus:border-primary focus:outline-none"
                      id="input-table-number"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-surface-container-high border border-white/5 rounded text-[10px] text-on-surface-variant leading-relaxed">
                    We package takeout inside premium insulated obsidian boxes with custom heat gel seals. Ready for pick-up in <strong className="text-on-surface">25 minutes</strong>.
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div>
                    <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1">Contact Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Marcus Aurelius"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-surface-container-high border border-white/5 rounded p-2.5 text-xs text-on-surface focus:border-primary focus:outline-none"
                      id="checkout-contact-name"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase block mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. marcus@stoic.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-surface-container-high border border-white/5 rounded p-2.5 text-xs text-on-surface focus:border-primary focus:outline-none"
                      id="checkout-contact-email"
                    />
                  </div>
                </div>

                {checkoutError && (
                  <div className="text-red-400 text-[11px] font-sans flex items-center gap-1 bg-red-400/5 p-2 rounded">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full bg-primary text-on-primary font-sans text-xs font-bold py-3.5 rounded-lg uppercase tracking-widest hover:bg-primary-container transition-all cursor-pointer shadow-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  id="commit-order-fire-btn"
                >
                  <span>Commit order fire</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
