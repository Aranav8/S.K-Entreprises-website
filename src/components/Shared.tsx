import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Instagram, Facebook, Twitter, Mail, Phone, MapPin, 
  MessageCircle, Download, X, ArrowRight, Menu, Star, 
  ChevronUp, ChevronRight, Sparkles 
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/products";

export const AnimatedButton = ({ children, className, variant = "black", ...props }: any) => {
  const variants: any = {
    black: "bg-black text-white",
    white: "bg-white text-mine-shaft shadow-sm",
    transparent: "bg-white/15 backdrop-blur-md text-white border border-white/10",
    outline: "bg-transparent border border-black/10 text-black",
  };

  return (
    <motion.button
      whileHover="hover"
      initial="initial"
      className={`relative px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium overflow-hidden group ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="relative h-5 overflow-hidden pointer-events-none">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: -20 }
          }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col"
        >
          <span className="flex items-center justify-center gap-2.5 h-5 whitespace-nowrap">{children}</span>
          <span className="flex items-center justify-center gap-2.5 h-5 whitespace-nowrap">{children}</span>
        </motion.div>
      </div>
    </motion.button>
  );
};

export const RollingLink = ({ children, to = "#", className = "" }: any) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className={`relative overflow-hidden block px-2 py-1 transition-colors duration-500 ${className}`}
    >
      <Link to={to}>
        <div className="relative h-5 overflow-hidden pointer-events-none">
          <motion.div
            variants={{
              initial: { y: 0 },
              hover: { y: -20 }
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center"
          >
            <span className="flex items-center h-5 whitespace-nowrap">{children}</span>
            <span className="flex items-center h-5 whitespace-nowrap font-bold">{children}</span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export const BadgeIcon = ({ className = "bg-black", iconClassName = "text-white", icon: Icon = ChevronUp }: { className?: string, iconClassName?: string, icon?: any }) => (
  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${className}`}>
    <Icon size={Icon === ChevronUp ? 14 : 16} className={`${iconClassName} ${Icon === ChevronRight ? "ml-0.5" : ""}`} />
  </div>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const forceSolid = location.pathname.startsWith("/product/") || location.pathname === "/legal";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navScrolled = isScrolled || forceSolid;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Real download trigger
    const link = document.createElement('a');
    link.href = '/SK_Enterprises_Catalog.pdf';
    link.download = 'SK_Enterprises_Catalog.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[80] bg-black text-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold tracking-tighter uppercase">S.K Enterprises</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-2xl md:text-3xl font-medium tracking-tighter overflow-y-auto py-4">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-white/60 transition-colors">About Us</Link>
              <Link to="/catalog" className="hover:text-white/60 transition-colors">Catalog</Link>
              <Link to="/wholesale-inquiry" className="hover:text-white/60 transition-colors">Wholesale Inquiry</Link>
              <Link to="/shipping-policy" className="hover:text-white/60 transition-colors">Shipping & Returns</Link>
              <Link to="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
            </div>

            <div className="mt-auto pt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Quick Contact</span>
                <a href="tel:+919354092323" className="text-lg font-bold tracking-tight">+91 93540 92323</a>
              </div>
              <AnimatedButton
                variant="white"
                className="w-full py-4 text-base font-bold"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? "Starting Download..." : "Download Catalog PDF"}
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 z-[70] bg-white flex flex-col items-center justify-center px-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 p-4 hover:bg-gallery rounded-full transition-colors"
            >
              <X size={32} />
            </button>

            <form onSubmit={handleSearch} className="w-full max-w-4xl flex flex-col gap-8">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/30 text-center">Search our wholesale catalog</span>
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'Formal Shirt'..."
                  className="w-full bg-transparent border-b-2 border-black/10 py-8 text-4xl md:text-6xl font-medium tracking-tighter focus:outline-none focus:border-black transition-colors placeholder:text-black/5"
                />
                
                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {searchQuery.trim().length > 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-4 bg-white border border-black/5 shadow-2xl rounded-3xl overflow-hidden z-20"
                    >
                      <div className="flex flex-col">
                        <div className="px-6 py-4 bg-gallery/50 border-b border-black/5 flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Top Matches</span>
                          <span className="text-[10px] font-bold text-black/20">{products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).length} Results</span>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                          {products
                            .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                            .slice(0, 5)
                            .map((product) => (
                              <Link 
                                key={product.id}
                                to={`/product/${product.id}`}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-6 p-4 hover:bg-gallery transition-colors group"
                              >
                                <div className="w-16 h-20 bg-gallery rounded-xl overflow-hidden shrink-0">
                                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">{product.category}</span>
                                  <h4 className="font-bold text-lg group-hover:text-black transition-colors">{product.title}</h4>
                                  <span className="text-sm font-medium">₹{product.price} <span className="text-black/20 text-xs">Wholesale</span></span>
                                </div>
                                <ChevronRight size={20} className="text-black/10 group-hover:text-black transition-all" />
                              </Link>
                            ))}
                        </div>
                        <button 
                          type="submit"
                          className="w-full py-4 text-center text-sm font-bold border-t border-black/5 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          View all matches for "{searchQuery}" <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" className="absolute right-0 bottom-8 p-4 hover:scale-110 transition-transform">
                  <ArrowRight size={48} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Utility Bar */}
      <div className="bg-black text-white py-1.5 px-6 md:px-12 flex justify-between items-center overflow-hidden">
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee gap-12 text-[10px] md:text-[11px] font-medium uppercase tracking-tight opacity-40">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                <span>15+ Years in Wholesale</span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span>Ready Stock Always</span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span>Pan-India Shipping</span>
              </span>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6 ml-6 relative z-10 shrink-0">
          <Link to="/shipping-policy" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:text-white/60 transition-colors">Shipping & Returns</Link>
          <a href="tel:+919354092323" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:text-white/60 transition-colors">+91 93540 92323</a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`w-full py-4 px-4 md:px-12 flex items-center transition-all duration-500 ease-in-out ${navScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="flex-1">
          <Link to="/" className={`text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-500 ${navScrolled ? 'text-black' : 'text-white'}`}>S.K Enterprises</Link>
        </div>

        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-500 ${navScrolled ? 'text-black/70' : 'text-white/80'}`}>
          <RollingLink to="/" className={navScrolled ? 'hover:text-black' : 'hover:text-white'}>Home</RollingLink>
          <RollingLink to="/about" className={navScrolled ? 'hover:text-black' : 'hover:text-white'}>About Us</RollingLink>
          <RollingLink to="/catalog" className={navScrolled ? 'hover:text-black' : 'hover:text-white'}>Catalog</RollingLink>
          <RollingLink to="/wholesale-inquiry" className={navScrolled ? 'hover:text-black' : 'hover:text-white'}>Wholesale Inquiry</RollingLink>
          <RollingLink to="/contact" className={navScrolled ? 'hover:text-black' : 'hover:text-white'}>Contact</RollingLink>
        </div>

        <div className="flex-1 flex items-center justify-end gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden p-2.5 rounded-full transition-all duration-500 ${navScrolled ? 'bg-black/5 text-black hover:bg-black/10' : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/20'}`}
          >
            <Menu size={18} />
          </button>
          <AnimatedButton
            variant={navScrolled ? "outline" : "transparent"}
            className={`hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-500 ${navScrolled ? "border-black/10 hover:bg-black/5" : ""}`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <div className="flex items-center gap-2">
              <Download size={14} /> {isDownloading ? "Downloading..." : "Catalog PDF"}
            </div>
          </AnimatedButton>
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`p-2.5 rounded-full transition-all duration-500 ${navScrolled ? 'bg-black/5 text-black hover:bg-black/10' : 'bg-white/15 backdrop-blur-md text-white hover:bg-white/20'}`}
          >
            <Search size={18} />
          </button>
          <Link to="/catalog" className="hidden xl:block">
            <AnimatedButton variant={navScrolled ? "black" : "white"} className="px-6 py-2.5">
              Shop all items
            </AnimatedButton>
          </Link>
        </div>
      </nav>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919354092323"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle size={24} className="md:size-[32px]" fill="currentColor" />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Warehouse
        </span>
      </motion.a>
    </header>
  );
};

