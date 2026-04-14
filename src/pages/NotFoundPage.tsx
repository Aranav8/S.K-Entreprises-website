import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { AnimatedButton } from "../components/Shared";
import { SEO } from "../components/SEO";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <SEO title="Page Not Found" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center flex flex-col items-center gap-8 max-w-xl"
      >
        <div className="relative">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none opacity-5">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={80} className="text-black/20" />
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Style Not Found</h2>
          <p className="text-dove-gray text-lg">
            The page you are looking for has been moved, renamed, or perhaps never existed. Let's get you back to our latest collections.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link to="/catalog">
            <AnimatedButton variant="black" className="px-10 py-4 w-full">
              Browse Catalog
            </AnimatedButton>
          </Link>
          <Link to="/">
            <AnimatedButton variant="white" className="px-10 py-4 w-full border border-black/5">
              Back to Home <ArrowRight size={18} className="inline ml-2" />
            </AnimatedButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
