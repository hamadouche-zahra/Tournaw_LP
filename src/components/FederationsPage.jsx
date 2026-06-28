import { AppBanner } from "./AppBanner";
import { Header } from "./Header";
import { Federations } from "./Federations";
import { Footer } from "./Footer";

export default function FederationsPage() {
  return (
    <>
      <Header />
      <main>
        <Federations />
      </main>
      <Footer />
    </>
  );
}