export const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Get the email from the form input
    const form = e.target as HTMLFormElement;
    const email = (form.elements[0] as HTMLInputElement).value;
    
    try {
      const response = await fetch("https://formspree.io/f/xjgjkodn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          _subject: "New Newsletter Subscription",
          message: "User subscribed to wholesale price list updates."
        })
      });

      if (response.ok) {
        setSubscribed(true);
      }
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };

  return (
    <footer className="bg-black text-white pt-20 md:pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-16">
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight leading-tight max-w-md text-center md:text-left">
            {subscribed ? "Thank you for joining our network!" : "Get our wholesale price list directly in your inbox"}
          </h2>
          {subscribed ? (
            <div className="flex items-center gap-4 bg-white/10 px-6 md:px-8 py-5 md:py-6 rounded-[24px] md:rounded-[32px] border border-white/10 w-full md:w-auto">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shrink-0">
                <Star size={20} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base md:text-lg">Check your inbox</span>
                <span className="text-white/40 text-xs md:text-sm">We've sent the latest price list.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-lg gap-4 bg-mine-shaft p-2 rounded-[24px] sm:rounded-full border border-white/5">
              <input
                required
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent rounded-full px-6 py-4 text-base font-light text-white placeholder:text-white/30 focus:outline-none"
              />
              <AnimatedButton variant="white" className="px-10 py-4 font-bold w-full sm:w-auto">
                Subscribe
              </AnimatedButton>
            </form>
          )}
        </div>

        <div className="h-px bg-white/10 w-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase">S.K Enterprises</div>
            <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed">
              Specializing in premium wholesale men's shirts for over 15 years. Quality you can trust, prices that help you grow.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Business Hours</span>
              <span className="text-white/80 text-sm">Mon - Sat: 10 AM – 7 PM</span>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Quick Links</h4>
            <div className="flex flex-col gap-4 text-white/40 text-sm font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/catalog" className="hover:text-white transition-colors">Product Catalog</Link>
              <Link to="/wholesale-inquiry" className="hover:text-white transition-colors">Wholesale Inquiry</Link>
              <Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Returns</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Follow us:</h4>
            <div className="flex flex-col gap-4 text-white/40 text-sm font-medium">
              <a href="#!" className="flex items-center gap-3 hover:text-white transition-colors">
                <Instagram size={18} /> Instagram
              </a>
              <a href="#!" className="flex items-center gap-3 hover:text-white transition-colors">
                <Facebook size={18} /> Facebook
              </a>
              <a href="#!" className="flex items-center gap-3 hover:text-white transition-colors">
                <Twitter size={18} /> Twitter
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Get in touch</h4>
            <div className="flex flex-col gap-6 text-white/40 text-sm font-medium">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all shrink-0">
                  <Mail size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white hover:text-white/80 transition-colors cursor-pointer break-all">aranavk08@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all shrink-0">
                  <Phone size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <a href="tel:+919354092323" className="text-white hover:text-white/80 transition-colors cursor-pointer">+91 93540 92323</a>
                  <a href="https://wa.me/919354092323" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-white transition-colors">Chat on WhatsApp</a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all shrink-0">
                  <MapPin size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white leading-tight">Shop No. 45, Gandhi Nagar Market, New Delhi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="select-none pointer-events-none opacity-[0.1]">
          <h1 className="text-[10vw] font-black tracking-[-0.05em] leading-none text-white text-center uppercase whitespace-nowrap overflow-hidden">
            S.K ENTERPRISES
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm font-medium">
          <p>© 2026 S.K Enterprises. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
