import { motion } from 'framer-motion';
import {
  ArrowRight, Trophy, BarChart3, Users, Search, User, Camera,
  Medal, Handshake, ClipboardList, GraduationCap, Bell, Shield,
  CheckCircle2, CreditCard, Radio, CalendarDays, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

/* ─── IMAGES ─── */
const IMG_A = 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e';
const IMG_B = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71';

/* ─── DATA ─── */
const SPORTS = [
  { en: 'Football',     ar: 'كرة القدم'   },
  { en: 'Basketball',   ar: 'كرة السلة'   },
  { en: 'Athletics',    ar: 'ألعاب القوى' },
  { en: 'Swimming',     ar: 'سباحة'       },
  { en: 'Volleyball',   ar: 'كرة الطائرة' },
  { en: 'Tennis',       ar: 'تنس'         },
  { en: 'Gymnastics',   ar: 'جمباز'       },
  { en: 'Handball',     ar: 'كرة اليد'    },
  { en: 'Table Tennis', ar: 'تنس الطاولة' },
  { en: 'Badminton',    ar: 'بادمينتون'   },
  { en: 'Rugby',        ar: 'ركبي'        },
  { en: 'Hockey',       ar: 'هوكي'        },
  { en: 'Boxing',       ar: 'ملاكمة'      },
  { en: 'Cycling',      ar: 'دراجات'      },
  { en: 'Martial Arts', ar: 'فنون قتالية' },
  { en: 'Padel',        ar: 'بادل'        },
];

const STATS_CONFIG = [
  { static: '50K+',  label: 'Athletes Registered',  labelAr: 'رياضي مسجل'         },
  { static: '8K+',   label: 'Active Coaches',        labelAr: 'مدرب نشط'           },
  { static: '95%',   label: 'Career Improvement',    labelAr: 'تحسين المسيرة'      },
  { static: '40+',   label: 'Sport Disciplines',     labelAr: 'تخصص رياضي'         },
];

const ATHLETE_FEATURES = [
  {
    icon: Search,
    title: 'Discover Competitions',      titleAr: 'اكتشف المنافسات',
    desc:  'Find and join tournaments, leagues, and events near you with smart search and filtering.',
    descAr:'ابحث وانضم للبطولات والدوريات والفعاليات القريبة منك بالبحث والتصفية الذكية.',
  },
  {
    icon: BarChart3,
    title: 'Rankings & Statistics',      titleAr: 'التصنيفات والإحصائيات',
    desc:  'Track your rankings, match stats, and performance metrics across all competitions.',
    descAr:'تتبع تصنيفاتك وإحصائيات المباريات ومقاييس الأداء عبر جميع المنافسات.',
  },
  {
    icon: User,
    title: 'Athlete Profile',            titleAr: 'الملف الرياضي',
    desc:  'Build your sports identity with a comprehensive profile showcasing your career and achievements.',
    descAr:'ابنِ هويتك الرياضية مع ملف شامل يعرض مسيرتك وإنجازاتك.',
  },
  {
    icon: Medal,
    title: 'Achievement Tracking',       titleAr: 'تتبع الإنجازات',
    desc:  'Collect badges, track milestones, and build a complete record of your sports career.',
    descAr:'اجمع الشارات وتتبع المعالم وابنِ سجلاً كاملاً لمسيرتك الرياضية.',
  },
];

const COACH_FEATURES = [
  {
    icon: ClipboardList,
    title: 'Training Plans',             titleAr: 'خطط التدريب',
    desc:  'Create structured training programs, schedule sessions, and manage drills for your teams.',
    descAr:'أنشئ برامج تدريب منظمة وجدوِل الجلسات وأدِر التمارين لفرقك.',
  },
  {
    icon: BarChart3,
    title: 'Performance Monitoring',     titleAr: 'مراقبة الأداء',
    desc:  'Track athlete development, analyze match data, and identify areas for improvement.',
    descAr:'تتبع تطور الرياضيين وحلّل بيانات المباريات وحدد مجالات التحسين.',
  },
  {
    icon: GraduationCap,
    title: 'Athlete Development',        titleAr: 'تطوير الرياضيين',
    desc:  'Guide athletes from beginner to elite with personalized development paths and goals.',
    descAr:'وجّه الرياضيين من المبتدئ إلى النخبة مع مسارات تطوير وأهداف مخصصة.',
  },
  {
    icon: Shield,
    title: 'Certifications',             titleAr: 'الشهادات',
    desc:  'Manage your coaching certifications, track renewals, and showcase your qualifications.',
    descAr:'أدِر شهادات التدريب وتتبع التجديدات واعرض مؤهلاتك.',
  },
];

const ATHLETE_STEPS = [
  { icon: Search,   title: 'Find your event',          titleAr: 'ابحث عن فعاليتك',       desc: 'Browse competitions by sport, location, and level that match your profile.',    descAr: 'تصفح المنافسات حسب الرياضة والموقع والمستوى الذي يناسب ملفك.' },
  { icon: User,     title: 'Build your profile',       titleAr: 'ابنِ ملفك الرياضي',     desc: 'Showcase your career, stats, and highlights to stand out in the community.',    descAr: 'اعرض مسيرتك وإحصائياتك وأبرز لحظاتك للتميز في المجتمع.' },
  { icon: Trophy,   title: 'Compete and rank',         titleAr: 'تنافس وتصنَّف',          desc: 'Enter events, track your results, and climb the rankings in your discipline.',  descAr: 'شارك في الفعاليات وتتبع نتائجك وارتقِ في التصنيفات.' },
  { icon: Medal,    title: 'Earn achievements',        titleAr: 'احصل على الإنجازات',     desc: 'Collect badges, milestones and career records as you grow as an athlete.',      descAr: 'اجمع الشارات والمعالم والسجلات مع تطورك كرياضي.' },
];

/* ─── ATOMS (identical to Organizers) ─── */
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
    style={{
      background: 'hsla(var(--primary), 0.12)',
      color: 'hsl(var(--primary))',
      border: '1px solid hsla(var(--primary), 0.25)',
    }}
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
      <span className="text-[10px] font-bold" style={{ color: accent ? 'rgba(255,255,255,0.75)' : 'hsl(var(--muted-foreground))' }}>
        {label}
      </span>
      <Icon size={12} style={{ color: accent ? 'rgba(255,255,255,0.75)' : 'hsl(var(--primary))' }} />
    </div>
    <p className="text-base font-black" style={{ color: accent ? '#fff' : 'hsl(var(--foreground))' }}>{value}</p>
    {sub && (
      <p className="text-[10px] mt-0.5" style={{ color: accent ? 'rgba(255,255,255,0.6)' : 'hsl(var(--muted-foreground))' }}>
        {sub}
      </p>
    )}
  </div>
);

