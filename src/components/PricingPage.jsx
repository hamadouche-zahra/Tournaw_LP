import { AppBanner } from "./AppBanner";
import { Header } from "./Header";
import { Pricing } from "./Pricing";
import { CompareTable } from "./CompareTable";
import { Footer } from "./Footer";
import { EarlyAccessBanner} from "./EarlyAccessBanner"

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="mt-24">
        <EarlyAccessBanner/>
        <Pricing />
        <CompareTable />
      </main>
      <Footer />
    </>
  );
}
