import { motion } from 'framer-motion';
import {
  ArrowRight, Trophy, Users, CreditCard, Bell,
  Handshake, CalendarDays, CheckCircle2, BarChart3,
  ClipboardList, UserPlus, Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

/* ─── IMAGES ─── */
const IMG_A = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018';
const IMG_B = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43';

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
  { static: '1K+',  label: 'Clubs',          labelAr: 'نادي'               },
  { static: '25K+', label: 'Members',         labelAr: 'عضو'                },
  { static: '90%',  label: 'Retention Rate',  labelAr: 'معدل الاحتفاظ'     },
  { static: '3x',   label: 'Growth',          labelAr: 'النمو'              },
];

const STEPS = [
  { icon: UserPlus,     title: 'Create your club profile',      titleAr: 'أنشئ ملف ناديك',              desc: 'Set up your club, sports disciplines, and team structure in minutes.', descAr: 'أعدّ ناديك وتخصصاته الرياضية وهيكل فرقه في دقائق.' },
  { icon: Users,        title: 'Register members & teams',       titleAr: 'سجّل الأعضاء والفرق',         desc: 'Onboard members, assign coaches, and organize team rosters easily.', descAr: 'أضف الأعضاء وعيّن المدربين ونظّم قوائم الفرق بسهولة.' },
  { icon: CalendarDays, title: 'Schedule training & events',     titleAr: 'جدوِل التدريب والفعاليات',    desc: 'Plan sessions, tournaments, and club events with built-in tools.', descAr: 'خطّط للجلسات والبطولات والفعاليات بأدوات مدمجة.' },
  { icon: BarChart3,    title: 'Track performance & revenue',    titleAr: 'تتبّع الأداء والإيرادات',      desc: 'Monitor member growth, payments, and club analytics in real time.', descAr: 'راقب نمو الأعضاء والمدفوعات وتحليلات النادي فورياً.' },
];

