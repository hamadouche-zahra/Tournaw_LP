import { AppBanner } from "./AppBanner";
import { Header } from "./Header";
import { Insights } from "./Insights";
import { Footer } from "./Footer";

export default function InsightsPage() {
  return (
    <>
      <AppBanner />
      <Header />
      <main>
        <Insights />
      </main>
      <Footer />
    </>
  );
}
