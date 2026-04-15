import { motion, AnimatePresence } from "motion/react";
import { Search, Mail, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatedButton, BadgeIcon } from "../components/Shared";
import { SEO } from "../components/SEO";
import { products } from "../data/products";

const heroCategories = [
  { label: 'Oxford', img: '/images/categories/cat-oxford.png', heroImg: '/images/heroes/home-hero.png' },
  { label: 'Linen', img: '/images/categories/cat-linen.png', heroImg: '/images/products/linen-1.png' },
  { label: 'Checks', img: '/images/products/formal-2.png', heroImg: '/images/products/formal-2.png' },
  { label: 'Cotton', img: '/images/products/basic-1.png', heroImg: '/images/products/basic-1.png' },
  { label: 'Denim', img: '/images/products/linen-2.png', heroImg: '/images/products/linen-2.png' },
  { label: 'Prints', img: '/images/products/print-1.png', heroImg: '/images/products/print-1.png' },
  { label: 'Basics', img: '/images/products/basic-2.png', heroImg: '/images/products/basic-2.png' },
];

const ProductCard = ({ id, image, title, price, oldPrice, tag, colors }: any) => {
  return (
    <Link 
      to={`/product/${id}`}
      className="flex flex-col gap-4 group cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-gallery rounded-xl overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {tag && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <BadgeIcon />
            <span className="text-[12px] font-medium">{tag}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <AnimatedButton variant="white" className="scale-90 group-hover:scale-100 transition-transform">
            View Details
          </AnimatedButton>
        </div>
      </div>
      
      <div className="flex justify-between items-start px-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium tracking-tight group-hover:text-black/60 transition-colors">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-medium tracking-tight">₹{price}</span>
            {oldPrice && <span className="text-sm text-silver-chalice line-through font-light">₹{oldPrice}</span>}
          </div>
        </div>
        <BadgeIcon 
          className="w-8 h-8 bg-gallery group-hover:bg-black transition-all" 
          icon={ChevronRight} 
          iconClassName="text-black group-hover:text-white"
        />
      </div>
    </Link>
  );
};

const SectionHeader = ({ tag, title, buttonText, buttonLink = "/catalog", onButtonClick }: any) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
      <div className="flex flex-col gap-5 max-w-lg">
        <div className="bg-white px-4 py-1.5 rounded-full self-start flex items-center gap-2 shadow-sm">
          <BadgeIcon />
          <span className="text-sm font-medium">{tag}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight">{title}</h2>
      </div>
      {buttonText && (
        onButtonClick ? (
          <AnimatedButton variant="black" className="shadow-lg whitespace-nowrap" onClick={onButtonClick}>
            {buttonText}
          </AnimatedButton>
        ) : (
          <Link to={buttonLink}>
            <AnimatedButton variant="black" className="shadow-lg whitespace-nowrap">
              {buttonText}
            </AnimatedButton>
          </Link>
        )
      )}
    </div>
  );
};

