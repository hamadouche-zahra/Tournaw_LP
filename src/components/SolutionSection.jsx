import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Smartphone, Users, DollarSign, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const SolutionSection = () => {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const pillars = [
    { icon: Zap, title: t('solution.pillar1Title'), desc: t('solution.pillar1Desc') },
    { icon: Smartphone, title: t('solution.pillar2Title'), desc: t('solution.pillar2Desc') },
    { icon: Users, title: t('solution.pillar3Title'), desc: t('solution.pillar3Desc') },
    { icon: DollarSign, title: t('solution.pillar4Title'), desc: t('solution.pillar4Desc') },
  ];

  return (
    <section
      data-testid="solution-section"
      className="py-16 md:py-24 lg:py-32 bg-[#f0f4f8]  dark:bg-[#0b0f1a] "
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
               className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          >

            <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-5"
            style={{
              background: 'hsla(var(--primary), 0.15)',
              color: 'hsl(var(--primary))',
              border: '1px solid hsl(var(--primary) / 0.30)',
            }}
          >
            {t('solution.overline')}
          </span>
            <h2
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
              data-testid="solution-title"
            >
              {t('solution.title')}
            </h2>
          </motion.div>

          
        </div>

        {/* Accordion + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Accordion list */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
            data-testid="value-pillars-list"
          >
            {/* Vertical progress line */}
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

            {pillars.map((pillar, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="relative" data-testid={`value-pillar-${index}`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center gap-5 text-left py-5 group"
                  >
                    {/* Number / icon dot */}
                    <span
                      className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-heading text-sm font-bold border transition-all duration-300 ${
                        isOpen
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-muted-foreground border-border group-hover:border-primary/40 group-hover:text-primary'
                      }`}
                    >
                      <pillar.icon className="w-4.5 h-4.5" />
                    </span>

                    <span
                      className={`flex-1 font-heading text-lg md:text-xl font-bold transition-colors duration-300 ${
                        isOpen ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {pillar.title}
                    </span>

                    <ArrowRight
                      className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                        isOpen ? 'text-primary rotate-90' : 'text-muted-foreground/40 -rotate-90 group-hover:rotate-0'
                      } ${isRTL ? (isOpen ? '-rotate-90' : 'rotate-90') : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-16 pb-6 pr-2">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[560px] bg-muted lg:sticky lg:top-24"
            data-testid="solution-image"
          >
            <img
              src="https://cdn.prod.website-files.com/686605979a7e0554762504b6/68660c54dcfc9a7c9760d22c_e51395c74e39fbfe7a02b4b41ff87345_pexels-viktoria-slowikowska-5332244%25201%2520%25281%2529%2520%25282%2529-p-800.webp"
              alt={t('solution.title')}
              className="w-full h-full object-cover"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-5 left-5 right-5 p-4 bg-background/90 backdrop-blur-sm rounded-xl border border-border"
              >
                <p className="font-heading text-sm font-bold text-foreground">
                  {pillars[openIndex >= 0 ? openIndex : 0].title}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};