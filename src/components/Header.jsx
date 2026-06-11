import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
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
  const { t, toggleLanguage, isRTL }      = useLanguage();
  const location                          = useLocation();
  const isHome                            = location.pathname === '/';

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

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const navLinks = [
    { label: t('nav.features'),   href: '#features'    },
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

  return (
    <>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-5 pt-4"
      >
        {/* ── PILL NAVBAR ─────────────────────────────────────────────── */}
        <div
          className="w-full max-w-[1200px] flex items-center justify-between px-6 md:px-8"
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
          <div className="hidden lg:flex items-center gap-7">

            {/* Nav links */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link, i) => {
                const href    = link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href;
                const isRoute = href.startsWith('/');
                const active  = location.pathname === href;

                const cls = [
                  'text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap',
                  active
                    ? 'text-[hsl(var(--primary))]'          // vert actif
                    : 'text-white/75 hover:text-white',
                ].join(' ');

                return isRoute
                  ? <Link key={i} to={href} className={cls}>{link.label}</Link>
                  : <a    key={i} href={href} className={cls}>{link.label}</a>;
              })}
            </nav>

            {/* Lang / theme */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={toggleLanguage}
                aria-label="langue"
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <Globe size={16} />
              </button>
              <button
                onClick={toggleTheme}
                aria-label="thème"
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* CTA — couleur primaire (vert) + pill radius */}
            <button
              data-testid="book-demo-btn-header"
              onClick={() => setIsContactOpen(true)}
              className="px-7 py-2.5 text-[13px] font-semibold text-white whitespace-nowrap transition-all duration-200 hover:opacity-90 active:scale-95"              style={{
                borderRadius: '50px',
                background: 'hsl(var(--primary))',
                boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
              }}
            >
              {t('nav.bookDemo')}
            </button>
          </div>

          {/* ── MOBILE icons + burger ───────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-1">
            <button onClick={toggleLanguage} aria-label="langue" className="p-2 text-white/70 hover:text-white">
              <Globe size={19} />
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
              className="absolute top-[96px] left-5 right-5 lg:hidden"
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
                <div className="pt-4">
                  <button
                    onClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }}
                    className="w-full py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"                    style={{
                      borderRadius: '50px',
                      background: 'hsl(var(--primary))',
                      boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
                    }}
                  >
                    {t('nav.bookDemo')}
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