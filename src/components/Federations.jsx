import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Trophy, Users, Shield, BarChart3, Bell, Landmark,
  UserPlus, ClipboardList, Calendar, CheckCircle2, Star, Quote,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   IMAGES
───────────────────────────────────────────── */
const IMG_A = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71';
const IMG_B = 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const FEATURES = [
  { icon: Trophy,    title: 'Competition Governance', titleAr: 'حوكمة المنافسات',  desc: 'Manage national championships, multi-sport events, leagues, and event approvals from a centralized dashboard.', descAr: 'أدِر البطولات الوطنية والأحداث متعددة الرياضات والدوريات من لوحة تحكم مركزية.' },
  { icon: Users,     title: 'Athlete Ecosystem',      titleAr: 'منظومة الرياضيين',  desc: 'Complete athlete lifecycle management — registration, licensing, national rankings, and performance tracking.', descAr: 'إدارة دورة حياة الرياضي بالكامل — التسجيل والترخيص والتصنيفات الوطنية وتتبع الأداء.' },
  { icon: Shield,    title: 'Club Management',        titleAr: 'إدارة الأندية',     desc: 'Register clubs, ensure compliance, track memberships, and monitor club performance across your federation.', descAr: 'سجّل الأندية وتأكد من الامتثال وتتبع العضويات وراقب أداء الأندية عبر اتحادك.' },
  { icon: BarChart3, title: 'National Analytics',     titleAr: 'التحليلات الوطنية', desc: 'Deep participation insights, performance reports, and growth metrics at the national and regional level.', descAr: 'رؤى مشاركة عميقة وتقارير أداء ومقاييس نمو على المستوى الوطني والإقليمي.' },
  { icon: Bell,      title: 'Communication Center',   titleAr: 'مركز التواصل',      desc: 'Send federation announcements, emergency alerts, and coordinate with all stakeholders instantly.', descAr: 'أرسل إعلانات الاتحاد والتنبيهات الطارئة ونسّق مع جميع أصحاب المصلحة فوراً.' },
  { icon: Landmark,  title: 'Governance Tools',       titleAr: 'أدوات الحوكمة',     desc: 'Policy management, compliance tracking, audit trails, and regulatory reporting in one place.', descAr: 'إدارة السياسات وتتبع الامتثال وسجلات التدقيق والتقارير التنظيمية في مكان واحد.' },
];

const SPORTS = [
  { en: 'Football',     ar: 'كرة القدم'   },
  { en: 'Basketball',   ar: 'كرة السلة'   },
  { en: 'Tennis',       ar: 'تنس'         },
  { en: 'Padel',        ar: 'بادل'        },
  { en: 'Volleyball',   ar: 'كرة الطائرة' },
  { en: 'Table Tennis', ar: 'تنس الطاولة' },
  { en: 'Swimming',     ar: 'سباحة'       },
  { en: 'Athletics',    ar: 'ألعاب القوى' },
  { en: 'Cycling',      ar: 'دراجات'      },
  { en: 'Boxing',       ar: 'ملاكمة'      },
  { en: 'Martial Arts', ar: 'فنون قتالية' },
  { en: 'Rugby',        ar: 'ركبي'        },
  { en: 'Hockey',       ar: 'هوكي'        },
  { en: 'Baseball',     ar: 'بيسبول'      },
  { en: 'Golf',         ar: 'غولف'        },
  { en: 'Badminton',    ar: 'بادمينتون'   },
];

const STATS_CONFIG = [
  { value: 50,     suffix: '+',  label: 'Sports Supported', labelAr: 'رياضة مدعومة', isDecimal: false },
  { value: 10000,  suffix: 'K+', label: 'Athletes Managed', labelAr: 'رياضي مُدار',  isDecimal: false, divisor: 1000 },
  { value: 99.9,   suffix: '%',  label: 'Uptime',           labelAr: 'وقت التشغيل',  isDecimal: true  },
  { value: null,   suffix: '',   label: 'Support',          labelAr: 'الدعم',         static: '24/7'   },
];

