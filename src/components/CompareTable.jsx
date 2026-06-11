import { motion } from 'framer-motion';
import { Check, X, Crown } from 'lucide-react';
import { PopupButton } from 'react-calendly';
import { Button } from './ui/button';
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
        <div className={`w-7 h-7 flex items-center justify-center rounded-full ${isPro ? 'bg-primary/20' : 'bg-primary/10'}`}>
          <Check className="w-4 h-4 text-primary" />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X className="w-4 h-4 text-muted-foreground/30" />
      </div>
    );
  }
  return <span className={`text-sm ${isPro ? 'font-semibold text-foreground' : 'text-foreground'}`}>{value}</span>;
};

export const CompareTable = () => {
  const { isRTL } = useLanguage();

  return (
    <section
      data-testid="compare-plans-section"
      className="py-16 md:py-20 bg-muted relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] font-bold text-primary mb-4">
            {isRTL ? 'مقارنة الخطط' : 'Compare Plans'}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="compare-title">
            {isRTL ? 'اختر الخطة المناسبة لك' : 'Find the right plan for your needs'}
          </h2>
          <p className="text-base text-muted-foreground">
            {isRTL ? 'قارن الميزات عبر جميع الخطط' : 'Compare features across all plans side by side'}
          </p>
        </motion.div>

        {/* Table Container */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-x-auto bg-card border border-border" data-testid="compare-table-container">
            <table className="w-full">
              {/* Plan Headers */}
              <thead>
                <tr className="border-b border-border">
                  <th className="text-start p-5 min-w-[240px] bg-card sticky left-0 z-10">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Features</p>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.key} className={`p-5 min-w-[180px] ${plan.popular ? 'bg-primary/[0.04]' : ''}`}>
                      <div className="text-center">
                        {plan.popular && (
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider mb-2">
                            <Crown className="w-3 h-3" />
                            Most Popular
                          </div>
                        )}
                        <p className={`font-heading text-xl font-bold ${plan.popular ? 'text-primary' : 'text-foreground'}`}>
                          {plan.name}
                        </p>
                        <p className="text-sm font-semibold text-muted-foreground mt-0.5">{plan.price}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{plan.sub}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sections.map((section, sIndex) => (
                  <SectionBlock key={sIndex} section={section} sIndex={sIndex} />
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Row */}
          <div className="mt-6 bg-card border border-border p-6" data-testid="compare-cta-row">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="hidden md:block">
                <p className="text-sm font-bold text-foreground">{isRTL ? 'ابدأ الآن' : 'Get started today'}</p>
                <p className="text-xs text-muted-foreground">{isRTL ? 'اختر خطتك وابدأ' : 'Choose your plan and launch'}</p>
              </div>
              <div className="text-center">
                <Button variant="outline" className="w-full" data-testid="compare-cta-starter">
                  {isRTL ? 'ابدأ مجانًا' : 'Get Started Free'}
                </Button>
              </div>
              <div className="text-center">
                <PopupButton
                  url="https://calendly.com/tournwa/30min"
                  rootElement={document.getElementById('root')}
                  text={isRTL ? 'احجز عرضًا' : 'Book a Demo'}
                  className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-semibold px-4 py-2.5 shadow-lg shadow-primary/20"
                  data-testid="compare-cta-pro"
                />
              </div>
              <div className="text-center">
                <PopupButton
                  url="https://calendly.com/tournwa/30min"
                  rootElement={document.getElementById('root')}
                  text={isRTL ? 'تواصل مع المبيعات' : 'Contact Sales'}
                  className="inline-flex items-center justify-center w-full bg-secondary text-white hover:bg-secondary/90 transition-all text-sm font-semibold px-4 py-2.5"
                  data-testid="compare-cta-elite"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionBlock = ({ section, sIndex }) => (
  <>
    <tr className="border-b border-border">
      <td colSpan={4} className="px-5 pt-6 pb-3 bg-muted/50 sticky left-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
          data-testid={`compare-section-${sIndex}`}
        >
          <div className="w-1 h-4 bg-primary" />
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            {section.title}
          </p>
        </motion.div>
      </td>
    </tr>
    {section.features.map((feature, fIndex) => (
      <tr
        key={fIndex}
        className="border-b border-border/50 hover:bg-accent/30 transition-colors duration-150"
        data-testid={`compare-row-${sIndex}-${fIndex}`}
      >
        <td className="px-5 py-3.5 text-sm font-medium text-foreground sticky left-0 bg-card">
          {feature.name}
        </td>
        <td className="px-5 py-3.5 text-center">
          <CellValue value={feature.starter} />
        </td>
        <td className="px-5 py-3.5 text-center bg-primary/[0.04]">
          <CellValue value={feature.pro} isPro />
        </td>
        <td className="px-5 py-3.5 text-center">
          <CellValue value={feature.elite} />
        </td>
      </tr>
    ))}
  </>
);
