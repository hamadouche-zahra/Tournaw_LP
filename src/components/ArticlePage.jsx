import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Share2, Link2, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { articles } from '../data/articles';

/* ── Petite carte "à suivre" — image + tag + titre, pour remplacer les liens texte prev/next ── */
const UpNextCard = ({ post, label, isRTL }) => (
  <Link
    to={`/insights/${post.slug}`}
    className={`group relative block w-full overflow-hidden rounded-2xl h-[220px] ${isRTL ? 'text-right' : 'text-left'}`}
  >
    <img
      src={post.image}
      alt={post.title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2">
        {label}
      </span>
      <h4 className="font-heading text-base md:text-lg font-bold text-white leading-snug line-clamp-2">
        {post.title}
      </h4>
    </div>
  </Link>
);

export default function ArticlePage() {
  const { slug } = useParams();
  const { language, isRTL, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [copied, setCopied] = useState(false);

  const langArticles = articles[language] || articles.en;
  const currentIndex = langArticles.findIndex(a => a.slug === slug);
  const article = langArticles[currentIndex];
  const prevArticle = langArticles[currentIndex - 1] || null;
  const nextArticle = langArticles[currentIndex + 1] || null;

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/" className="text-primary font-semibold hover:underline">
            {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  // Table des matières générée à partir des blocs h2 du contenu
  const tocItems = article.content
    .map((block, index) => ({ ...block, index }))
    .filter(b => b.type === 'h2');

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: article.title, url: window.location.href }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Barre de progression de lecture ── */}
      <motion.div
        className="fixed top-0 inset-x-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress, transformOrigin: isRTL ? 'right' : 'left' }}
      />

      {/* ── Hero "cover" : image pleine largeur avec titre superposé ── */}
      <div className="relative w-full h-[58vh] md:h-[68vh] min-h-[440px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/90" />

        {/* Back link */}
        <Link
          to="/#insights"
          className="absolute top-6 inset-x-6 md:inset-x-14 lg:inset-x-20 inline-flex items-center gap-2 text-white/85 hover:text-white text-xs font-medium transition-colors"
          data-testid="article-back-link"
        >
          <BackArrow className="w-3.5 h-3.5" />
          {isRTL ? 'العودة إلى الرؤى' : 'Back to Insights'}
        </Link>

        {/* Tag + titre + meta, ancrés en bas de l'image */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-14 lg:px-20 pb-8 md:pb-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm text-white bg-primary mb-4">
            {article.tagLabel}
          </span>

          <h1
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white max-w-3xl mb-5"
            data-testid="article-title"
          >
            {article.title}
          </h1>

          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/30">
              <img
                src={`https://i.pravatar.cc/72?u=${article.author}`}
                alt={article.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-white text-sm">
              {isRTL ? article.author : `By ${article.author || 'Tournwa Team'}`}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/50 inline-block" />
            <span className="flex items-center gap-1 text-sm text-white/75">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
          </div>
        </div>
      </div>

      {/* ── Corps : contenu principal + colonne latérale ── */}
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Contenu principal */}
          <article className="flex-1 min-w-0 max-w-2xl" data-testid="article-content">

            {/* Chapô / subtitle, en intro éditoriale */}
            <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed mb-8">
              {article.subtitle}
            </p>

            {article.content.map((block, index) => {
              switch (block.type) {

                case 'h2':
                  return (
                    <motion.h2
                      key={index}
                      id={`block-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="font-heading text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 leading-snug scroll-mt-6"
                    >
                      {block.text}
                    </motion.h2>
                  );

                case 'p':
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-sm md:text-base text-muted-foreground leading-loose mb-4"
                    >
                      {block.text}
                    </motion.p>
                  );

                case 'image':
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="w-full overflow-hidden rounded-lg my-7"
                      style={{ aspectRatio: '16/9' }}
                    >
                      <img
                        src={block.src}
                        alt={block.alt || ''}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  );

                case 'list':
                  return (
                    <motion.ul
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="space-y-2 mb-6"
                    >
                      {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  );

                case 'highlight':
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="my-8 py-4 px-5"
                      style={{
                        borderLeft: '3px solid hsl(var(--primary))',
                        background: 'color-mix(in srgb, hsl(var(--primary)) 10%, transparent)',
                      }}
                    >
                      <p className="text-sm md:text-base font-semibold italic text-primary">
                        {block.text}
                      </p>
                    </motion.div>
                  );

                case 'closing':
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-10 pt-8 border-t border-border"
                    >
                      <p className="font-heading text-lg md:text-xl font-bold text-foreground italic leading-snug">
                        {block.text}
                      </p>
                    </motion.div>
                  );

                default:
                  return null;
              }
            })}
          </article>

          {/* Colonne latérale : sommaire + partage, collante au scroll */}
          <aside className="lg:w-64 shrink-0 w-full">
            <div className="sticky top-24 flex flex-col gap-6">

              {tocItems.length > 0 && (
                <div className="p-5 rounded-xl border border-border" style={{ background: 'hsl(var(--card))' }}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    {isRTL ? 'في هذه الصفحة' : 'On this page'}
                  </h4>
                  <nav className="flex flex-col gap-3">
                    {tocItems.map((item) => (
                      <a
                        key={item.index}
                        href={`#block-${item.index}`}
                        className="text-sm text-foreground/80 hover:text-primary transition-colors leading-snug"
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <div className="p-5 rounded-xl border border-border" style={{ background: 'hsl(var(--card))' }}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {isRTL ? 'مشاركة' : 'Share'}
                </h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:opacity-90 transition-opacity"
                  >
                    <Share2 className="w-4 h-4" />
                    {isRTL ? 'مشاركة' : 'Share'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                    className="w-10 h-10 shrink-0 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </aside>

        </div>

        {/* ── À suivre : cartes visuelles au lieu de simples liens ── */}
        {(prevArticle || nextArticle) && (
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-6">
              {isRTL ? 'تابع أيضًا' : 'Up next'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevArticle && (
                <UpNextCard post={prevArticle} label={t('insights.prevPost') || 'Previous Post'} isRTL={isRTL} />
              )}
              {nextArticle && (
                <UpNextCard post={nextArticle} label={t('insights.nextPost') || 'Next Post'} isRTL={isRTL} />
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}