import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark, GraduationCap, School, User, Trophy,
  PersonStanding, Check, ArrowRight, ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

/* ─── Images ──────────────────────────────────────────────────────── */
const IMAGES = [
  "https://images.unsplash.com/photo-1751832084318-0161a85b98de?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1609503842755-77f4a81d69ae?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1771257807779-a72e74deaa11?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1654592576004-06eda474aa3b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1655856609558-5d058861511e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1617397411505-44e001bf733e?w=800&h=600&fit=crop",
];

const ACTIVITY_IMAGES = [
  "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/li6a4376_photo-1761644707612-adf8354c7576.avif",
  "https://images.unsplash.com/photo-1544366981-43d8d59eeba9?w=600&h=400&fit=crop",
  "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/w0dzor5g_istockphoto-1040504314-612x612.webp",
  "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/5o66lv8x_photo-1759694525519-3325ef949bf9.avif",
];

/* ─── Sport badge dot ─────────────────────────────────────────────── */
const SportDot = () => (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'hsl(var(--primary))',
      flexShrink: 0,
    }}
  />
);

/* ─── Progress bars (mini chart) ──────────────────────────────────── */
const ProgressChart = () => {
  const heights = [10, 16, 22, 28, 36, 60, 70, 78, 84, 90, 96, 100];
  return (
    <div className="flex items-end gap-1" style={{ height: 56 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: `${h}%`,
            borderRadius: 3,
            background: i < 5 ? 'rgba(0,0,0,0.15)' : '#111',
          }}
        />
      ))}
    </div>
  );
};

/* ─── Activity card (screenshot 1 style) ─────────────────────────── */
const ActivityCard = ({ image, title, desc, delay = 0 }) => (
  <motion.div
    className="relative overflow-hidden rounded-2xl group cursor-pointer"
    style={{ aspectRatio: '3/4' }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -4 }}
  >
    {/* Image */}
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    {/* Top badge */}
    <div
      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
    >
      <SportDot />
      <span style={{ fontSize: 12, fontWeight: 700, color: '#111', letterSpacing: '0.01em' }}>
        {title}
      </span>
    </div>

    {/* Bottom gradient + CTA */}
    <div
      className="absolute bottom-0 left-0 right-0"
      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)', padding: '3rem 1rem 1.1rem' }}
    >
      <div className="flex items-end justify-between">
        <div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, marginBottom: 2 }}>{desc}</p>
          <p style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{title}</p>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'hsl(var(--primary))' }}
        >
          <ChevronRight size={16} color="#fff" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Main component ──────────────────────────────────────────────── */
