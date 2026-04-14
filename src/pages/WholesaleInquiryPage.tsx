import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, ShieldCheck, Truck, Package, HelpCircle, ArrowRight } from "lucide-react";
import { AnimatedButton, BadgeIcon } from "../components/Shared";
import { SEO } from "../components/SEO";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";

const BenefitCard = ({ icon, title, desc }: any) => (
  <div className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm border border-black/5">
    <div className="w-12 h-12 bg-gallery rounded-2xl flex items-center justify-center text-black">
      {icon}
    </div>
    <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    <p className="text-dove-gray text-sm leading-relaxed">{desc}</p>
  </div>
);

const FAQItem = ({ question, answer }: any) => (
  <div className="flex flex-col gap-3 p-6 md:p-8 bg-gallery rounded-3xl">
    <div className="flex items-center gap-3 text-black">
      <HelpCircle size={18} className="md:w-5 md:h-5" />
      <h4 className="font-bold text-base md:text-lg tracking-tight">{question}</h4>
    </div>
    <p className="text-dove-gray text-sm md:text-base leading-relaxed pl-7 md:pl-8">{answer}</p>
  </div>
);

export default function WholesaleInquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    city: "",
    volume: "50 - 100 Shirts",
    message: ""
  });

  const productTitle = searchParams.get("product");
  const quantity = searchParams.get("qty");
  const breakdown = searchParams.get("breakdown");

  React.useEffect(() => {
    if (productTitle || quantity || breakdown) {
      let volumeVal = "50 - 100 Shirts";
      const q = Number(quantity);
      if (q >= 1000) volumeVal = "1000+ Shirts";
      else if (q >= 500) volumeVal = "500 - 1000 Shirts";
      else if (q >= 100) volumeVal = "100 - 500 Shirts";

      setFormData(prev => ({
        ...prev,
        volume: volumeVal,
        message: `I am interested in ordering ${quantity || "bulk"} units of ${productTitle || "your shirts"}.${breakdown ? `\n\nSize Breakdown: ${breakdown}` : ""}\n\nPlease provide a customized quote.`
      }));
    }
  }, [productTitle, quantity, breakdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s-+]/g, ""))) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xjgjkodn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `New Wholesale Application: ${formData.businessName}`,
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative">
        <section className="relative h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/heroes/wholesale-hero.png"
              alt="Inquiry Successful"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 right-0 h-[350px] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div
              className="absolute bottom-0 left-0 right-0 h-[250px] backdrop-blur-2xl"
              style={{
                WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 100%)',
                maskImage: 'linear-gradient(to top, black 10%, transparent 100%)'
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-lg px-6">
            <div className="bg-white p-12 rounded-[40px] shadow-2xl flex flex-col items-center text-center gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-medium tracking-tighter">Inquiry Received.</h1>
                <p className="text-dove-gray text-base font-medium leading-relaxed">
                  Thank you for reaching out, {formData.name.split(' ')[0]}. Our wholesale manager will review your application and contact you on {formData.phone} within 24 hours.
                </p>
              </div>
              <Link to="/catalog" className="w-full">
                <AnimatedButton variant="black" className="w-full py-4 text-sm font-bold">
                  Browse Catalog
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      <SEO title="Wholesale Application" description="Apply for a wholesale partnership with S.K Enterprises and unlock exclusive factory-direct pricing on premium men's shirts." />
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/heroes/wholesale-hero.png"
            alt="Wholesale Inquiry"
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
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">B2B ENQUIRY</div>
              <span className="text-white text-sm font-medium tracking-tight">Bulk Order Inquiry</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
              Partner with S.K Enterprises.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-light tracking-tight max-w-2xl">
              Join our network of 2,500+ successful retailers. Get access to factory-direct pricing, priority stock, and dedicated account management.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<ShieldCheck size={24} />}
            title="Quality Assurance"
            desc="Every single shirt undergoes a 5-point quality check before dispatch to ensure zero defects."
          />
          <BenefitCard
            icon={<Truck size={24} />}
            title="Priority Shipping"
            desc="Wholesale partners get priority dispatch within 24 hours with real-time tracking across India."
          />
          <BenefitCard
            icon={<Package size={24} />}
            title="Custom Branding"
            desc="For orders above 500 units, we offer custom labeling and packaging options for your brand."
          />
        </div>
      </section>

      {/* Inquiry Form & Info */}
      <section className="py-24 bg-gallery px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form Side */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm">
              <div className="flex flex-col gap-8 mb-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">Wholesale Application</h2>
                  <p className="text-dove-gray">Please provide your business details. Our sales representative will contact you with a customized quote within 24 hours.</p>
                </div>

                {/* Selected Product Context */}
                {productTitle && (
                  <div className="bg-gallery p-6 rounded-3xl flex items-center gap-6 border border-black/5">
                    <div className="w-20 h-24 bg-white rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img 
                        src={products.find(p => p.title === productTitle)?.image} 
                        alt={productTitle} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Inquiry Product</span>
                      <h4 className="font-bold text-lg leading-tight">{productTitle}</h4>
                      {quantity && (
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle2 size={14} className="text-black" />
                          <span className="text-sm font-medium">{quantity} Units Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Contact Person</label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Business Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Company Name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Phone / WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 93540 92323"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="email@business.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">City</label>
                    <input
                      required
                      type="text"
                      placeholder="Your City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Estimated Volume</label>
                    <select
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all appearance-none"
                    >
                      <option>50 - 100 Shirts</option>
                      <option>100 - 500 Shirts</option>
                      <option>500 - 1000 Shirts</option>
                      <option>1000+ Shirts</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Message / Special Requests</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your specific needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none"
                  ></textarea>
                </div>

                <AnimatedButton
                  disabled={isSubmitting}
                  variant="black"
                  className={`w-full py-5 text-base font-bold flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                    />
                  ) : (
                    <>Submit Inquiry <Send size={18} /></>
                  )}
                </AnimatedButton>
              </form>
            </div>

            {/* Info Side */}
            <div className="flex flex-col gap-12 py-10">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight">Wholesale Terms</h2>
                <p className="text-dove-gray text-lg leading-relaxed">We believe in simple, transparent business terms that help our partners succeed.</p>
              </div>

              <div className="flex flex-col gap-8">
                {[
                  { title: "Minimum Order Quantity", desc: "Our standard MOQ is 48 shirts (mix of sizes/colors allowed within a collection)." },
                  { title: "Payment Terms", desc: "100% advance payment for first-time orders. Credit options available for long-term partners." },
                  { title: "Shipping Cost", desc: "Calculated based on weight and destination. We use premium couriers like BlueDart and Delhivery." },
                  { title: "Return Policy", desc: "Returns accepted only for manufacturing defects within 7 days of delivery." }
                ].map((term, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="text-black" size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-bold text-lg">{term.title}</h4>
                      <p className="text-dove-gray">{term.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black text-white p-10 rounded-[40px] flex flex-col gap-6">
                <h3 className="text-2xl font-bold tracking-tight">Need immediate help?</h3>
                <p className="text-white/60">Call our wholesale manager directly for urgent stock requirements.</p>
                <div className="flex items-center gap-4 text-2xl font-black tracking-tighter">
                  +91 93540 92323
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="text-center flex flex-col items-center gap-6 mb-20 max-w-lg mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">Frequently Asked Questions</h2>
          <p className="text-dove-gray">Everything you need to know about buying from S.K Enterprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQItem
            question="Do you provide samples?"
            answer="Yes, we can provide a sample set of 3-5 shirts at retail price, which will be adjusted in your first bulk order."
          />
          <FAQItem
            question="Can I visit your warehouse?"
            answer="Absolutely! We welcome retailers to visit our Gandhi Nagar facility to check the fabric quality in person."
          />
          <FAQItem
            question="How often do you launch new designs?"
            answer="We launch new collections every 15 days to keep your retail stock fresh and trendy."
          />
          <FAQItem
            question="Do you ship internationally?"
            answer="Currently, we focus on Pan-India shipping. For international bulk orders, please contact us directly."
          />
        </div>
      </section>
    </div>
  );
}
