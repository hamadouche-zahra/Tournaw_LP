import { motion } from 'framer-motion';
import { CalendarPlus, UserPlus, Settings2, Play, Trophy, LucideIcon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type Step = {
  icon: LucideIcon;
  number: string;
  title: string;
  desc: string;
  highlight?: boolean;
  image: string;
};

export const HowItWorks = () => {
  const { t, isRTL } = useLanguage();

  const steps: Step[] = [
    {
      icon: CalendarPlus,
      number: '01',
      title: t('howItWorks.step1Title'),
      desc: t('howItWorks.step1Desc'),
      image: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=700&q=80',
    },
    {
      icon: UserPlus,
      number: '02',
      title: t('howItWorks.step2Title'),
      desc: t('howItWorks.step2Desc'),
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&q=80',
    },
    {
      icon: Settings2,
      number: '03',
      title: t('howItWorks.step3Title'),
      desc: t('howItWorks.step3Desc'),
      highlight: true,
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=700&q=80',
    },
    {
      icon: Play,
      number: '04',
      title: t('howItWorks.step4Title'),
      desc: t('howItWorks.step4Desc'),
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=700&q=80',
    },
    {
      icon: Trophy,
      number: '05',
      title: t('howItWorks.step5Title'),
      desc: t('howItWorks.step5Desc'),
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=700&q=80',
    },
  ];

  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="py-20 md:py-32 bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        {/* ── Header ─────────────────────────────────────────────── */}
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
            {t('howItWorks.overline')}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5">
            {t('howItWorks.title')}
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            {t('howItWorks.description')}
          </p>
        </motion.div>

        {/* ── 2 colonnes : steps gauche / images droite ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* COLONNE GAUCHE — steps avec timeline */}
          <div className="relative">
            {/* ligne verticale timeline */}
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px"
              style={{ background: 'hsl(var(--border))' }}
            />

            <div className="flex flex-col gap-0">
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 * i }}
                    className="relative flex gap-6 pb-12 last:pb-0"
                  >
                    {/* Dot timeline */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-1">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex-shrink-0 z-10"
                        style={{
                          background: 'hsl(var(--primary))',
                          borderColor: 'hsl(var(--primary))',
                          boxShadow: '0 0 0 4px hsla(var(--primary), 0.15)',
                        }}
                      />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 pt-0">
                      {/* Badge STEP N */}
                      <div className="mb-3">
                        <span
                          className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{
                            background: 'hsl(var(--primary))',
                            color: 'white',
                          }}
                        >
                          STEP {step.number}
                        </span>
                      </div>

                      {/* Titre */}
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
                        {step.title}
                      </h3>

                      {/* Desc */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {step.desc}
                      </p>

                      {/* Learn more */}
                      <button
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{ color: 'hsl(var(--primary))' }}
                      >
                        {t('howItWorks.learnMore') ?? 'Learn more'}
                        <span className="text-base">↗</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* COLONNE DROITE — images empilées */}
          <div className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-32">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 * i }}
                className="overflow-hidden rounded-2xl"
                style={{
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover object-center"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};