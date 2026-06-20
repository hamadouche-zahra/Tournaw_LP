import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, Menu, X, Plus, ChevronDown, 
  Dribbble, GraduationCap, Trophy, Calendar, MapPin, 
  Shield, School, Users, Award, Star, Activity, 
  Briefcase, User, ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

const LOGO_DARK  = "https://customer-assets.emergentagent.com/job_d34f459c-6fce-4979-aa1a-64d570b2fca9/artifacts/b665zz1q_Tournwa.png";
const LOGO_LIGHT = "https://customer-assets.emergentagent.com/job_d34f459c-6fce-4979-aa1a-64d570b2fca9/artifacts/rdq092oq_logo%20PNG-03.png";

// Hauteur de la navbar + marge de respiration pour le scroll offset
const SCROLL_OFFSET = 110;

export const Header = () => {
  const [isDark, setIsDark]               = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openDropdown, setOpenDropdown]   = useState(null);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const { t, toggleLanguage, isRTL }      = useLanguage();
  const location                          = useLocation();
  const navigate                          = useNavigate();
  const isHome                            = location.pathname === '/';
  const navRef                            = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Empêche le navigateur de faire son propre scroll instantané vers le #hash
  // au chargement initial / refresh (sinon ça scroll sous la navbar avant que
  // notre logique avec offset ait pu s'exécuter).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Si l'URL contient un #hash (chargement direct, refresh, ou navigate('/#pricing')),
  // on scrolle vers la section une fois qu'elle existe réellement dans le DOM.
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    let attempts = 0;
    const maxAttempts = 40; // ~2s à 50ms d'intervalle, le temps que toutes les sections/images montent

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollToSection(id);
      } else if (attempts < maxAttempts) {
        attempts += 1;
        setTimeout(tryScroll, 50);
      }
    };

    // on coupe court tout scroll natif déjà amorcé par le navigateur
    window.scrollTo(0, 0);
    const timer = setTimeout(tryScroll, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSection = (key) => {
    setOpenMobileSection((prev) => (prev === key ? null : key));
  };

  // Scroll fluide vers une section en compensant la hauteur de la navbar fixe
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Gère le clic sur un lien d'ancre (#pricing, #how-it-works, ...)
  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setOpenDropdown(null);

    if (isHome) {
      // Déjà sur la home → simple scroll vers la section
      scrollToSection(sectionId);
      return;
    }

    // Pas sur la home : cas spécial Pricing → page dédiée /pricing
    if (sectionId === 'pricing') {
      navigate('/pricing');
      return;
    }

    // Autres ancres : on navigue vers la home avec le hash,
    // le useEffect ci-dessus se chargera de scroller une fois monté
    navigate(`/#${sectionId}`);
  };

  const navLinks = [
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.useCases'),   href: '#use-cases'   },
    { label: t('nav.pricing'),    href: '#pricing', isPricing: true },
    { label: t('nav.faq'),        href: '#faq'         },
    { label: t('nav.news'),       href: '/insights'    },
  ];

  const pillBg = isScrolled ? 'rgba(28, 28, 28, 0.92)' : 'rgba(28, 28, 28, 0.60)';

  const dropdownPanelStyle = {
    borderRadius: '20px',
    background: 'rgba(45, 45, 50, 0.98)', 
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
  };

  // Composant réutilisable avec icônes enveloppées dans un cercle
  const NavLink = ({ children, icon: Icon }) => (
    <li className="group flex items-center justify-between gap-2 cursor-pointer transition-colors text-white/85 hover:text-[hsl(var(--primary))]">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 transition-colors group-hover:bg-[hsl(var(--primary))]/10 group-hover:border-[hsl(var(--primary))]/20 flex-shrink-0">
            <Icon size={14} className="text-white/75 transition-colors group-hover:text-[hsl(var(--primary))]" />
          </div>
        )}
        <span className="transition-colors">{children}</span>
      </div>
      <ChevronDown
        size={12}
        className="opacity-0 -translate-x-1 -rotate-90 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-[hsl(var(--primary))] flex-shrink-0"
      />
    </li>
  );

  // Section accordéon pour le menu mobile
  const MobileAccordion = ({ id, title, children }) => (
    <div className="border-b border-white/10">
      <button
        onClick={() => toggleMobileSection(id)}
        className="w-full flex items-center justify-between py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${openMobileSection === id ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {openMobileSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-5 pt-4"
      >
        {/* ── PILL NAVBAR ─────────────────────────────────────────────── */}
        <div
          ref={navRef}
          className="relative w-full max-w-[1240px] flex items-center justify-between px-7 md:px-10"
          style={{
            height: '80px',
            borderRadius: '50px',
            background: pillBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.30)',
            transition: 'background 0.35s ease, box-shadow 0.35s ease',
          }}
        >
          {/* Logo */}
          <Link to="/" data-testid="logo-link" className="flex-shrink-0">
            <img src={LOGO_DARK} alt="Tournwa" className="h-9 w-auto" />
          </Link>

          {/* ── DESKTOP ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-6 ml-8">
            <nav className="flex items-center gap-6">

              {/* Solutions dropdown */}
              <div className="relative">
                <button
                  data-testid="nav-solutions"
                  onClick={() => toggleDropdown('solutions')}
                  className={[
                    'flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap',
                    openDropdown === 'solutions' ? 'text-[hsl(var(--primary))]' : 'text-white/75 hover:text-white',
                  ].join(' ')}
                >
                  {t('nav.solutions')}
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[280px] p-6"
                      style={dropdownPanelStyle}
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                          {t('nav.for')}
                        </h4>
                        <ul className="space-y-2 text-[13px]">
                          <NavLink icon={Shield}>{t('nav.federations')}</NavLink>
                          <NavLink icon={School}>{t('nav.academies')}</NavLink>
                          <NavLink icon={GraduationCap}>{t('nav.schools')}</NavLink>
                          <NavLink icon={Users}>{t('nav.clubs')}</NavLink>
                          <NavLink icon={Award}>{t('nav.individualOrganizers')}</NavLink>
                          <NavLink icon={Star}>{t('nav.sportFacilities')}</NavLink>
                          <NavLink icon={Activity}>{t('nav.athletesCoaches')}</NavLink>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Features dropdown */}
              <div className="relative">
                <button
                  data-testid="nav-features"
                  onClick={() => toggleDropdown('features')}
                  className={[
                    'flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap',
                    openDropdown === 'features' ? 'text-[hsl(var(--primary))]' : 'text-white/75 hover:text-white',
                  ].join(' ')}
                >
                  {t('nav.features')}
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === 'features' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === 'features' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[720px] p-6 grid grid-cols-3 gap-6"
                      style={dropdownPanelStyle}
                    >
                      {/* Organizations */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                            <Briefcase size={14} className="text-[hsl(var(--primary))]" />
                          </div>                          
                          {t('nav.organizations')}
                        </h4>
                        <ul className="space-y-1.5 text-[12.5px]">
                          <NavLink>{t('nav.multiSportsManagement')}</NavLink>
                          <NavLink>{t('nav.leagueMultiFormat')}</NavLink>
                          <NavLink>{t('nav.participationManagement')}</NavLink>
                          <NavLink>{t('nav.teamPlayerMatching')}</NavLink>
                          <NavLink>{t('nav.registrationPayment')}</NavLink>
                          <NavLink>{t('nav.schedulingFixtures')}</NavLink>
                          <NavLink>{t('nav.drawsSeeding')}</NavLink>
                          <NavLink>{t('nav.liveCompetitionManagement')}</NavLink>
                          <NavLink>{t('nav.athleteExperienceManagement')}</NavLink>
                          <NavLink>{t('nav.communicationNotifications')}</NavLink>
                          <NavLink>{t('nav.brandingCustomization')}</NavLink>
                          <NavLink>{t('nav.analyticsReporting')}</NavLink>
                          <NavLink>{t('nav.facilityVenueManagement')}</NavLink>
                          <NavLink>{t('nav.organizationManagement')}</NavLink>
                          <NavLink>{t('nav.sponsorshipRevenueTools')}</NavLink>
                          <li className="text-white/50 text-[12px] pl-1">{t('nav.andMore')}</li>
                        </ul>
                      </div>

                      {/* Athletes */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                         <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                            <User size={14} className="text-[hsl(var(--primary))]" />
                          </div>                          
                          {t('nav.athletes')}
                        </h4>
                        <ul className="space-y-1.5 text-[12.5px]">
                          <NavLink>{t('nav.discoverJoinCompetition')}</NavLink>
                          <NavLink>{t('nav.discoverJoinGamesClasses')}</NavLink>
                          <NavLink>{t('nav.findPlayersPartnersTeams')}</NavLink>
                          <NavLink>{t('nav.manageParticipation')}</NavLink>
                          <NavLink>{t('nav.realtimeCompetitionExperience')}</NavLink>
                          <NavLink>{t('nav.profileCareer')}</NavLink>
                          <NavLink>{t('nav.parentsConsentManagement')}</NavLink>
                          <NavLink>{t('nav.rankingPerformanceStats')}</NavLink>
                          <NavLink>{t('nav.mediaHighlights')}</NavLink>
                          <NavLink>{t('nav.smartNotification')}</NavLink>
                          <li className="text-white/50 text-[12px] pl-1">{t('nav.andMoreDots')}</li>
                        </ul>
                      </div>

                      {/* Coaches */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                            <ClipboardList size={14} className="text-[hsl(var(--primary))]" />
                          </div>
                          {t('nav.coaches')}
                        </h4>
                        <ul className="space-y-1.5 text-[12.5px]">
                          <NavLink>{t('nav.teamAthleteManagement')}</NavLink>
                          <NavLink>{t('nav.trainingManagement')}</NavLink>
                          <NavLink>{t('nav.competitionManagement')}</NavLink>
                          <NavLink>{t('nav.communicationCentre')}</NavLink>
                          <NavLink>{t('nav.parentCollaboration')}</NavLink>
                          <NavLink>{t('nav.coachProfile')}</NavLink>
                          <li className="text-white/50 text-[12px] pl-1">{t('nav.andMoreDots')}</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link, i) => {
                // Lien externe / route classique (ex: /insights)
                if (!link.href.startsWith('#')) {
                  const active = location.pathname === link.href;
                  const cls = [
                    'text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap',
                    active ? 'text-[hsl(var(--primary))]' : 'text-white/75 hover:text-white',
                  ].join(' ');
                  return <Link key={i} to={link.href} className={cls}>{link.label}</Link>;
                }

                // Lien d'ancre (#how-it-works, #pricing, #faq, ...)
                const sectionId = link.href.replace('#', '');
                const cls = 'text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap text-white/75 hover:text-white';
                const fallbackHref = isHome
                  ? link.href
                  : sectionId === 'pricing'
                    ? '/pricing'
                    : `/${link.href}`;

                return (
                  <a
                    key={i}
                    href={fallbackHref}
                    onClick={(e) => handleAnchorClick(e, sectionId)}
                    className={cls}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Lang / theme */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('lang')}
                  aria-label="langue"
                  className="flex items-center gap-1 px-2 py-1.5 text-[12px] font-semibold text-white/60 hover:text-white transition-colors rounded-full border border-white/10"
                >
                  {isRTL ? 'AR' : 'EN'}
                  <ChevronDown size={12} className={`transition-transform ${openDropdown === 'lang' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'lang' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+10px)] right-0 w-[100px] p-1.5 flex flex-col gap-1"
                      style={dropdownPanelStyle}
                    >
                      <button
                        onClick={() => { if (isRTL) toggleLanguage(); setOpenDropdown(null); }}
                        className={[
                          'text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-colors',
                          !isRTL ? 'text-[hsl(var(--primary))] bg-white/5' : 'text-white/70 hover:bg-white/10',
                        ].join(' ')}
                      >
                        English
                      </button>
                      <button
                        onClick={() => { if (!isRTL) toggleLanguage(); setOpenDropdown(null); }}
                        className={[
                          'text-right px-3 py-2 rounded-xl text-[13px] font-medium transition-colors',
                          isRTL ? 'text-[hsl(var(--primary))] bg-white/5' : 'text-white/70 hover:bg-white/10',
                        ].join(' ')}
                      >
                        العربية
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={toggleTheme} aria-label="thème" className="p-2 text-white/50 hover:text-white transition-colors">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* Buttons Compete / Organize */}
            <div className="flex items-center gap-2.5 pl-1">
              {/* Compete */}
              <div className="relative">
                <button
                  data-testid="btn-compete"
                  onClick={() => toggleDropdown('compete')}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    borderRadius: '50px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <Plus size={14} />
                  {t('nav.compete')}
                  <ChevronDown size={13} className={`transition-transform ${openDropdown === 'compete' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === 'compete' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+14px)] right-0 w-[260px] p-5"
                      style={dropdownPanelStyle}
                    >
                      <div className="flex gap-2 mb-4">
                        <Link to="/login" onClick={() => setOpenDropdown(null)} className="flex-1 text-center py-2.5 rounded-full text-[13px] font-semibold text-white border border-white/15 hover:bg-white/10 transition-colors">
                          {t('nav.login')}
                        </Link>
                        <Link to="/signup" onClick={() => setOpenDropdown(null)} className="flex-1 text-center py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: 'hsl(var(--primary))' }}>
                          {t('nav.signup')}
                        </Link>
                      </div>
                      <p className="text-center text-[12px] text-white/60 mb-1">{t('nav.exploreEvents')}</p>
                      <p className="text-center text-[11px] text-white/40 mb-3">{t('nav.or')}</p>
                      <p className="text-center text-[12px] text-white/60 mb-4">{t('nav.downloadAppExperience')}</p>
                      <div className="flex flex-col gap-2">
                        <a href="#" className="flex items-center justify-center gap-2 text-center py-3 rounded-2xl text-[13px] font-medium text-white transition-colors hover:opacity-85" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}>
                          <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26-2 52.5-15.2 69.5-34.3z"/></svg>
                          {t('nav.appStore')}
                        </a>
                        <a href="#" className="flex items-center justify-center gap-2 text-center py-3 rounded-2xl text-[13px] font-medium text-white transition-colors hover:opacity-85" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}>
                          <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34.9 6.3 27 17.8 27 32v448c0 14.2 7.9 25.7 20 32l281.9-281L47 0zm417.2 213.8L268.4 256l195.8 42.2C474.6 290 484 273.8 484 256s-9.4-34-19.8-42.2zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                          {t('nav.googlePlay')}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Organize Dropdown */}
              <div className="relative">
                <button
                  data-testid="btn-organize"
                  onClick={() => toggleDropdown('organize')}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold text-white whitespace-nowrap transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    borderRadius: '50px',
                    background: 'hsl(var(--primary))',
                    boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
                  }}
                >
                  <Plus size={14} />
                  {t('nav.organize')}
                  <ChevronDown size={13} className={`transition-transform ${openDropdown === 'organize' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === 'organize' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+14px)] right-0 w-[280px] p-5"
                      style={dropdownPanelStyle}
                    >
                      <h4 className="text-sm font-bold text-white mb-3">
                        {t('nav.create')}
                      </h4>
                      <ul className="space-y-2 text-[13px] mb-4">
  <NavLink icon={Dribbble}>{t('nav.game')}</NavLink>
  <NavLink icon={GraduationCap}>{t('nav.trainingClasses')}</NavLink>
  <NavLink icon={Trophy}>{t('nav.tournament')}</NavLink>
  <NavLink icon={Calendar}>{t('nav.league')}</NavLink>
  <li className="flex items-center justify-between gap-2 text-white/85">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
        <MapPin size={14} className="text-white/75" />
      </div>
      <span className="font-bold">{t('nav.venueFacilities')}</span>
    </div>
    <span className="text-[11px] font-semibold text-[hsl(var(--primary))] whitespace-nowrap">
      {t('nav.availableSoon')}
    </span>
  </li>
</ul>
<p className="text-center text-[11px] text-white/40 mb-3">{t('nav.or')}</p>
<button
  data-testid="btn-launch-own-platform"
  onClick={() => { setOpenDropdown(null); setIsContactOpen(true); }}
  className="w-full py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
  style={{
    background: 'hsl(var(--primary))',
    boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
  }}
>
  {t('nav.launchOwnPlatform')}
</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── MOBILE ───────────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-1">
            <button onClick={toggleLanguage} aria-label="langue" className="px-2 py-1.5 text-[12px] font-semibold text-white/70 hover:text-white rounded-full border border-white/10">
              {isRTL ? 'AR' : 'EN'}
            </button>
            <button onClick={toggleTheme} aria-label="thème" className="p-2 text-white/70 hover:text-white">
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU PANEL ─────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[96px] left-5 right-5 lg:hidden max-h-[80vh] overflow-y-auto"
              style={dropdownPanelStyle}
            >
              <div className="px-6 py-5 flex flex-col">

                {/* Solutions accordion */}
                <MobileAccordion id="solutions" title={t('nav.solutions')}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 pl-1">
                    {t('nav.for')}
                  </p>
                  <ul className="space-y-2 text-[13px] pl-1">
                    <NavLink icon={Shield}>{t('nav.federations')}</NavLink>
                    <NavLink icon={School}>{t('nav.academies')}</NavLink>
                    <NavLink icon={GraduationCap}>{t('nav.schools')}</NavLink>
                    <NavLink icon={Users}>{t('nav.clubs')}</NavLink>
                    <NavLink icon={Award}>{t('nav.individualOrganizers')}</NavLink>
                    <NavLink icon={Star}>{t('nav.sportFacilities')}</NavLink>
                    <NavLink icon={Activity}>{t('nav.athletesCoaches')}</NavLink>
                  </ul>
                </MobileAccordion>

                {/* Features accordion */}
                <MobileAccordion id="features" title={t('nav.features')}>
                  <div className="space-y-5">
                    {/* Organizations */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-2 pl-1">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                          <Briefcase size={12} className="text-[hsl(var(--primary))]" />
                        </div>
                        {t('nav.organizations')}
                      </h4>
                      <ul className="space-y-1.5 text-[12.5px] pl-1">
                        <NavLink>{t('nav.multiSportsManagement')}</NavLink>
                        <NavLink>{t('nav.leagueMultiFormat')}</NavLink>
                        <NavLink>{t('nav.participationManagement')}</NavLink>
                        <NavLink>{t('nav.teamPlayerMatching')}</NavLink>
                        <NavLink>{t('nav.registrationPayment')}</NavLink>
                        <NavLink>{t('nav.schedulingFixtures')}</NavLink>
                        <NavLink>{t('nav.drawsSeeding')}</NavLink>
                        <NavLink>{t('nav.liveCompetitionManagement')}</NavLink>
                        <NavLink>{t('nav.athleteExperienceManagement')}</NavLink>
                        <NavLink>{t('nav.communicationNotifications')}</NavLink>
                        <NavLink>{t('nav.brandingCustomization')}</NavLink>
                        <NavLink>{t('nav.analyticsReporting')}</NavLink>
                        <NavLink>{t('nav.facilityVenueManagement')}</NavLink>
                        <NavLink>{t('nav.organizationManagement')}</NavLink>
                        <NavLink>{t('nav.sponsorshipRevenueTools')}</NavLink>
                        <li className="text-white/50 text-[12px] pl-1">{t('nav.andMore')}</li>
                      </ul>
                    </div>

                    {/* Athletes */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-2 pl-1">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                          <User size={12} className="text-[hsl(var(--primary))]" />
                        </div>
                        {t('nav.athletes')}
                      </h4>
                      <ul className="space-y-1.5 text-[12.5px] pl-1">
                        <NavLink>{t('nav.discoverJoinCompetition')}</NavLink>
                        <NavLink>{t('nav.discoverJoinGamesClasses')}</NavLink>
                        <NavLink>{t('nav.findPlayersPartnersTeams')}</NavLink>
                        <NavLink>{t('nav.manageParticipation')}</NavLink>
                        <NavLink>{t('nav.realtimeCompetitionExperience')}</NavLink>
                        <NavLink>{t('nav.profileCareer')}</NavLink>
                        <NavLink>{t('nav.parentsConsentManagement')}</NavLink>
                        <NavLink>{t('nav.rankingPerformanceStats')}</NavLink>
                        <NavLink>{t('nav.mediaHighlights')}</NavLink>
                        <NavLink>{t('nav.smartNotification')}</NavLink>
                        <li className="text-white/50 text-[12px] pl-1">{t('nav.andMoreDots')}</li>
                      </ul>
                    </div>

                    {/* Coaches */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-2 pl-1">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                          <ClipboardList size={12} className="text-[hsl(var(--primary))]" />
                        </div>
                        {t('nav.coaches')}
                      </h4>
                      <ul className="space-y-1.5 text-[12.5px] pl-1">
                        <NavLink>{t('nav.teamAthleteManagement')}</NavLink>
                        <NavLink>{t('nav.trainingManagement')}</NavLink>
                        <NavLink>{t('nav.competitionManagement')}</NavLink>
                        <NavLink>{t('nav.communicationCentre')}</NavLink>
                        <NavLink>{t('nav.parentCollaboration')}</NavLink>
                        <NavLink>{t('nav.coachProfile')}</NavLink>
                        <li className="text-white/50 text-[12px] pl-1">{t('nav.andMoreDots')}</li>
                      </ul>
                    </div>
                  </div>
                </MobileAccordion>

                {/* Standard nav links */}
                {navLinks.map((link, i) => {
                  if (!link.href.startsWith('#')) {
                    const active = location.pathname === link.href;
                    const cls = [
                      'text-sm font-medium transition-colors py-3 border-b border-white/10 last:border-0 block',
                      active ? 'text-[hsl(var(--primary))]' : 'text-white/80 hover:text-white',
                    ].join(' ');
                    return (
                      <Link key={i} to={link.href} onClick={() => setIsMenuOpen(false)} className={cls}>
                        {link.label}
                      </Link>
                    );
                  }

                  const sectionId = link.href.replace('#', '');
                  const cls = 'text-sm font-medium transition-colors py-3 border-b border-white/10 last:border-0 block text-white/80 hover:text-white';
                  const fallbackHref = isHome
                    ? link.href
                    : sectionId === 'pricing'
                      ? '/pricing'
                      : `/${link.href}`;

                  return (
                    <a
                      key={i}
                      href={fallbackHref}
                      onClick={(e) => handleAnchorClick(e, sectionId)}
                      className={cls}
                    >
                      {link.label}
                    </a>
                  );
                })}

                {/* Compete options */}
                <div className="pt-4 border-b border-white/10 pb-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-3">
                    {t('nav.compete')}
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center py-2.5 rounded-full text-[13px] font-semibold text-white border border-white/15 hover:bg-white/10 transition-colors">
                      {t('nav.login')}
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: 'hsl(var(--primary))' }}>
                      {t('nav.signup')}
                    </Link>
                  </div>
                  <p className="text-center text-[12px] text-white/60 mb-1">{t('nav.exploreEvents')}</p>
                  <p className="text-center text-[11px] text-white/40 mb-3">{t('nav.or')}</p>
                  <p className="text-center text-[12px] text-white/60 mb-4">{t('nav.downloadAppExperience')}</p>
                  <div className="flex flex-col gap-2">
                    <a href="#" className="flex items-center justify-center gap-2 text-center py-3 rounded-2xl text-[13px] font-medium text-white transition-colors hover:opacity-85" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26-2 52.5-15.2 69.5-34.3z"/></svg>
                      {t('nav.appStore')}
                    </a>
                    <a href="#" className="flex items-center justify-center gap-2 text-center py-3 rounded-2xl text-[13px] font-medium text-white transition-colors hover:opacity-85" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34.9 6.3 27 17.8 27 32v448c0 14.2 7.9 25.7 20 32l281.9-281L47 0zm417.2 213.8L268.4 256l195.8 42.2C474.6 290 484 273.8 484 256s-9.4-34-19.8-42.2zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                      {t('nav.googlePlay')}
                    </a>
                  </div>
                </div>

                {/* Organize options */}
                <div className="pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-3">
                    {t('nav.create')}
                  </p>
                  <ul className="space-y-2 text-[13px] mb-4">
  <NavLink icon={Dribbble}>{t('nav.game')}</NavLink>
  <NavLink icon={GraduationCap}>{t('nav.trainingClasses')}</NavLink>
  <NavLink icon={Trophy}>{t('nav.tournament')}</NavLink>
  <NavLink icon={Calendar}>{t('nav.league')}</NavLink>
  <li className="flex items-center justify-between gap-2 text-white/85">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
        <MapPin size={14} className="text-white/75" />
      </div>
      <span className="font-bold">{t('nav.venueFacilities')}</span>
    </div>
    <span className="text-[11px] font-semibold text-[hsl(var(--primary))] whitespace-nowrap">
      {t('nav.availableSoon')}
    </span>
  </li>
</ul>
<button
  onClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }}
  className="w-full py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
  style={{
    borderRadius: '50px',
    background: 'hsl(var(--primary))',
    boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
  }}
>
  <span className="inline-flex items-center gap-1.5 justify-center"><Plus size={14} />{t('nav.launchOwnPlatform')}</span>
</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};