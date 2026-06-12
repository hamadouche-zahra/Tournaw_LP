import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Crown, ChevronDown } from 'lucide-react';
import { PopupButton } from 'react-calendly';
import { useLanguage } from '../i18n/LanguageContext';

const plans = [
  { key: 'starter', name: 'Starter', price: 'Free', sub: 'For individuals getting started', popular: false },
  { key: 'pro', name: 'Pro', price: 'Available Soon', sub: 'For growing organizers', popular: true },
  { key: 'elite', name: 'Elite', price: 'Available Soon', sub: 'For organizations & federations', popular: false },
];

const sections = [
  {
    title: 'Competition Management',
    features: [
      { name: 'Tournaments', starter: 'Up to 8 teams / 32 players', pro: 'Unlimited', elite: 'Unlimited' },
      { name: 'Leagues', starter: false, pro: true, elite: true },
      { name: 'Friendly Games & Training', starter: 'Unlimited', pro: 'Unlimited', elite: 'Unlimited' },
      { name: 'Formats (Knockout, Groups, Hybrid)', starter: 'Basic', pro: 'Advanced', elite: 'Advanced' },
      { name: 'Seeding & Automated Draws', starter: false, pro: true, elite: true },
      { name: 'Match Scheduling', starter: 'Basic', pro: 'Automated', elite: 'Automated' },
      { name: 'Live Scores', starter: false, pro: true, elite: true },
      { name: 'Live Standings & Rankings', starter: false, pro: true, elite: true },
    ]
  },
  {
    title: 'Registration & Participants',
    features: [
      { name: 'Participant Management', starter: 'Basic', pro: 'Advanced', elite: 'Advanced' },
      { name: 'Registration Types', starter: 'Individual / Team', pro: 'Ind. / Team / Hybrid', elite: 'Full flexibility' },
      { name: 'Event Publishing in App', starter: 'Basic', pro: 'Featured', elite: 'Priority' },
    ]
  },
  {
    title: 'Payments & Monetization',
    features: [
      { name: 'Payment Collection', starter: 'Basic (online)', pro: 'Integrated', elite: 'Advanced + custom' },
      { name: 'Personal Payment Integration', starter: false, pro: 'Add-on / Included', elite: true },
      { name: 'Sponsorship Tools', starter: false, pro: false, elite: true },
      { name: 'Analytics & Insights', starter: false, pro: 'Basic', elite: 'Advanced' },
    ]
  },
  {
    title: 'Branding & Platform',
    features: [
      { name: 'Branding', starter: false, pro: 'Basic (logo, colors)', elite: 'Full (white-label)' },
      { name: 'Custom Domain', starter: false, pro: false, elite: true },
      { name: 'Mobile App Branding', starter: false, pro: false, elite: 'Custom app' },
      { name: 'Multi-Admin Access', starter: false, pro: 'Limited', elite: 'Advanced' },
      { name: 'Multi-Organization Management', starter: false, pro: false, elite: true },
    ]
  },
  {
    title: 'Support',
    features: [
      { name: 'Support Level', starter: 'Standard', pro: 'Priority', elite: 'Dedicated' },
    ]
  },
];

const CellValue = ({ value, isPro }) => {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className="w-7 h-7 flex items-center justify-center rounded-full"
          style={{ background: isPro ? 'hsla(var(--primary), 0.18)' : 'hsla(var(--primary), 0.10)' }}
        >
          <Check className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X className="w-4 h-4 text-muted-foreground/25" />
      </div>
    );
  }
  return <span className={`text-sm ${isPro ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{value}</span>;
};

export const CompareTable = () => {
  const { isRTL } = useLanguage();
  const [openSection, setOpenSection] = useState(0);

  return (
    <section
      data-testid="compare-plans-section"
      className="py-16 md:py-24 bg-background relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
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
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            {isRTL ? 'اختر الخطة المناسبة لك' : 'Find the right plan for your needs'}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {isRTL ? 'قارن الميزات عبر جميع الخطط' : 'Compare features across all plans side by side'}
          </p>
        </motion.div>

        {/* ── Plan headers — sticky pills ──────────────────────── */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-2 mb-3 sticky top-2 z-20">
          <div />
          {plans.map((plan) => (
            <div
              key={plan.key}
              className="text-center py-3 rounded-2xl"
              style={{
                background: plan.popular ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                border: plan.popular ? 'none' : '1px solid hsl(var(--border))',
              }}
            >
              {plan.popular && (
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Crown className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Popular</span>
                </div>
              )}
              <p
                className="font-heading text-sm font-bold"
                style={{ color: plan.popular ? 'white' : 'hsl(var(--foreground))' }}
              >
                {plan.name}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: plan.popular ? 'rgba(255,255,255,0.75)' : 'hsl(var(--muted-foreground))' }}
              >
                {plan.price}
              </p>
            </div>
          ))}
        </div>

        {/* ── Sections accordéon ───────────────────────────────── */}
        <div className="space-y-3">
          {sections.map((section, sIndex) => {
            const isOpen = openSection === sIndex;
            return (
              <motion.div
                key={sIndex}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * sIndex }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  borderColor: isOpen ? 'hsl(var(--primary) / 0.30)' : 'hsl(var(--border))',
                  background: 'hsl(var(--card))',
                }}
                data-testid={`compare-section-${sIndex}`}
              >
                {/* Header section — clickable */}
                <button
                  onClick={() => setOpenSection(isOpen ? -1 : sIndex)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-5 rounded-full transition-colors duration-300"
                      style={{ background: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
                    />
                    <span className="font-heading text-sm font-bold text-foreground">
                      {section.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({section.features.length})
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  </motion.div>
                </button>

                {/* Contenu animé */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="border-t"
                        style={{ borderColor: 'hsl(var(--border))' }}
                      >
                        {section.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: 0.03 * fIndex }}
                            className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-5 py-3 border-b last:border-0 hover:bg-accent/30 transition-colors"
                            style={{ borderColor: 'hsl(var(--border) / 0.5)' }}
                            data-testid={`compare-row-${sIndex}-${fIndex}`}
                          >
                            <span className="text-sm font-medium text-foreground pr-2">
                              {feature.name}
                            </span>
                            <div className="text-center"><CellValue value={feature.starter} /></div>
                            <div
                              className="text-center rounded-lg py-1"
                              style={{ background: 'hsla(var(--primary), 0.04)' }}
                            >
                              <CellValue value={feature.pro} isPro />
                            </div>
                            <div className="text-center"><CellValue value={feature.elite} /></div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA Row ──────────────────────────────────────────── */}
 

          <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
          data-testid="insights-cta"
        >
          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">
          {isRTL ? 'ابدأ الآن' : 'Get started today'}          
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
            e{isRTL ? 'ابدأ مجانًا' : 'Get Started Free'}

            </button>
          
             <PopupButton
              url="https://calendly.com/tournwa/30min"
              rootElement={document.getElementById('root')}
              text={isRTL ? 'تواصل مع المبيعات' : 'Contact Sales'}
              className="flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all active:scale-95 hover:scale-[1.03] border text-gray-800 dark:text-white bg-white/70 dark:bg-white/[0.08] border-gray-200 dark:border-white/15 backdrop-blur-sm"
              data-testid="compare-cta-elite"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};