export const UseCases = () => {
  const { t, isRTL } = useLanguage();
  const [active, setActive] = useState(0);

  const cases = [
    {
      icon: Landmark,
      title: t('useCases.case1Title'),
      desc: t('useCases.case1Desc'),
      features: [t('useCases.case1F1'), t('useCases.case1F2'), t('useCases.case1F3'), t('useCases.case1F4')],
      image: IMAGES[0],
      stat1: { value: '1.2K+', label: t('useCases.case1Title') },
      stat2: { value: '98%', label: 'Satisfaction' },
    },
    {
      icon: GraduationCap,
      title: t('useCases.case2Title'),
      desc: t('useCases.case2Desc'),
      features: [t('useCases.case2F1'), t('useCases.case2F2'), t('useCases.case2F3')],
      image: IMAGES[1],
      stat1: { value: '850+', label: 'Students' },
      stat2: { value: '92%', label: 'Success rate' },
    },
    {
      icon: School,
      title: t('useCases.case3Title'),
      desc: t('useCases.case3Desc'),
      features: [t('useCases.case3F1'), t('useCases.case3F2'), t('useCases.case3F3')],
      image: IMAGES[2],
      stat1: { value: '300+', label: 'Schools' },
      stat2: { value: '4.9★', label: 'Rating' },
    },
    {
      icon: User,
      title: t('useCases.case4Title'),
      desc: t('useCases.case4Desc'),
      features: [t('useCases.case4F1'), t('useCases.case4F2'), t('useCases.case4F3')],
      image: IMAGES[3],
      stat1: { value: '5K+', label: 'Members' },
      stat2: { value: '87%', label: 'Retention' },
    },
    {
      icon: Trophy,
      title: t('useCases.case5Title'),
      desc: t('useCases.case5Desc'),
      features: [t('useCases.case5F1'), t('useCases.case5F2'), t('useCases.case5F3')],
      image: IMAGES[4],
      stat1: { value: '200+', label: 'Events' },
      stat2: { value: '95%', label: 'Participants' },
    },
    {
      icon: PersonStanding,
      title: t('useCases.case6Title'),
      desc: t('useCases.case6Desc'),
      features: [t('useCases.case6F1'), t('useCases.case6F2'), t('useCases.case6F3'), t('useCases.case6F4')],
      image: IMAGES[5],
      stat1: { value: '10K+', label: 'Coaches' },
      stat2: { value: '99%', label: 'Uptime' },
    },
  ];

  const activities = [
    { title: t('useCases.act1Title'), desc: t('useCases.act1Desc'), image: ACTIVITY_IMAGES[0] },
    { title: t('useCases.act2Title'), desc: t('useCases.act2Desc'), image: ACTIVITY_IMAGES[1] },
    { title: t('useCases.act3Title'), desc: t('useCases.act3Desc'), image: ACTIVITY_IMAGES[2] },
    { title: t('useCases.act4Title'), desc: t('useCases.act4Desc'), image: ACTIVITY_IMAGES[3] },
  ];

  const current = cases[active];

  return (
    <section
      id="use-cases"
      data-testid="use-cases-section"
      className="py-20 md:py-28 bg-white dark:bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* ── Header ────────────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          
            <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-5"
            style={{
              background: 'hsla(var(--primary), 0.15)',
              color: 'hsl(var(--primary))',
              border: '1px solid hsl(var(--primary) / 0.30)',
            }}
          >
            {t('useCases.overline')}
          </span>
          <h2
            className="font-heading font-extrabold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', color: 'hsl(var(--foreground))' }}
          >
            {t('useCases.title')}
          </h2>
          <p style={{ fontSize: 16, color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
            {t('useCases.subtitle')}
          </p>
        </motion.div>

        {/* ── Activity cards — screenshot 1 style ───────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
          {activities.map((act, i) => (
            <ActivityCard key={i} {...act} delay={i * 0.08} />
          ))}
        </div>

        {/* ── Tabs + content ─────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto">

          {/* Tabs — pill outline style */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {cases.map((item, i) => {
              const Icon = item.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  data-testid={`use-case-filter-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    border: isActive
                      ? '1.5px solid hsl(var(--primary))'
                      : '1.5px solid hsl(var(--border))',
                    background: isActive ? 'hsl(var(--primary))' : 'transparent',
                    color: isActive ? '#fff' : 'hsl(var(--muted-foreground))',
                  }}
                >
                  <Icon style={{ width: 14, height: 14 }} />
                  {item.title}
                </button>
              );
            })}
          </motion.div>

          {/* ── Content panel — style screenshot fourni ───────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl"
              style={{ border: '1px solid hsl(var(--border))', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}
              data-testid="use-case-content"
            >
              {/* ── Left: image avec titre superposé + carte Progress ── */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/3', minHeight: 380 }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark gradient pour lisibilité du titre */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 100%)' }}
                />

                {/* Titre géant en haut-gauche */}
                <div className="absolute top-6 left-6 right-6">
                  <h3
                    className="font-heading font-extrabold"
                    style={{
                      fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                      color: '#fff',
                      lineHeight: 1.1,
                      textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                    }}
                  >
                    {current.title}
                  </h3>
                </div>

                {/* Carte "Progress" flottante en bas-gauche */}
                <div
                  className="absolute bottom-6 left-6 rounded-2xl"
                  style={{
                    background: '#fff',
                    padding: '1rem 1.2rem',
                    minWidth: 180,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                  }}
                >
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#444', marginBottom: 8 }}>
                    Progress
                  </p>
                  <ProgressChart />
                </div>
              </div>

              {/* ── Right: details ─────────────────────────────────── */}
              <div
                className="flex flex-col justify-between p-8 md:p-10"
                style={{ background: 'hsl(var(--card))' }}
              >
                <div>
                  {/* What we offer label */}
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'hsl(var(--muted-foreground))',
                      marginBottom: 14,
                    }}
                  >
                    {t('useCases.highlight') || 'What we offer'}:
                  </p>

                  {/* Description */}
                  <p style={{ fontSize: 15, color: 'hsl(var(--foreground))', lineHeight: 1.75, marginBottom: 24, fontWeight: 500 }}>
                    {current.desc}
                  </p>

                  {/* CTA — pill button avec flèche ronde */}
                  <button
                    className="inline-flex items-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      background: 'hsl(var(--primary))',
                      color: '#111',
                      borderRadius: 999,
                      paddingLeft: 20,
                      paddingRight: 6,
                      paddingTop: 6,
                      paddingBottom: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      marginBottom: 28,
                    }}
                  >
                    <span>{t('useCases.cta') || 'Get Started'}</span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: '#111' }}
                    >
                      <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
                    </span>
                  </button>

                  {/* Séparateur */}
                  <div style={{ height: 1, background: 'hsl(var(--border))', marginBottom: 24 }} />

                  {/* Stats côte à côte */}
                  <div className="grid grid-cols-2 gap-4">
                    {[current.stat1, current.stat2].map((s, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <p style={{ fontSize: 28, fontWeight: 800, color: 'hsl(var(--foreground))', lineHeight: 1 }}>
                            {s.value}
                          </p>
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'hsl(var(--primary))' }}
                          >
                            <current.icon style={{ width: 14, height: 14, color: '#111' }} />
                          </div>
                        </div>
                        <p style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-200"
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: active === i ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};