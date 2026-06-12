import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Check, Users, Rocket, Award, Crown, Plus, Sparkles, Gift, ArrowRight, Trophy, Palette, Star, MessageSquare, CreditCard } from 'lucide-react';
import { PopupButton } from 'react-calendly';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

export const Pricing = () => {
  const { t, isRTL } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const athletePlan = {
    id: 'athletes',
    icon: Users,
    name: t('pricing.athletesName'),
    tagline: t('pricing.athletesTagline'),
    description: t('pricing.athletesDesc'),
    price: t('pricing.free'),
    priceNote: '',
    color: 'bg-emerald-500',
    colorLight: 'bg-emerald-500/10',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-500',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    category: 'athlete',
    features: [
      { category: t('pricing.participationReg'), items: [t('pricing.athletesF1'), t('pricing.athletesF2'), t('pricing.athletesF3')] },
      { category: t('pricing.teamCareer'),        items: [t('pricing.athletesF4'), t('pricing.athletesF5'), t('pricing.athletesF6')] },
      { category: t('pricing.communityMatching'), items: [t('pricing.athletesF7'), t('pricing.athletesF8'), t('pricing.athletesF9')] },
      { category: t('pricing.athleteProfile'),    items: [t('pricing.athletesF10'), t('pricing.athletesF11'), t('pricing.athletesF12')] },
      { category: t('pricing.liveExperience'),    items: [t('pricing.athletesF13')] },
      { category: t('pricing.parentsYouth'),      items: [t('pricing.athletesF14'), t('pricing.athletesF15')] },
    ],
    cta: t('pricing.downloadApp'),
    ctaAction: 'download',
  };

  const organizerPlans = [
    {
      id: 'starter',
      icon: Rocket,
      name: t('pricing.starterName'),
      tagline: t('pricing.starterTagline'),
      description: t('pricing.starterDesc'),
      price: t('pricing.free'),
      priceNote: '',
      color: 'bg-secondary',
      colorLight: 'bg-secondary/10',
      textColor: 'text-secondary',
      borderColor: 'border-secondary',
      badgeBg: 'hsla(var(--secondary),0.15)',
      badgeText: 'hsl(var(--secondary))',
      category: 'organizer',
      features: [
        { category: t('pricing.eventManagement'), items: [t('pricing.starterF1'), t('pricing.starterF2')] },
        { category: t('pricing.coreTools'),        items: [t('pricing.starterF3'), t('pricing.starterF4'), t('pricing.starterF5')] },
        { category: t('pricing.monetization'),     items: [t('pricing.starterF6')] },
        { category: t('pricing.communication'),    items: [t('pricing.starterF7')] },
        { category: t('pricing.visibility'),       items: [t('pricing.starterF8')] },
      ],
      cta: t('pricing.getStartedFree'),
      ctaAction: 'start',
    },
    {
      id: 'pro',
      icon: Award,
      name: t('pricing.proName'),
      tagline: t('pricing.proTagline'),
      description: t('pricing.proDesc'),
      price: 'Available Soon',
      priceNote: '',
      featured: true,
      color: 'bg-primary',
      colorLight: 'bg-primary/10',
      textColor: 'text-primary',
      borderColor: 'border-primary',
      badgeBg: 'hsla(var(--primary),0.15)',
      badgeText: 'hsl(var(--primary))',
      category: 'organizer',
      includesPrevious: t('pricing.everythingInStarter'),
      features: [
        { category: t('pricing.advancedCompetition'), items: [t('pricing.proF1'), t('pricing.proF2'), t('pricing.proF3'), t('pricing.proF4')] },
        { category: t('pricing.automationLive'),      items: [t('pricing.proF5'), t('pricing.proF6'), t('pricing.proF7')] },
        { category: t('pricing.monetization'),        items: [t('pricing.proF8')] },
        { category: t('pricing.growthVisibility'),    items: [t('pricing.proF9')] },
        { category: t('pricing.brandingSupport'),     items: [t('pricing.proF10'), t('pricing.proF11')] },
      ],
      cta: t('pricing.bookDemo'),
      ctaAction: 'demo',
    },
    {
      id: 'elite',
      icon: Crown,
      name: t('pricing.eliteName'),
      tagline: t('pricing.eliteTagline'),
      description: t('pricing.eliteDesc'),
      price: 'Available Soon',
      priceNote: '',
      color: 'bg-secondary',
      colorLight: 'bg-secondary/10',
      textColor: 'text-secondary',
      borderColor: 'border-secondary',
      badgeBg: 'hsla(var(--secondary),0.15)',
      badgeText: 'hsl(var(--secondary))',
      category: 'organizer',
      includesPrevious: t('pricing.everythingInPro'),
      features: [
        { category: t('pricing.platformOwnership'),    items: [t('pricing.eliteF1'), t('pricing.eliteF2'), t('pricing.eliteF3')] },
        { category: t('pricing.mobileExperience'),     items: [t('pricing.eliteF4')] },
        { category: t('pricing.advancedManagement'),   items: [t('pricing.eliteF5'), t('pricing.eliteF6')] },
        { category: t('pricing.monetizationGrowth'),   items: [t('pricing.eliteF7'), t('pricing.eliteF8')] },
        { category: t('pricing.supportSection'),       items: [t('pricing.eliteF9'), t('pricing.eliteF10'), t('pricing.eliteF11')] },
      ],
      cta: t('pricing.contactSales'),
      ctaAction: 'calendly',
    },
  ];

  const addons = [
    { name: t('pricing.addonTournament'), price: 'AED 49–99',                    description: t('pricing.addonTournamentDesc'), icon: Trophy      },
    { name: t('pricing.addonBranding'),   price: 'AED 99/' + t('pricing.month'), description: t('pricing.addonBrandingDesc'),   icon: Palette     },
    { name: t('pricing.addonFeatured'),   price: 'AED 50–150',                   description: t('pricing.addonFeaturedDesc'),   icon: Star        },
    { name: t('pricing.addonMessaging'),  price: t('pricing.usageBased'),         description: t('pricing.addonMessagingDesc'),  icon: MessageSquare },
    { name: t('pricing.addonPayment'),    price: t('pricing.addonPaymentPrice'),  description: t('pricing.addonPaymentDesc'),    icon: CreditCard  },
  ];

  const getFilteredPlans = () => {
    if (activeFilter === 'athlete') return [athletePlan];
    if (activeFilter === 'organizer') return organizerPlans;
    return [athletePlan, ...organizerPlans];
  };

  const handleCTA = (action) => {
    if (action === 'demo') setIsContactOpen(true);
  };

  /* ── CARD — style ref photos ─────────────────────────────────────── */
  const renderPlanCard = (plan, index) => {
    const allFeatureItems = plan.features.flatMap(g => g.items);

    return (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, delay: 0.1 * index }}
        className={`relative flex flex-col rounded-2xl border bg-card transition-all duration-300 overflow-hidden ${
          plan.featured
            ? 'border-2 border-primary shadow-lg shadow-primary/10'
            : 'border-border hover:border-primary/30 shadow-sm'
        }`}
        data-testid={`pricing-plan-${plan.id}`}
      >
        {/* ── TOP SECTION ── */}
        <div className="p-6 pb-5">
          {/* Badge plan name — style ref */}
          <div className="mb-5">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: plan.badgeBg, color: plan.badgeText }}
            >
              {plan.name}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-black tracking-tight text-foreground">
              {plan.price}
            </span>
            {plan.priceNote && (
              <span className="text-sm text-muted-foreground">/{plan.priceNote}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="border-t border-border mx-6" />

        {/* ── FEATURES ── */}
        <div className="flex-1 px-6 py-5">
          {plan.includesPrevious && (
            <p className="text-sm font-semibold mb-3" style={{ color: plan.badgeText }}>
              {plan.includesPrevious}
            </p>
          )}
          <ul className="space-y-2.5">
            {allFeatureItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                <span
                  className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: plan.badgeBg }}
                >
                  <Check className="w-3 h-3" style={{ color: plan.badgeText }} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA BUTTON — full width, bottom ── */}
        <div className="px-6 pb-6 pt-2">
          {plan.ctaAction === 'calendly' ? (
            <PopupButton
              url="https://calendly.com/tournwa/30min"
              rootElement={document.getElementById('root')}
              text={plan.cta}
              className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: plan.badgeText }}
              data-testid={`pricing-cta-${plan.id}`}
            />
          ) : (
            <button
              onClick={() => handleCTA(plan.ctaAction)}
              data-testid={`pricing-cta-${plan.id}`}
              className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: plan.featured ? 'hsl(var(--primary))' : plan.badgeText,
              }}
            >
              {plan.cta}
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <section
        id="pricing"
        data-testid="pricing-section"
        className="py-16 md:py-20 lg:py-24"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-6 md:px-12">

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
        
            <span
            className="inline-block text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-5"
            style={{
              background: 'hsla(var(--primary), 0.15)',
              color: 'hsl(var(--primary))',
              border: '1px solid hsl(var(--primary) / 0.30)',
            }}
          >
            {t('pricing.overline')}
          </span>
            <h2
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              data-testid="pricing-title"
            >
              {t('pricing.title')}
            </h2>
            <p className="font-heading text-xl sm:text-2xl text-primary font-semibold mb-6">
              {t('pricing.titleSub')}
            </p>
            <p
              className="font-sans text-base lg:text-lg leading-relaxed text-muted-foreground"
              data-testid="pricing-subtitle"
            >
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12" data-testid="pricing-filter">
            <div className="inline-flex p-1.5 bg-muted rounded-full border border-border gap-1">
              {[
                { key: 'all',       label: t('pricing.filterAll'),       testId: 'filter-all'       },
                { key: 'athlete',   label: t('pricing.filterAthlete'),   testId: 'filter-athlete'   },
                { key: 'organizer', label: t('pricing.filterOrganizer'), testId: 'filter-organizer' },
              ].map(({ key, label, testId }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    activeFilter === key
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={testId}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-6 ${
                activeFilter === 'athlete'
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : activeFilter === 'organizer'
                    ? 'grid-cols-1 md:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
              }`}
              data-testid="pricing-grid"
            >
              {getFilteredPlans().map((plan, index) => renderPlanCard(plan, index))}
            </motion.div>
          </AnimatePresence>

       

          {/* Early Access */}
           {/* Early Access */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.55, delay: 0.2 }}
  className="mt-16 rounded-3xl overflow-hidden"
  style={{
    border: '1px solid hsla(var(--primary), 0.20)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
  }}
  data-testid="pricing-early-access"
>
  {/* image prend tout le bg */}
  <div className="relative min-h-[260px]">

    {/* Image full background */}
    <img
      src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80"
      alt="Sport"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />

    {/* Overlay vert semi-transparent par dessus l'image */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to right, hsla(var(--primary), 0.80) 0%, hsla(var(--primary), 0.45) 50%, hsla(var(--primary), 0.15) 100%)',
      }}
    />

    {/* Contenu par dessus */}
    <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 py-12 max-w-xl">

      {/* Titre */}
      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
        🎁 {t('pricing.earlyAccessBadge')}{' '}
        <span className="font-normal">{t('pricing.earlyAccessTitle')}</span>
      </h3>

      {/* Desc */}
      <p className="text-white/75 text-sm leading-relaxed max-w-sm mb-7">
        {t('pricing.earlyAccessDesc')}
      </p>

      {/* CTA */}
      <div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsContactOpen(true)}
          data-testid="early-access-cta"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white transition-all"
          style={{
            background: 'hsl(var(--primary))',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.20)',
          }}
        >
          {t('pricing.earlyAccessCta')}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

    </div>
  </div>

</motion.div>

        </div>
      </section>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};