import { useState, useEffect } from 'react';
import { Apple, Play, Smartphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export const AppBanner = () => {
  const { t, isRTL } = useLanguage();

  // Bug 2 corrigé : mémorisation de la fermeture dans sessionStorage
  const [visible, setVisible] = useState(
    () => sessionStorage.getItem('appBannerDismissed') !== '1'
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && currentScrollY > lastScrollY) setVisible(false);
      else if (currentScrollY < lastScrollY) setVisible(true);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center gap-5 px-4 py-3 bg-secondary border-b border-white/10 relative">

            {/* accent bar */}
            <div className="w-[3px] h-9 rounded-full bg-white/20 shrink-0" />

            {/* icon */}
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <Smartphone className="w-[18px] h-[18px] text-white" />
            </div>

            {/* copy */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white leading-none tracking-tight truncate">
                {t('appBanner.text')}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {t('appBanner.sub') ?? 'Disponible sur iOS & Android'}
              </p>
            </div>

            {/* buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Bug 1 corrigé : balise <a> manquante */}
              <a
                href="#"
                data-testid="app-store-btn"
                className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-white text-[12px] font-medium transition-all active:scale-95"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <Apple className="w-3.5 h-3.5" /> App Store
              </a>
              {/* Bug 1 corrigé : balise <a> manquante */}
              <a
                href="#"
                data-testid="google-play-btn"
                className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-white text-[12px] font-medium transition-all active:scale-95"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <Play className="w-3.5 h-3.5" /> Google Play
              </a>
            </div>

            {/* close */}
            <button
              onClick={() => {
                setVisible(false);
                // Bug 2 corrigé : persiste la fermeture pour la session
                sessionStorage.setItem('appBannerDismissed', '1');
              }}
              className="w-7 h-7 rounded-[7px] flex items-center justify-center transition-all shrink-0"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              <X className="w-3.5 h-3.5" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};