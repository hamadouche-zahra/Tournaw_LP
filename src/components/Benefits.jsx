import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Benefits = () => {
  const { t, isRTL } = useLanguage();

  const benefits = [
    t('benefits.benefit1'),
    t('benefits.benefit2'),
    t('benefits.benefit3'),
    t('benefits.benefit4'),
    t('benefits.benefit5'),
    t('benefits.benefit6'),
    t('benefits.benefit7')
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section
      data-testid="benefits-section"
      className="py-16 md:py-20 lg:py-24 bg-muted"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left - Text */}
          <div>
            <span
              className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-5"
              data-testid="benefits-overline"
            >
              {t('benefits.overline')}
            </span>
            <h2
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
              data-testid="benefits-title"
            >
              {t('benefits.title')}
            </h2>
            <p
              className="font-sans text-base lg:text-lg leading-relaxed text-muted-foreground"
              data-testid="benefits-description"
            >
              {t('benefits.description')}
            </p>
          </div>

          {/* Right - Benefits List */}
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="benefits-list"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-sm transition-all duration-300 group"
                data-testid={`benefit-${index}`}
              >
                <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Check className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <span className="font-sans text-foreground font-medium text-sm sm:text-base">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};