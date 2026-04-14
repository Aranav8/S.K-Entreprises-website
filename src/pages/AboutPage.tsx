import { motion } from "motion/react";
import { Star, ShieldCheck, Truck, Factory, Users, History } from "lucide-react";
import { AnimatedButton, BadgeIcon } from "../components/Shared";
import { Link } from "react-router-dom";

const SectionHeader = ({ tag, title, description }: any) => (
  <div className="flex flex-col gap-6 max-w-2xl">
    <div className="bg-white px-4 py-1.5 rounded-full self-start flex items-center gap-2 shadow-sm border border-black/5">
      <BadgeIcon />
      <span className="text-sm font-medium uppercase tracking-wider">{tag}</span>
    </div>
    <h2 className="text-3xl md:text-6xl font-medium tracking-tighter leading-tight">{title}</h2>
    {description && <p className="text-dove-gray text-base md:text-lg font-medium leading-relaxed">{description}</p>}
  </div>
);

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section - Exactly like Home but with About content and no carousel */}
      <section className="relative h-[50vh] min-h-[450px] flex flex-col justify-end items-center pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/sk-about-hero-final/1920/1080" 
            alt="S.K Enterprises Legacy" 
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
              <div className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">ABOUT</div>
              <span className="text-white text-sm font-medium tracking-tight">Know about S.K Enterprises</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
              Timeless quality, <br className="hidden md:block" /> modern wholesale.
            </h1>
            <p className="text-white/80 text-base md:text-lg font-light tracking-tight max-w-2xl">
              We focus on supplying essential men's shirts that remain relevant, durable, and profitable for your retail business across all seasons. S.K Enterprises is your partner in growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <a href="#story" className="w-full sm:w-auto">
                <AnimatedButton variant="white" className="w-full px-8">
                  Our Story
                </AnimatedButton>
              </a>
              <Link to="/contact" className="w-full sm:w-auto">
                <AnimatedButton variant="transparent" className="w-full px-8">
                  Contact Us
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Image 2 Style */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="text-center flex flex-col items-center gap-6 mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="bg-gallery px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full" />
            <span className="text-sm font-bold uppercase tracking-wider">Our Impact</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-medium tracking-tighter leading-tight">
            More than wholesale, S.K Enterprises is a commitment to your growth.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Retailers Served", value: "2,500+", img: "https://picsum.photos/seed/stat-1/400/400" },
            { label: "Shirts Dispatched", value: "1M+", img: "https://picsum.photos/seed/stat-2/400/400" },
            { label: "Ready Styles", value: "500+", img: "https://picsum.photos/seed/stat-3/400/400" },
            { label: "Cities Covered", value: "150+", img: "https://picsum.photos/seed/stat-4/400/400" },
          ].map((stat, i) => (
            <div key={i} className="relative aspect-square rounded-3xl overflow-hidden group">
              <img src={stat.img} alt={stat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Journey Section */}
      <section id="story" className="bg-gallery py-32 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-40">
                <SectionHeader 
                  tag="The Journey"
                  title="From Gandhi Nagar to your doorstep."
                />
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-12">
              {[
                {
                  year: "2011",
                  title: "The Humble Beginning",
                  desc: "We opened our first small counter in the heart of Gandhi Nagar Market, New Delhi. Dealing directly with local shop owners, we understood the struggle of finding consistent quality in bulk.",
                  icon: <History className="text-black" />
                },
                {
                  year: "2016",
                  title: "Scaling Up",
                  desc: "With a growing reputation for reliability, we expanded our warehouse capacity and started sourcing fabrics directly from the best mills in India, ensuring better control over quality and pricing.",
                  icon: <Factory className="text-black" />
                },
                {
                  year: "2021",
                  title: "Exclusivity in Shirts",
                  desc: "We made a strategic decision to focus exclusively on men's shirts. This specialization allowed us to master the fit, the fabric, and the finish that modern Indian men demand.",
                  icon: <Star className="text-black" />
                },
                {
                  year: "Present",
                  title: "The Digital Leap",
                  desc: "Today, S.K Enterprises is bridging the gap between traditional wholesale and modern convenience. We're bringing our entire warehouse stock online to serve you better, wherever you are.",
                  icon: <Truck className="text-black" />
                }
              ].map((milestone, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-3xl shadow-sm flex gap-8 items-start"
                >
                  <div className="w-16 h-16 bg-gallery rounded-2xl flex items-center justify-center shrink-0">
                    {milestone.icon}
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-black text-black/20 tracking-tighter text-4xl leading-none">{milestone.year}</span>
                    <h3 className="text-2xl font-bold tracking-tight">{milestone.title}</h3>
                    <p className="text-dove-gray text-lg leading-relaxed">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="text-center flex flex-col items-center gap-6 mb-20">
          <SectionHeader 
            tag="Our Values"
            title="What we stand for"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Uncompromising Quality",
              desc: "Every shirt that leaves our warehouse undergoes a strict quality check. From the stitching to the buttons, we ensure it's retail-ready.",
              icon: <ShieldCheck size={32} />
            },
            {
              title: "Direct Transparency",
              desc: "No middlemen, no hidden commissions. You get factory-direct rates that help you maintain healthy margins in a competitive market.",
              icon: <Users size={32} />
            },
            {
              title: "Reliable Supply",
              desc: "We know that an empty shelf is a lost sale. Our inventory management ensures that our best-sellers are always in stock for you.",
              icon: <Truck size={32} />
            }
          ].map((value, i) => (
            <div key={i} className="bg-gallery p-12 rounded-3xl flex flex-col gap-8 text-center items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                {value.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold tracking-tight">{value.title}</h3>
                <p className="text-dove-gray text-lg leading-relaxed">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="py-32 bg-gallery overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-[40px] overflow-hidden aspect-square">
              <img 
                src="https://picsum.photos/seed/sk-quality-check/800/800" 
                alt="Quality Inspection" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-10 left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs">
                <div className="text-4xl font-black tracking-tighter mb-2">0%</div>
                <div className="text-sm font-bold uppercase tracking-widest text-black/40">Defect Rate Goal</div>
                <p className="text-xs text-dove-gray mt-4">We aim for perfection in every batch, ensuring your retail customers stay satisfied.</p>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="bg-black text-white px-4 py-1.5 rounded-full self-start flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span className="text-sm font-bold uppercase tracking-wider">The 5-Point Check</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
                  Quality isn't an accident. <br /> It's a process.
                </h2>
                <p className="text-dove-gray text-lg leading-relaxed">
                  Every shirt in our warehouse passes through five distinct inspection points before it is packed for your store.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Fabric Integrity", desc: "We test for color bleeding and shrinkage before the fabric hits the cutting table." },
                  { title: "Stitch Precision", desc: "Minimum 12-14 stitches per inch to ensure the seams don't open even after multiple washes." },
                  { title: "Button Security", desc: "Every button is cross-stitched and tested for pull-strength." },
                  { title: "Fit Consistency", desc: "Random samples from every batch are checked against our master patterns for size accuracy." },
                  { title: "Final Finishing", desc: "Thread trimming, steam pressing, and individual poly-bagging to maintain crispness." }
                ].map((point, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center font-black text-sm shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                      {i + 1}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-bold text-xl tracking-tight">{point.title}</h4>
                      <p className="text-dove-gray text-base">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Glimpse - Image 3 Differentiation */}
      <section className="py-32 bg-[#0a0a0a] text-white overflow-hidden border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full self-start flex items-center gap-2 border border-white/10">
                <BadgeIcon className="bg-white" iconClassName="text-black" />
                <span className="text-sm font-medium uppercase tracking-wider">Our Operations</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight">A warehouse built for scale.</h2>
              <p className="text-white/60 text-xl font-medium leading-relaxed">
                Located in the heart of Delhi's textile hub, our facility is designed for speed. We process hundreds of bulk orders daily, ensuring that your stock reaches you within 48-72 hours across India.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div>
                  <div className="text-4xl font-black tracking-tighter mb-1">5000+</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40">Sq. Ft Warehouse</div>
                </div>
                <div>
                  <div className="text-4xl font-black tracking-tighter mb-1">24Hr</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40">Dispatch Guarantee</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://picsum.photos/seed/sk-warehouse-1/400/600" alt="Warehouse 1" className="rounded-2xl aspect-[2/3] object-cover" referrerPolicy="no-referrer" />
                <div className="flex flex-col gap-4 pt-12">
                  <img src="https://picsum.photos/seed/sk-warehouse-2/400/400" alt="Warehouse 2" className="rounded-2xl aspect-square object-cover" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/sk-warehouse-3/400/400" alt="Warehouse 3" className="rounded-2xl aspect-square object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
