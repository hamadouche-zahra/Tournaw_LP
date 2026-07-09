import "@/App.css";
import "@/index.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ScrollToTop } from "./components/ui/Scrolltotop";
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
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";
import { ContactFormModal } from "./components/ContactFormModal";
import FederationsPage from "./components/FederationsPage";
import AcademiesPage from "./components/AcademiesPage";
import SchoolsPage from  "./components/SchoolsPage"
import ClubsPage from  "./components/ClubsPage"
import OrganizersPage from  "./components/OrganizersPage"
import AthletescoachesPage from  "./components/AthletescoachesPage"
import  SportfacilitiesPage  from  "./components/SportfacilitiesPage"
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

function ContactPage() {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(true);

  const handleClose = () => {
    setIsContactOpen(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" />
      <Footer />
      <ContactFormModal isOpen={isContactOpen} onClose={handleClose} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        {/* Monté UNE SEULE FOIS, au niveau racine — reste actif sur tous les changements de route */}
        <ScrollToTop />
        <div className="App min-h-screen bg-background" data-testid="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/insights/:slug" element={<ArticlePage />} />
            <Route path="/federations" element={<FederationsPage />} />
            <Route path="/academies" element={<AcademiesPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/organizers" element={<OrganizersPage />} />
            <Route path="/athletescoaches" element={<AthletescoachesPage />} />
            <Route path="/sport-facilities" element={<SportfacilitiesPage />} />

          </Routes>
          <WhatsAppFloatingButton />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
