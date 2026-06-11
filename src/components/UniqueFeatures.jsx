import { motion } from 'framer-motion';
import { Network, Zap, TrendingUp, Building } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const UniqueFeatures = () => {
  const { t, isRTL } = useLanguage();

  const blocks = [
    {
      icon: Network,
      title: t('unique.feature1Title'),
      desc: t('unique.feature1Desc'),
      features: [t('unique.feature1F1'), t('unique.feature1F2'), t('unique.feature1F3')],
      bottom: t('unique.feature1Bottom'),
    },
    {
      icon: Zap,
      title: t('unique.feature2Title'),
      desc: t('unique.feature2Desc'),
      features: [t('unique.feature2F1'), t('unique.feature2F2'), t('unique.feature2F3')],
      bottom: t('unique.feature2Bottom'),
    },
    {
      icon: TrendingUp,
      title: t('unique.feature3Title'),
      desc: t('unique.feature3Desc'),
      features: [t('unique.feature3F1'), t('unique.feature3F2'), t('unique.feature3F3'), t('unique.feature3F4')],
      bottom: t('unique.feature3Bottom'),
    },
    {
      icon: Building,
      title: t('unique.feature4Title'),
      desc: t('unique.feature4Desc'),
      features: [t('unique.feature4F1'), t('unique.feature4F2'), t('unique.feature4F3')],
      bottom: t('unique.feature4Bottom'),
    },
  ];

  return (
    <section
      data-testid="unique-features-section"
      className="py-16 md:py-24 bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── GAUCHE ───────────────────────────────────────── */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                {t('unique.overline')}
          </span>

         

            <h2
              className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5"
              data-testid="unique-title"
            >
              {t('unique.title')}
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-sm">
              {t('unique.highlight')}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: 'hsl(var(--primary))',
                  boxShadow: '0 4px 16px hsla(var(--primary), 0.35)',
                }}
              >
                {t('nav.bookDemo')}
              </button>
              <button
                className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-80 active:scale-95"
                style={{
                  border: '2px solid hsl(var(--foreground))',
                  color: 'hsl(var(--foreground))',
                  background: 'transparent',
                }}
              >
                {t('nav.features')}
              </button>
            </div>
          </motion.div>

          {/* ── DROITE — grille 2x2 cards améliorées ─────────── */}
          <div className="grid grid-cols-2 gap-4" data-testid="unique-features-grid">
            {blocks.map((block, index) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                  className="group flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-default"
                  style={{
                    background: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.4)';
                    e.currentTarget.style.boxShadow = '0 8px 32px hsla(var(--primary), 0.10)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'hsl(var(--border))';
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  data-testid={`unique-feature-${index}`}
                >
                  {/* Icône */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      background: 'hsla(var(--primary), 0.10)',
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-all duration-300"
                      strokeWidth={1.5}
                      style={{ color: 'hsl(var(--primary))' }}
                    />
                  </div>

                  {/* Titre */}
                  <h3 className="font-heading text-base font-bold text-foreground mb-1.5 leading-snug">
                    {block.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {block.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 flex-grow mb-4">
                    {block.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <span
                          className="flex-shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full"
                          style={{ background: 'hsl(var(--primary))' }}
                        />
                        <span className="text-xs text-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom */}
                  <div
                    className="pt-4 border-t mt-auto"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: 'hsl(var(--primary))' }}
                    >
                      {block.bottom}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};