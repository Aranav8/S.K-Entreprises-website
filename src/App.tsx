import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar, Footer } from "./components/Shared";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CatalogPage from "./pages/CatalogPage";
import WholesaleInquiryPage from "./pages/WholesaleInquiryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import LegalPage from "./pages/LegalPage";
import FabricGuidePage from "./pages/FabricGuidePage";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative selection:bg-black selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/wholesale-inquiry" element={<WholesaleInquiryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/fabric-guide" element={<FabricGuidePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
