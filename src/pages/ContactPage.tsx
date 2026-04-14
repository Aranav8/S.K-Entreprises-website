import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedButton, BadgeIcon } from "../components/Shared";
import { SEO } from "../components/SEO";

const ContactInfoCard = ({ icon, title, detail, subDetail }: any) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 flex flex-col gap-6 hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-gallery rounded-2xl flex items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-black text-lg font-medium">{detail}</p>
      {subDetail && <p className="text-dove-gray text-sm">{subDetail}</p>}
    </div>
  </div>
);

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const productName = searchParams.get("product");
    if (productName) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in requesting a sample for the "${productName}" shirt styles. Please provide details on sample costs and shipping.`
      }));
    }
    window.scrollTo(0, 0);
  }, [searchParams]);

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
          _subject: `New Contact Inquiry from ${formData.name}`,
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again or contact us directly.");
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
              src="/images/heroes/contact-hero.png"
              alt="Contact Successful"
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
                <h1 className="text-4xl font-medium tracking-tighter">Message Sent.</h1>
                <p className="text-dove-gray text-base font-medium leading-relaxed">
                  Thank you for reaching out. We've received your inquiry and our team will get back to you within 24 hours.
                </p>
              </div>
              <AnimatedButton variant="black" className="w-full py-4 text-sm font-bold" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </AnimatedButton>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      <SEO title="Contact Us" description="Get in touch with S.K Enterprises for wholesale inquiries, sample requests, or custom manufacturing needs." />
      {/* Hero Section - Consistent with Home/About */}
      <section className="relative h-[50vh] min-h-[450px] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/heroes/contact-hero.png"
            alt="Contact S.K Enterprises"
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
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">CONTACT</div>
              <span className="text-white text-sm font-medium tracking-tight">Get in touch with us</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight whitespace-nowrap">
              Let's grow your business together.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-light tracking-tight max-w-2xl">
              Have questions about bulk orders, pricing, or shipping? Our team is here to help you restock your shelves with the best men's shirts in the market.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactInfoCard
            icon={<Phone className="text-black" />}
            title="Call or WhatsApp"
            detail="+91 93540 92323"
            subDetail="Available Mon-Sat, 10 AM - 7 PM"
          />
          <ContactInfoCard
            icon={<Mail className="text-black" />}
            title="Email Us"
            detail="aranavk08@gmail.com"
            subDetail="We usually respond within 24 hours"
          />
          <ContactInfoCard
            icon={<MapPin className="text-black" />}
            title="Visit Warehouse"
            detail="Shop No. 45, Gandhi Nagar Market"
            subDetail="New Delhi, India - 110031"
          />
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-32 bg-gallery px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="bg-white px-4 py-1.5 rounded-full self-start flex items-center gap-2 shadow-sm border border-black/5">
                  <BadgeIcon />
                  <span className="text-sm font-medium uppercase tracking-wider">Wholesale Inquiry</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-medium tracking-tighter leading-tight">Request a wholesale price list.</h2>
                <p className="text-dove-gray text-base md:text-lg font-medium leading-relaxed">
                  Fill out the form below with your business details, and our sales team will get back to you with our latest catalog and bulk pricing.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="text-black" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Fast Response</h4>
                    <p className="text-dove-gray text-sm">Our team reviews all inquiries within 1 business day.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <MessageSquare className="text-black" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Direct Support</h4>
                    <p className="text-dove-gray text-sm">Speak directly with our warehouse managers for custom orders.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
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
                      placeholder="Retail Store Name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Phone Number</label>
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
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Your Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the styles and quantities you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none"
                  ></textarea>
                </div>
                <AnimatedButton
                  disabled={isSubmitting}
                  variant="black"
                  className={`w-full py-5 text-base font-bold flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                    />
                  ) : (
                    <span className="flex items-center gap-3">
                      Send Inquiry <Send size={18} />
                    </span>
                  )}
                </AnimatedButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="h-[600px] relative overflow-hidden bg-gallery">
        <div className="absolute inset-0 grayscale contrast-[1.1] invert-[0.05] opacity-80">
          <iframe 
            src="https://www.google.com/maps?q=Shop+No.+45,+Gandhi+Nagar+Market,+New+Delhi,+Delhi+110031&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="S.K Enterprises Warehouse Location"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl flex flex-col items-center gap-6 text-center max-w-sm border border-black/5 pointer-events-auto">
            <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center shadow-lg">
              <MapPin className="text-white" size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Headquarters</span>
              <h4 className="font-bold text-2xl tracking-tight">Visit Our Warehouse</h4>
              <p className="text-dove-gray text-base font-medium leading-relaxed mt-1">
                Shop No. 45, Gandhi Nagar Market,<br />New Delhi, Delhi - 110031
              </p>
            </div>
            <a 
              href="https://www.google.com/maps/dir//Shop+No.+45,+Gandhi+Nagar+Market,+New+Delhi,+Delhi+110031" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <AnimatedButton variant="black" className="w-full py-4 text-sm font-bold">
                Get Directions
              </AnimatedButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
