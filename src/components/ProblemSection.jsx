import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ProblemSection = () => {
  const { t, isRTL } = useLanguage();

  const painPoints = [
    { number: '01', title: t('problem.pain1Title'), description: t('problem.pain1Desc') },
    { number: '02', title: t('problem.pain2Title'), description: t('problem.pain2Desc') },
    { number: '03', title: t('problem.pain4Title'), description: t('problem.pain4Desc') },
    { number: '04', title: t('problem.pain5Title'), description: t('problem.pain5Desc') },
  ];

  return (
    <section
      data-testid="problem-section"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold mb-3"
            style={{ color: 'hsl(var(--primary))' }}
            data-testid="problem-overline"
          >
            {t('problem.overline')}
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground"
            data-testid="problem-title"
          >
            {t('problem.title')}
          </h2>
        </motion.div>

        {/* ── Grid Layout ──────────────────────────── */}
        <div className="relative min-h-[500px] flex flex-col md:block">

          {/* Image circulaire centrale avec bouton Play */}
          <div className="hidden md:flex md:absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div
              className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden group cursor-pointer"
              style={{ border: '6px solid hsl(var(--primary) / 0.15)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=600&q=80"
                alt="Running Club"
                className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
             
            </div>
          </div>

          {/* SVG Lignes de connexion (Desktop uniquement) */}
          <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Ligne 01 (Top Left) - droite, du point sous le titre vers le cercle */}
              <path d="M 360 148 L 480 215" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="4 4" fill="none" />
              <circle cx="360" cy="148" r="3" fill="hsl(var(--primary))" />
              <circle cx="480" cy="215" r="3" fill="hsl(var(--primary))" />

              {/* Ligne 02 (Top Right) - droite, du point sous le titre vers le cercle */}
              <path d="M 640 148 L 520 215" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="4 4" fill="none" />
              <circle cx="640" cy="148" r="3" fill="hsl(var(--primary))" />
              <circle cx="520" cy="215" r="3" fill="hsl(var(--primary))" />

              {/* Ligne 03 (Bottom Left) - droite, du cercle vers le point sous la description */}
              <path d="M 480 285 L 360 352" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="4 4" fill="none" />
              <circle cx="480" cy="285" r="3" fill="hsl(var(--primary))" />
              <circle cx="360" cy="352" r="3" fill="hsl(var(--primary))" />

              {/* Ligne 04 (Bottom Right) - droite, du cercle vers le point sous la description */}
              <path d="M 520 285 L 640 352" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="4 4" fill="none" />
              <circle cx="520" cy="285" r="3" fill="hsl(var(--primary))" />
              <circle cx="640" cy="352" r="3" fill="hsl(var(--primary))" />
            </svg>
          </div>

          {/* Positionnement exact des blocs */}
          {/* Quadrant 01 - Top Left */}
          <div className="md:absolute md:top-4 md:left-[5%] md:w-[35%] mb-12 md:mb-0">
            <PainItem point={painPoints[0]} index={0} position="left" />
          </div>

          {/* Quadrant 02 - Top Right */}
          <div className="md:absolute md:top-4 md:right-[5%] md:w-[35%] mb-12 md:mb-0">
            <PainItem point={painPoints[1]} index={1} position="right" />
          </div>

          {/* Quadrant 03 - Bottom Left */}
          <div className="md:absolute md:bottom-4 md:left-[5%] md:w-[35%] mb-12 md:mb-0">
            <PainItem point={painPoints[2]} index={2} position="left" />
          </div>

          {/* Quadrant 04 - Bottom Right */}
          <div className="md:absolute md:bottom-4 md:right-[5%] md:w-[35%]">
            <PainItem point={painPoints[3]} index={3} position="right" />
          </div>

        </div>
      </div>
    </section>
  );
};

type PainItemProps = {
  point: { number: string; title: string; description: string };
  index: number;
  position: 'left' | 'right';
};

const PainItem = ({ point, index, position }: PainItemProps) => {
  const isRight = position === 'right';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      className={`flex items-center gap-6 ${isRight ? 'md:flex-row-reverse md:text-right' : 'text-left'}`}
      data-testid={`pain-point-${index}`}
    >
      {/* Contenu Texte (Titre + Description) */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-2">
          {point.title}
        </h3>
        <p className={`text-sm text-muted-foreground leading-relaxed max-w-[280px] ${isRight ? 'md:ml-auto' : ''}`}>
          {point.description}
        </p>
      </div>

      {/* Numéro Géant sur le côté */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <span
          className="font-heading text-6xl lg:text-7xl font-black leading-none"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {point.number}
        </span>
      </div>
    </motion.div>
  );
};