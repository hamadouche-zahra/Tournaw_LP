import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../i18n/LanguageContext';
import { articles } from '../data/articles';

const EXTRA_CARDS_EN = [
  {
    slug: null,
    tag: "product",
    tagLabel: "Product Update",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1723505614212-1bf22dbf6080?w=600&h=400&fit=crop",
    title: "New feature: Find teammates & partners",
    desc: "Athletes can now connect, find teammates, and join tournaments even without a full team.",
  },
  {
    slug: null,
    tag: "insights",
    tagLabel: "Insights",
    date: "April 20, 2026",
    image: "https://images.unsplash.com/photo-1586449480523-8db040d36c0f?w=600&h=400&fit=crop",
    title: "Growing the sports ecosystem",
    desc: "From tournaments to leagues and training sessions, we are building a connected sports community.",
  },
  {
    slug: null,
    tag: "announcement",
    tagLabel: "Announcement",
    date: "Upcoming",
    image: "https://images.unsplash.com/photo-1584463699388-770eedddf672?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1723505614212-1bf22dbf6080?w=600&h=400&fit=crop",
    title: "ميزة جديدة: ابحث عن زملاء وشركاء",
    desc: "يمكن للرياضيين الآن التواصل وإيجاد زملاء والانضمام للبطولات حتى بدون فريق كامل.",
  },
  {
    slug: null,
    tag: "insights",
    tagLabel: "رؤى",
    date: "٢٠ أبريل ٢٠٢٦",
    image: "https://images.unsplash.com/photo-1586449480523-8db040d36c0f?w=600&h=400&fit=crop",
    title: "تنمية المنظومة الرياضية",
    desc: "من البطولات إلى الدوريات وجلسات التدريب، نبني مجتمعًا رياضيًا متصلاً.",
  },
  {
    slug: null,
    tag: "announcement",
    tagLabel: "إعلان",
    date: "قادم",
    image: "https://images.unsplash.com/photo-1584463699388-770eedddf672?w=600&h=400&fit=crop",
    title: "توسيع المنصة عبر المنطقة",
    desc: "نستعد لتوسيع المنصة وإيصال منظومتنا لمزيد من المؤسسات والمجتمعات الرياضية.",
  },
];

export const Insights = () => {
  const { t, language, isRTL } = useLanguage();
  const [activeTag, setActiveTag] = useState('all');

  const langArticles = articles[language] || articles.en;
  const extras = language === 'ar' ? EXTRA_CARDS_AR : EXTRA_CARDS_EN;
  const allCards = [...langArticles, ...extras];

  const tags = [
    { key: 'all', label: isRTL ? 'الكل' : 'All' },
    { key: 'announcement', label: t('insights.tagAnnouncement') },
    { key: 'product', label: t('insights.tagProductUpdate') },
    { key: 'community', label: t('insights.tagCommunity') },
    { key: 'insights', label: t('insights.tagInsights') },
    { key: 'events', label: t('insights.tagEvents') },
  ];

  const filtered = activeTag === 'all' ? allCards : allCards.filter(c => c.tag === activeTag);

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
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] font-bold text-primary mb-4" data-testid="insights-overline">
            {t('insights.overline')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4" data-testid="insights-title">
            {t('insights.title')}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t('insights.subtitle')}
          </p>
        </motion.div>

        {/* Filter Tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12" data-testid="insights-filters">
          {tags.map(tag => (
            <button
              key={tag.key}
              onClick={() => setActiveTag(tag.key)}
              data-testid={`insights-filter-${tag.key}`}
              className={`px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeTag === tag.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" data-testid="insights-grid">
          {filtered.map((card, index) => {
            const CardWrapper = card.slug ? Link : 'div';
            const wrapperProps = card.slug
              ? { to: `/insights/${card.slug}`, className: "block" }
              : {};

            return (
              <CardWrapper key={card.title + index} {...wrapperProps}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                  className="bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 group flex flex-col h-full cursor-pointer"
                  data-testid={`insight-card-${index}`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                      {card.tagLabel}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium mb-2">
                      <Calendar className="w-3 h-3" />
                      {card.date}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
                      {card.desc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                        {t('insights.readMore')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </CardWrapper>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
          data-testid="insights-cta"
        >
          <h3 className="font-heading text-xl font-bold text-foreground mb-6">
            {t('insights.ctaTitle')}
          </h3>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button data-testid="insights-view-all-btn">
              {t('insights.ctaViewAll')}
            </Button>
            <Button variant="outline" data-testid="insights-social-btn">
              {t('insights.ctaSocial')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
