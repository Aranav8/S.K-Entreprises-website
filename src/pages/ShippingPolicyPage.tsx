import { useState } from "react";
import { motion } from "motion/react";
import { Truck, ShieldCheck, Clock, RefreshCcw, Package, MapPin, Download } from "lucide-react";
import { AnimatedButton } from "../components/Shared";
import { Link } from "react-router-dom";

const PolicySection = ({ icon, title, children }: any) => (
  <div className="flex flex-col gap-6 p-10 bg-white rounded-[40px] border border-black/5 shadow-sm">
    <div className="w-14 h-14 bg-gallery rounded-2xl flex items-center justify-center text-black">
      {icon}
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <div className="text-dove-gray text-lg leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  </div>
);

export default function ShippingPolicyPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("Shipping rate card download started! (Simulation)");
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex flex-col justify-end items-center pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/sk-logistics/1920/1080" 
            alt="Logistics and Shipping" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/30 to-transparent backdrop-blur-xl" />
        </div>
        
        <div className="relative z-10 w-full max-w-screen-xl px-6 flex flex-col items-center gap-6 pt-[120px]">
          <div className="flex flex-col items-center text-center gap-4 max-w-3xl">
            <div className="bg-white/15 backdrop-blur-xs px-4 py-1 rounded-full flex items-center gap-2 border border-white/10">
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">LOGISTICS</div>
              <span className="text-white text-sm font-medium tracking-tight">Shipping & Returns Policy</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
              Reliable delivery, <br className="hidden md:block" /> guaranteed.
            </h1>
          </div>
        </div>
      </section>

      {/* Policy Grid */}
      <section className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PolicySection icon={<Truck size={28} />} title="Shipping Methods">
            <p>We partner with India's leading logistics providers including <strong>BlueDart, Delhivery, and TCI Express</strong> to ensure your stock reaches you safely.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Surface Transport:</strong> Cost-effective for large bulk orders (5-7 days).</li>
              <li><strong>Air Express:</strong> For urgent restocking needs (2-3 days).</li>
              <li><strong>Local Pickup:</strong> Available for retailers in the Delhi-NCR region.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<Clock size={28} />} title="Dispatch Timelines">
            <p>We understand that "Out of Stock" means lost sales for you. That's why we prioritize speed:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Ready Stock:</strong> Dispatched within 24-48 hours of payment confirmation.</li>
              <li><strong>Custom Orders:</strong> Production and dispatch timelines will be shared during the quote process.</li>
              <li><strong>Tracking:</strong> Real-time tracking IDs are shared via WhatsApp and Email immediately after dispatch.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={<ShieldCheck size={28} />} title="Damages & Shortages">
            <p>Our <strong>"Zero-Loss Guarantee"</strong> ensures you only pay for what you can sell:</p>
            <p>If you receive a parcel with external damage, please mention it on the Proof of Delivery (POD) and take photos. We will replace any transit-damaged goods at no extra cost to you.</p>
          </PolicySection>

          <PolicySection icon={<RefreshCcw size={28} />} title="Return Policy">
            <p>As a wholesale entity, we do not offer "change of mind" returns. However, we stand by our quality:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Manufacturing Defects:</strong> 100% replacement or credit note for any stitching or fabric defects reported within 7 days.</li>
              <li><strong>Wrong Item:</strong> If you receive a style or size different from your order, we will arrange a reverse pickup and send the correct item.</li>
            </ul>
          </PolicySection>
        </div>
      </section>

      {/* Packaging Quality Section */}
      <section className="py-32 bg-black text-white px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-6xl font-medium tracking-tighter leading-tight">
              Built to survive the journey.
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              We don't just throw shirts in a box. Our wholesale packaging is designed to withstand the rigors of long-distance transport, ensuring your shirts arrive crisp and ready for the shelf.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-black tracking-tighter">5-Ply</div>
                <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Heavy Duty Boxes</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-black tracking-tighter">Moisture</div>
                <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Resistant Lining</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-[40px] overflow-hidden">
            <img 
              src="https://picsum.photos/seed/sk-packaging/800/800" 
              alt="Wholesale Packaging" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center">
                <Package size={48} className="mx-auto mb-4" />
                <span className="font-bold text-lg">Standard Export Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <MapPin size={48} className="text-black/20" />
          <h2 className="text-4xl font-bold tracking-tight">Still have questions about logistics?</h2>
          <p className="text-dove-gray text-lg">Our logistics manager is available to discuss custom shipping arrangements for your specific region.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <AnimatedButton variant="black" className="px-12 py-4 w-full sm:w-auto">Contact Logistics</AnimatedButton>
            </Link>
            <AnimatedButton 
              variant="transparent" 
              className="px-12 py-4 border-black/10 text-black w-full sm:w-auto"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download Rate Card"}
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
