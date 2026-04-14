import { Info, ShieldCheck, Droplets, Wind, Layers } from "lucide-react";
import { SEO } from "../components/SEO";

const FabricCard = ({ title, desc, icon, properties }: any) => (
  <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm flex flex-col gap-8">
    <div className="flex justify-between items-start">
      <div className="w-16 h-16 bg-gallery rounded-2xl flex items-center justify-center text-black">
        {icon}
      </div>
      <div className="flex gap-2">
        {properties.map((prop: string, i: number) => (
          <span key={i} className="bg-gallery px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black/40">
            {prop}
          </span>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
      <p className="text-dove-gray text-lg leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function FabricGuidePage() {
  return (
    <div className="relative">
      <SEO title="Fabric & Quality Guide" description="Learn about the premium fabrics we use at S.K Enterprises, including 100% Cotton, Linen, and Oxford weaves." />
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/heroes/fabric-guide-hero.png" 
            alt="Fabric Textures" 
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
              <Info size={14} className="text-white" />
              <span className="text-white text-sm font-medium tracking-tight uppercase">Knowledge Base</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
              The S.K Fabric Guide.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-light tracking-tight max-w-2xl">
              Understanding the science behind our shirts. We help you choose the right fabric for your region's climate and your customers' preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Fabric Types Grid */}
      <section className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FabricCard 
            title="Premium Cotton"
            desc="The gold standard for formal shirts. Our long-staple cotton is sourced from the best mills in India, offering a smooth finish that is easy to iron and stays crisp throughout the day."
            icon={<ShieldCheck size={32} />}
            properties={["Breathable", "Easy Iron", "Durable"]}
          />
          <FabricCard 
            title="Pure Linen"
            desc="Sourced from European flax, our linen is highly breathable and moisture-wicking. It has a natural texture that adds a sophisticated, relaxed look to any casual collection."
            icon={<Wind size={32} />}
            properties={["Cooling", "Natural", "Premium"]}
          />
          <FabricCard 
            title="Cotton Sateen"
            desc="Known for its subtle sheen and silky hand-feel. Sateen is a weave that produces a smooth, lustrous surface, making it the perfect base for our high-definition digital prints."
            icon={<Droplets size={32} />}
            properties={["Lustrous", "Soft", "Digital Ready"]}
          />
          <FabricCard 
            title="Twill & Oxford"
            desc="Heavier weaves designed for durability. Twill features a diagonal rib pattern, while Oxford has a basketweave structure. Both are perfect for daily wear and rugged use."
            icon={<Layers size={32} />}
            properties={["Heavy Duty", "Textured", "Daily Wear"]}
          />
        </div>
      </section>

      {/* GSM Explanation */}
      <section className="py-32 bg-black text-white px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 flex flex-col gap-8">
            <h2 className="text-3xl md:text-6xl font-medium tracking-tighter leading-tight">What is GSM?</h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              GSM stands for <strong>Grams per Square Meter</strong>. It measures the weight and density of the fabric. In the wholesale market, knowing the GSM is key to understanding the "feel" of the shirt without touching it.
            </p>
            <div className="flex flex-col gap-6">
              {[
                { range: "120 - 140 GSM", label: "Lightweight", desc: "Perfect for summer formals and digital prints." },
                { range: "140 - 160 GSM", label: "Medium Weight", desc: "The standard for most formal and casual shirts." },
                { range: "160+ GSM", label: "Heavyweight", desc: "Ideal for winter collections and rugged twill shirts." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black tracking-tighter w-32">{item.range}</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{item.label}</span>
                    <span className="text-white/40 text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-square rounded-[40px] overflow-hidden">
            <img src="/images/categories/cat-oxford.png" alt="Fabric Close-up" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white text-black px-8 py-4 rounded-full font-bold text-xl shadow-2xl">
                Precision Weaving
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
