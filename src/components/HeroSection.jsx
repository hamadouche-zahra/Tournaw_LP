import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PopupButton } from 'react-calendly';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

const DASHBOARD_IMG = "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/lk0ujnfn_Screenshot%202026-04-30%20at%202.25.03%E2%80%AFPM.png";
const MOBILE_IMG    = "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/5kqe35zk_home%20mockup.png";

const AVATARS = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/67.jpg',
  'https://randomuser.me/api/portraits/women/21.jpg',
];

const STATS_CONFIG = [
  { end: 50000, suffix: 'K+', divisor: 1000, key: 'statRegisteredAthletes' },
  { end: 2000,  suffix: 'K+', divisor: 1000, key: 'statTournamentsCreated' },
  { end: 98,    suffix: '%',  divisor: 1,    key: 'statSatisfaction'       },
];

const PARTNER_LOGOS = [
  'Fritchtech', 'Blossom', 'Gedoly', 'Donelyede', 'Layers', 'Marblein',
];

/* Hook compteur animé */
function useCounter(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

function StatItem({ stat, started, t }) {
  const raw = useCounter(stat.end, 1800, started);
  const display = stat.divisor > 1
    ? (raw / stat.divisor).toFixed(raw / stat.divisor >= 10 ? 0 : 1)
    : raw;
  return (
    <div className="text-center">
      <p className="text-3xl font-black tracking-tight" style={{ color: 'hsl(var(--primary))' }}>
        {display}{stat.suffix}
      </p>
      <p className="text-xs text-gray-500 dark:text-white/45 mt-0.5">{t(`hero.${stat.key}`)}</p>
    </div>
  );
}

export const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        data-testid="hero-section"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative overflow-hidden bg-[#f0f4f8] dark:bg-[#0b0f1a] pt-32 pb-20"
      >
        {/* Glow blobs */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsla(var(--primary),0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsla(210,80%,55%,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="container mx-auto px-6 md:px-10 relative z-10">

          {/* ══ HEADER CENTRÉ ══════════════════════════════════════════ */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* Social proof avatars + badge */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0b0f1a] object-cover"
                    style={{
                      marginLeft: i === 0 ? 0 : '-10px',
                      zIndex: 4 - i,
                      position: 'relative',
                    }}
                  />
                ))}
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: 'hsl(var(--primary))' }}
              >
                2K+ {t('hero.activeUsers') || 'Utilisateurs actifs'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              data-testid="hero-headline"
              className="font-black tracking-tighter leading-[1.05] mb-6 text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('hero.headline')}
            </motion.h1>

            {/* Subline */}
            <motion.p
              data-testid="hero-subheadline"
              className="text-base lg:text-lg leading-relaxed max-w-2xl mb-10 text-gray-500 dark:text-white/55"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-16"
              data-testid="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                data-testid="hero-book-demo-btn"
                onClick={() => setIsContactOpen(true)}
                className="flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 rounded-full transition-all active:scale-95 hover:scale-[1.03]"
                style={{
                  background: 'hsl(var(--primary))',
                  color: '#fff',
                  boxShadow: '0 8px 24px hsla(var(--primary),0.35)',
                }}
              >
                {t('nav.bookDemo')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </button>

              <PopupButton
                url="https://calendly.com/tournwa/30min"
                rootElement={document.getElementById('root')}
                text={t('nav.launchPlatform')}
                data-testid="hero-launch-btn"
                className="flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all active:scale-95 hover:scale-[1.03] border text-gray-800 dark:text-white bg-white/70 dark:bg-white/[0.08] border-gray-200 dark:border-white/15 backdrop-blur-sm"
              />
            </motion.div>
          </div>

          {/* ══ DASHBOARD PLEINE LARGEUR + MOBILE OVERLAY ═══════════════ */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {/* Glow derrière */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 30%, hsla(var(--primary),0.12) 0%, transparent 60%)',
                filter: 'blur(50px)',
              }}
            />

            {/* Dashboard screenshot */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={DASHBOARD_IMG}
                alt="Tournwa Dashboard"
                data-testid="dashboard-screenshot"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover object-top border border-white/10"
              />

              {/* Mobile mockup — superposé à droite, comme la référence */}
              <motion.div
                className="absolute -bottom-10 -right-6 md:-right-12 z-20 w-[140px] md:w-[200px] lg:w-[230px]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.img
                  src={MOBILE_IMG}
                  alt="Tournwa Mobile"
                  data-testid="mobile-screenshot"
                  className="w-full h-auto drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ══ STATS ════════════════════════════════════════════════ */}
          <motion.div
            ref={statsRef}
            className="flex justify-center gap-12 md:gap-20 mt-24 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {STATS_CONFIG.map((s, i) => (
              <StatItem key={i} stat={s} started={statsStarted} t={t} />
            ))}
          </motion.div>

        

        </div>
      </section>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};