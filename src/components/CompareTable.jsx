import { motion } from 'framer-motion';
import { Check, X, Crown, Zap, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const plansData = {
  en: [
    {
      key: 'starter',
      icon: Star,
      name: 'Starter',
      price: 'Free',
      sub: 'For individuals getting started',
      popular: false,
      cta: 'Get Started',
      features: [
        { label: 'Tournaments', value: 'Up to 8 teams / 32 players' },
        { label: 'Leagues', value: false },
        { label: 'Friendly Games & Training', value: true },
        { label: 'Formats', value: 'Basic' },
        { label: 'Seeding & Automated Draws', value: false },
        { label: 'Match Scheduling', value: 'Basic' },
        { label: 'Live Scores', value: false },
        { label: 'Live Standings & Rankings', value: false },
        { label: 'Participant Management', value: 'Basic' },
        { label: 'Registration Types', value: 'Individual / Team' },
        { label: 'Payment Collection', value: 'Basic (online)' },
        { label: 'Sponsorship Tools', value: false },
        { label: 'Analytics & Insights', value: false },
        { label: 'Branding', value: false },
        { label: 'Custom Domain', value: false },
        { label: 'Support Level', value: 'Standard' },
      ],
    },
    {
      key: 'pro',
      icon: Zap,
      name: 'Pro',
      price: 'Available Soon',
      sub: 'For growing organizers',
      popular: true,
      cta: 'Join Waitlist',
      features: [
        { label: 'Tournaments', value: 'Unlimited' },
        { label: 'Leagues', value: true },
        { label: 'Friendly Games & Training', value: true },
        { label: 'Formats', value: 'Advanced' },
        { label: 'Seeding & Automated Draws', value: true },
        { label: 'Match Scheduling', value: 'Automated' },
        { label: 'Live Scores', value: true },
        { label: 'Live Standings & Rankings', value: true },
        { label: 'Participant Management', value: 'Advanced' },
        { label: 'Registration Types', value: 'Ind. / Team / Hybrid' },
        { label: 'Payment Collection', value: 'Integrated' },
        { label: 'Sponsorship Tools', value: false },
        { label: 'Analytics & Insights', value: 'Basic' },
        { label: 'Branding', value: 'Basic (logo, colors)' },
        { label: 'Custom Domain', value: false },
        { label: 'Support Level', value: 'Priority' },
      ],
    },
    {
      key: 'elite',
      icon: Crown,
      name: 'Elite',
      price: 'Available Soon',
      sub: 'For organizations & federations',
      popular: false,
      cta: 'Contact Us',
      features: [
        { label: 'Tournaments', value: 'Unlimited' },
        { label: 'Leagues', value: true },
        { label: 'Friendly Games & Training', value: true },
        { label: 'Formats', value: 'Advanced' },
        { label: 'Seeding & Automated Draws', value: true },
        { label: 'Match Scheduling', value: 'Automated' },
        { label: 'Live Scores', value: true },
        { label: 'Live Standings & Rankings', value: true },
        { label: 'Participant Management', value: 'Advanced' },
        { label: 'Registration Types', value: 'Full flexibility' },
        { label: 'Payment Collection', value: 'Advanced + custom' },
        { label: 'Sponsorship Tools', value: true },
        { label: 'Analytics & Insights', value: 'Advanced' },
        { label: 'Branding', value: 'Full (white-label)' },
        { label: 'Custom Domain', value: true },
        { label: 'Support Level', value: 'Dedicated' },
      ],
    },
  ],
  ar: [
    {
      key: 'starter',
      icon: Star,
      name: 'المبتدئ',
      price: 'مجاني',
      sub: 'للأفراد الذين يبدؤون للتو',
      popular: false,
      cta: 'ابدأ الآن',
      features: [
        { label: 'البطولات', value: 'حتى 8 فرق / 32 لاعب' },
        { label: 'الدوريات', value: false },
        { label: 'مباريات ودية وتدريب', value: true },
        { label: 'الصيغ', value: 'أساسي' },
        { label: 'التأهيل والقرعة التلقائية', value: false },
        { label: 'جدولة المباريات', value: 'أساسي' },
        { label: 'النتائج المباشرة', value: false },
        { label: 'الترتيب المباشر', value: false },
        { label: 'إدارة المشاركين', value: 'أساسي' },
        { label: 'أنواع التسجيل', value: 'فردي / فريق' },
        { label: 'تحصيل المدفوعات', value: 'أساسي (عبر الإنترنت)' },
        { label: 'أدوات الرعاية', value: false },
        { label: 'التحليلات والإحصاءات', value: false },
        { label: 'العلامة التجارية', value: false },
        { label: 'نطاق مخصص', value: false },
        { label: 'مستوى الدعم', value: 'عادي' },
      ],
    },
    {
      key: 'pro',
      icon: Zap,
      name: 'برو',
      price: 'قريباً',
      sub: 'للمنظمين في مرحلة النمو',
      popular: true,
      cta: 'انضم لقائمة الانتظار',
      features: [
        { label: 'البطولات', value: 'غير محدود' },
        { label: 'الدوريات', value: true },
        { label: 'مباريات ودية وتدريب', value: true },
        { label: 'الصيغ', value: 'متقدم' },
        { label: 'التأهيل والقرعة التلقائية', value: true },
        { label: 'جدولة المباريات', value: 'تلقائي' },
        { label: 'النتائج المباشرة', value: true },
        { label: 'الترتيب المباشر', value: true },
        { label: 'إدارة المشاركين', value: 'متقدم' },
        { label: 'أنواع التسجيل', value: 'فردي / فريق / مختلط' },
        { label: 'تحصيل المدفوعات', value: 'متكامل' },
        { label: 'أدوات الرعاية', value: false },
        { label: 'التحليلات والإحصاءات', value: 'أساسي' },
        { label: 'العلامة التجارية', value: 'أساسي (شعار، ألوان)' },
        { label: 'نطاق مخصص', value: false },
        { label: 'مستوى الدعم', value: 'أولوية' },
      ],
    },
    {
      key: 'elite',
      icon: Crown,
      name: 'إيليت',
      price: 'قريباً',
      sub: 'للمنظمات والاتحادات',
      popular: false,
      cta: 'تواصل معنا',
      features: [
        { label: 'البطولات', value: 'غير محدود' },
        { label: 'الدوريات', value: true },
        { label: 'مباريات ودية وتدريب', value: true },
        { label: 'الصيغ', value: 'متقدم' },
        { label: 'التأهيل والقرعة التلقائية', value: true },
        { label: 'جدولة المباريات', value: 'تلقائي' },
        { label: 'النتائج المباشرة', value: true },
        { label: 'الترتيب المباشر', value: true },
        { label: 'إدارة المشاركين', value: 'متقدم' },
        { label: 'أنواع التسجيل', value: 'مرونة كاملة' },
        { label: 'تحصيل المدفوعات', value: 'متقدم + مخصص' },
        { label: 'أدوات الرعاية', value: true },
        { label: 'التحليلات والإحصاءات', value: 'متقدم' },
        { label: 'العلامة التجارية', value: 'كاملة (white-label)' },
        { label: 'نطاق مخصص', value: true },
        { label: 'مستوى الدعم', value: 'مخصص' },
      ],
    },
  ],
};

const FeatureValue = ({ value, popular }) => {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: popular ? 'rgba(255,255,255,0.2)' : 'hsla(var(--primary), 0.12)' }}
        >
          <Check
            className="w-3.5 h-3.5"
            style={{ color: popular ? 'white' : 'hsl(var(--primary))' }}
          />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X
          className="w-4 h-4"
          style={{ color: popular ? 'rgba(255,255,255,0.3)' : 'hsl(var(--muted-foreground) / 0.3)' }}
        />
      </div>
    );
  }
  return (
    <p
      className="text-xs leading-snug text-center"
      style={{ color: popular ? 'rgba(255,255,255,0.85)' : 'hsl(var(--muted-foreground))' }}
    >
      {value}
    </p>
  );
};

