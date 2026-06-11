import { AppBanner } from "./AppBanner";
import { Header } from "./Header";
import { Pricing } from "./Pricing";
import { CompareTable } from "./CompareTable";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";

export default function PricingPage() {
  return (
    <>
      <AppBanner />
      <Header />
      <main>
        <Pricing />
        <CompareTable />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
