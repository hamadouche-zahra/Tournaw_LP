import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { articles } from '../data/articles';

const EXTRA_CARDS_EN = [
  {
    slug: null,
    tag: "product",
    tagLabel: "Product Update",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1723505614212-1bf22dbf6080?w=1200&h=800&fit=crop",
    title: "New feature: Find teammates & partners",
    desc: "Athletes can now connect, find teammates, and join tournaments even without a full team.",
  },
  {
    slug: null,
    tag: "insights",
    tagLabel: "Insights",
    date: "April 20, 2026",
    image: "https://images.unsplash.com/photo-1586449480523-8db040d36c0f?w=1200&h=800&fit=crop",
    title: "Growing the sports ecosystem",
    desc: "From tournaments to leagues and training sessions, we are building a connected sports community.",
  },
  {
    slug: null,
    tag: "announcement",
    tagLabel: "Announcement",
    date: "Upcoming",
    image: "https://images.unsplash.com/photo-1584463699388-770eedddf672?w=1200&h=800&fit=crop",
    title: "Expanding the platform across the region",
    desc: "We are preparing to scale the platform and bring our ecosystem to more sports organizations.",
  },
];

const EXTRA_CARDS_AR = [
  {
    slug: null,
    tag: "product",
    tagLabel: "تحديث المنتج",
    date: "١٠ أبريل ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1723505614212-1bf22dbf6080?w=1200&h=800&fit=crop",
    title: "ميزة جديدة: ابحث عن زملاء وشركاء",
    desc: "يمكن للرياضيين الآن التواصل وإيجاد زملاء والانضمام للبطولات حتى بدون فريق كامل.",
  },
  {
    slug: null,
    tag: "insights",
    tagLabel: "رؤى",
    date: "٢٠ أبريل ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1586449480523-8db040d36c0f?w=1200&h=800&fit=crop",
    title: "تنمية المنظومة الرياضية",
    desc: "من البطولات إلى الدوريات وجلسات التدريب، نبني مجتمعًا رياضيًا متصلاً.",
  },
  {
    slug: null,
    tag: "announcement",
    tagLabel: "إعلان",
    date: "قادم",
    image: "https://images.unsplash.com/photo-1584463699388-770eedddf672?w=1200&h=800&fit=crop",
    title: "توسيع المنصة عبر المنطقة",
    desc: "نستعد لتوسيع المنصة وإيصال منظومتنا لمزيد من المؤسسات والمجتمعات الرياضية.",
  },
];

export const Insights = () => {
  const { t, language, isRTL } = useLanguage();

  const langArticles = articles[language] || articles.en;
  const extras = language === 'ar' ? EXTRA_CARDS_AR : EXTRA_CARDS_EN;
  const allCards = [...langArticles, ...extras];

  const featured = allCards[0];
  const rest = allCards.slice(1);

  return (
    <section
      id="insights"
      data-testid="insights-section"
      className="py-16 md:py-20 lg:py-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto  mt-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-5"
            style={{
              background: 'hsla(var(--primary), 0.12)',
              color: 'hsl(var(--primary))',
              border: '1px solid hsl(var(--primary) / 0.25)',
            }}
            data-testid="insights-overline"
          >
            {t('insights.overline')}
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-5 leading-[1.1]"
            data-testid="insights-title"
          >
            {t('insights.title')}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('insights.subtitle')}
          </p>
        </motion.div>

        {/* ── FEATURED CARD : grande photo en background avec overlay ────── */}
        {featured && (
          <FeaturedCard card={featured} t={t} index={0} />
        )}

        {/* ── LISTE ALTERNÉE image/texte ─────────────────────────────────── */}
        <div className="flex flex-col gap-6 mt-6" data-testid="insights-grid">
          {rest.map((card, index) => (
            <AlternatingCard key={card.title + index} card={card} t={t} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
          data-testid="insights-cta"
        >
          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">
            {t('insights.ctaTitle')}
          </h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              data-testid="insights-view-all-btn"
              className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: 'hsl(var(--primary))',
                boxShadow: '0 2px 16px hsla(var(--primary), 0.40)',
              }}
            >
              {t('insights.ctaViewAll')}
            </button>
            <button
              data-testid="insights-social-btn"
              className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              {t('insights.ctaSocial')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Carte vedette : photo pleine largeur en background + overlay + texte ── */
const FeaturedCard = ({ card, t, index }) => {
  const CardWrapper = card.slug ? Link : 'div';
  const wrapperProps = card.slug ? { to: `/insights/${card.slug}`, className: "block" } : {};

  return (
    <CardWrapper {...wrapperProps}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden group cursor-pointer min-h-[420px] flex flex-col justify-end"
        data-testid={`insight-card-${index}`}
      >
        {/* Image background */}
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay gradient sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Contenu */}
        <div className="relative z-10 p-6 md:p-10 max-w-2xl">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
            {card.tagLabel}
          </span>
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            {card.title}
          </h3>
          <p className="text-sm md:text-base text-white/75 leading-relaxed mb-5 max-w-xl">
            {card.desc}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-[11px] font-medium">
              <Calendar className="w-3 h-3" />
              {card.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
              {t('insights.readMore')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.article>
    </CardWrapper>
  );
};

/* ── Carte alternée : image d'un côté, texte de l'autre, fond clair/gris alterné ── */
const AlternatingCard = ({ card, t, index }) => {
  const CardWrapper = card.slug ? Link : 'div';
  const wrapperProps = card.slug ? { to: `/insights/${card.slug}`, className: "block" } : {};
  const isEven = index % 2 === 0;
  const bgClass = isEven ? 'bg-card' : 'bg-muted/50';

  return (
    <CardWrapper {...wrapperProps}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 * index }}
        className={`relative rounded-3xl overflow-hidden group cursor-pointer flex flex-col md:flex-row ${bgClass} border border-border hover:border-primary/30 transition-colors duration-300`}
        data-testid={`insight-card-${index + 1}`}
      >
        {/* Image */}
        <div className={`relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Texte */}
        <div className={`flex-1 flex flex-col justify-center p-6 md:p-10 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <span className="self-start mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
            {card.tagLabel}
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {card.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 max-w-md">
            {card.desc}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-muted-foreground text-[11px] font-medium">
              <Calendar className="w-3 h-3" />
              {card.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
              {t('insights.readMore')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.article>
    </CardWrapper>
  );
};