export const CompareTable = () => {
  const { isRTL, language } = useLanguage();
  const plans = plansData[language] || plansData.en;

  return (
    <section
      data-testid="compare-plans-section"
      className="py-16 md:py-24 bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
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
          >
            {isRTL ? 'مقارنة الخطط' : 'Compare Plans'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
            {isRTL ? 'اختر الخطة المناسبة لك' : 'Find the right plan for your needs'}
          </h2>
          <p className="text-base text-muted-foreground">
            {isRTL ? 'قارن الميزات عبر جميع الخطط' : 'Compare features across all plans side by side'}
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, pIndex) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 * pIndex }}
                data-testid={`plan-card-${plan.key}`}
                className="relative rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: plan.popular ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                  border: plan.popular ? 'none' : '1px solid hsl(var(--border))',
                  boxShadow: plan.popular
                    ? '0 20px 60px hsla(var(--primary), 0.35)'
                    : '0 4px 24px rgba(0,0,0,0.06)',
                  marginTop: plan.popular ? '-12px' : '0',
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full`}
                  >
                    <Crown className="w-3 h-3 text-white" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-white">
                      {isRTL ? 'الأكثر شيوعاً' : 'Most Popular'}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="p-7 pb-6">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: plan.popular ? 'rgba(255,255,255,0.2)' : 'hsla(var(--primary), 0.12)' }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: plan.popular ? 'white' : 'hsl(var(--primary))' }}
                    />
                  </div>

                  <h3
                    className="font-heading text-xl font-black mb-1"
                    style={{ color: plan.popular ? 'white' : 'hsl(var(--foreground))' }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-xs mb-5"
                    style={{ color: plan.popular ? 'rgba(255,255,255,0.65)' : 'hsl(var(--muted-foreground))' }}
                  >
                    {plan.sub}
                  </p>

                  <div
                    className="text-3xl font-black mb-5"
                    style={{ color: plan.popular ? 'white' : 'hsl(var(--foreground))' }}
                  >
                    {plan.price}
                  </div>

                  <button
                    className="w-full py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      background: plan.popular ? 'white' : 'hsl(var(--primary))',
                      color: plan.popular ? 'hsl(var(--primary))' : 'white',
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="mx-7 border-t"
                  style={{ borderColor: plan.popular ? 'rgba(255,255,255,0.15)' : 'hsl(var(--border))' }}
                />

                {/* Features list */}
                <div className="p-7 pt-5 flex flex-col gap-3">
                  {plan.features.map((feat, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center justify-between gap-3"
                      data-testid={`feature-${plan.key}-${fIndex}`}
                    >
                      <span
                        className="text-xs leading-snug flex-1"
                        style={{ color: plan.popular ? 'rgba(255,255,255,0.75)' : 'hsl(var(--muted-foreground))' }}
                      >
                        {feat.label}
                      </span>
                      <div className="shrink-0 min-w-[56px] flex items-center justify-center">
                        <FeatureValue value={feat.value} popular={plan.popular} />
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};