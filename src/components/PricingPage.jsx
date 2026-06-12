import { AppBanner } from "./AppBanner";
import { Header } from "./Header";
import { Pricing } from "./Pricing";
import { CompareTable } from "./CompareTable";
import { Footer } from "./Footer";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="mt-12">
        <Pricing />
        <CompareTable />
      </main>
      <Footer />
    </>
  );
}
