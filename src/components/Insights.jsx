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
    author: "Tournwa Team",
  },
  {
    slug: null,
    tag: "insights",
    tagLabel: "Insights",
    date: "April 20, 2026",
    image: "https://images.unsplash.com/photo-1586449480523-8db040d36c0f?w=1200&h=800&fit=crop",
    title: "Growing the sports ecosystem",
    desc: "From tournaments to leagues and training sessions, we are building a connected sports community.",
    author: "Tournwa Team",
  },
  {
    slug: null,
    tag: "announcement",
    tagLabel: "Announcement",
    date: "Upcoming",
    image: "https://images.unsplash.com/photo-1584463699388-770eedddf672?w=1200&h=800&fit=crop",
    title: "Expanding the platform across the region",
    desc: "We are preparing to scale the platform and bring our ecosystem to more sports organizations.",
    author: "Tournwa Team",
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
    author: "فريق تورنوا",
  },
  {
    slug: null,
    tag: "insights",
    tagLabel: "رؤى",
    date: "٢٠ أبريل ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1586449480523-8db040d36c0f?w=1200&h=800&fit=crop",
    title: "تنمية المنظومة الرياضية",
    desc: "من البطولات إلى الدوريات وجلسات التدريب، نبني مجتمعًا رياضيًا متصلاً.",
    author: "فريق تورنوا",
  },
  {
    slug: null,
    tag: "announcement",
    tagLabel: "إعلان",
    date: "قادم",
    image: "https://images.unsplash.com/photo-1584463699388-770eedddf672?w=1200&h=800&fit=crop",
    title: "توسيع المنصة عبر المنطقة",
    desc: "نستعد لتوسيع المنصة وإيصال منظومتنا لمزيد من المؤسسات والمجتمعات الرياضية.",
    author: "فريق تورنوا",
  },
];