const MiniBars = () => (
  <div className="flex items-end gap-1 h-10">
    {[40, 65, 50, 85, 60, 90, 72].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.06 }}
        className="flex-1 rounded-t-sm"
        style={{ background: i === 5 ? 'hsl(var(--primary))' : 'hsla(var(--primary), 0.25)' }}
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

const SportsMarquee = ({ isRTL }) => {
  const items = [...SPORTS, ...SPORTS];
  const animClass = isRTL ? 'marquee-track-rtl' : 'marquee-track';
  return (
    <div className="relative w-full overflow-hidden py-4" style={{ background: 'hsl(var(--card))' }}>
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(var(--card)), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(var(--card)), transparent)' }} />
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
            style={{ background: 'hsla(var(--primary), 0.08)', border: '1px solid hsla(var(--primary), 0.18)' }}
          >
            <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'hsl(var(--primary))' }}>
              {isRTL ? ar : en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureRow = ({ eyebrow, title, desc, bullets, phoneContent, reversed, isRTL }) => {
  const flip = isRTL ? !reversed : reversed;
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center py-16 border-b border-border last:border-b-0">
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
            <PhoneMockup className="max-w-[240px]">{phoneContent}</PhoneMockup>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── MAIN ─── */
export default function AthletesCoaches() {
  const { isRTL } = useLanguage();
  const T = (en, ar) => isRTL ? ar : en;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: isRTL ? "'Tajawal', sans-serif" : undefined }}>
      <section className="overflow-hidden bg-background">

        {/* ══ 1. HERO ══ */}
        <div
          className="relative pt-28 pb-10 overflow-hidden"
          style={{ background: 'linear-gradient(180deg, hsla(var(--primary), 0.06) 0%, hsl(var(--background)) 100%)' }}
        >
          <Blob size="w-96 h-96" className="top-[-10%] left-[-5%]" delay={0} duration={9} />
          <Blob size="w-80 h-80" className="top-[-5%] right-[-5%]" delay={2} duration={8} />

          <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>{T('Athletes & Coaches', 'الرياضيون والمدربون')}</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-5 leading-[1.1] max-w-3xl mx-auto">
                {T(
                  'Your complete sports career platform',
                  'منصتك المتكاملة للمسيرة الرياضية'
                )}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                {T(
                  'Whether you\'re competing or coaching, manage your entire sports journey — from profile to performance — all in one place.',
                  'سواء كنت تتنافس أو تدرب، أدِر مسيرتك الرياضية بالكامل — من الملف إلى الأداء — من مكان واحد.'
                )}
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  to="/pricing"
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 20px hsla(var(--primary), 0.4)' }}
                >
                  {T('Get Started Free', 'ابدأ مجاناً')}
                  <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full text-sm font-semibold border border-border text-foreground transition-all hover:opacity-80 active:scale-95"
                >
                  {T('Book a Demo', 'احجز عرضاً')}
                </Link>
              </div>
            </motion.div>

            {/* ── 3 floating phones ── */}
            <div className="relative mt-14 flex items-end justify-center gap-4 md:gap-6">

              {/* Left phone — Athlete Profile */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden sm:block" style={{ marginBottom: '40px' }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                  <PhoneMockup className="w-[170px] md:w-[200px] opacity-80">
                    <div className="px-3 pb-4">
                      <p className="text-[10px] font-bold text-muted-foreground mb-2">{T('Athlete Profile', 'الملف الرياضي')}</p>
                      <DashCard icon={Trophy} label={T('Career wins', 'انتصارات المسيرة')} value="142 wins" sub={T('+12 this season', '+12 هذا الموسم')} />
                      <DashCard icon={Medal} label={T('Achievements', 'الإنجازات')} value="28 badges" sub={T('Across 6 sports', 'عبر 6 رياضات')} />
                      <div className="mt-2">
                        <ProgressBar pct={92} label={T('Profile complete', 'اكتمال الملف')} />
                        <ProgressBar pct={78} label={T('Season goals', 'أهداف الموسم')} delay={0.1} />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

              {/* Center phone — Live competition */}
              <motion.div
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                  <PhoneMockup className="w-[200px] md:w-[240px]">
                    <div className="px-3 pb-5">
                      <div className="rounded-2xl mb-2 overflow-hidden" style={{ height: '120px' }}>
                        <img src={`${IMG_A}?w=480&h=240&fit=crop`} alt="Athletes" className="w-full h-full object-cover" />
                      </div>
                      <DashCard icon={Radio} label={T('Live ranking', 'التصنيف المباشر')} value="#3 National" accent />
                      <div className="mt-2 px-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Performance trend', 'اتجاه الأداء')}</p>
                        <Sparkline />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

              {/* Right phone — Coach dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden sm:block" style={{ marginBottom: '40px' }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                  <PhoneMockup className="w-[170px] md:w-[200px] opacity-80">
                    <div className="px-3 pb-4">
                      <p className="text-[10px] font-bold text-muted-foreground mb-2">{T('Coach Dashboard', 'لوحة المدرب')}</p>
                      <DashCard icon={Users} label={T('Athletes managed', 'رياضيون تحت الإدارة')} value="24 athletes" sub={T('+3 this month', '+3 هذا الشهر')} />
                      <div className="mt-2">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Team progress', 'تقدم الفريق')}</p>
                        <MiniBars />
                      </div>
                      <div className="mt-3">
                        <ProgressBar pct={88} label={T('Training completion', 'اكتمال التدريب')} />
                        <ProgressBar pct={94} label={T('Athlete satisfaction', 'رضا الرياضيين')} delay={0.1} />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* ══ 2. MARQUEE ══ */}
        <div className="border-y border-border">
          <SportsMarquee isRTL={isRTL} />
        </div>

        {/* ══ 3. STATS ══ */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border"
            style={{ background: 'hsl(var(--border))' }}
          >
            {STATS_CONFIG.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`py-8 px-6 ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ background: 'hsl(var(--card))' }}
              >
                <p className="font-heading text-4xl font-black" style={{ color: 'hsl(var(--primary))' }}>{s.static}</p>
                <p className="text-sm text-muted-foreground mt-1">{isRTL ? s.labelAr : s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ 4. FEATURE ROWS — ATHLETES ══ */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-4">
            <SectionHeading
              eyebrow={T('For Athletes', 'للرياضيين')}
              title={T('Everything an athlete needs to grow', 'كل ما يحتاجه الرياضي للنمو')}
              subtitle={T(
                'Discover competitions, build your profile, track your career, and connect with the sports community.',
                'اكتشف المنافسات وابنِ ملفك وتتبع مسيرتك وتواصل مع المجتمع الرياضي.'
              )}
            />
          </div>

          {/* Row 1 — Discover Competitions */}
          <FeatureRow
            eyebrow={T('Competition Discovery', 'اكتشاف المنافسات')}
            title={T('Find and join the right competitions for you', 'ابحث وانضم للمنافسات المناسبة لك')}
            desc={T(
              'Browse thousands of tournaments, leagues, and local events filtered by sport, level, and location. Register in seconds and get instant confirmation.',
              'تصفح آلاف البطولات والدوريات والفعاليات المحلية مصنفة حسب الرياضة والمستوى والموقع. سجل في ثوانٍ واحصل على تأكيد فوري.'
            )}
            bullets={T(
              ['Smart search by sport, level & location', 'Instant online registration', 'Waitlist management', 'Calendar sync for upcoming events'],
              ['بحث ذكي حسب الرياضة والمستوى والموقع', 'تسجيل فوري عبر الإنترنت', 'إدارة قوائم الانتظار', 'مزامنة التقويم للفعاليات القادمة']
            )}
            reversed={false}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <div className="rounded-xl overflow-hidden mb-2" style={{ height: '90px' }}>
                  <img src={`${IMG_B}?w=480&h=180&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <DashCard icon={Search} label={T('Events near you', 'فعاليات قريبة منك')} value="38 events" accent />
                <div className="mt-2">
                  <ProgressBar pct={100} label={T('Registration open', 'التسجيل مفتوح')} />
                  <ProgressBar pct={72} label={T('Capacity filled', 'السعة المملوءة')} delay={0.1} />
                </div>
              </div>
            }
          />

          {/* Row 2 — Athlete Profile */}
          <FeatureRow
            eyebrow={T('Athlete Profile', 'الملف الرياضي')}
            title={T('Build your sports identity and showcase your career', 'ابنِ هويتك الرياضية واعرض مسيرتك')}
            desc={T(
              'Create a comprehensive athlete profile with your stats, achievements, media highlights, and career history. Let coaches and organizers discover your talent.',
              'أنشئ ملفاً شاملاً للرياضي مع إحصائياتك وإنجازاتك وأبرز وسائطك وتاريخ مسيرتك. دع المدربين والمنظمين يكتشفون موهبتك.'
            )}
            bullets={T(
              ['Full career history & stats', 'Photo and video highlights', 'Achievements and badges', 'Visibility to coaches & scouts'],
              ['تاريخ مسيرة كامل وإحصائيات', 'صور وفيديوهات أبرز اللحظات', 'الإنجازات والشارات', 'ظهور للمدربين والكشافين']
            )}
            reversed={true}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <DashCard icon={User} label={T('Profile views', 'مشاهدات الملف')} value="1,240" sub={T('+82 this week', '+82 هذا الأسبوع')} accent />
                <div className="mt-2">
                  <ProgressBar pct={95} label={T('Career completeness', 'اكتمال المسيرة')} />
                  <ProgressBar pct={88} label={T('Media uploaded', 'الوسائط المرفوعة')} delay={0.1} />
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Performance trend', 'اتجاه الأداء')}</p>
                  <Sparkline />
                </div>
              </div>
            }
          />
        </div>

        {/* ══ 5. FEATURE ROWS — COACHES ══ */}
        <div className="py-20" style={{ background: 'hsla(var(--primary), 0.03)' }}>
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-4">
              <SectionHeading
                eyebrow={T('For Coaches', 'للمدربين')}
                title={T('Every tool a coach needs to lead', 'كل أداة يحتاجها المدرب للقيادة')}
                subtitle={T(
                  'Manage teams, create training plans, track athlete development, and communicate with parents.',
                  'أدِر الفرق وأنشئ خطط التدريب وتتبع تطور الرياضيين وتواصل مع أولياء الأمور.'
                )}
              />
            </div>

            {/* Row 3 — Training Plans */}
            <FeatureRow
              eyebrow={T('Training Management', 'إدارة التدريب')}
              title={T('Create and manage training programs with ease', 'أنشئ وأدِر برامج التدريب بسهولة')}
              desc={T(
                'Build structured training programs, schedule sessions, assign drills, and track completion for every athlete in your roster.',
                'أنشئ برامج تدريب منظمة وجدوِل الجلسات وعيّن التمارين وتتبع الإنجاز لكل رياضي في قائمتك.'
              )}
              bullets={T(
                ['Drag-and-drop session planner', 'Drill library with custom exercises', 'Attendance & completion tracking', 'Automated session reminders'],
                ['مخطط جلسات بالسحب والإفلات', 'مكتبة تمارين مع تمارين مخصصة', 'تتبع الحضور والإنجاز', 'تذكيرات جلسات تلقائية']
              )}
              reversed={false}
              isRTL={isRTL}
              phoneContent={
                <div className="px-3 pb-4">
                  <div className="rounded-xl overflow-hidden mb-2" style={{ height: '80px' }}>
                    <img src={`${IMG_A}?w=480&h=160&fit=crop`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <DashCard icon={ClipboardList} label={T('Sessions this week', 'الجلسات هذا الأسبوع')} value="12 sessions" accent />
                  <div className="mt-2">
                    <ProgressBar pct={91} label={T('Attendance rate', 'معدل الحضور')} />
                    <ProgressBar pct={84} label={T('Drills completed', 'التمارين المنجزة')} delay={0.1} />
                  </div>
                </div>
              }
            />

            {/* Row 4 — Performance Monitoring */}
            <FeatureRow
              eyebrow={T('Performance Analytics', 'تحليلات الأداء')}
              title={T('Track every athlete\'s development in real time', 'تتبع تطور كل رياضي في الوقت الفعلي')}
              desc={T(
                'Analyze match data, monitor training progress, and identify strengths and weaknesses for each athlete. Make data-driven coaching decisions with clarity.',
                'حلّل بيانات المباريات وراقب تقدم التدريب وحدد نقاط القوة والضعف لكل رياضي. اتخذ قرارات تدريب مبنية على البيانات بوضوح.'
              )}
              bullets={T(
                ['Individual athlete dashboards', 'Match & training data analytics', 'Strength & weakness reports', 'Progress milestones & alerts'],
                ['لوحات تحكم فردية للرياضيين', 'تحليلات بيانات المباريات والتدريب', 'تقارير نقاط القوة والضعف', 'معالم التقدم والتنبيهات']
              )}
              reversed={true}
              isRTL={isRTL}
              phoneContent={
                <div className="px-3 pb-4">
                  <DashCard icon={BarChart3} label={T('Team avg. score', 'متوسط نقاط الفريق')} value="+18% ↑" sub={T('vs last month', 'مقارنة بالشهر الماضي')} accent />
                  <div className="mt-2">
                    <ProgressBar pct={88} label={T('Goal achievement', 'تحقيق الأهداف')} />
                    <ProgressBar pct={76} label={T('Fitness level', 'مستوى اللياقة')} delay={0.1} />
                  </div>
                  <div className="mt-2">
                    <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Team performance', 'أداء الفريق')}</p>
                    <MiniBars />
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* ══ 6. STEPS ══ */}
        <div className="py-20" style={{ background: 'hsla(var(--primary), 0.04)' }}>
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              eyebrow={T('How it works', 'كيف يعمل')}
              title={T('Your sports journey in four steps', 'مسيرتك الرياضية في أربع خطوات')}
              subtitle={T('From creating your profile to competing at the top — get started in minutes.', 'من إنشاء ملفك إلى التنافس في القمة — ابدأ في دقائق.')}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div
                className="absolute top-8 inset-x-0 hidden lg:block h-px"
                style={{ background: 'hsla(var(--primary), 0.2)', zIndex: 0 }}
              />
              {ATHLETE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
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

        {/* ══ 7. CTA ══ */}
        <div className="pb-20 container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)' }}
          >
            {/* grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* blobs */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'hsl(var(--primary))', top: '-30%', right: isRTL ? 'auto' : '-5%', left: isRTL ? '-5%' : 'auto' }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.25, 0.12] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: '#06b6d4', bottom: '-20%', left: isRTL ? 'auto' : '8%', right: isRTL ? '8%' : 'auto' }}
            />

            {/* floating phone */}
            <div className={`absolute bottom-0 hidden lg:block ${isRTL ? 'left-6' : 'right-6'} w-48`}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <div
                  className="absolute inset-0 rounded-[2.5rem] blur-xl opacity-30 pointer-events-none"
                  style={{ background: 'hsl(var(--primary))', transform: 'scale(0.9) translateY(8px)' }}
                />
                <PhoneMockup className="w-44">
                  <div className="px-2 pb-4">
                    <div className="rounded-lg overflow-hidden mb-2" style={{ height: '70px' }}>
                      <img src={`${IMG_A}?w=300&h=140&fit=crop`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <DashCard icon={Trophy} label={T('Your ranking', 'تصنيفك')} value="#1 Regional" accent />
                  </div>
                </PhoneMockup>
              </motion.div>
            </div>

            {/* text */}
            <div className={`relative z-10 py-16 px-10 md:px-16 ${isRTL ? 'text-right lg:pe-[220px]' : 'text-left lg:pr-[220px]'}`}>
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'hsla(var(--primary), 0.25)', color: 'hsl(var(--primary))', border: '1px solid hsla(var(--primary), 0.4)' }}
              >
                {T('Get started', 'ابدأ الآن')}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-black mb-3 leading-tight" style={{ color: '#ffffff' }}>
                {T('Ready to start your sports journey?', 'هل أنت مستعد لبدء رحلتك الرياضية؟')}
              </h2>
              <p className="text-sm mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {T(
                  'Join thousands of athletes and coaches already building their careers on Tournwa — from local clubs to national teams.',
                  'انضم إلى آلاف الرياضيين والمدربين الذين يبنون مسيرتهم على Tournwa — من الأندية المحلية إلى المنتخبات الوطنية.'
                )}
              </p>
              <div className={`flex gap-3 flex-wrap items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                  to="/pricing"
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 transition-all hover:scale-[1.03] active:scale-95"
                  style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 24px hsla(var(--primary), 0.55), 0 0 0 1px hsla(var(--primary), 0.3)' }}
                >
                  {T('Get Started Free', 'ابدأ مجاناً')}
                  <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/10 active:scale-95"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
                >
                  {T('Book a Demo', 'احجز عرضاً')}
                </Link>
              </div>

              {/* social proof */}
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
                  {T('Trusted by 50,000+ athletes & coaches worldwide', 'موثوق به من قِبل أكثر من 50,000 رياضي ومدرب حول العالم')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
}