const CollectionCard = ({ image, tag, title, description, priceRange }: any) => {
  return (
    <div className="flex flex-col md:flex-row bg-gallery rounded-2xl overflow-hidden min-h-[560px]">
      <div className="md:w-1/2 relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
      </div>
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-6">
          <div className="bg-white px-4 py-1.5 rounded-full self-start flex items-center gap-2 shadow-sm">
            <div className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">NEW</div>
            <span className="text-sm font-medium">{tag}</span>
          </div>
          <h3 className="text-4xl font-medium tracking-tight leading-tight max-w-md">{title}</h3>
          <p className="text-dove-gray text-base font-medium leading-relaxed max-w-md">{description}</p>
        </div>
        
        <div className="bg-white p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 px-2">
            <div className="w-12 h-12 bg-alabaster rounded-xl flex items-center justify-center text-black shrink-0">
              <Search size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm text-boulder font-medium">Pricing start from:</span>
              <span className="text-sm md:text-base font-bold">₹350 — ₹850</span>
            </div>
          </div>
          <Link to="/catalog" className="w-full sm:w-auto">
            <AnimatedButton variant="black" className="w-full sm:w-auto px-6 py-2.5">
              All collections
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(3);

  return (
    <>
      <SEO title="Premium Wholesale Men's Shirts" />
      {/* Hero Section */}
      <section className="relative min-h-[550px] md:h-screen md:min-h-[700px] flex flex-col justify-end items-center pb-8 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeHeroIndex}
              src={heroCategories[activeHeroIndex].heroImg} 
              alt={heroCategories[activeHeroIndex].label} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
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
        
        <div className="relative z-10 w-full max-w-screen-xl px-6 flex flex-col items-center gap-8 md:gap-12 pt-[120px] md:pt-[160px]">
          <div className="flex flex-col items-center text-center gap-4 md:gap-6 max-w-3xl">
            <div className="bg-white/15 backdrop-blur-xs px-4 py-1 rounded-full flex items-center gap-2 border border-white/10">
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">EST. 2011</div>
              <span className="text-white text-[12px] md:text-sm font-medium tracking-tight">Wholesale Shirts Supplier</span>
            </div>
            <h1 className="text-white text-3xl md:text-6xl font-medium tracking-tighter leading-[1.1]">
              Premium Men's Shirts, Direct from the Factory.
            </h1>
            <p className="text-white/80 text-sm md:text-lg font-light tracking-tight max-w-2xl px-4 md:px-0">
              S.K Enterprises has been a trusted name in the wholesale textile market for over 15 years. We specialize exclusively in high-quality men's shirts.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <Link to="/catalog" className="w-full sm:w-auto">
                <AnimatedButton variant="white" className="w-full px-10">
                  View Current Stock
                </AnimatedButton>
              </Link>
              <Link to="/wholesale-inquiry" className="w-full sm:w-auto">
                <AnimatedButton variant="transparent" className="w-full px-10">
                  Get a Quote
                </AnimatedButton>
              </Link>
            </div>
          </div>
          
          {/* Hero Carousel - Responsive */}
          <div className="hidden md:block w-full max-w-screen-lg overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-end justify-center gap-2 md:gap-3 px-6 min-w-max mx-auto">
              {heroCategories.map((item, i) => (
                <motion.div 
                  key={i} 
                  onClick={() => setActiveHeroIndex(i)}
                  layout
                  className={`relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer border border-white/10 ${
                    activeHeroIndex === i 
                      ? 'w-[140px] md:w-[180px] h-[90px] md:h-[120px] opacity-100 ring-2 ring-white/30' 
                      : 'w-[80px] md:w-[100px] h-[60px] md:h-[80px] opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-center justify-center">
                    <span className={`text-white font-bold tracking-tight transition-all ${activeHeroIndex === i ? 'text-base md:text-lg' : 'text-[10px] md:text-xs'}`}>
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <SectionHeader 
          tag="What We Supply" 
          title="Bulk collections for retailers and resellers" 
          buttonText="Download Catalog PDF" 
          onButtonClick={() => alert("Catalog download started! (Simulation)")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            { title: "Premium Formals", desc: "High-thread count cotton shirts for the modern professional. Available in slim and regular fits.", image: "/images/products/formal-1.png" },
            { title: "Casual Linens", desc: "Breathable, high-quality linen blends perfect for summer collections and premium retail.", image: "/images/products/linen-1.png" },
            { title: "Digital Prints", desc: "Trend-setting printed shirts for party wear and festive seasons. Unique designs that sell fast.", image: "/images/products/print-1.png" },
            { title: "Daily Wear Basics", desc: "Durable, everyday cotton shirts in a wide range of colors. The backbone of any retail shop.", image: "/images/products/basic-1.png" },
          ].map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="flex flex-col gap-6 bg-gallery p-6 rounded-2xl"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold tracking-tight">{cat.title}</h3>
                <p className="text-dove-gray text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* About Section */}
      <section className="relative min-h-[600px] py-20 md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/heroes/home-hero.png" alt="Wholesale Warehouse" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center gap-8 max-w-3xl px-6">
          <div className="bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-full flex items-center gap-3 border border-white/10 max-w-full overflow-hidden">
            <div className="bg-white text-black text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tighter shrink-0">OUR STORY</div>
            <span className="text-white text-xs md:text-sm font-medium tracking-tight truncate">From the Market to Your Screen</span>
          </div>
          <h2 className="text-white text-3xl md:text-6xl font-medium tracking-tight">Reliable stock you can trust</h2>
          <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed">
            We started as a small setup in the wholesale mandi, dealing face-to-face with shop owners who needed reliable stock. Over the years, we’ve learned exactly what sells and what sits on the shelf. Moving online doesn't change how we do business—we still focus on the same thing: giving you the best margins and consistent quality so your customers keep coming back to your store.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/catalog" className="w-full sm:w-auto">
              <AnimatedButton variant="white" className="w-full py-3.5">
                View Full Catalog
              </AnimatedButton>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <AnimatedButton variant="transparent" className="w-full py-3.5">
                Contact Our Team
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto"
      >
        <SectionHeader 
          tag="Best sellers" 
          title="Our signature best selling piece" 
          buttonText="See all collections" 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.slice(0, 6).map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Specialties Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <SectionHeader 
          tag="Our Specialties" 
          title="Men's shirt collections defined by quality" 
          buttonText="View All Shirts" 
        />
        <div className="flex flex-col gap-8">
          <CollectionCard 
            image="/images/heroes/catalog-hero.png"
            tag="Men's Premium"
            title="The 2026 Signature Men's Collection"
            description="Our latest wholesale range features premium fabrics and modern cuts designed to give your retail store a competitive edge."
          />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-32 bg-alabaster">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-lg mx-auto">
            <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <BadgeIcon />
              <span className="text-sm font-medium">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">How to get your order</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse", desc: "Check our latest designs and colors on the website." },
              { step: "02", title: "Inquire", desc: "Send us a quick message or call with the quantities you need." },
              { step: "03", title: "Confirm", desc: "We'll send you a final proforma invoice including the best shipping rates." },
              { step: "04", title: "Dispatch", desc: "Once payment is confirmed, we pack and dispatch within 24 hours." },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col gap-6">
                <div className="text-6xl font-black text-black/5 absolute -top-8 -left-4">{item.step}</div>
                <h3 className="text-2xl font-bold tracking-tight relative z-10">{item.title}</h3>
                <p className="text-dove-gray text-base leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-lg mx-auto">
          <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
            <BadgeIcon />
            <span className="text-sm font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">Real reasons to work with us</h2>
          <p className="text-dove-gray text-base font-medium leading-relaxed">
            We focus on practical business needs—margins, consistency, and availability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "No Hidden Costs", desc: "The price we quote is what you pay. No last-minute handling fees or surprise charges.", icon: <Star className="text-black" /> },
            { title: "Consistent Sizing", desc: "A 'Large' stays a 'Large' every time you restock. No more dealing with customer returns.", icon: <Star className="text-black" /> },
            { title: "Actual Inventory", desc: "If it's listed on our site, it's sitting in our warehouse. We don't sell what we don't have.", icon: <Star className="text-black" /> },
            { title: "Better Margins", desc: "As a direct shirt wholesaler, we cut out the middleman so you keep more profit.", icon: <Star className="text-black" /> },
          ].map((reason, i) => (
            <div key={i} className="bg-white rounded-3xl p-10 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gallery rounded-2xl flex items-center justify-center">
                {reason.icon}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium tracking-tight">{reason.title}</h3>
                <p className="text-dove-gray text-base leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gallery/30">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center gap-6 mb-20">
            <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <BadgeIcon />
              <span className="text-sm font-medium uppercase tracking-wider">Help Center</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {[
              { 
                q: "What is the Minimum Order Quantity (MOQ)?", 
                a: "Our standard MOQ is 48 units (mix of sizes) per style. This ensures we can offer the best factory-direct wholesale pricing for our retail partners." 
              },
              { 
                q: "Do you provide samples?", 
                a: "Yes, we can provide single-piece samples for quality checks at a nominal cost before you place a full bulk order. Contact us to request a sample of any style." 
              },
              { 
                q: "How long does shipping take?", 
                a: "We dispatch all ready-stock orders within 24 hours of payment confirmation. Delivery typically takes 3-7 business days across India depending on your location." 
              },
              { 
                q: "Are prices inclusive of GST?", 
                a: "No, all listed prices are wholesale rates. GST (5% or 12% depending on the invoice value) and shipping charges are calculated and added to the final proforma invoice." 
              },
              { 
                q: "Can I visit your warehouse?", 
                a: "Absolutely. We welcome our retail partners to visit our Gandhi Nagar warehouse in New Delhi for a face-to-face consultation and to see our latest collections in person." 
              }
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-[32px] border border-black/5 overflow-hidden transition-all duration-500">
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none list-inside">
                  <span className="text-xl font-bold tracking-tight">{item.q}</span>
                  <div className="w-10 h-10 bg-gallery rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-500">
                    <ChevronRight size={20} className="rotate-90" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-dove-gray text-lg leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Logo Strip */}
      <section className="py-20 bg-gallery/50 border-y border-black/5 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center gap-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Supplying to major retail chains across India</span>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              {["V-Mart", "Reliance Trends", "Pantaloons", "Max Fashion", "Zudio"].map((partner) => (
                <div key={partner} className="text-2xl md:text-3xl font-black tracking-tighter italic">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-32 bg-black text-white px-6 md:px-12 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="flex flex-col gap-6 max-w-xl">
              <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full self-start flex items-center gap-2 border border-white/10">
                <Star size={14} className="text-white fill-white" />
                <span className="text-white text-sm font-medium tracking-tight uppercase">Retailer Feedback</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
                Trusted by 2,500+ <br /> store owners.
              </h2>
            </div>
            <div className="flex flex-col gap-2 text-left md:text-right">
                <div className="text-5xl font-black tracking-tighter">4.9/5</div>
                <div className="text-white/40 text-sm font-bold uppercase tracking-widest">Average Rating</div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Rajesh Kumar", 
                role: "Owner, City Fashion", 
                text: "S.K Enterprises has been our primary supplier for 5 years. Their consistency in sizing is what keeps our customers coming back. Best margins in Gandhi Nagar.",
                rating: 5
              },
              { 
                name: "Amit Sharma", 
                role: "Retail Chain Manager", 
                text: "The digital prints are always a hit. We usually sell out within a week of restocking. Their 24-hour dispatch is a lifesaver for our busy seasons.",
                rating: 5
              },
              { 
                name: "Vikram Singh", 
                role: "Boutique Owner", 
                text: "Quality of the linen shirts is comparable to high-end brands but at a fraction of the cost. The wholesale inquiry process is very professional.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col gap-8">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-white fill-white" />
                  ))}
                </div>
                <p className="text-xl font-medium leading-relaxed text-white/80">"{testimonial.text}"</p>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{testimonial.name}</span>
                  <span className="text-white/40 text-sm">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-8 mb-16 max-w-2xl">
          <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
            <BadgeIcon />
            <span className="text-sm font-medium">Ready to restock?</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight">Ready to restock your shelves?</h2>
          <p className="text-dove-gray text-lg font-medium leading-relaxed">
            Don't wait for the peak season to hit and prices to go up. Get your wholesale shirts sorted today and stay ahead of the local competition.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link to="/wholesale-inquiry">
              <AnimatedButton variant="black" className="px-10 py-4 font-semibold shadow-2xl">
                Request Wholesale Price List
              </AnimatedButton>
            </Link>
            <Link to="/contact">
              <AnimatedButton variant="white" className="px-10 py-4 font-semibold border border-black/5">
                Contact Our Team
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
