import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

const LOGO_DARK  = "https://customer-assets.emergentagent.com/job_d34f459c-6fce-4979-aa1a-64d570b2fca9/artifacts/b665zz1q_Tournwa.png";
const LOGO_LIGHT = "https://customer-assets.emergentagent.com/job_d34f459c-6fce-4979-aa1a-64d570b2fca9/artifacts/rdq092oq_logo%20PNG-03.png";

export const Header = () => {
  const [isDark, setIsDark]               = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openDropdown, setOpenDropdown]   = useState(null); // 'solutions' | 'features' | 'compete' | 'organize' | null
  const { t, toggleLanguage, isRTL }      = useLanguage();
  const location                          = useLocation();
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

  // Ferme les dropdowns au clic extérieur
  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const navLinks = [
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.useCases'),   href: '#use-cases'   },
    { label: t('nav.pricing'),    href: '/pricing'     },
    { label: t('nav.faq'),        href: '#faq'         },
    { label: t('nav.news'),       href: '/insights'    },
  ];

  // ── pill background : même couleur dark/light, juste l'opacité change au scroll
  const pillBg = isScrolled
    ? 'rgba(28, 28, 28, 0.92)'
    : 'rgba(28, 28, 28, 0.60)';

  const dropdownPanelStyle = {
    borderRadius: '20px',
    background: 'rgba(20, 20, 20, 0.97)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
  };

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
            <img
              src={LOGO_DARK}
              alt="Tournwa"
              className="h-9 w-auto"
            />
          </Link>

          {/* ── DESKTOP ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-6 ml-8">

            {/* Nav links */}
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
                      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[480px] p-6 grid grid-cols-2 gap-6"
                      style={dropdownPanelStyle}
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                          {t('nav.management') || 'Management'}
                        </h4>
                        <ul className="space-y-2 text-[13px] text-white/70">
                          <li>{t('nav.multiSportsManagement') || 'Multi Sports Competition Management'}</li>
                          <li>{t('nav.athleteTeamsParticipation') || 'Athlete & Teams Participation'}</li>
                          <li>{t('nav.orgGrowthMonetization') || 'Organizations Growth & Monetization'}</li>
                          <li>{t('nav.sportCommunityBuilding') || 'Sport Community Building'}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                          {t('nav.for') || 'For'}
                        </h4>
                        <ul className="space-y-2 text-[13px] text-white/70">
                          <li>{t('nav.federations') || 'Fédérations'}</li>
                          <li>{t('nav.academies') || 'Académies'}</li>
                          <li>{t('nav.schools') || 'Schools'}</li>
                          <li>{t('nav.clubs') || 'Clubs'}</li>
                          <li>{t('nav.individualOrganizers') || 'Individual Organizers'}</li>
                          <li>{t('nav.sportFacilities') || 'Sport Facilities'}</li>
                          <li>{t('nav.athletesCoaches') || 'Athletes & Coaches'}</li>
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
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                          {t('nav.organizations') || 'Organizations'}
                        </h4>
                        <ul className="space-y-1.5 text-[12.5px] text-white/70">
                          <li>{t('nav.multiSportsManagement') || 'Multi Sports Competition Management'}</li>
                          <li>{t('nav.leagueMultiFormat') || 'Tournament & League Multi Format'}</li>
                          <li>{t('nav.participationManagement') || 'Participation Management'}</li>
                          <li>{t('nav.teamPlayerMatching') || 'Team & Player Matching'}</li>
                          <li>{t('nav.registrationPayment') || 'Registration & Payment'}</li>
                          <li>{t('nav.schedulingFixtures') || 'Scheduling & Fixtures'}</li>
                          <li>{t('nav.drawsSeeding') || 'Draws & Seeding'}</li>
                          <li>{t('nav.liveCompetitionManagement') || 'Live Competition Management'}</li>
                          <li>{t('nav.athleteExperienceManagement') || 'Athlète Experience Management'}</li>
                          <li>{t('nav.communicationNotifications') || 'Communication & Smart Notifications'}</li>
                          <li>{t('nav.brandingCustomization') || 'Branding & Customization'}</li>
                          <li>{t('nav.analyticsReporting') || 'Analytics & Reporting'}</li>
                          <li>{t('nav.facilityVenueManagement') || 'Facility and Venue Management'}</li>
                          <li>{t('nav.organizationManagement') || 'Organization Management'}</li>
                          <li>{t('nav.sponsorshipRevenueTools') || 'Sponsorship & Revenue Tools'}</li>
                          <li>{t('nav.andMore') || '…. & more'}</li>
                        </ul>
                      </div>

                      {/* Athletes */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                          {t('nav.athletes') || 'Athletes'}
                        </h4>
                        <ul className="space-y-1.5 text-[12.5px] text-white/70">
                          <li>{t('nav.discoverJoinCompetition') || 'Discover & Join Compétition'}</li>
                          <li>{t('nav.discoverJoinGamesClasses') || 'Discover & Join Games & Classes'}</li>
                          <li>{t('nav.findPlayersPartnersTeams') || 'Find Players, Partners & Teams'}</li>
                          <li>{t('nav.manageParticipation') || 'Manage Participation'}</li>
                          <li>{t('nav.realtimeCompetitionExperience') || 'Real-time Competition Experience'}</li>
                          <li>{t('nav.profileCareer') || 'Profile & Career'}</li>
                          <li>{t('nav.parentsConsentManagement') || 'Parents Consent Management'}</li>
                          <li>{t('nav.rankingPerformanceStats') || 'Ranking & Performance Statistics'}</li>
                          <li>{t('nav.mediaHighlights') || 'Media & Highlights'}</li>
                          <li>{t('nav.smartNotification') || 'Smart Notification'}</li>
                          <li>{t('nav.andMoreDots') || '….. & more'}</li>
                        </ul>
                      </div>

                      {/* Coaches */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                          {t('nav.coaches') || 'Coaches'}
                        </h4>
                        <ul className="space-y-1.5 text-[12.5px] text-white/70">
                          <li>{t('nav.teamAthleteManagement') || 'Team & athlete management'}</li>
                          <li>{t('nav.trainingManagement') || 'Training Management'}</li>
                          <li>{t('nav.competitionManagement') || 'Competition Management'}</li>
                          <li>{t('nav.communicationCentre') || 'Communication Centre'}</li>
                          <li>{t('nav.parentCollaboration') || 'Parent Collaboration'}</li>
                          <li>{t('nav.coachProfile') || 'Coach Profile'}</li>
                          <li>{t('nav.andMoreDots') || '…. & more'}</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remaining static links */}
              {navLinks.map((link, i) => {
                const href    = link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href;
                const isRoute = href.startsWith('/');
                const active  = location.pathname === href;

                const cls = [
                  'text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap',
                  active
                    ? 'text-[hsl(var(--primary))]'
                    : 'text-white/75 hover:text-white',
                ].join(' ');

                return isRoute
                  ? <Link key={i} to={href} className={cls}>{link.label}</Link>
                  : <a    key={i} href={href} className={cls}>{link.label}</a>;
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
              <button
                onClick={toggleTheme}
                aria-label="thème"
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* ── Compete & Organize buttons with dropdown + plus icon ─────── */}
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
                  {t('nav.compete') || 'Compete'}
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
                        <Link
                          to="/login"
                          onClick={() => setOpenDropdown(null)}
                          className="flex-1 text-center py-2.5 rounded-full text-[13px] font-semibold text-white border border-white/15 hover:bg-white/10 transition-colors"
                        >
                          {t('nav.login') || 'Login'}
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setOpenDropdown(null)}
                          className="flex-1 text-center py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ background: 'hsl(var(--primary))' }}
                        >
                          {t('nav.signup') || 'Sign up'}
                        </Link>
                      </div>

                      <p className="text-center text-[12px] text-white/60 mb-1">
                        {t('nav.exploreEvents') || 'To Explore all the sport Event'}
                      </p>
                      <p className="text-center text-[11px] text-white/40 mb-3">
                        {t('nav.or') || 'or'}
                      </p>
                      <p className="text-center text-[12px] text-white/60 mb-4">
                        {t('nav.downloadAppExperience') || 'Download the App to Enjoy the Ultimate Athlete experience'}
                      </p>

                      <div className="flex flex-col gap-2">
                        <a
                          href="#"
                          className="flex items-center justify-center gap-2 text-center py-3 rounded-2xl text-[13px] font-medium text-white transition-colors hover:opacity-85"
                          style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26-2 52.5-15.2 69.5-34.3z"/></svg>
                          {t('nav.appStore') || 'App Store'}
                        </a>
                        <a
                          href="#"
                          className="flex items-center justify-center gap-2 text-center py-3 rounded-2xl text-[13px] font-medium text-white transition-colors hover:opacity-85"
                          style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34.9 6.3 27 17.8 27 32v448c0 14.2 7.9 25.7 20 32l281.9-281L47 0zm417.2 213.8L268.4 256l195.8 42.2C474.6 290 484 273.8 484 256s-9.4-34-19.8-42.2zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                          {t('nav.googlePlay') || 'Google Play'}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Organize */}
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
                  {t('nav.organize') || 'Organize'}
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
                        {t('nav.create') || 'Create'}
                      </h4>
                      <ul className="space-y-1.5 text-[13px] text-white/70 mb-4">
                        <li>{t('nav.game') || 'Game'}</li>
                        <li>{t('nav.trainingClasses') || 'Training Classes'}</li>
                        <li>{t('nav.tournament') || 'Tournament'}</li>
                        <li>{t('nav.league') || 'League'}</li>
                        <li>{t('nav.venueFacilities') || 'Venue & Facilities'}</li>
                      </ul>
                      <p className="text-center text-[11px] text-white/40 mb-3">
                        {t('nav.or') || 'or'}
                      </p>
                      <button
                        data-testid="btn-launch-own-platform"
                        onClick={() => { setOpenDropdown(null); setIsContactOpen(true); }}
                        className="w-full py-2.5 rounded-full text-[13px] font-semibold text-white border border-white/15 hover:bg-white/10 transition-colors"
                      >
                        {t('nav.launchOwnPlatform') || 'Launch your Own Platform'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── MOBILE icons + burger ───────────────────────────────── */}
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

        {/* ── MENU MOBILE ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[96px] left-5 right-5 lg:hidden max-h-[80vh] overflow-y-auto"
              style={{
                borderRadius: '24px',
                background: 'rgba(20, 20, 20, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div className="px-6 py-5 flex flex-col">
                {/* Solutions */}
                <Link to="/#solutions" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-white/80 hover:text-white py-3 border-b border-white/10 block">
                  {t('nav.solutions') || 'Solutions'}
                </Link>
                {/* Features */}
                <a href={isHome ? '#features' : '/#features'} onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-white/80 hover:text-white py-3 border-b border-white/10 block">
                  {t('nav.features')}
                </a>

                {navLinks.map((link, i) => {
                  const href    = link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href;
                  const isRoute = href.startsWith('/');
                  const active  = location.pathname === href;
                  const cls = [
                    'text-sm font-medium transition-colors py-3 border-b border-white/10 last:border-0 block',
                    active ? 'text-[hsl(var(--primary))]' : 'text-white/80 hover:text-white',
                  ].join(' ');
                  return isRoute
                    ? <Link key={i} to={href} onClick={() => setIsMenuOpen(false)} className={cls}>{link.label}</Link>
                    : <a    key={i} href={href} onClick={() => setIsMenuOpen(false)} className={cls}>{link.label}</a>;
                })}

                <div className="pt-4 flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center py-3 text-sm font-semibold text-white border border-white/15 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5"><Plus size={14} />{t('nav.compete') || 'Compete'}</span>
                  </Link>
                  <button
                    onClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }}
                    className="flex-1 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{
                      borderRadius: '50px',
                      background: 'hsl(var(--primary))',
                      boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 justify-center"><Plus size={14} />{t('nav.organize') || 'Organize'}</span>
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