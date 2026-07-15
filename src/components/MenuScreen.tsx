import { useState } from 'react';
import { Search, Sparkles, Wine, Tag, Plus, Minus, Check, ChevronRight, X, AlertCircle } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';
import { menuItems } from '../data';

interface MenuScreenProps {
  cart: OrderItem[];
  addToCart: (item: MenuItem, quantity: number, customizations?: string) => void;
  categoryFilter: 'all' | 'appetizer' | 'main' | 'dessert' | 'cocktail';
  setCategoryFilter: (category: 'all' | 'appetizer' | 'main' | 'dessert' | 'cocktail') => void;
}

export default function MenuScreen({
  cart,
  addToCart,
  categoryFilter,
  setCategoryFilter
}: MenuScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customizationNote, setCustomizationNote] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<string | null>(null);

  const categories: { id: typeof categoryFilter; label: string }[] = [
    { id: 'all', label: 'All Curations' },
    { id: 'appetizer', label: 'Appetizers' },
    { id: 'main', label: 'Hearth Mains' },
    { id: 'dessert', label: 'Obsidian Desserts' },
    { id: 'cocktail', label: 'Botanical Cocktails' }
  ];

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];

  // Filter logic
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDietary = !dietaryFilter || item.dietaryTags?.includes(dietaryFilter);
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setCustomizationNote('');
    setAddedFeedback(false);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity, customizationNote);
      setAddedFeedback(true);
      setTimeout(() => {
        setAddedFeedback(false);
        setSelectedItem(null);
      }, 1200);
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-16 py-12 md:py-20 animate-in fade-in duration-300" id="menu-screen-view">
      
      {/* Search and Category Filters */}
      <div className="space-y-8 mb-16">
        <div className="text-center space-y-2">
          <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold block uppercase">
            THE BILL OF FARE
          </span>
          <h2 className="font-serif text-4xl text-on-surface leading-tight">Nocturnal Gastro Menu</h2>
          <p className="font-sans text-xs text-on-surface-variant max-w-md mx-auto">
            A bespoke selection of hearth-kissed proteins, hand-made pasta, and cold botanical extractions.
          </p>
        </div>

        {/* Search Bar & Dietary Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container p-4 rounded-xl border border-white/5">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-4 top-3.5" />
            <input 
              type="text" 
              placeholder="Search ingredient or dish name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high border border-white/5 rounded-lg pl-11 pr-4 py-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all placeholder:text-white/20"
              id="menu-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-on-surface-variant hover:text-on-surface text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Selectors */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <span className="font-sans text-[9px] text-on-surface-variant tracking-wider uppercase mr-2 block">Dietary preference:</span>
            {dietaryOptions.map((diet) => (
              <button
                key={diet}
                onClick={() => setDietaryFilter(dietaryFilter === diet ? null : diet)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-sans font-semibold tracking-wider transition-all cursor-pointer border ${
                  dietaryFilter === diet 
                    ? 'bg-secondary/20 border-secondary text-secondary font-bold' 
                    : 'bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface hover:border-white/10'
                }`}
                id={`diet-filter-${diet}`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-6 py-3 rounded-lg font-sans text-xs font-semibold tracking-widest uppercase cursor-pointer border transition-all duration-300 ${
                categoryFilter === cat.id 
                  ? 'bg-primary border-primary text-on-primary font-bold shadow-lg shadow-primary/10' 
                  : 'bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface hover:border-white/10'
              }`}
              id={`cat-filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Menu Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const inCartCount = cart
              .filter(c => c.menuItemId === item.id)
              .reduce((sum, c) => sum + c.quantity, 0);

            return (
              <div 
                key={item.id}
                onClick={() => handleOpenItem(item)}
                className="group bg-surface-container border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-500 flex flex-col h-full hover:scale-[1.01] hover:bg-surface-container-high"
                id={`menu-item-${item.id}`}
              >
                {/* Product Image */}
                <div className="h-56 overflow-hidden relative bg-surface-container-high border-b border-white/5 flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.popular && (
                      <span className="bg-primary/20 backdrop-blur-sm border border-primary/20 text-primary text-[9px] font-bold tracking-widest px-2 py-1 rounded uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Chef Recommends</span>
                      </span>
                    )}
                    {item.category === 'cocktail' && (
                      <span className="bg-secondary/20 backdrop-blur-sm border border-secondary/20 text-secondary text-[9px] font-bold tracking-widest px-2 py-1 rounded uppercase flex items-center gap-1">
                        <Wine className="w-3 h-3" />
                        <span>Mixology</span>
                      </span>
                    )}
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-3 right-3 font-serif text-lg font-bold text-primary bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-white/5">
                    ${item.price}
                  </div>

                  {/* Quantity In Cart Indicator */}
                  {inCartCount > 0 && (
                    <div className="absolute bottom-3 left-3 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                      {inCartCount} Active in Order
                    </div>
                  )}
                </div>

                {/* Content body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-on-surface mb-2 group-hover:text-primary transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.dietaryTags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-sans text-on-surface-variant bg-white/5 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                      <span>Curate Dish</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-surface-container rounded-xl border border-white/5 space-y-4">
          <AlertCircle className="w-12 h-12 text-on-surface-variant mx-auto stroke-1" />
          <div>
            <h4 className="font-serif text-xl text-on-surface">No nocturnal dishes found</h4>
            <p className="font-sans text-xs text-on-surface-variant mt-2 max-w-sm mx-auto">
              We couldn't find any curations matching "{searchQuery}" under {categories.find(c => c.id === categoryFilter)?.label}.
            </p>
          </div>
          <button 
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setDietaryFilter(null);
            }}
            className="text-primary font-sans text-xs font-bold border-b border-primary uppercase pb-0.5 hover:opacity-80 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Item Drawer overlay */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-end z-50 animate-in fade-in duration-300">
          <div 
            className="bg-surface-container border-l border-white/10 w-full max-w-lg h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between relative"
            id="menu-item-drawer"
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface bg-white/5 p-2 rounded-full cursor-pointer transition-all"
              id="drawer-close"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              {/* Category Overline */}
              <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold uppercase block mb-4">
                Nocturnal Curations • {selectedItem.category}
              </span>

              {/* Large Image visual */}
              <div className="w-full h-56 rounded-lg overflow-hidden mb-8 border border-white/5 relative">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 right-4 font-serif text-xl font-bold text-primary bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded border border-white/5">
                  ${selectedItem.price}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-8">
                <h3 className="font-serif text-2xl md:text-3xl text-on-surface leading-tight">
                  {selectedItem.name}
                </h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Ingredients Details */}
              <div className="space-y-3 mb-8">
                <h4 className="font-sans text-[10px] text-on-surface tracking-widest uppercase font-bold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>Harvest Ingredients</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients.map((ing) => (
                    <span key={ing} className="bg-surface-container-high border border-white/5 text-[11px] text-on-surface-variant px-3 py-1.5 rounded font-sans font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Curated Beverage Pairing */}
              {selectedItem.winePairing && (
                <div className="p-4 bg-primary-container/10 border border-primary-container/25 rounded-lg mb-8 flex gap-3.5 items-start">
                  <div className="bg-primary-container/20 p-2 rounded-lg border border-primary-container/10">
                    <Wine className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm text-primary italic mb-0.5">Sommelier Pairing Selection</h5>
                    <p className="font-sans text-xs text-on-surface">{selectedItem.winePairing}</p>
                    <p className="font-sans text-[10px] text-on-surface-variant mt-1.5">Selected to dynamically elevate the caramelized fatty profiles of this particular preparation.</p>
                  </div>
                </div>
              )}

              {/* Customization notes */}
              <div className="space-y-2 mb-8">
                <label className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase block font-semibold">
                  BESPOKE CHEF DIRECTIONS (OPTIONAL)
                </label>
                <textarea 
                  placeholder="e.g. Medium-rare steak preference, zero salt on garnish, allergen details..."
                  value={customizationNote}
                  onChange={(e) => setCustomizationNote(e.target.value)}
                  className="w-full bg-surface-container-high border border-white/10 rounded-lg p-3 text-xs text-on-surface focus:border-primary focus:outline-none transition-all placeholder:text-white/20 h-20 resize-none"
                  id="drawer-customization-textarea"
                />
              </div>
            </div>

            {/* Quantity Selector & Add Action Button */}
            <div className="pt-6 border-t border-white/5 bg-surface-container sticky bottom-0 z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans text-[11px] text-on-surface-variant uppercase font-semibold">SELECT PORTIONS</span>
                <div className="flex items-center space-x-4 bg-surface-container-high border border-white/5 rounded-lg p-1">
                  <button 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(quantity - 1)}
                    className="p-2 text-on-surface-variant hover:text-on-surface disabled:opacity-20 cursor-pointer"
                    id="drawer-quantity-minus"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-sans text-sm font-bold text-on-surface w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                    id="drawer-quantity-plus"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {addedFeedback ? (
                <div className="w-full bg-secondary text-on-secondary py-4 rounded-lg font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
                  <Check className="w-4 h-4 animate-scale" />
                  <span>Curated to Order</span>
                </div>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-on-primary font-sans text-xs font-bold py-4 rounded-lg hover:bg-primary-container transition-all cursor-pointer uppercase tracking-widest shadow-xl flex items-center justify-between px-6"
                  id="drawer-add-btn"
                >
                  <span>Add to current selection</span>
                  <span className="font-serif">${(selectedItem.price * quantity).toFixed(2)}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
