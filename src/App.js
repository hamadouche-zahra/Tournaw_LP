import "@/App.css";
import "@/index.css";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ScrollToTop } from "./components/ui/Scrolltotop";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";

const ProblemSection = lazy(() => import("./components/ProblemSection").then(({ ProblemSection }) => ({ default: ProblemSection })));
const SolutionSection = lazy(() => import("./components/SolutionSection").then(({ SolutionSection }) => ({ default: SolutionSection })));
const CoreFeatures = lazy(() => import("./components/CoreFeatures").then(({ CoreFeatures }) => ({ default: CoreFeatures })));
const HowItWorks = lazy(() => import("./components/HowItWorks").then(({ HowItWorks }) => ({ default: HowItWorks })));
const UseCases = lazy(() => import("./components/UseCases").then(({ UseCases }) => ({ default: UseCases })));
const FacilitiesBooking = lazy(() => import("./components/FacilitiesBooking").then(({ FacilitiesBooking }) => ({ default: FacilitiesBooking })));
const AppPromo = lazy(() => import("./components/AppPromo").then(({ AppPromo }) => ({ default: AppPromo })));
const Pricing = lazy(() => import("./components/Pricing").then(({ Pricing }) => ({ default: Pricing })));
const EarlyAccessBanner = lazy(() => import("./components/EarlyAccessBanner").then(({ EarlyAccessBanner }) => ({ default: EarlyAccessBanner })));
const FAQ = lazy(() => import("./components/FAQ").then(({ FAQ }) => ({ default: FAQ })));
const FinalCTA = lazy(() => import("./components/FinalCTA").then(({ FinalCTA }) => ({ default: FinalCTA })));

const ArticlePage = lazy(() => import("./components/ArticlePage"));
const InsightsPage = lazy(() => import("./components/InsightsPage"));
const PricingPage = lazy(() => import("./components/PricingPage"));
const FederationsPage = lazy(() => import("./components/FederationsPage"));
const AcademiesPage = lazy(() => import("./components/AcademiesPage"));
const SchoolsPage = lazy(() => import("./components/SchoolsPage"));
const ClubsPage = lazy(() => import("./components/ClubsPage"));
const OrganizersPage = lazy(() => import("./components/OrganizersPage"));
const AthletescoachesPage = lazy(() => import("./components/AthletescoachesPage"));
const SportfacilitiesPage = lazy(() => import("./components/SportfacilitiesPage"));

function DeferredSection({ component: Component, minHeight }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender && <Suspense fallback={<div style={{ minHeight }} />}><Component /></Suspense>}
    </div>
  );
}
function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DeferredSection component={ProblemSection} minHeight={700} />
        <DeferredSection component={SolutionSection} minHeight={650} />
        <DeferredSection component={CoreFeatures} minHeight={700} />
        <DeferredSection component={HowItWorks} minHeight={700} />
        <DeferredSection component={UseCases} minHeight={700} />
        <DeferredSection component={FacilitiesBooking} minHeight={600} />
        <DeferredSection component={AppPromo} minHeight={650} />
        <DeferredSection component={Pricing} minHeight={700} />
        <DeferredSection component={EarlyAccessBanner} minHeight={300} />
        <DeferredSection component={FAQ} minHeight={650} />
        <DeferredSection component={FinalCTA} minHeight={450} />
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
          <Suspense fallback={null}>
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
          </Suspense>
          <WhatsAppFloatingButton />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
