import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { articles } from '../data/articles';

export default function ArticlePage() {
  const { slug } = useParams();
  const { language, isRTL, t } = useLanguage();

  const langArticles = articles[language] || articles.en;
  const article = langArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Link to="/" className="text-primary font-semibold hover:underline">
            {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-4xl">
            <Link
              to="/#insights"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
              data-testid="article-back-link"
            >
              <BackArrow className="w-4 h-4" />
              {isRTL ? 'العودة إلى الرؤى' : 'Back to Insights'}
            </Link>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                {article.tagLabel}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3" data-testid="article-title">
              {article.title}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              {article.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto max-w-3xl px-6 md:px-12 py-12 md:py-16" data-testid="article-content">
        {article.content.map((block, index) => {
          switch (block.type) {
            case 'h2':
              return (
                <motion.h2
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4"
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
                  className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4"
                >
                  {block.text}
                </motion.p>
              );
            case 'list':
              return (
                <motion.ul
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-2 mb-6 ms-1"
                >
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-foreground">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2.5" />
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
                  className="my-8 py-5 px-6 border-s-4 border-primary bg-primary/5"
                >
                  <p className="text-lg font-semibold text-primary">{block.text}</p>
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
                  <p className="text-lg md:text-xl font-heading font-bold text-foreground italic">
                    {block.text}
                  </p>
                </motion.div>
              );
            default:
              return null;
          }
        })}

        {/* Back to insights */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to="/#insights"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            data-testid="article-bottom-back"
          >
            <BackArrow className="w-4 h-4" />
            {isRTL ? 'العودة إلى جميع المقالات' : 'Back to all articles'}
          </Link>
        </div>
      </article>
    </div>
  );
}