const STEPS = [
  { icon: UserPlus,      title: 'Create your federation profile', titleAr: 'أنشئ ملف اتحادك',         desc: 'Set up your federation, branding, and regional structure in minutes.', descAr: 'أعدّ اتحادك وهويته وبنيته الإقليمية في دقائق.' },
  { icon: ClipboardList, title: 'Register clubs & athletes',      titleAr: 'سجّل الأندية والرياضيين', desc: 'Onboard clubs, license athletes, and import existing rosters.', descAr: 'أضف الأندية ورخّص الرياضيين واستورد القوائم الحالية.' },
  { icon: Trophy,        title: 'Schedule competitions',          titleAr: 'جدول المنافسات',           desc: 'Plan leagues and championships with built-in approval workflows.', descAr: 'خطّط للدوريات والبطولات بسير عمل اعتماد مدمج.' },
  { icon: BarChart3,     title: 'Track analytics',                titleAr: 'تتبّع التحليلات',          desc: 'Watch performance, growth, and compliance in real time.', descAr: 'راقب الأداء والنمو والامتثال في الوقت الفعلي.' },
];

/* ─────────────────────────────────────────────
   SHARED ATOMS
───────────────────────────────────────────── */

const Blob = ({ className = '', size = 'w-72 h-72', delay = 0, duration = 8 }) => (
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.35, 0.18] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    className={`absolute ${size} rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ background: 'hsl(var(--primary))' }}
  />
);

const Badge = ({ children }) => (
  <span
    className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5"
    style={{ background: 'hsla(var(--primary), 0.12)', color: 'hsl(var(--primary))', border: '1px solid hsla(var(--primary), 0.25)' }}
  >
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center max-w-2xl mx-auto' : ''}`}>
    {eyebrow && <Badge>{eyebrow}</Badge>}
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-[1.1]">
      {title}
    </h2>
    {subtitle && <p className="text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
  </div>
);

const PhoneMockup = ({ children, className = '' }) => (
  <div
    className={`relative mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 ${className}`}
    style={{ borderColor: 'hsl(var(--foreground) / 0.08)', background: 'hsl(var(--card))' }}
  >
    <div className="absolute top-0 inset-x-0 flex justify-center pt-2 z-10">
      <div className="w-20 h-5 rounded-full" style={{ background: 'hsl(var(--foreground) / 0.12)' }} />
    </div>
    <div className="pt-8">{children}</div>
  </div>
);

const DashCard = ({ icon: Icon, label, value, sub, accent }) => (
  <div
    className="rounded-2xl p-3 mb-2"
    style={{ background: accent ? 'hsl(var(--primary))' : 'hsl(var(--accent))' }}
  >
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] font-bold" style={{ color: accent ? 'rgba(255,255,255,0.75)' : 'hsl(var(--muted-foreground))' }}>{label}</span>
      <Icon size={12} style={{ color: accent ? 'rgba(255,255,255,0.75)' : 'hsl(var(--primary))' }} />
    </div>
    <p className="text-base font-black" style={{ color: accent ? '#fff' : 'hsl(var(--foreground))' }}>{value}</p>
    {sub && <p className="text-[10px] mt-0.5" style={{ color: accent ? 'rgba(255,255,255,0.6)' : 'hsl(var(--muted-foreground))' }}>{sub}</p>}
  </div>
);

const MiniBars = ({ accent }) => (
  <div className="flex items-end gap-1 h-10">
    {[40, 65, 50, 85, 60, 90, 72].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.06 }}
        className="flex-1 rounded-t-sm"
        style={{ background: i === 5 ? (accent ? '#fff' : 'hsl(var(--primary))') : (accent ? 'rgba(255,255,255,0.3)' : 'hsla(var(--primary), 0.25)') }}
      />
    ))}
  </div>
);

