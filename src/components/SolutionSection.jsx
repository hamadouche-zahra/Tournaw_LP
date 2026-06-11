import { motion } from 'framer-motion';
import { Zap, Smartphone, Users, DollarSign, Rocket, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const SolutionSection = () => {
  const { t, isRTL } = useLanguage();

  const pillars = [
    {
      icon: Zap,
      title: t('solution.pillar1Title'),
      tag: t('solution.pillar1Tag'),
      desc: t('solution.pillar1Desc'),
      features: [t('solution.pillar1F1'), t('solution.pillar1F2'), t('solution.pillar1F3')],
      bottom: t('solution.pillar1Bottom'),
    },
    {
      icon: Smartphone,
      title: t('solution.pillar2Title'),
      tag: t('solution.pillar2Tag'),
      desc: t('solution.pillar2Desc'),
      features: [t('solution.pillar2F1'), t('solution.pillar2F2'), t('solution.pillar2F3'), t('solution.pillar2F4')],
      bottom: t('solution.pillar2Bottom'),
    },
    {
      icon: Users,
      title: t('solution.pillar3Title'),
      tag: t('solution.pillar3Tag'),
      desc: t('solution.pillar3Desc'),
      features: [t('solution.pillar3F1'), t('solution.pillar3F2'), t('solution.pillar3F3'), t('solution.pillar3F4')],
      bottom: t('solution.pillar3Bottom'),
    },
    {
      icon: DollarSign,
      title: t('solution.pillar4Title'),
      tag: t('solution.pillar4Tag'),
      desc: t('solution.pillar4Desc'),
      features: [t('solution.pillar4F1'), t('solution.pillar4F2'), t('solution.pillar4F3'), t('solution.pillar4F4')],
      bottom: t('solution.pillar4Bottom'),
    },
  ];

  const visionPoints = [t('solution.visionF1'), t('solution.visionF2'), t('solution.visionF3')];

  return (
    <section
      data-testid="solution-section"
      className="py-16 md:py-20 lg:py-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-5"
            data-testid="solution-overline"
          >
            {t('solution.overline')}
          </span>
          <h2
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
            data-testid="solution-title"
          >
            {t('solution.title')}
          </h2>
          <p
            className="font-sans text-base lg:text-lg leading-relaxed text-muted-foreground"
            data-testid="solution-description"
          >
            {t('solution.description')}
          </p>
        </motion.div>

        {/* Punch line */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="inline-block font-heading text-lg md:text-xl font-bold text-primary border-b-2 border-primary/30 pb-1">
            {t('solution.punch')}
          </p>
        </motion.div>

        {/* 4 Pillar Cards — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto mb-16" data-testid="value-pillars-grid">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="p-7 md:p-8 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-sm transition-all duration-300 group"
              data-testid={`value-pillar-${index}`}
            >
              {/* Icon + Title + Tag */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {pillar.title}
                    </h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 bg-primary/10 text-primary rounded-full">
                      {pillar.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-2 mb-5 ms-16">
                {pillar.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom punch */}
              <p className="text-sm font-semibold text-primary ms-16">
                {pillar.bottom}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Platform Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
          data-testid="solution-vision"
        >
          <div className="p-8 md:p-10 bg-primary/5 border border-primary/15 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {t('solution.visionTitle')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </span>
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Transition Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
          data-testid="solution-transition"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary/5 border border-primary/15 rounded-full">
            <p className="font-heading text-base md:text-lg font-semibold text-primary">
              {t('solution.transition')}
            </p>
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};