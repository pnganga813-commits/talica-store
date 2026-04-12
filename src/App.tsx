/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { STORE_CONFIG } from './config';
import { supabase } from './lib/supabase';
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, Search, MessageCircle, MapPin, X, Sun, Moon, LogOut, Mail, Sparkles, PlayCircle, RefreshCw, ChevronDown, Bell, Heart, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SofaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10C2.89543 10 2 10.8954 2 12V17C2 17.5523 2.44772 18 3 18H4V20C4 20.5523 4.44772 21 5 21H6C6.55228 21 7 20.5523 7 20V18H17V20C17 20.5523 17.4477 21 18 21H19C19.5523 21 20 20.5523 20 20V18H21C21.5523 18 22 17.5523 22 17V12C22 10.8954 21.1046 10 20 10ZM6 7H11.5V11H6V7ZM18 7V11H12.5V7H18ZM4 16V12H11.5V16H4ZM20 16H12.5V12H20V16Z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.01 2.005c-5.514 0-10 4.486-10 10 0 1.75.455 3.435 1.318 4.93L2 22l5.248-1.287A9.954 9.954 0 0 0 12.01 22c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.395c-1.556 0-3.07-.398-4.42-1.15l-.318-.178-3.13.768.78-3.05-.195-.31c-.825-1.31-1.26-2.82-1.26-4.375 0-4.63 3.77-8.4 8.4-8.4 4.63 0 8.4 3.77 8.4 8.4 0 4.63-3.77 8.4-8.4 8.4zm4.61-6.14c-.253-.127-1.496-.738-1.728-.823-.232-.084-.4-.127-.57.127-.168.253-.653.823-.8.992-.148.168-.295.19-.548.063-.253-.127-1.068-.394-2.036-1.257-.753-.67-1.26-1.5-1.408-1.753-.148-.253-.016-.39.11-.516.114-.114.253-.295.38-.443.126-.148.168-.253.253-.422.084-.168.042-.316-.02-.443-.064-.127-.57-1.37-.78-1.877-.206-.495-.415-.428-.57-.436-.148-.008-.316-.008-.485-.008-.168 0-.443.063-.675.316-.232.253-.886.865-.886 2.11 0 1.245.907 2.447 1.034 2.616.126.168 1.783 2.72 4.316 3.815.603.26 1.074.415 1.44.53.605.192 1.156.165 1.59.1.485-.072 1.496-.612 1.707-1.203.21-.59.21-1.097.148-1.203-.064-.106-.233-.17-.486-.296z"/>
  </svg>
);

const DEFAULT_HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
    title: "Modern Comfort for Your Home",
    subtitle: "Experience the perfect balance of style and relaxation with our new collection."
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80",
    title: "Elegant Living Spaces",
    subtitle: "Transform your living room into a masterpiece of modern design."
  },
  {
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
    title: "Premium Craftsmanship",
    subtitle: "Discover furniture built to last, with attention to every detail."
  }
];

const BULK_THRESHOLD = 5;
const BULK_DISCOUNT_PERCENT = 10;

const SplashScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.15 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[500px] h-[500px] bg-teal-500 rounded-full blur-[100px]"
      />

      <div className="relative flex flex-col items-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="relative w-32 h-32 mb-8"
        >
          {/* Outer Ring */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-teal-600 dark:text-teal-400"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Center Logo (Stylized T) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-5xl font-black text-teal-700 dark:text-teal-300"
            >
              T
            </motion.div>
          </div>

          {/* Sparkles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
              transition={{ 
                delay: 1 + (i * 0.2), 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute text-yellow-400"
              style={{
                top: `${20 + (i * 20)}%`,
                left: `${i % 2 === 0 ? -10 : 90}%`
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          ))}
        </motion.div>

        {/* Store Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white text-center"
          >
            TALICA
            <span className="block text-lg md:text-xl font-medium tracking-[0.3em] text-teal-600 dark:text-teal-400 mt-2 uppercase">
              Investment Store
            </span>
          </motion.h1>
        </div>

        {/* Loading Bar */}
        <div className="mt-12 w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut"
            }}
            onAnimationComplete={() => setTimeout(onComplete, 500)}
            className="w-full h-full bg-teal-600 dark:bg-teal-400"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>(DEFAULT_HERO_SLIDES);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [orderedProducts, setOrderedProducts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const orderFormRef = useRef<HTMLDivElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      // Fetch hero slides
      const { data: heroData } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (heroData && heroData.length > 0) {
        setHeroSlides(heroData.map(slide => ({
          image: slide.photo_url,
          title: slide.title,
          subtitle: slide.description,
          price: slide.price,
          orderText: slide.order_text
        })));
      }

      // Fetch all products so anything uploaded by admin is visible
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        // Fallback without order if created_at doesn't exist
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('products')
          .select('*');
          
        if (fallbackError) throw fallbackError;
        setProducts(fallbackData || []);
        // Set notifications as the latest 5 products
        setNotifications((fallbackData || []).slice(0, 5).map((p: any) => ({
          id: p.id,
          title: 'New Product Added!',
          message: `${p.name || p.product_name || p.title} is now available.`,
          time: new Date(p.created_at || Date.now()).toLocaleDateString(),
          product: p
        })));
      } else {
        setProducts(data || []);
        // Set notifications as the latest 5 products
        setNotifications((data || []).slice(0, 5).map((p: any) => ({
          id: p.id,
          title: 'New Product Added!',
          message: `${p.name || p.product_name || p.title} is now available.`,
          time: new Date(p.created_at || Date.now()).toLocaleDateString(),
          product: p
        })));
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchOrderedProducts = async (userEmail: string) => {
    if (!userEmail) return;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', userEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Match ordered products with current products to get images/details
      const orderedNames = Array.from(new Set(data?.map(o => o.product_name) || []));
      const matchedProducts = products.filter(p => 
        orderedNames.includes(p.name || p.product_name || p.title)
      );
      
      setOrderedProducts(matchedProducts.slice(0, 4)); // Show last 4 unique ordered products
    } catch (err) {
      console.error('Error fetching ordered products:', err);
    }
  };

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length, currentHeroIndex]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        fetchOrderedProducts(session.user.email);
      } else {
        setOrderedProducts([]);
      }
    });

    fetchProducts();

    const channel = supabase.channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_slides' }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (user?.email && products.length > 0) {
      fetchOrderedProducts(user.email);
    }
  }, [user, products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const name = p.name || p.product_name || p.title || '';
      const category = p.category || '';
      const description = p.description || '';
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
      const matchesWishlist = !showWishlistOnly || wishlist.includes(p.id);
      return matchesSearch && matchesCategory && matchesWishlist;
    });
  }, [products, searchQuery, selectedCategory, showWishlistOnly, wishlist]);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category || 'Uncategorized')))];
  }, [products]);

  const handleOrderClick = (product: any) => {
    setSelectedProduct(product);
    setActiveImage(product.image || product.image_url || product.imageUrl || product.media_url || null);
    setIsVideoActive(false);
    setViewMode('detail');
    setVariant(product.variants?.[0] || 'Standard');
    setQuantity(1);
    setSubmitStatus('idle');
    setErrorMessage(null);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setViewMode('grid');
    setSelectedProduct(null);
    setActiveImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelAuth = () => {
    setSubmitStatus('idle');
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const handleNegotiate = () => {
    const productName = selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product';
    const message = `Hi Talica Investment! I'm interested in ${quantity}x ${productName} (${variant}).\n\nI'd like to negotiate the price. Can we bargain?\n\nProduct Link: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/254702675717?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);
    setErrors({});

    const formData = new FormData(form);
    const data = {
      customer_name: formData.get('customer_name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      city: formData.get('city') as string,
      address: formData.get('address') as string,
      country: STORE_CONFIG.DEFAULT_COUNTRY,
      notes: formData.get('notes') as string,
    };

    const newErrors: Record<string, string> = {};
    if (!data.customer_name) newErrors.customer_name = 'Name is required';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    if (!data.city) newErrors.city = 'City/Area is required';
    if (!data.address) newErrors.address = 'Delivery address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const productName = selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product';
      const productPrice = selectedProduct.price || selectedProduct.unit_price || 0;
      
      const subtotal = productPrice * quantity;
      const hasDiscount = quantity >= BULK_THRESHOLD;
      const discountAmount = hasDiscount ? (subtotal * BULK_DISCOUNT_PERCENT) / 100 : 0;
      const finalTotal = subtotal - discountAmount;

      const orderData = {
        customer_name: data.customer_name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        product_name: productName,
        product_variant: variant || 'Standard',
        quantity: quantity,
        notes: hasDiscount 
          ? `${data.notes || ''}\n[Bulk Discount Applied: ${BULK_DISCOUNT_PERCENT}% off. Total: ${STORE_CONFIG.CURRENCY} ${finalTotal.toLocaleString()}]`.trim()
          : data.notes,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;
      
      setSubmitStatus('success');
      form.reset();
    } catch (err: any) {
      console.error('Error submitting order:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const productName = selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product';
    const message = `Hi Talica Investment! I just placed an order for ${quantity}x ${productName} (${variant}).\n\nPlease confirm my order.`;
    const whatsappUrl = `https://wa.me/254702675717?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 selection:bg-teal-100 dark:selection:bg-teal-900/30 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-[#0F292F] rounded-lg flex items-center justify-center text-[#D4AF37]">
              <SofaIcon className="w-6 h-6" />
            </div>
            <span className="inline-block">{STORE_CONFIG.STORE_NAME}</span>
          </div>
          
          <div className="flex-1 max-w-md hidden sm:flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                id="search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent rounded-full text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-white"
              />
            </div>
            <button 
              onClick={() => document.getElementById('search-input')?.focus()}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden lg:flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 px-4">
            Welcome to Talica Investment
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Wishlist Button */}
            <button 
              onClick={() => {
                setShowWishlistOnly(!showWishlistOnly);
                if (!showWishlistOnly) {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }
              }}
              className={`p-2 rounded-full transition-all relative group ${showWishlistOnly ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
              title={showWishlistOnly ? "Show All Products" : "Show Wishlist"}
            >
              <Heart className={`w-5 h-5 ${showWishlistOnly ? 'fill-current' : 'group-hover:text-rose-500 transition-colors'}`} />
              {wishlist.length > 0 && !showWishlistOnly && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-in zoom-in duration-300">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-[100]"
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                      <button 
                        onClick={() => setIsNotificationOpen(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              handleOrderClick(notif.product);
                              setIsNotificationOpen(false);
                            }}
                            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors border-b border-slate-50 dark:border-slate-700/50 last:border-0"
                          >
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.message}</p>
                                <span className="text-[10px] text-slate-400 mt-2 block font-medium">{notif.time}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-8 h-8 text-slate-300 mx-auto mb-3 opacity-20" />
                          <p className="text-sm text-slate-500 dark:text-slate-400">No new updates</p>
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 text-center">
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a 
              href={`https://wa.me/${STORE_CONFIG.WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors shrink-0"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span className="hidden sm:inline-block">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero */}
            <section className="relative pt-6 pb-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-slate-50 to-amber-50/30 dark:from-teal-900/20 dark:via-slate-900 dark:to-amber-900/10 -z-10 transition-colors duration-300" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                {/* Animated Banner */}
                <div className="relative rounded-3xl overflow-hidden mb-6 bg-slate-900 h-[260px] md:h-[340px] lg:h-[400px] shadow-2xl">
                  <AnimatePresence>
                    <motion.div
                      key={currentHeroIndex}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={heroSlides[currentHeroIndex].image} 
                        alt="Hero" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/40 to-transparent" />
                      
                      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold tracking-[0.2em] text-[10px] mb-3 uppercase">
                          <Sparkles className="w-3 h-3" />
                          Trending Now
                        </div>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-[1.1] tracking-tight">
                          {heroSlides[currentHeroIndex].title}
                        </h2>
                        <p className="text-sm md:text-base text-slate-300 mb-6 max-w-lg line-clamp-2 font-medium">
                          {heroSlides[currentHeroIndex].subtitle}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <button 
                            onClick={() => productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                            className="bg-[#D4AF37] hover:bg-[#C5A028] text-slate-900 px-6 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                          >
                            {heroSlides[currentHeroIndex].orderText || 'Order Now'}
                            {heroSlides[currentHeroIndex].price > 0 && (
                              <span className="bg-slate-900/20 px-2 py-0.5 rounded-md text-[10px]">
                                {STORE_CONFIG.CURRENCY} {heroSlides[currentHeroIndex].price.toLocaleString()}
                              </span>
                            )}
                          </button>
                          <button 
                            onClick={() => setIsVideoModalOpen(true)}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 border border-white/10"
                          >
                            <PlayCircle className="w-4 h-4" />
                            Play Video
                          </button>
                        </div>

                        {/* Recent Orders on Hero */}
                        {orderedProducts.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 pt-6 border-t border-white/10"
                          >
                            <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold tracking-widest uppercase mb-3">
                              <Clock className="w-3 h-3" />
                              Your Recent Orders
                            </div>
                            <div className="flex gap-3">
                              {orderedProducts.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => handleOrderClick(p)}
                                  className="group/item relative w-12 h-12 rounded-xl overflow-hidden border border-white/20 hover:border-[#D4AF37] transition-all"
                                  title={p.name}
                                >
                                  <img 
                                    src={p.image || p.image_url || p.imageUrl || p.media_url || `https://picsum.photos/seed/${p.id}/100/100`} 
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors" />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentHeroIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentHeroIndex ? 'bg-[#D4AF37] w-4' : 'bg-white/30 hover:bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Existing Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-medium border border-teal-100 dark:border-teal-800/50">
                      <MapPin className="w-3 h-3" />
                      Free Delivery Nationwide in Kenya
                    </div>
                    <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Premium Quality. Delivered.
                    </h1>
                    <span className="hidden md:inline text-slate-300 dark:text-slate-600">•</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Shop top products. Pay safely on delivery.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                    <button
                      onClick={fetchProducts}
                      disabled={isLoadingProducts}
                      className="ml-2 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                      title="Refresh Products"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="mt-12 md:mt-16 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Featured Items</h2>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Product Grid */}
            <section ref={productGridRef} className="pb-12 max-w-7xl mx-auto px-4 sm:px-6">
              
              {isLoadingProducts ? (
                <div className="flex justify-center py-10">
                  <span className="w-8 h-8 border-4 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, i) => (
                      <motion.div 
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/30 transition-all group flex flex-col cursor-pointer relative"
                        onClick={() => handleOrderClick(product)}
                      >
                        {/* Wishlist Toggle */}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-2 right-2 z-20 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
                        >
                          <Heart 
                            className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} 
                          />
                        </button>
                        
                        <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                          <img 
                            src={product.image || product.image_url || product.imageUrl || product.media_url || `https://picsum.photos/seed/${product.id}/400/400`} 
                            alt={product.name || product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/400/400`;
                            }}
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              className="bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2"
                            >
                              <Search className="w-3 h-3" />
                              View Details
                            </motion.div>
                          </div>

                          <div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm z-10">
                            {product.category}
                          </div>
                        </div>
                        <div className="p-3 md:p-4 flex flex-col flex-1">
                          <h3 className="text-sm md:text-base font-bold mb-1 line-clamp-2 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {product.name || product.product_name || product.title || 'Product'}
                          </h3>
                          {(product.stock_quantity !== undefined || product.stock !== undefined) && (
                            <div className="flex items-center gap-1.5 mb-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${(product.stock_quantity > 0 || product.stock > 0) ? 'bg-emerald-500' : 'bg-red-500'}`} />
                              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                Stock: {product.stock_quantity ?? product.stock}
                              </span>
                            </div>
                          )}
                          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-3 line-clamp-2 flex-1">{product.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 dark:border-slate-700/50">
                            <div className="font-bold text-sm md:text-lg text-teal-700 dark:text-teal-400">
                              {STORE_CONFIG.CURRENCY} {product.price.toLocaleString()}
                            </div>
                            <div className="bg-slate-900 dark:bg-teal-600 text-white p-2 rounded-lg group-hover:bg-teal-600 dark:group-hover:bg-teal-500 transition-colors">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Heart className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {showWishlistOnly ? "Your wishlist is empty" : "No products found"}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                        {showWishlistOnly 
                          ? "Products you heart will appear here for you to find them easily later." 
                          : "Try adjusting your search or category filters to find what you're looking for."}
                      </p>
                      {showWishlistOnly && (
                        <button 
                          onClick={() => setShowWishlistOnly(false)}
                          className="mt-6 text-teal-600 dark:text-teal-400 font-bold hover:underline"
                        >
                          Back to all products
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-24"
          >
            {/* Product Detail Page */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 md:pt-6">
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[75vh] flex flex-col items-center justify-center text-center py-12 px-4 relative overflow-hidden"
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
                  
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                    className="relative mb-12"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-emerald-500/20 border-4 border-emerald-50 dark:border-emerald-900/20">
                      <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-emerald-400/30 rounded-full -z-0"
                    />
                  </motion.div>

                  <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
                    Thank You!
                  </h1>
                  <h2 className="text-2xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-8 tracking-tight">
                    Order placed successfully!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl max-w-2xl mb-16 leading-relaxed font-medium">
                    Talica will contact you soon via WhatsApp, phone call, or message to confirm about the product. Thank you for choosing us!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl justify-center items-stretch px-4">
                    <button 
                      onClick={handleWhatsAppClick}
                      className="flex-[1.5] bg-[#25D366] text-white py-6 px-10 rounded-[2rem] font-black text-lg md:text-xl hover:bg-[#128C7E] transition-all shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-4 active:scale-[0.98] group"
                    >
                      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                      <span>Message Talica Investment on WhatsApp</span>
                    </button>
                    <button 
                      onClick={handleBackToGrid}
                      className="flex-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-6 px-10 rounded-[2rem] font-bold text-lg md:text-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98] border-2 border-slate-200 dark:border-slate-700 shadow-lg"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <button 
                    onClick={handleBackToGrid}
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-4 group"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    <span className="text-sm font-medium">Back to Products</span>
                  </button>

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm group">
                    <img 
                      src={activeImage || selectedProduct.image || selectedProduct.image_url || selectedProduct.imageUrl || selectedProduct.media_url || `https://picsum.photos/seed/${selectedProduct.id}/800/800`} 
                      alt={selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product'} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedProduct.id}/800/800`;
                      }}
                    />
                    {(selectedProduct.video_url && (isVideoActive || activeImage === (selectedProduct.image || selectedProduct.image_url || selectedProduct.imageUrl || selectedProduct.media_url) || !activeImage)) && (
                      <button 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <PlayCircle className="w-8 h-8 text-teal-600 fill-teal-600/10" />
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {((selectedProduct.images && Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0) || (selectedProduct.video_url) || (selectedProduct.media_url)) && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {[
                        selectedProduct.image || selectedProduct.image_url || selectedProduct.imageUrl || selectedProduct.media_url,
                        ...(Array.isArray(selectedProduct.images) ? selectedProduct.images : [])
                      ].filter(Boolean).map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveImage(img);
                            setIsVideoActive(false);
                          }}
                          className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                            (activeImage === img && !isVideoActive) ? 'border-teal-600 shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                      
                      {selectedProduct.video_url && (
                        <button
                          onClick={() => {
                            setIsVideoActive(true);
                            setActiveImage(null);
                          }}
                          className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-100 dark:bg-slate-900 flex items-center justify-center group transition-all ${
                            isVideoActive ? 'border-teal-600 shadow-md scale-105' : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <PlayCircle className={`w-8 h-8 transition-transform ${isVideoActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-teal-600 group-hover:scale-110'}`} />
                          <div className={`absolute bottom-0 inset-x-0 text-[8px] text-white font-bold py-0.5 text-center transition-colors ${isVideoActive ? 'bg-teal-600' : 'bg-slate-400 group-hover:bg-teal-600'}`}>VIDEO</div>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="mb-6">
                    <div className="inline-block px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-[10px] font-bold mb-2 uppercase tracking-wider">
                      {selectedProduct.category}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                        {selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product'}
                      </h1>
                      <button
                        onClick={() => toggleWishlist(selectedProduct.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                          wishlist.includes(selectedProduct.id)
                            ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-bold">{wishlist.includes(selectedProduct.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                      </button>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-teal-700 dark:text-teal-400 mb-4">
                      {STORE_CONFIG.CURRENCY} {selectedProduct.price.toLocaleString()}
                    </div>
                    {(selectedProduct.stock_quantity !== undefined || selectedProduct.stock !== undefined) && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${(selectedProduct.stock_quantity > 0 || selectedProduct.stock > 0) ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Stock: {selectedProduct.stock_quantity ?? selectedProduct.stock}
                        </span>
                      </div>
                    )}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                      <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Select Variant</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.variants.map((v: string) => (
                            <button
                              key={v}
                              onClick={() => setVariant(v)}
                              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                                variant === v 
                                  ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/20' 
                                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Quantity</label>
                      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
                        <button 
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all text-xl font-medium dark:text-white"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-lg dark:text-white">{quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all text-xl font-medium dark:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => orderFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex-1 bg-teal-600 text-white py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
                        Buy Now
                      </button>
                      <button 
                        onClick={handleNegotiate}
                        className="flex-1 bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg border-2 border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-6 h-6 lg:w-7 lg:h-7" />
                        Reach out
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form Section */}
              <div ref={orderFormRef} className="scroll-mt-24">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Delivery Details</h2>
                  <p className="text-slate-600 dark:text-slate-400 md:text-lg">Fill in your information to complete the order.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <div className="grid lg:grid-cols-5 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-3">
                      {submitStatus === 'error' && (
                        <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-4">
                          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-red-900 dark:text-red-100 mb-1">Something went wrong</h4>
                            <p className="text-red-700 dark:text-red-300 text-sm mb-2">We couldn't process your order. Please try again or contact us on WhatsApp.</p>
                            {errorMessage && (
                              <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg text-xs font-mono text-red-800 dark:text-red-200 break-words">
                                Error details: {errorMessage}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-6">
                        {user && (
                          <div className="flex items-center justify-between bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-800/50">
                            <div className="text-sm text-teal-800 dark:text-teal-200">
                              Signed in as <span className="font-bold">{user.email}</span>
                            </div>
                            <button
                              onClick={() => supabase.auth.signOut()}
                              className="flex items-center gap-2 text-sm font-medium text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-100 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
                              <input 
                                type="text" 
                                name="customer_name"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.customer_name ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-teal-500'} focus:border-transparent focus:ring-2 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white`}
                                placeholder="e.g. Jane Doe"
                              />
                              {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number *</label>
                              <input 
                                type="tel" 
                                name="phone"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-teal-500'} focus:border-transparent focus:ring-2 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white`}
                                placeholder="07XX XXX XXX"
                              />
                              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">City/Area in Kenya *</label>
                              <input 
                                type="text" 
                                name="city"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-teal-500'} focus:border-transparent focus:ring-2 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white`}
                                placeholder="e.g. Kilimani, Westlands"
                              />
                              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email (Optional)</label>
                              <input 
                                type="email" 
                                name="email"
                                defaultValue={user?.email || ''}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 focus:ring-teal-500 focus:border-transparent focus:ring-2 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white"
                                placeholder="jane@example.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Delivery Address *</label>
                            <textarea 
                              name="address"
                              rows={2}
                              className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-teal-500'} focus:border-transparent focus:ring-2 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white resize-none`}
                              placeholder="Building name, apartment number, street..."
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Additional Notes (Optional)</label>
                            <textarea 
                              name="notes"
                              rows={2}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 focus:ring-teal-500 focus:border-transparent focus:ring-2 outline-none transition-all bg-white dark:bg-slate-900 dark:text-white resize-none"
                              placeholder="Any special instructions for delivery?"
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <button 
                              type="submit" 
                              disabled={isSubmitting || submitStatus === 'success'}
                              className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                'Confirm Order - Pay on Delivery (COD)'
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h3>
                        
                        <div className="flex gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                            <img 
                              src={selectedProduct.image || selectedProduct.image_url || selectedProduct.imageUrl || selectedProduct.media_url || `https://picsum.photos/seed/${selectedProduct.id}/400/400`} 
                              alt={selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product'} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedProduct.id}/400/400`;
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2">{selectedProduct.name || selectedProduct.product_name || selectedProduct.title || 'Product'}</h4>
                            <p className="text-teal-700 dark:text-teal-400 font-medium mt-1">{STORE_CONFIG.CURRENCY} {selectedProduct.price.toLocaleString()}</p>
                            {variant && <p className="text-xs text-slate-500 mt-1">Variant: {variant}</p>}
                            <p className="text-xs text-slate-500">Qty: {quantity}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Subtotal</span>
                            <span>{STORE_CONFIG.CURRENCY} {((selectedProduct.price || 0) * quantity).toLocaleString()}</span>
                          </div>
                          
                          {quantity >= BULK_THRESHOLD && (
                            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                              <span>Bulk Discount ({BULK_DISCOUNT_PERCENT}%)</span>
                              <span>-{STORE_CONFIG.CURRENCY} {(((selectedProduct.price || 0) * quantity * BULK_DISCOUNT_PERCENT) / 100).toLocaleString()}</span>
                            </div>
                          )}

                          <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Delivery (Kenya)</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free</span>
                          </div>
                          <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-200 dark:border-slate-700">
                            <span className="dark:text-white">Total</span>
                            <span className="text-teal-700 dark:text-teal-400">
                              {STORE_CONFIG.CURRENCY} {
                                (
                                  ((selectedProduct.price || 0) * quantity) - 
                                  (quantity >= BULK_THRESHOLD ? ((selectedProduct.price || 0) * quantity * BULK_DISCOUNT_PERCENT) / 100 : 0)
                                ).toLocaleString()
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Products Section */}
                  {products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).length > 0 && (
                    <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Related Products</h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">You might also like these items in {selectedProduct.category}</p>
                        </div>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8 hidden md:block" />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products
                          .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                          .slice(0, 4)
                          .map((product) => (
                            <motion.div 
                              key={product.id}
                              whileHover={{ y: -4 }}
                              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                              onClick={() => {
                                handleOrderClick(product);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                                <img 
                                  src={product.image || product.image_url || product.imageUrl || product.media_url || `https://picsum.photos/seed/${product.id}/400/400`} 
                                  alt={product.name || product.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <div className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg">
                                    View Item
                                  </div>
                                </div>
                              </div>
                              <div className="p-3">
                                <h3 className="text-xs font-bold mb-1 line-clamp-1 dark:text-white group-hover:text-teal-600 transition-colors">
                                  {product.name || product.product_name || product.title}
                                </h3>
                                <div className="font-bold text-sm text-teal-700 dark:text-teal-400">
                                  {STORE_CONFIG.CURRENCY} {product.price.toLocaleString()}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-400 py-16 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-white text-2xl mb-6">
                <div className="w-10 h-10 bg-[#0F292F] rounded-lg flex items-center justify-center text-[#D4AF37]">
                  <SofaIcon className="w-6 h-6" />
                </div>
                {STORE_CONFIG.STORE_NAME}
              </div>
              <p className="max-w-sm leading-relaxed">Premium items delivered to your doorstep anywhere in Kenya. Safe, fast, and reliable.</p>
              
              <div className="mt-8 space-y-3">
                <p className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span>Opening Days: <span className="text-white font-medium">Always open</span></span>
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span>Main Branch: <span className="text-white font-medium">Nairobi OTC</span></span>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Our Locations</p>
                <div className="space-y-3">
                  <p className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>Thika, Central Province, Kenya · Nairobi, Kenya + 1</span>
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Follow Us</p>
                <div className="flex items-center gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:text-right space-y-6">
              <div>
                <p className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact Us</p>
                <div className="space-y-3">
                  <p className="flex items-center md:justify-end gap-3 text-sm">
                    <MessageCircle className="w-4 h-4 text-teal-500" />
                    <span>WhatsApp: <span className="text-white font-medium">{STORE_CONFIG.WHATSAPP_NUMBER}</span></span>
                  </p>
                  <p className="flex items-center md:justify-end gap-3 text-sm">
                    <Mail className="w-4 h-4 text-teal-500" />
                    <span>Email: <span className="text-white font-medium">{STORE_CONFIG.CONTACT_EMAIL}</span></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 dark:border-slate-900 text-sm text-center md:text-left">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.STORE_NAME}. All rights reserved.</p>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={selectedProduct?.video_url?.includes('youtube.com') || selectedProduct?.video_url?.includes('youtu.be')
                  ? `https://www.youtube.com/embed/${selectedProduct.video_url.split('v=')[1] || selectedProduct.video_url.split('/').pop()}?autoplay=1`
                  : selectedProduct?.video_url}
                title="Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