const Sparkline = () => (
  <svg viewBox="0 0 120 40" className="w-full h-10">
    <motion.path
      d="M2 32 L20 26 L38 30 L56 16 L74 20 L92 8 L118 4"
      fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    />
  </svg>
);

const ProgressBar = ({ pct, label, delay = 0 }) => (
  <div className="mb-3">
    <div className="flex justify-between text-[10px] mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
      <span>{label}</span><span>{pct}%</span>
    </div>
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsla(var(--primary), 0.15)' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ background: 'hsl(var(--primary))' }}
      />
    </div>
  </div>
);

const FeatureRow = ({ eyebrow, title, desc, bullets, phoneContent, reversed, isRTL }) => {
  const flip = isRTL ? !reversed : reversed;
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center py-16 border-b border-border last:border-b-0 ${flip ? 'md:[direction:ltr]' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: flip ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={isRTL ? 'text-right' : 'text-left'}
        style={{ order: flip ? 2 : 1 }}
      >
        <Badge>{eyebrow}</Badge>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{desc}</p>
        <div className="space-y-2.5">
          {bullets.map((b, i) => (
            <div key={i} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle2 size={16} style={{ color: 'hsl(var(--primary))', flexShrink: 0 }} />
              <span className="text-sm text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: flip ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ order: flip ? 1 : 2 }}
      >
        <div className="relative">
          <Blob size="w-56 h-56" className="top-[-10%] left-[15%] -z-10" duration={7} />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <PhoneMockup className="max-w-[240px]">
              {phoneContent}
            </PhoneMockup>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SPORTS MARQUEE
───────────────────────────────────────────── */
const SportsMarquee = ({ isRTL }) => {
  const items = [...SPORTS, ...SPORTS];
  const animClass = isRTL ? 'marquee-track-rtl' : 'marquee-track';

  return (
    <div className="relative w-full overflow-hidden py-4" style={{ background: 'hsl(var(--card))' }}>
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--card)), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--card)), transparent)' }}
      />

      <style>{`
        @keyframes marquee-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-rtl { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-track     { display: flex; width: max-content; animation: marquee-ltr 32s linear infinite; }
        .marquee-track-rtl { display: flex; width: max-content; animation: marquee-rtl 32s linear infinite; }
        .marquee-track:hover, .marquee-track-rtl:hover { animation-play-state: paused; }
      `}</style>

      <div className={animClass}>
        {items.map(({ en, ar }, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-2 px-4 py-2 rounded-full flex-shrink-0 cursor-default select-none transition-transform hover:scale-105"
            style={{
              background: 'hsla(var(--primary), 0.08)',
              border: '1px solid hsla(var(--primary), 0.18)',
            }}
          >
            <span
              className="text-sm font-semibold whitespace-nowrap"
              style={{ color: 'hsl(var(--primary))' }}
            >
              {isRTL ? ar : en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ANIMATED STAT ITEM
───────────────────────────────────────────── */
const useCountUp = (target, isDecimal, divisor, duration = 1400) => {
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === null) return;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      if (divisor) {
        const raw = (ease * target) / divisor;
        setDisplay(isDecimal ? raw.toFixed(1) : Math.round(raw).toString());
      } else {
        const raw = ease * target;
        setDisplay(isDecimal ? raw.toFixed(1) : Math.round(raw).toString());
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, isDecimal, divisor, duration]);

  return { display, ref };
};

const StatItem = ({ stat, isRTL }) => {
  const { display, ref } = useCountUp(stat.value, stat.isDecimal, stat.divisor);

  const rendered = stat.static
    ? stat.static
    : `${display}${stat.suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`py-8 text-center ${isRTL ? 'text-right px-6' : 'text-left px-6'}`}
      style={{ background: 'hsl(var(--card))' }}
    >
      <p className="font-heading text-4xl font-black" style={{ color: 'hsl(var(--primary))' }}>
        {rendered}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {isRTL ? stat.labelAr : stat.label}
      </p>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export const Federations = () => {
  const { t, language, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const T = (en, ar) => isRTL ? ar : en;

  return (
    <div dir={dir} style={{ fontFamily: isRTL ? "'Tajawal', sans-serif" : undefined }}>
      <section id="federations" data-testid="federations-section" className="overflow-hidden bg-background">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <div className="relative pt-20 pb-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsla(var(--primary), 0.06) 0%, hsl(var(--background)) 100%)' }}>
          <Blob size="w-96 h-96" className="top-[-10%] left-[-5%]" delay={0} duration={9} />
          <Blob size="w-80 h-80" className="top-[-5%] right-[-5%]" delay={2} duration={8} />

          <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>{T('Federations', 'الاتحادات')}</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-5 leading-[1.1] max-w-3xl mx-auto">
                {T(
                  'Manage your federation and grow sport faster',
                  'أدِر اتحادك وسرّع نمو الرياضة'
                )}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                {T(
                  'Competitions, athletes, clubs, rankings and governance — all in one powerful platform built for national federations.',
                  'المنافسات والرياضيون والأندية والتصنيفات والحوكمة — كل ذلك في منصة واحدة قوية مبنية للاتحادات الوطنية.'
                )}
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 20px hsla(var(--primary), 0.4)' }}
                >
                  {T('Book a Demo', 'احجز عرضاً')}
                  <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link
                  to="/federations"
                  className="px-7 py-3 rounded-full text-sm font-semibold border border-border text-foreground transition-all hover:opacity-80 active:scale-95"
                >
                  {T('Learn More', 'اعرف المزيد')}
                </Link>
              </div>
            </motion.div>

            {/* 3 floating phone mockups */}
            <div className="relative mt-14 flex items-end justify-center gap-4 md:gap-6">
              {/* Left phone */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden sm:block"
                style={{ marginBottom: '40px' }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                  <PhoneMockup className="w-[170px] md:w-[200px] opacity-80">
                    <div className="px-3 pb-4">
                      <p className="text-[10px] font-bold text-muted-foreground mb-2">{T('Quick stats', 'إحصاءات سريعة')}</p>
                      <DashCard icon={Users} label={T('Athletes', 'الرياضيون')} value="10,240" sub={T('+12% this month', '+12% هذا الشهر')} />
                      <DashCard icon={Shield} label={T('Active clubs', 'الأندية النشطة')} value="347" sub={T('Fully compliant', 'ممتثل بالكامل')} />
                      <div className="mt-2">
                        <ProgressBar pct={82} label={T('Season progress', 'تقدم الموسم')} />
                        <ProgressBar pct={94} label={T('License renewal', 'تجديد الترخيص')} delay={0.1} />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

              {/* Center phone */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                  <PhoneMockup className="w-[200px] md:w-[240px]">
                    <div className="px-3 pb-5">
                      <div className="rounded-2xl mb-2 overflow-hidden" style={{ height: '120px' }}>
                        <img src={`${IMG_A}?w=480&h=240&fit=crop`} alt="Dashboard" className="w-full h-full object-cover" />
                      </div>
                      <DashCard icon={Trophy} label={T('Live competitions', 'منافسات مباشرة')} value="8 active" accent />
                      <div className="mt-2 px-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Rankings trend', 'اتجاه التصنيفات')}</p>
                        <Sparkline />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

              {/* Right phone */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden sm:block"
                style={{ marginBottom: '40px' }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                  <PhoneMockup className="w-[170px] md:w-[200px] opacity-80">
                    <div className="px-3 pb-4">
                      <p className="text-[10px] font-bold text-muted-foreground mb-2">{T('Performance', 'الأداء')}</p>
                      <DashCard icon={BarChart3} label={T('Events this year', 'فعاليات هذا العام')} value="124" sub={T('+34% vs last year', '+34% مقارنة بالعام الماضي')} />
                      <div className="mt-2">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Monthly activity', 'النشاط الشهري')}</p>
                        <MiniBars />
                      </div>
                      <div className="mt-3">
                        <ProgressBar pct={71} label={T('North region', 'المنطقة الشمالية')} />
                        <ProgressBar pct={58} label={T('South region', 'المنطقة الجنوبية')} delay={0.1} />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            2. SPORTS MARQUEE (animated infinite scroll)
        ══════════════════════════════════════ */}
        <div className="border-y border-border">
          <SportsMarquee isRTL={isRTL} />
        </div>

        {/* ══════════════════════════════════════
            3. STATS (animated count-up on scroll)
        ══════════════════════════════════════ */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border"
            style={{ background: 'hsl(var(--border))' }}
          >
            {STATS_CONFIG.map((s, i) => (
              <StatItem key={i} stat={s} isRTL={isRTL} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            4. FEATURE ROWS (phone + text)
        ══════════════════════════════════════ */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-4">
            <SectionHeading
              eyebrow={T('Platform', 'المنصة')}
              title={T('Unlock features that help you run your federation better', 'اكتشف ميزات تساعدك على إدارة اتحادك بشكل أفضل')}
              subtitle={T('Every tool you need to run national competitions, manage athletes, and oversee clubs.', 'كل أداة تحتاجها لإدارة المنافسات الوطنية والرياضيين والأندية.')}
            />
          </div>

          <FeatureRow
            eyebrow={T('Competition Governance', 'حوكمة المنافسات')}
            title={T('Run national championships with full automation', 'أدِر البطولات الوطنية بأتمتة كاملة')}
            desc={T(
              'From event approvals to live scoring, manage the complete lifecycle of national and regional competitions. Support for multi-sport events, league structures, and knockout tournaments.',
              'من اعتمادات الفعاليات إلى التسجيل المباشر، أدِر دورة الحياة الكاملة للمنافسات الوطنية والإقليمية.'
            )}
            bullets={T(
              ['Event approval workflows', 'Live scoring & results', 'League & knockout formats', 'Multi-sport event support'],
              ['سير عمل اعتماد الفعاليات', 'التسجيل المباشر والنتائج', 'صيغ الدوري والإقصاء', 'دعم الفعاليات متعددة الرياضات']
            )}
            reversed={false}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <div className="rounded-xl overflow-hidden mb-2" style={{ height: '90px' }}>
                  <img src={`${IMG_A}?w=480&h=180&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <DashCard icon={Trophy} label={T('Championships', 'البطولات')} value="12 running" accent />
                <div className="mt-2">
                  <ProgressBar pct={68} label={T('Season completion', 'اكتمال الموسم')} />
                  <ProgressBar pct={91} label={T('Results published', 'النتائج المنشورة')} delay={0.1} />
                </div>
              </div>
            }
          />

          <FeatureRow
            eyebrow={T('Athlete Ecosystem', 'منظومة الرياضيين')}
            title={T('Complete athlete lifecycle management', 'إدارة دورة حياة الرياضي بالكامل')}
            desc={T(
              'Register athletes, manage licenses, track national rankings, and monitor performance — all connected to your federation\'s competitions and clubs.',
              'سجّل الرياضيين وأدِر التراخيص وتتبع التصنيفات الوطنية وراقب الأداء — كل ذلك متصل بمنافسات وأندية اتحادك.'
            )}
            bullets={T(
              ['Digital registration & licensing', 'National ranking engine', 'Performance history tracking', 'Club & coach linkage'],
              ['التسجيل والترخيص الرقمي', 'محرك التصنيف الوطني', 'تتبع سجل الأداء', 'الربط بالأندية والمدربين']
            )}
            reversed={true}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <DashCard icon={Users} label={T('Registered athletes', 'الرياضيون المسجلون')} value="10,240" sub={T('Fully licensed', 'مرخّصون بالكامل')} accent />
                <div className="mt-2">
                  <ProgressBar pct={94} label={T('License renewal rate', 'معدل تجديد الترخيص')} />
                  <ProgressBar pct={78} label={T('Performance logged', 'الأداء المسجّل')} delay={0.1} />
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Rankings trend', 'اتجاه التصنيفات')}</p>
                  <Sparkline />
                </div>
              </div>
            }
          />

          <FeatureRow
            eyebrow={T('Club Management', 'إدارة الأندية')}
            title={T('Oversee every club across your federation', 'أشرف على كل نادٍ في اتحادك')}
            desc={T(
              'Register clubs, ensure compliance, track memberships, and monitor club performance across your entire federation structure.',
              'سجّل الأندية وتأكد من الامتثال وتتبع العضويات وراقب أداء الأندية عبر هيكل اتحادك بأكمله.'
            )}
            bullets={T(
              ['Club registration & verification', 'Membership compliance tracking', 'Club performance dashboards', 'Automated renewal alerts'],
              ['تسجيل الأندية والتحقق منها', 'تتبع امتثال العضوية', 'لوحات أداء الأندية', 'تنبيهات تجديد تلقائية']
            )}
            reversed={false}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <div className="rounded-xl overflow-hidden mb-2" style={{ height: '80px' }}>
                  <img src={`${IMG_B}?w=480&h=160&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <DashCard icon={Shield} label={T('Active clubs', 'الأندية النشطة')} value="347" accent />
                <div className="mt-2">
                  <ProgressBar pct={96} label={T('Compliance rate', 'معدل الامتثال')} />
                  <ProgressBar pct={83} label={T('Memberships active', 'العضويات النشطة')} delay={0.1} />
                </div>
              </div>
            }
          />

          <FeatureRow
            eyebrow={T('National Analytics', 'التحليلات الوطنية')}
            title={T('Smart tools to simplify your analytics journey', 'أدوات ذكية لتبسيط رحلتك التحليلية')}
            desc={T(
              'Deep participation insights, performance reports, and growth metrics at the national and regional level. Turn raw data into strategic decisions.',
              'رؤى مشاركة عميقة وتقارير أداء ومقاييس نمو على المستوى الوطني والإقليمي. حوّل البيانات الخام إلى قرارات استراتيجية.'
            )}
            bullets={T(
              ['Real-time dashboards', 'Regional breakdown reports', 'Year-over-year comparisons', 'Custom report exports'],
              ['لوحات بيانات فورية', 'تقارير تفصيلية إقليمية', 'مقارنات سنة بسنة', 'تصدير تقارير مخصصة']
            )}
            reversed={true}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <DashCard icon={BarChart3} label={T('Events this season', 'فعاليات هذا الموسم')} value="124" sub={T('+34% vs last year', '+34% مقارنة بالعام الماضي')} accent />
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Monthly activity', 'النشاط الشهري')}</p>
                  <MiniBars />
                </div>
                <div className="mt-2">
                  <ProgressBar pct={71} label={T('North region', 'الشمال')} />
                  <ProgressBar pct={58} label={T('South region', 'الجنوب')} delay={0.1} />
                  <ProgressBar pct={42} label={T('East region', 'الشرق')} delay={0.2} />
                </div>
              </div>
            }
          />
        </div>

        {/* ══════════════════════════════════════
            5. STEPS
        ══════════════════════════════════════ */}
        <div className="py-20" style={{ background: 'hsla(var(--primary), 0.04)' }}>
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              eyebrow={T('How it works', 'كيف يعمل')}
              title={T('Your federation, set up in four steps', 'اتحادك، جاهز في أربع خطوات')}
              subtitle={T('From sign-up to first competition in under a week.', 'من التسجيل إلى أول منافسة في أقل من أسبوع.')}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div
                className="absolute top-8 inset-x-0 hidden lg:block h-px"
                style={{ background: 'hsla(var(--primary), 0.2)', zIndex: 0 }}
              />
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 relative"
                        style={{ borderColor: 'hsl(var(--primary))', background: 'hsl(var(--background))' }}
                      >
                        <Icon size={18} style={{ color: 'hsl(var(--primary))' }} />
                        <span
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                          style={{ background: 'hsl(var(--primary))' }}
                        >
                          {i + 1}
                        </span>
                      </motion.div>
                    </div>
                    <h4 className="font-heading font-bold text-foreground mb-2">{T(step.title, step.titleAr)}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{T(step.desc, step.descAr)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            9. FINAL CTA
        ══════════════════════════════════════ */}
        <div className="pb-20 container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)' }}
          >
            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Primary glow blob */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
              style={{
                background: 'hsl(var(--primary))',
                top: '-30%',
                right: isRTL ? 'auto' : '-5%',
                left: isRTL ? '-5%' : 'auto',
              }}
            />
            {/* Secondary accent glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.25, 0.12] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: '#06b6d4', bottom: '-20%', left: isRTL ? 'auto' : '8%', right: isRTL ? '8%' : 'auto' }}
            />

            {/* Floating phone mockup */}
            <div className={`absolute bottom-0 hidden lg:block ${isRTL ? 'left-6' : 'right-6'} w-48`}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                {/* Glow ring around phone */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] blur-xl opacity-30 pointer-events-none"
                  style={{ background: 'hsl(var(--primary))', transform: 'scale(0.9) translateY(8px)' }}
                />
                <PhoneMockup className="w-44" style={{ borderColor: 'rgba(255,255,255,0.12)', background: '#0f172a' }}>
                  <div className="px-2 pb-4">
                    <div className="rounded-lg overflow-hidden mb-2" style={{ height: '70px' }}>
                      <img src={`${IMG_A}?w=300&h=140&fit=crop`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <DashCard icon={Trophy} label="Live" value="Game day" accent />
                  </div>
                </PhoneMockup>
              </motion.div>
            </div>

            {/* Content */}
            <div className={`relative z-10 py-16 px-10 md:px-16 ${isRTL ? 'text-right lg:pe-[220px]' : 'text-left lg:pr-[220px]'}`}>
              {/* Badge override — always visible on dark bg */}
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5"
                style={{
                  background: 'hsla(var(--primary), 0.25)',
                  color: 'hsl(var(--primary))',
                  border: '1px solid hsla(var(--primary), 0.4)',
                }}
              >
                {T('Get started', 'ابدأ الآن')}
              </span>

              <h2 className="font-heading text-3xl md:text-4xl font-black mb-3 leading-tight" style={{ color: '#ffffff' }}>
                {T('Your next opportunity is just a click away.', 'فرصتك القادمة على بُعد نقرة واحدة.')}
              </h2>

              <p className="text-sm mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {T(
                  'Join federations that already run their competitions and athletes from one system.',
                  'انضم إلى الاتحادات التي تدير منافساتها ورياضييها من نظام واحد.'
                )}
              </p>

              <div className={`flex gap-3 flex-wrap items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 transition-all hover:scale-[1.03] active:scale-95"
                  style={{
                    background: 'hsl(var(--primary))',
                    boxShadow: '0 4px 24px hsla(var(--primary), 0.55), 0 0 0 1px hsla(var(--primary), 0.3)',
                  }}
                >
                  {T('Book a Demo', 'احجز عرضاً')}
                  <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link
                  to="/federations"
                  className="px-7 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/10 active:scale-95"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
                >
                  {T('Learn More', 'اعرف المزيد')}
                </Link>
              </div>

              {/* Social proof micro-strip */}
              <div className={`flex items-center gap-3 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex -space-x-2">
                  {['#4f7cac', '#3a9e7e', '#8b5cf6', '#e07050'].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ borderColor: '#0f172a', background: c, zIndex: 4 - i }}
                    >
                      {['A', 'M', 'K', 'S'][i]}
                    </div>
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {T('Trusted by 120+ federations worldwide', 'موثوق به من قِبل أكثر من 120 اتحاداً حول العالم')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
};