/* ── Featured Card — image plein cadre + overlay sombre + texte blanc, tag en soulignement (pas de pastille colorée) ── */
const FeaturedCard = ({ card, large, isRTL }) => {
  const CardWrapper = card.slug ? Link : 'div';
  const wrapperProps = card.slug ? { to: `/insights/${card.slug}` } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`group relative block w-full overflow-hidden rounded-2xl ${large ? 'h-[280px] lg:h-full' : 'h-[180px] lg:h-full'}`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />

      <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-white border-b-2 border-white/70 pb-1 mb-3">
          {card.tagLabel}
        </span>

        {large && (
          <div className={`flex items-center gap-2 mb-2 text-xs text-white/80 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="font-semibold text-white">By {card.author || 'Tournwa Team'}</span>
            <span className="w-1 h-1 rounded-full bg-white/60 inline-block" />
            <span>{card.date}</span>
          </div>
        )}

        <h3
          className={`font-heading font-bold text-white leading-snug line-clamp-2 ${
            large ? 'text-xl md:text-2xl lg:text-3xl' : 'text-sm md:text-base'
          }`}
        >
          {card.title}
        </h3>
      </div>
    </CardWrapper>
  );
};

/* ── Featured Hero — grande card + 3 petites (1 en haut, 2 en bas côte à côte) ── */
const FeaturedHero = ({ cards, isRTL }) => {
  if (!cards || cards.length < 4) return null;
  const [main, second, third, fourth] = cards;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16 lg:h-[560px]"
    >
      <FeaturedCard card={main} large isRTL={isRTL} />
      <div className="grid grid-rows-2 gap-4 lg:h-full">
        <FeaturedCard card={second} isRTL={isRTL} />
        <div className="grid grid-cols-2 gap-4">
          <FeaturedCard card={third} isRTL={isRTL} />
          <FeaturedCard card={fourth} isRTL={isRTL} />
        </div>
      </div>
    </motion.div>
  );
};

/* ── Article Card — image pleine largeur + tag (texte + soulignement) + auteur + date + titre + desc ── */
const ArticleCard = ({ card, t, index, isRTL }) => {
  const CardWrapper = card.slug ? Link : 'div';
  const wrapperProps = card.slug ? { to: `/insights/${card.slug}` } : {};

  return (
    <CardWrapper {...wrapperProps}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 * index }}
        className="group cursor-pointer mb-10 pb-10 border-b border-border last:border-0 last:pb-0"
      >
        {/* Image pleine largeur */}
        <div className="w-full overflow-hidden rounded-xl mb-5" style={{ aspectRatio: '16/9' }}>
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Tag — texte + soulignement, une seule couleur */}
        <span className="inline-block mb-3 text-[11px] font-bold uppercase tracking-wider text-primary border-b-2 border-primary pb-1">
          {card.tagLabel}
        </span>

        {/* Auteur + date */}
        <div className={`flex items-center gap-2 mb-3 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="font-semibold text-foreground">
            By {card.author || 'Tournwa Team'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {card.date}
          </span>
        </div>

        {/* Titre */}
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {card.desc}
        </p>
      </motion.article>
    </CardWrapper>
  );
};

/* ── Sidebar ── */
const Sidebar = ({ allCards, t }) => (
  <aside className="lg:w-72 shrink-0">
    <div className="sticky top-28 flex flex-col gap-8">

      {/* Search */}
      <div
        className="flex gap-2 p-4 rounded-xl border border-border"
        style={{ background: 'hsl(var(--card))' }}
      >
        <input
          type="text"
          placeholder={t('insights.searchPlaceholder') || 'Enter search keyword'}
          className="flex-1 px-3 py-2 text-sm rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': 'hsl(var(--primary) / 0.3)' }}
        />
        <button
          className="px-3 py-2 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
          style={{ background: 'hsl(var(--primary))' }}
        >
          {t('insights.search') || 'Search'}
        </button>
      </div>

      {/* Recent Posts */}
      <div
        className="p-5 rounded-xl border border-border"
        style={{ background: 'hsl(var(--card))' }}
      >
        <h4 className="font-heading text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">
          {t('insights.recentPosts') || 'Recent Posts'}
        </h4>
        <div className="flex flex-col divide-y divide-border">
          {allCards.slice(0, 6).map((card, i) => (
            <div key={i} className="flex gap-3 py-3 group cursor-pointer first:pt-0 last:pb-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0 group-hover:opacity-80 transition-opacity"
              />
              <div>
                <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {card.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {card.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories — chips neutres, une seule couleur (primary) au survol */}
      <div
        className="p-5 rounded-xl border border-border"
        style={{ background: 'hsl(var(--card))' }}
      >
        <h4 className="font-heading text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">
          {t('insights.categories') || 'Categories'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'technology', label: t('insights.catTechnology') || 'Technology' },
            { key: 'product', label: t('insights.catProduct') || 'Product' },
            { key: 'insights', label: t('insights.catInsights') || 'Insights' },
            { key: 'announcement', label: t('insights.catAnnouncement') || 'Announcement' },
          ].map(({ key, label }) => (
            <span
              key={key}
              className="px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer border border-border text-foreground transition-colors hover:bg-primary hover:text-white hover:border-primary"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

    </div>
  </aside>
);

/* ── Main Export ── */
export const Insights = () => {
  const { t, language, isRTL } = useLanguage();

  const langArticles = (articles[language] || articles.en).map((a) => ({
    ...a,
    author: a.author || 'Tournwa Team',
  }));
  const extras = language === 'ar' ? EXTRA_CARDS_AR : EXTRA_CARDS_EN;
  const allCards = [...langArticles, ...extras];

  return (
    <section
      id="insights"
      data-testid="insights-section"
      className="py-16 md:py-20 lg:py-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Featured hero grid — grande image + 3 cards, overlay sombre, style épuré */}
        <FeaturedHero cards={allCards} isRTL={isRTL} />

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
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

        {/* ── Main layout : articles list + sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Articles list — colonne principale */}
          <div className="flex-1 min-w-0" data-testid="insights-list">
            {allCards.map((card, index) => (
              <ArticleCard
                key={card.title + index}
                card={card}
                t={t}
                index={index}
                isRTL={isRTL}
              />
            ))}
          </div>

          {/* Sidebar */}
          <Sidebar allCards={allCards} t={t} />
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