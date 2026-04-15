import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ShieldCheck, Truck, Package, ArrowRight, Star, X, Ruler, Sparkles } from "lucide-react";
import { AnimatedButton } from "../components/Shared";
import { SEO } from "../components/SEO";
import { products } from "../data/products";

const SizeGuideModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl"
        >
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <Ruler size={24} className="text-black" />
                <h3 className="text-3xl font-bold tracking-tight">Size Guide</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gallery rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-4 font-bold uppercase tracking-widest text-xs text-black/40">Size</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-xs text-black/40">Chest (in)</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-xs text-black/40">Length (in)</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-xs text-black/40">Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {[
                    { s: "S", c: "38", l: "28", sh: "17" },
                    { s: "M", c: "40", l: "29", sh: "18" },
                    { s: "L", c: "42", l: "30", sh: "19" },
                    { s: "XL", c: "44", l: "31", sh: "20" },
                    { s: "XXL", c: "46", l: "32", sh: "21" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-black/5 hover:bg-gallery/50 transition-colors">
                      <td className="py-4 font-black">{row.s}</td>
                      <td className="py-4">{row.c}"</td>
                      <td className="py-4">{row.l}"</td>
                      <td className="py-4">{row.sh}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-6 bg-gallery rounded-2xl flex gap-4 items-start">
              <div className="shrink-0 mt-1">
                <ShieldCheck size={20} className="text-black/40" />
              </div>
              <p className="text-sm text-dove-gray leading-relaxed">
                <strong>Measurement Tip:</strong> For the best fit, measure a shirt you already own that fits you well and compare it with the chart above. All measurements are in inches.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    S: 0, M: 0, L: 0, XL: 0, XXL: 0
  });

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <Link to="/catalog">
          <AnimatedButton variant="black">Back to Catalog</AnimatedButton>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const pricingTiers = [
    { range: "48 - 100 units", price: product.price },
    { range: "101 - 500 units", price: (Number(product.price) * 0.92).toFixed(0) },
    { range: "500+ units", price: (Number(product.price) * 0.85).toFixed(0) },
  ];

  return (
    <div className="pt-24 md:pt-40 pb-24">
      <SEO title={product.title} description={product.description} />
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <Link to="/catalog" className="flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-12 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="aspect-[4/5] bg-gallery rounded-[40px] overflow-hidden">
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {[product.image, ...(product.gallery || [])].map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.title} view ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-widest text-black/40">{product.category}</span>
                {product.tag && (
                  <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                    {product.tag}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-6xl font-medium tracking-tighter leading-tight">
                {product.title}
              </h1>
              <div className="flex flex-wrap items-baseline gap-4 mt-2">
                <span className="text-4xl font-black tracking-tighter">₹{product.price}</span>
                <span className="text-black/40 font-medium">per unit (Wholesale)</span>
              </div>
            </div>

            <p className="text-dove-gray text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Wholesale Specs */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 py-8 border-y border-black/5">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{key}</span>
                  <span className="font-bold text-lg tracking-tight">{value}</span>
                </div>
              ))}
            </div>

            {/* Bulk Order Calculator */}
            <div className="bg-gallery p-6 md:p-10 rounded-[40px] flex flex-col gap-8 border border-black/5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-black/40">
                    <Sparkles size={16} />
                    <span className="text-sm font-bold uppercase tracking-widest">Wholesale Configurator</span>
                  </div>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs font-bold underline underline-offset-4 hover:opacity-60 transition-opacity"
                  >
                    Size Guide
                  </button>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Select Sizes & Quantities</h3>
              </div>

              {/* Pricing Tiers Display */}
              <div className="grid grid-cols-3 gap-2 pb-4 border-b border-black/5">
                {pricingTiers.map((tier, i) => (
                  <div key={i} className="flex flex-col gap-1 p-3 bg-white/50 rounded-2xl border border-black/5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-black/40">{tier.range}</span>
                    <span className="font-bold text-base">₹{tier.price}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-3">
                {["S", "M", "L", "XL", "XXL"].map(size => (
                  <div key={size} className="flex flex-col gap-2">
                    <span className="text-center text-xs font-bold text-black/40">{size}</span>
                    <input 
                      type="number" 
                      min="0"
                      value={quantities[size] || ""}
                      onChange={(e) => setQuantities({ ...quantities, [size]: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full bg-white border border-black/10 rounded-xl py-3 text-center font-bold focus:outline-none focus:border-black transition-colors"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              {(() => {
                const totalQty = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);
                const basePrice = Number(product.price);
                let discount = 0;
                let tierLabel = "Standard Rate";

                if (totalQty >= 500) {
                  discount = 0.15;
                  tierLabel = "Premium Tier (15% OFF)";
                } else if (totalQty >= 100) {
                  discount = 0.08;
                  tierLabel = "Wholesale Tier (8% OFF)";
                }

                const discountedPrice = Math.floor(basePrice * (1 - discount));
                const totalCost = totalQty * discountedPrice;
                const savings = totalQty * (basePrice - discountedPrice);

                return (
                  <div className="flex flex-col gap-6 pt-6 border-t border-black/5">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-black/40 uppercase tracking-widest">Current Tier</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${discount > 0 ? "bg-black text-white" : "bg-black/5 text-black/40"}`}>
                          {tierLabel}
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-black/40 text-xs font-bold uppercase tracking-widest">Unit Price</span>
                          <span className="text-3xl font-black tracking-tighter">₹{discountedPrice}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-black/40 text-xs font-bold uppercase tracking-widest">Total Qty</span>
                          <span className="text-3xl font-black tracking-tighter">{totalQty}</span>
                        </div>
                      </div>
                    </div>

                    {savings > 0 && (
                      <div className="bg-white/50 border border-black/5 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-sm font-bold text-black/60">Estimated Savings:</span>
                        <span className="text-xl font-black tracking-tighter text-black">₹{savings.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold">Estimated Quote</span>
                        <span className="text-4xl font-black tracking-tighter">₹{totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}
            </div>



            {(() => {
                const totalQty = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);
                const breakdown = Object.entries(quantities)
                  .filter(([_, qty]) => (qty as number) > 0)
                  .map(([size, qty]) => `${size}:${qty}`)
                  .join(", ");
                
                const inquiryUrl = `/wholesale-inquiry?product=${encodeURIComponent(product.title)}&qty=${totalQty}${breakdown ? `&breakdown=${encodeURIComponent(breakdown)}` : ""}`;

                return (
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to={inquiryUrl} className="flex-1">
                      <AnimatedButton variant="black" className="w-full py-5 text-base font-bold flex items-center justify-center gap-3">
                        Inquire for Bulk <ArrowRight size={18} />
                      </AnimatedButton>
                    </Link>
                    <Link to={`/contact?product=${encodeURIComponent(product.title)}`} className="flex-1 sm:flex-none">
                      <AnimatedButton variant="transparent" className="w-full px-8 py-5 font-bold text-black border-black/10">
                        Request Sample
                      </AnimatedButton>
                    </Link>
                  </div>
                );
              })()}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/5">
              <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gallery rounded-full flex items-center justify-center text-black/40">
                  <ShieldCheck size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">QC Verified</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gallery rounded-full flex items-center justify-center text-black/40">
                  <Truck size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">Fast Dispatch</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gallery rounded-full flex items-center justify-center text-black/40">
                  <Package size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">Bulk Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex justify-between items-end mb-12">
              <div className="flex flex-col gap-4">
                <div className="bg-gallery px-4 py-1.5 rounded-full self-start flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full" />
                  <span className="text-sm font-bold uppercase tracking-wider">Similar Styles</span>
                </div>
                <h2 className="text-4xl font-medium tracking-tighter">You might also like</h2>
              </div>
              <Link to="/catalog" className="text-black font-bold underline underline-offset-8 hover:opacity-60 transition-opacity">
                View all {product.category}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="flex flex-col gap-4 group">
                  <div className="aspect-[3/4] bg-gallery rounded-3xl overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold">View Details</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold tracking-tight">{item.title}</h3>
                    <span className="text-xl font-black tracking-tighter">₹{item.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
