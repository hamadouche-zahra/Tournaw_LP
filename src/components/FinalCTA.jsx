import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { PopupButton } from 'react-calendly';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

export const FinalCTA = () => {
  const { t, isRTL } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section
        data-testid="final-cta-section"
        className="py-16 md:py-20 lg:py-24 bg-muted"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
              data-testid="final-cta-title"
            >
              {t('finalCta.title')}
            </h2>
            <p
              className="font-sans text-lg lg:text-xl leading-relaxed text-muted-foreground mb-10 max-w-2xl mx-auto"
              data-testid="final-cta-description"
            >
              {t('finalCta.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-testid="final-cta-buttons">
              <Button
                size="lg"
                data-testid="final-book-demo-btn"
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 text-base px-10 py-6 font-semibold"
              >
                {t('nav.bookDemo')}
              </Button>
              <PopupButton
                url="https://calendly.com/tournwa/30min"
                rootElement={document.getElementById('root')}
                text={t('nav.launchPlatform')}
                className="inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-10 h-[52px]"
                data-testid="final-launch-btn"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};