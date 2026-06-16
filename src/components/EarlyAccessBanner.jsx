import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

export const EarlyAccessBanner = () => {
  const { t, isRTL } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="py-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="rounded-3xl overflow-hidden"
            style={{
              border: '1px solid hsla(var(--primary), 0.20)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            }}
            data-testid="pricing-early-access"
          >
            <div className="relative min-h-[260px]">
              <img
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80"
                alt="Sport"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: isRTL
                    ? 'linear-gradient(to left, hsla(var(--primary), 0.80) 0%, hsla(var(--primary), 0.45) 50%, hsla(var(--primary), 0.15) 100%)'
                    : 'linear-gradient(to right, hsla(var(--primary), 0.80) 0%, hsla(var(--primary), 0.45) 50%, hsla(var(--primary), 0.15) 100%)',
                }}
              />
              <div
                className="relative z-10 flex flex-col justify-center px-8 md:px-14 py-12 max-w-xl"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                  🎁 {t('pricing.earlyAccessBadge')}{' '}
                  <span className="font-normal">{t('pricing.earlyAccessTitle')}</span>
                </h3>
                <p className="text-white/75 text-sm leading-relaxed max-w-sm mb-7">
                  {t('pricing.earlyAccessDesc')}
                </p>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsContactOpen(true)}
                    data-testid="early-access-cta"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white transition-all"
                    style={{
                      background: 'hsl(var(--primary))',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.20)',
                    }}
                  >
                    {t('pricing.earlyAccessCta')}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};