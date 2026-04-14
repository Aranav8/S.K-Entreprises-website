import { SEO } from "../components/SEO";

export default function LegalPage() {
  return (
    <div className="pt-40 pb-32 px-6 md:px-12 max-w-screen-md mx-auto">
      <SEO title="Privacy & Terms" description="Legal information, privacy policy, and terms of service for S.K Enterprises." />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium tracking-tighter">Privacy & Terms</h1>
          <p className="text-dove-gray text-lg">Last updated: April 2026</p>
        </div>

        <div className="prose prose-lg max-w-none text-dove-gray space-y-8">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-black tracking-tight">1. Wholesale Agreement</h2>
            <p>By accessing this website and placing a wholesale order with S.K Enterprises, you agree to our business terms. We operate strictly as a B2B entity. All orders are subject to stock availability and payment confirmation.</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-black tracking-tight">2. Data Privacy</h2>
            <p>We collect business information (Name, GST details, Phone, Email) solely for the purpose of processing your orders and providing wholesale updates. We do not sell your data to third parties.</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-black tracking-tight">3. Intellectual Property</h2>
            <p>All product designs, images, and branding on this website are the property of S.K Enterprises. Retailers are permitted to use our product images solely for the purpose of reselling S.K Enterprises products.</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-black tracking-tight">4. Payment & Taxes</h2>
            <p>All prices listed are wholesale rates. GST and shipping charges are calculated at the time of invoicing. We accept Bank Transfers, UPI, and major business credit cards.</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-black tracking-tight">5. Jurisdiction</h2>
            <p>Any disputes arising from transactions with S.K Enterprises shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
