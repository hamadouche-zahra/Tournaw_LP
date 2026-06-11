import { motion } from 'framer-motion';
import { Gift, Zap, MessageSquare, Tag, ShieldCheck, Award } from 'lucide-react';
import { PopupButton } from 'react-calendly';
import { useLanguage } from '../i18n/LanguageContext';

export const FoundingOffer = () => {
  const { t, isRTL } = useLanguage();

  const benefits = [
    { icon: Gift,          title: t('founding.benefit1Title'), desc: t('founding.benefit1Desc') },
    { icon: Zap,           title: t('founding.benefit2Title'), desc: t('founding.benefit2Desc') },
    { icon: MessageSquare, title: t('founding.benefit3Title'), desc: t('founding.benefit3Desc') },
    { icon: Tag,           title: t('founding.benefit4Title'), desc: t('founding.benefit4Desc') },
    { icon: ShieldCheck,   title: t('founding.benefit5Title'), desc: t('founding.benefit5Desc') },
    { icon: Award,         title: t('founding.benefit6Title'), desc: t('founding.benefit6Desc') },
  ];

  return (
    <section
      id="founding-offer"
      data-testid="founding-offer-section"
      className="py-16 md:py-24 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ background: 'hsl(var(--primary))' }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* ── GRID principal — gauche contenu / droite image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── GAUCHE ─────────────────────────────────────── */}
          <div>
            {/* Overline style image */}
            <p className="text-sm text-white/40 font-medium mb-4">
              ({t('founding.overline')} — 07)
            </p>

            {/* Titre grand blanc */}
            <h2
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6"
              data-testid="founding-title"
            >
              {t('founding.title')}
            </h2>

            {/* Description */}
            <p
              className="text-sm text-white/55 leading-relaxed mb-10 max-w-md"
              data-testid="founding-description"
            >
              {t('founding.description')}
            </p>

            {/* ── Cards benefits 2 colonnes ─────────────────── */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
              data-testid="founding-benefits"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.07 * index }}
                  className="relative flex flex-col p-5 rounded-2xl transition-all duration-300 group cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                  data-testid={`founding-benefit-${index}`}
                >
                  {/* Numéro top right */}
                  <span className="absolute top-4 right-4 text-xs text-white/20 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icône outline sombre */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    <benefit.icon className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                  </div>

                  {/* Titre */}
                  <h4 className="font-heading font-bold text-white text-sm mb-2 leading-snug pr-6">
                    {benefit.title}
                  </h4>

                  {/* Desc */}
                  <p className="text-xs text-white/45 leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          
          </div>

          {/* ── DROITE — image sport ────────────────────────── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
        
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '900px' }}>
              <img
                src="https://cdn.prod.website-files.com/671fa4f2bfc831b2045557f4/67200eb9ab966aac3d2690d1_tennis-fundamentals-page-sporty-x-webflow-template.png"
                alt="Sport"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay gradient bas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};