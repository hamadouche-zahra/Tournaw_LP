import { motion } from 'framer-motion';
import { Settings, MessageCircleX, Eye, Timer, CircleDollarSign, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ProblemSection = () => {
  const { t, isRTL } = useLanguage();

  const painPoints = [
    {
      icon: Settings,
      title: t('problem.pain1Title'),
      tag: t('problem.pain1Tag'),
      description: t('problem.pain1Desc'),
    },
    {
      icon: MessageCircleX,
      title: t('problem.pain2Title'),
      tag: t('problem.pain2Tag'),
      description: t('problem.pain2Desc'),
    },
    {
      icon: Eye,
      title: t('problem.pain3Title'),
      tag: t('problem.pain3Tag'),
      description: t('problem.pain3Desc'),
      large: true,
    },
    {
      icon: Timer,
      title: t('problem.pain4Title'),
      tag: t('problem.pain4Tag'),
      description: t('problem.pain4Desc'),
    },
    {
      icon: CircleDollarSign,
      title: t('problem.pain5Title'),
      tag: t('problem.pain5Tag'),
      description: t('problem.pain5Desc'),
    }
  ];

  return (
    <section
      data-testid="problem-section"
      className="py-16 md:py-20 lg:py-24 bg-muted/70 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-destructive bg-destructive/10 px-4 py-1.5 rounded-full mb-5"
            data-testid="problem-overline"
          >
            {t('problem.overline')}
          </span>
          <h2
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
            data-testid="problem-title"
          >
            {t('problem.title')}
          </h2>
          <p
            className="font-sans text-base lg:text-lg leading-relaxed text-muted-foreground"
            data-testid="problem-description"
          >
            {t('problem.description')}
          </p>
        </motion.div>

        {/* Pain Points */}
        <div className="max-w-5xl mx-auto mb-12" data-testid="pain-points-grid">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {painPoints.slice(0, 2).map((point, index) => (
              <PainCard key={index} point={point} index={index} />
            ))}
          </div>
          {/* Row 2 — wide */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            {painPoints.slice(2, 3).map((point, index) => (
              <PainCard key={index + 2} point={point} index={index + 2} />
            ))}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painPoints.slice(3, 5).map((point, index) => (
              <PainCard key={index + 3} point={point} index={index + 3} />
            ))}
          </div>
        </div>

        {/* Transition Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
          data-testid="problem-transition"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary/5 border border-primary/15 rounded-full">
            <p className="font-heading text-base md:text-lg font-semibold text-primary">
              {t('problem.transition')}
            </p>
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const PainCard = ({ point, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.08 * index }}
    className="relative p-7 bg-card border border-border rounded-2xl hover:border-destructive/30 hover:-translate-y-1 hover:shadow-sm transition-all duration-300 group"
    data-testid={`pain-point-${index}`}
  >
    {/* Top accent line on hover */}
    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-destructive/0 group-hover:bg-destructive/40 transition-all duration-300" />

    <div className="flex items-start gap-5">
      <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center group-hover:bg-destructive/15 transition-colors duration-300">
        <point.icon className="w-6 h-6 text-destructive" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {point.title}
          </h3>
          <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 bg-destructive/10 text-destructive rounded-full">
            {point.tag}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {point.description}
        </p>
      </div>
    </div>
  </motion.div>
);