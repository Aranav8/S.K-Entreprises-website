import { motion } from "motion/react";

interface SkeletonProps {
  className?: string;
  variant?: "rectangle" | "circle" | "text" | "rounded";
}

export const Skeleton = ({ className = "", variant = "rectangle" }: SkeletonProps) => {
  const baseClass = "bg-gallery relative overflow-hidden";
  
  const variantClasses = {
    rectangle: "w-full h-full",
    circle: "rounded-full",
    text: "h-4 w-full rounded",
    rounded: "rounded-3xl h-full w-full"
  };

  return (
    <div className={`${baseClass} ${variantClasses[variant]} ${className}`}>
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="aspect-[3/4]">
      <Skeleton variant="rounded" />
    </div>
    <div className="flex flex-col gap-3">
      <Skeleton variant="text" className="w-1/3" />
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="w-1/4" />
    </div>
  </div>
);
