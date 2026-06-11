import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export const PositioningStrip = () => {
  const { isRTL } = useLanguage();

  const stats = [
    { value: '10k+', label: 'Event runs' },
    { value: '90k+', label: 'Athletes reached' },
    { value: '500+', label: 'Organizer workflows' },
    { value: '$5k+', label: 'Revenue opportunities' },
  ];

  return (
    <section
      data-testid="positioning-strip"
      className="px-7 md:px-12 py-8 bg-white dark:bg-card"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl bg-muted/70 border border-border overflow-hidden">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 * index }}
            className="px-4 py-7 text-center border-border border-b md:border-b-0 md:border-r last:border-r-0"
            data-testid={`positioning-item-${index}`}
          >
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground">
              {item.value}
            </h3>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
