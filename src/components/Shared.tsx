import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Instagram, Facebook, Twitter, Mail, Phone, MapPin, MessageCircle, Download, X, ArrowRight, Menu, Star, ChevronUp, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
      className={`relative px-8 py-3 rounded-full text-sm font-medium overflow-hidden group ${variants[variant]} ${className}`}
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
          <span className="flex items-center justify-center h-5 whitespace-nowrap">{children}</span>
          <span className="flex items-center justify-center h-5 whitespace-nowrap">{children}</span>
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
  const isAboutPage = location.pathname === "/about";

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

  const navScrolled = isScrolled;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("Catalog download started! (Simulation)");
    }, 2000);
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
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-bold tracking-tighter uppercase">S.K Enterprises</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-4xl font-medium tracking-tighter">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-white/60 transition-colors">About Us</Link>
              <Link to="/catalog" className="hover:text-white/60 transition-colors">Catalog</Link>
              <Link to="/wholesale-inquiry" className="hover:text-white/60 transition-colors">Wholesale Inquiry</Link>
              <Link to="/fabric-guide" className="hover:text-white/60 transition-colors">Fabric Guide</Link>
              <Link to="/shipping-policy" className="hover:text-white/60 transition-colors">Shipping & Returns</Link>
              <Link to="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
            </div>

            <div className="mt-auto flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">Quick Contact</span>
                <a href="tel:+9198XXXXXXXX" className="text-xl font-bold">+91 98XX XXX XXX</a>
              </div>
              <AnimatedButton 
                variant="white" 
                className="w-full py-5 text-lg font-bold"
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
                <button type="submit" className="absolute right-0 bottom-8 p-4 hover:scale-110 transition-transform">
                  <ArrowRight size={48} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Banner */}
      <div className="bg-black text-white py-2.5 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12 text-[12px] font-medium uppercase tracking-tight">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>15+ Years in Wholesale</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Ready Stock Always</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Factory-Direct Rates</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Pan-India Shipping</span>
            </span>
          ))}
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
          <Link to="/catalog">
            <AnimatedButton variant={navScrolled ? "black" : "white"} className="px-6 py-2.5">
              Shop all items
            </AnimatedButton>
          </Link>
        </div>
      </nav>
      
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/9198XXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle size={32} fill="currentColor" />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Warehouse
        </span>
      </motion.a>
    </header>
  );
};

export const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-md text-center md:text-left">
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="flex flex-col gap-8">
            <div className="text-3xl font-bold tracking-tighter uppercase">S.K Enterprises</div>
            <p className="text-white/60 text-lg font-medium leading-relaxed">
              Specializing in premium wholesale men's shirts for over 15 years. Quality you can trust, prices that help you grow.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-white/40 uppercase tracking-widest font-bold">Business Hours</span>
              <span className="text-white/80">Mon - Sat: 10 AM – 7 PM</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-semibold tracking-tight">Quick Links</h4>
            <div className="flex flex-col gap-4 text-white/40 text-lg font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/catalog" className="hover:text-white transition-colors">Product Catalog</Link>
              <Link to="/wholesale-inquiry" className="hover:text-white transition-colors">Wholesale Inquiry</Link>
              <Link to="/fabric-guide" className="hover:text-white transition-colors">Fabric Guide</Link>
              <Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Returns</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-semibold tracking-tight">Follow us:</h4>
            <div className="flex flex-col gap-4 text-white/40 text-lg font-medium">
              <a href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Instagram size={20} /> Instagram
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Facebook size={20} /> Facebook
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Twitter size={20} /> Twitter
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-semibold tracking-tight">Get in touch</h4>
            <div className="flex flex-col gap-6 text-white/40 text-lg font-medium">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                  <Mail size={18} />
                </div>
                <span className="hover:text-white transition-colors cursor-pointer">sales@skenterprises.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                  <Phone size={18} />
                </div>
                <span className="hover:text-white transition-colors cursor-pointer">+91 98XXX XXXXX</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                  <MapPin size={18} />
                </div>
                <span className="hover:text-white transition-colors cursor-pointer">Shop No. 45, Gandhi Nagar Market, New Delhi</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 select-none pointer-events-none opacity-20">
          <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white text-center uppercase">
            S.K Enterprises
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
