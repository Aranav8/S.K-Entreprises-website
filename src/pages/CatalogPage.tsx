import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Download, ChevronRight, Star } from "lucide-react";
import { AnimatedButton, BadgeIcon } from "../components/Shared";
import { SEO } from "../components/SEO";
import { ProductCardSkeleton } from "../components/Skeleton";

import { products } from "../data/products";

const categories = [
  "All Shirts",
  "Premium Formals",
  "Casual Linens",
  "Digital Prints",
  "Daily Wear Basics"
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All Shirts");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("default"); // default, price-low, price-high
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Simulate loading on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, sortBy]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All Shirts" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = parseInt(a.price);
    const priceB = parseInt(b.price);
    if (sortBy === "price-low") return priceA - priceB;
    if (sortBy === "price-high") return priceB - priceA;
    return 0;
  });

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
    <div className="relative">
      <SEO title="Wholesale Product Catalog" description="Browse our full collection of premium men's shirts. Formals, linens, and digital prints available for bulk order." />
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/heroes/catalog-hero.png" 
            alt="S.K Enterprises Catalog" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 h-[350px] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-[250px] backdrop-blur-2xl"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 100%)',
              maskImage: 'linear-gradient(to top, black 10%, transparent 100%)'
            }}
          />
        </div>
        
        <div className="relative z-10 w-full max-w-screen-xl px-6 flex flex-col items-center gap-6 pt-[80px]">
          <div className="flex flex-col items-center text-center gap-4 max-w-3xl">
            <div className="bg-white/15 backdrop-blur-xs px-4 py-1 rounded-full flex items-center gap-2 border border-white/10">
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">COLLECTIONS</div>
              <span className="text-white text-sm font-medium tracking-tight">Full Product Catalog</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
              Explore our range.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-light tracking-tight max-w-2xl">
              From formal boardrooms to casual weekends, our wholesale shirt collection covers every retail need with premium fabrics and perfect fits.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Controls */}
      <section className="relative z-30 bg-white border-b border-black/5 py-4 md:py-6 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto px-2 lg:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                ? "bg-black text-white shadow-lg shadow-black/20" 
                : "bg-gallery text-black/60 hover:bg-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={16} />
              <input 
                type="text" 
                placeholder="Search shirts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gallery rounded-full pl-10 pr-6 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex items-center gap-3">
                <button 
                  onClick={() => setSortBy(sortBy === "price-low" ? "price-high" : "price-low")}
                  className={`flex items-center gap-2.5 px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 font-bold ${
                    sortBy !== "default" 
                    ? "bg-black text-white shadow-lg shadow-black/20" 
                    : "bg-gallery text-black/60 hover:bg-black/5"
                  }`}
                >
                  <Filter size={18} />
                  {sortBy !== "default" && (
                    <span className="text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
                      {sortBy === "price-low" ? "Price: L-H" : "Price: H-L"}
                    </span>
                  )}
                </button>
                
                {sortBy !== "default" && (
                  <button 
                    onClick={() => setSortBy("default")}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 hover:text-black transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              <AnimatedButton 
                variant="black" 
                className="flex items-center gap-2 px-6 py-2.5 text-xs whitespace-nowrap"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? "..." : "Price List"} <Download size={14} />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6 md:px-12 max-w-screen-xl mx-auto min-h-[600px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="flex flex-col gap-4 group cursor-pointer"
                  >
                    <Link to={`/product/${product.id}`} className="flex flex-col gap-4">
                      <div className="relative aspect-[3/4] bg-gallery rounded-2xl overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {product.tag && (
                          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                            <BadgeIcon />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{product.tag}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <AnimatedButton variant="white" className="scale-90 group-hover:scale-100 transition-transform">
                            View Details
                          </AnimatedButton>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 px-1 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{product.category}</span>
                        <h3 className="text-lg font-bold tracking-tight">{product.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-black/40 font-medium">Wholesale Price</span>
                            <span className="text-xl font-black tracking-tighter">₹{product.price}</span>
                          </div>
                          <BadgeIcon 
                            className="w-10 h-10 bg-gallery group-hover:bg-black transition-all" 
                            icon={ChevronRight} 
                            iconClassName="text-black group-hover:text-white"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 text-center gap-4">
                <div className="w-20 h-20 bg-gallery rounded-full flex items-center justify-center">
                  <Search size={32} className="text-black/20" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">No shirts found</h3>
                <p className="text-dove-gray max-w-xs">Try adjusting your filters or search query to find what you're looking for.</p>
                <button 
                  onClick={() => { setActiveCategory("All Shirts"); setSearchQuery(""); }}
                  className="text-black font-bold underline underline-offset-4 mt-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Wholesale Banner */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="bg-black rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img src="/images/heroes/fabric-guide-hero.png" alt="pattern" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col gap-8 max-w-xl relative z-10">
            <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full self-start flex items-center gap-2 border border-white/10">
              <Star size={14} className="text-white fill-white" />
              <span className="text-white text-sm font-medium tracking-tight uppercase">Bulk Orders</span>
            </div>
            <h2 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
              Need a custom quote for your retail chain?
            </h2>
            <p className="text-white/60 text-lg font-medium leading-relaxed">
              We offer special pricing for orders above 500 units and custom branding options for large-scale retailers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link to="/wholesale-inquiry">
              <AnimatedButton variant="white" className="px-12 py-5 font-bold text-base w-full sm:w-auto">
                Talk to Sales
              </AnimatedButton>
            </Link>
            <AnimatedButton 
              variant="transparent" 
              className="px-12 py-5 font-bold text-base w-full sm:w-auto"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download Full PDF"}
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
