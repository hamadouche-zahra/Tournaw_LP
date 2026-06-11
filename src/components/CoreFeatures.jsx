import { motion } from 'framer-motion';
import { Trophy, UserPlus, Handshake, Smartphone, DollarSign, BarChart3 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=80',
  'https://cdn.prod.website-files.com/697a1e516a2cad35229fd697/697b241e281835db2a6efee5_Program.1.png?w=500&q=80',
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500&q=80',
  'https://cdn.prod.website-files.com/690b465c05eec948b21978ee/69b06de7f95e3f4b347daa45_about.jpg?w=500&q=80',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80',
  'https://cdn.prod.website-files.com/69102ffe1bf5c5b6f957cf1f/69157d57c361162c62518b71_b0bb9e9e1f1eb7ce04b55c4716dd68da_full-shot-children-sitting-field%20%281%29%201.webp?w=500&q=80',
];

export const CoreFeatures = () => {
  const { t, isRTL } = useLanguage();

  const categories = [
    { icon: Trophy,      title: t('features.cat1Title'), desc: t('features.cat1Desc') },
    { icon: UserPlus,    title: t('features.cat2Title'), desc: t('features.cat2Desc') },
    { icon: Handshake,   title: t('features.cat3Title'), desc: t('features.cat3Desc'), tag: t('features.cat3Tag') },
    { icon: Smartphone,  title: t('features.cat4Title'), desc: t('features.cat4Desc'), highlight: true },
    { icon: DollarSign,  title: t('features.cat5Title'), desc: t('features.cat5Desc') },
    { icon: BarChart3,   title: t('features.cat6Title'), desc: t('features.cat6Desc') },
  ];

  return (
    <section
      id="features"
      data-testid="core-features-section"
      className="relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ minHeight: '90vh' }}
    >
      {/* ── VIDEO BG ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://cdn.prod.website-files.com/69c50fae5042bca93cbc3540%2F69ed8e2baabd0693926ed41a_People_training_in_gym_outdoor_delpmaspu__poster.0000000.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="https://cdn.prod.website-files.com/69c50fae5042bca93cbc3540%2F69ed8e2baabd0693926ed41a_People_training_in_gym_outdoor_delpmaspu__mp4.mp4" type="video/mp4" />
          <source src="https://cdn.prod.website-files.com/69c50fae5042bca93cbc3540%2F69ed8e2baabd0693926ed41a_People_training_in_gym_outdoor_delpmaspu__webm.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/85" />
      </div>

      {/* ── CONTENU ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center px-6 md:px-12 pt-20 pb-0">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full mb-7"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.20)',
          }}
        >
          <span className="text-white text-xs font-semibold uppercase tracking-widest">
            {t('features.overline')}
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h2
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center leading-tight mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t('features.title')}
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          className="text-white/65 text-base text-center max-w-xl leading-relaxed mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t('features.highlight')}
        </motion.p>

        {/* ── Cards ──────────────────────────────────────── */}
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isCenter = i === 1 || i === 2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * i,
                  type: 'spring',
                  stiffness: 80,
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                data-testid={`feature-category-${i}`}
                className="relative overflow-hidden rounded-2xl group cursor-default"
                style={{ height: isCenter ? '340px' : '270px' }}
              >
                {/* Image */}
                <img
                  src={CARD_IMAGES[i]}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

                {/* Glow primary au hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{
                    boxShadow: `inset 0 0 0 1.5px hsl(var(--primary) / 0.6)`,
                  }}
                />

                {/* Icône ronde */}
                <motion.div
                  className="absolute top-4 left-1/2 -translate-x-1/2"
                  whileHover={{ scale: 1.15 }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: 'hsl(var(--primary))' }}
                      strokeWidth={1.8}
                    />
                  </div>
                </motion.div>

                {/* Tag */}
                {cat.tag && (
                  <div className="absolute top-[68px] left-0 right-0 flex justify-center">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: 'hsl(var(--primary))', color: 'white' }}
                    >
                      {cat.tag}
                    </span>
                  </div>
                )}

                {/* Titre + desc */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={false}
                >
                  <h3 className="font-heading text-sm font-bold text-white mb-1 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed transition-all duration-300 group-hover:text-white/80">
                    {cat.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};