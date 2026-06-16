import "@/App.css";
import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowItWorks } from "./components/HowItWorks";
import { CoreFeatures } from "./components/CoreFeatures";
import { FacilitiesBooking } from "./components/FacilitiesBooking";
import { UseCases } from "./components/UseCases";
import { AppPromo } from "./components/AppPromo";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import ArticlePage from "./components/ArticlePage";
import InsightsPage from "./components/InsightsPage";
import PricingPage from "./components/PricingPage";
import { EarlyAccessBanner } from './components/EarlyAccessBanner';


function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection/>
        <SolutionSection/>
        <CoreFeatures />
        <HowItWorks />
        <UseCases />
        <FacilitiesBooking />
        <AppPromo />
        <Pricing />
        <EarlyAccessBanner />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="App min-h-screen bg-background" data-testid="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/insights/:slug" element={<ArticlePage />} />
          </Routes>
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
