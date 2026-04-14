import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { AnimatedButton } from "../components/Shared";

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
  return (
    <div className="relative">
      {/* Hero Section - Consistent with Home/About */}
      <section className="relative h-[60vh] min-h-[500px] flex flex-col justify-end items-center pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/sk-contact-hero/1920/1080" 
            alt="Contact S.K Enterprises" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/30 to-transparent backdrop-blur-xl" />
        </div>
        
        <div className="relative z-10 w-full max-w-screen-xl px-6 flex flex-col items-center gap-8 pt-[160px]">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
            <div className="bg-white/15 backdrop-blur-xs px-4 py-1 rounded-full flex items-center gap-2 border border-white/10">
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">CONTACT</div>
              <span className="text-white text-sm font-medium tracking-tight">Get in touch with us</span>
            </div>
            <h1 className="text-white text-6xl md:text-7xl font-medium tracking-tighter leading-tight">
              Let's grow your <br /> business together.
            </h1>
            <p className="text-white/80 text-lg font-light tracking-tight max-w-2xl">
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
            detail="+91 98XXX XXXXX"
            subDetail="Available Mon-Sat, 10 AM - 7 PM"
          />
          <ContactInfoCard 
            icon={<Mail className="text-black" />}
            title="Email Us"
            detail="sales@skenterprises.com"
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
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 border-t border-l border-white rotate-45 translate-x-0.5 translate-y-0.5" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider">Wholesale Inquiry</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight">Request a wholesale price list.</h2>
                <p className="text-dove-gray text-lg font-medium leading-relaxed">
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
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Business Name</label>
                    <input type="text" placeholder="Retail Store Name" className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-black/40 px-2">Your Requirements</label>
                  <textarea rows={4} placeholder="Tell us about the styles and quantities you need..." className="bg-gallery rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none"></textarea>
                </div>
                <AnimatedButton
                  variant="black"
                  className="w-full py-5 text-base font-bold flex items-center justify-center"
                >
                  <span className="flex items-center gap-3">
                    Send Inquiry <Send size={18} />
                  </span>
                </AnimatedButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/sk-map-placeholder/1920/600" 
          alt="Location Map" 
          className="w-full h-full object-cover grayscale opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-xs">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <MapPin className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-xl">Visit Our Warehouse</h4>
              <p className="text-dove-gray text-sm mt-2">Shop No. 45, Gandhi Nagar Market, New Delhi - 110031</p>
            </div>
            <AnimatedButton variant="black" className="px-6 py-2 text-xs">
              Get Directions
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
