import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO = ({ title, description }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | S.K Enterprises`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || "Premium men's shirts wholesale from S.K Enterprises. Quality direct from Gandhi Nagar, New Delhi.");
    }
  }, [title, description, location.pathname]);

  return null;
};