/* ─── ATOMS ─── */
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
export default function Clubs() {
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
              <Badge>{T('Clubs', 'الأندية')}</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-5 leading-[1.1] max-w-3xl mx-auto">
                {T('Everything your sports club needs to grow', 'كل ما يحتاجه ناديك الرياضي للنمو')}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                {T(
                  'Memberships, training, competitions, payments, and communications — all in one powerful platform built for sports clubs.',
                  'العضويات والتدريب والمنافسات والمدفوعات والتواصل — كل ذلك في منصة واحدة قوية مبنية للأندية الرياضية.'
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
                  to="/clubs"
                  className="px-7 py-3 rounded-full text-sm font-semibold border border-border text-foreground transition-all hover:opacity-80 active:scale-95"
                >
                  {T('Start Free', 'ابدأ مجاناً')}
                </Link>
              </div>
            </motion.div>

            {/* ── 3 floating phones ── */}
            <div className="relative mt-14 flex items-end justify-center gap-4 md:gap-6">

              {/* Left phone */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden sm:block" style={{ marginBottom: '40px' }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                  <PhoneMockup className="w-[170px] md:w-[200px] opacity-80">
                    <div className="px-3 pb-4">
                      <p className="text-[10px] font-bold text-muted-foreground mb-2">{T('Members', 'الأعضاء')}</p>
                      <DashCard icon={Users} label={T('Total members', 'إجمالي الأعضاء')} value="1,840" sub={T('+68 this month', '+68 هذا الشهر')} />
                      <DashCard icon={Trophy} label={T('Active teams', 'الفرق النشطة')} value="14 teams" sub={T('Across 5 sports', 'عبر 5 رياضات')} />
                      <div className="mt-2">
                        <ProgressBar pct={90} label={T('Renewal rate', 'معدل التجديد')} />
                        <ProgressBar pct={84} label={T('Attendance avg', 'متوسط الحضور')} delay={0.1} />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

              {/* Center phone */}
              <motion.div
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                  <PhoneMockup className="w-[200px] md:w-[240px]">
                    <div className="px-3 pb-5">
                      <div className="rounded-2xl mb-2 overflow-hidden" style={{ height: '120px' }}>
                        <img src={`${IMG_A}?w=480&h=240&fit=crop`} alt="Club" className="w-full h-full object-cover" />
                      </div>
                      <DashCard icon={CreditCard} label={T('Revenue this month', 'الإيرادات هذا الشهر')} value="$8,420" accent />
                      <div className="mt-2 px-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Revenue trend', 'اتجاه الإيرادات')}</p>
                        <Sparkline />
                      </div>
                    </div>
                  </PhoneMockup>
                </motion.div>
              </motion.div>

              {/* Right phone */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden sm:block" style={{ marginBottom: '40px' }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                  <PhoneMockup className="w-[170px] md:w-[200px] opacity-80">
                    <div className="px-3 pb-4">
                      <p className="text-[10px] font-bold text-muted-foreground mb-2">{T('Analytics', 'التحليلات')}</p>
                      <DashCard icon={BarChart3} label={T('Sessions this month', 'الجلسات هذا الشهر')} value="142" sub={T('+18 vs last month', '+18 مقارنة بالشهر الماضي')} />
                      <div className="mt-2">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Monthly activity', 'النشاط الشهري')}</p>
                        <MiniBars />
                      </div>
                      <div className="mt-3">
                        <ProgressBar pct={87} label={T('Male members', 'الأعضاء الذكور')} />
                        <ProgressBar pct={72} label={T('Female members', 'الأعضاء الإناث')} delay={0.1} />
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

        {/* ══ 4. FEATURE ROWS ══ */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-4">
            <SectionHeading
              eyebrow={T('Platform', 'المنصة')}
              title={T('Every tool your club needs to run better', 'كل أداة يحتاجها ناديك لإدارة أفضل')}
              subtitle={T(
                'From memberships to sponsorships, one platform covers everything your club needs.',
                'من العضويات إلى الرعايات، منصة واحدة تغطي كل ما يحتاجه ناديك.'
              )}
            />
          </div>

          {/* Row 1 — Membership */}
          <FeatureRow
            eyebrow={T('Membership Management', 'إدارة العضويات')}
            title={T('Grow and retain your members effortlessly', 'نمِّ أعضاءك واحتفظ بهم بسهولة')}
            desc={T(
              'From registration to renewal, manage your entire membership lifecycle. Track participation, automate reminders, and give every member a seamless experience.',
              'من التسجيل إلى التجديد، أدِر دورة حياة عضويتك بالكامل. تتبع المشاركة وأتمت التذكيرات وامنح كل عضو تجربة سلسة.'
            )}
            bullets={T(
              ['Digital member registration', 'Automated renewal reminders', 'Member directory & profiles', 'Participation tracking'],
              ['تسجيل رقمي للأعضاء', 'تذكيرات تجديد تلقائية', 'دليل الأعضاء والملفات', 'تتبع المشاركة']
            )}
            reversed={false}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <div className="rounded-xl overflow-hidden mb-2" style={{ height: '90px' }}>
                  <img src={`${IMG_A}?w=480&h=180&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <DashCard icon={Users} label={T('Total members', 'إجمالي الأعضاء')} value="1,840" accent />
                <div className="mt-2">
                  <ProgressBar pct={90} label={T('Renewal rate', 'معدل التجديد')} />
                  <ProgressBar pct={84} label={T('Active this month', 'نشطون هذا الشهر')} delay={0.1} />
                </div>
              </div>
            }
          />

          {/* Row 2 — Payments */}
          <FeatureRow
            eyebrow={T('Payments & Billing', 'المدفوعات والفواتير')}
            title={T('Simple payments, complete financial visibility', 'مدفوعات بسيطة ورؤية مالية كاملة')}
            desc={T(
              'Collect fees online, auto-generate invoices, manage subscriptions, and get real-time financial reports. No more chasing payments.',
              'حصّل الرسوم إلكترونياً وأصدر الفواتير آلياً وأدِر الاشتراكات واحصل على تقارير مالية فورية. لا مزيد من ملاحقة المدفوعات.'
            )}
            bullets={T(
              ['Online fee collection', 'Auto-generated invoices', 'Subscription management', 'Real-time financial reports'],
              ['تحصيل رسوم إلكتروني', 'فواتير تُنشأ تلقائياً', 'إدارة الاشتراكات', 'تقارير مالية فورية']
            )}
            reversed={true}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <DashCard icon={CreditCard} label={T('Revenue this month', 'الإيرادات هذا الشهر')} value="$8,420" sub={T('+22% vs last month', '+22% مقارنة بالشهر الماضي')} accent />
                <div className="mt-2">
                  <ProgressBar pct={96} label={T('Payments collected', 'المدفوعات المُحصَّلة')} />
                  <ProgressBar pct={88} label={T('Invoices settled', 'الفواتير المسوَّاة')} delay={0.1} />
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Revenue trend', 'اتجاه الإيرادات')}</p>
                  <Sparkline />
                </div>
              </div>
            }
          />

          {/* Row 3 — Training */}
          <FeatureRow
            eyebrow={T('Training Management', 'إدارة التدريب')}
            title={T('Schedule sessions and track attendance across all sports', 'جدوِل الجلسات وتتبع الحضور عبر جميع الرياضات')}
            desc={T(
              'Handle session scheduling, track attendance, manage training programs, and assign coaches across all your club sports with ease.',
              'تعامل مع جدولة الجلسات وتتبع الحضور وإدارة برامج التدريب وتعيين المدربين عبر جميع رياضات ناديك بسهولة.'
            )}
            bullets={T(
              ['Session scheduling tools', 'Attendance tracking', 'Training program builder', 'Coach assignment & workload'],
              ['أدوات جدولة الجلسات', 'تتبع الحضور', 'منشئ برامج التدريب', 'تعيين المدربين وإدارة أعبائهم']
            )}
            reversed={false}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <div className="rounded-xl overflow-hidden mb-2" style={{ height: '80px' }}>
                  <img src={`${IMG_B}?w=480&h=160&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
                <DashCard icon={CalendarDays} label={T('Sessions this month', 'الجلسات هذا الشهر')} value="142" accent />
                <div className="mt-2">
                  <ProgressBar pct={93} label={T('Attendance rate', 'معدل الحضور')} />
                  <ProgressBar pct={100} label={T('Teams with coaches', 'فرق لديها مدربون')} delay={0.1} />
                </div>
              </div>
            }
          />

          {/* Row 4 — Communication */}
          <FeatureRow
            eyebrow={T('Communication Hub', 'مركز التواصل')}
            title={T('Keep everyone connected with one communication hub', 'أبقِ الجميع متواصلاً عبر مركز تواصل واحد')}
            desc={T(
              'Send team announcements, event reminders, and parent updates through one centralized system. Reach members instantly across all channels.',
              'أرسل إعلانات الفريق وتذكيرات الفعاليات وتحديثات أولياء الأمور عبر نظام مركزي. تواصل مع الأعضاء فوراً عبر جميع القنوات.'
            )}
            bullets={T(
              ['Instant team announcements', 'Event reminders & alerts', 'Parent communication tools', 'Multi-channel messaging'],
              ['إعلانات فورية للفريق', 'تذكيرات وتنبيهات الفعاليات', 'أدوات التواصل مع أولياء الأمور', 'مراسلة متعددة القنوات']
            )}
            reversed={true}
            isRTL={isRTL}
            phoneContent={
              <div className="px-3 pb-4">
                <DashCard icon={Bell} label={T('Notifications sent', 'إشعارات مُرسَلة')} value="520 today" sub={T('99% delivered', '99% مُستلَمة')} accent />
                <div className="mt-2">
                  <ProgressBar pct={99} label={T('Delivery rate', 'معدل التسليم')} />
                  <ProgressBar pct={88} label={T('Read rate', 'معدل القراءة')} delay={0.1} />
                </div>
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">{T('Weekly engagement', 'التفاعل الأسبوعي')}</p>
                  <MiniBars />
                </div>
              </div>
            }
          />
        </div>

        {/* ══ 5. STEPS ══ */}
        <div className="py-20" style={{ background: 'hsla(var(--primary), 0.04)' }}>
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              eyebrow={T('How it works', 'كيف يعمل')}
              title={T('Your club, set up in four steps', 'ناديك، جاهز في أربع خطوات')}
              subtitle={T('From sign-up to first session in under an hour.', 'من التسجيل إلى أول جلسة في أقل من ساعة.')}
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

        {/* ══ 6. CTA ══ */}
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
                    <DashCard icon={Trophy} label="Live" value="Match day" accent />
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
                {T('Ready to grow your club?', 'هل أنت مستعد لتنمية ناديك؟')}
              </h2>
              <p className="text-sm mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {T(
                  'Join clubs that already manage members, training, and competitions from one unified system.',
                  'انضم إلى الأندية التي تدير أعضاءها وتدريبها ومنافساتها من نظام موحّد.'
                )}
              </p>
              <div className={`flex gap-3 flex-wrap items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                  to="/contact"
                  className="px-7 py-3 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 transition-all hover:scale-[1.03] active:scale-95"
                  style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 24px hsla(var(--primary), 0.55), 0 0 0 1px hsla(var(--primary), 0.3)' }}
                >
                  {T('Book a Demo', 'احجز عرضاً')}
                  <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link
                  to="/clubs"
                  className="px-7 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/10 active:scale-95"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
                >
                  {T('Start Free', 'ابدأ مجاناً')}
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
                  {T('Trusted by 1,000+ clubs worldwide', 'موثوق به من قِبل أكثر من 1000 نادٍ حول العالم')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
}