import { motion } from 'framer-motion';
import { Smartphone, Zap, Trophy, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const SCREEN_GROUPS   = "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/qr67z72o_group%20.png";
const SCREEN_BRACKETS = "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/5g662ih8_breackets.png";
const SCREEN_MATCH    = "https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/ugeodqnl_MATCH.png";

const valuePoints = [
  {
    icon: Zap,
    title: 'Live scores & schedules',
    titleAr: 'نتائج مباشرة وجداول',
    titleFr: 'Scores live & calendriers',
  },
  {
    icon: Trophy,
    title: 'Track your tournaments',
    titleAr: 'تتبع بطولاتك',
    titleFr: 'Suivez vos tournois',
  },
  {
    icon: Users,
    title: 'Connect with players',
    titleAr: 'تواصل مع اللاعبين',
    titleFr: 'Connectez-vous aux joueurs',
  },
  {
    icon: ShieldCheck,
    title: 'Manage your kids\' participation',
    titleAr: 'أدِر مشاركة أطفالك',
    titleFr: 'Gérez la participation de vos enfants',
  },
];

export const AppPromo = () => {
  const { isRTL, language } = useLanguage();

const getTitle = (point) => {
    if (isRTL) return point.titleAr;
    if (language === 'fr') return point.titleFr;
    return point.title;
  };

  return (
    <section
      data-testid="app-promo-section"
      className="py-20 md:py-28 relative overflow-hidden bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Grille de fond subtile — style image 2 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Fade bords */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, hsl(var(--background)) 100%)',
        }}
      />

      <div className="container mx-auto px-6 md:px-14 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── GAUCHE — texte ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Overline */}
           

            {/* Titre — grand et bold style image 2 */}
            <h2
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.05] mb-6"
              data-testid="app-promo-title"
            >
              {isRTL
                ? <>خذ تجربتك<br />الرياضية<br />أينما كنت</>
                : language === 'fr'
                ? <>Gérez vos<br />tournois<br />partout</>
                : <>Manage your<br />tournaments<br />anywhere</>
              }
            </h2>

            {/* Subtitle */}
            <p className="text-base text-muted-foreground mb-8 max-w-md leading-relaxed">
              {isRTL
                ? 'تابع البطولات، تتبع أداءك، وابقَ على تواصل — كل ذلك من جهازك المحمول.'
                : language === 'fr'
                ? 'Suivez les tournois, trackez vos performances et restez connecté — depuis votre mobile.'
                : 'Follow tournaments, track your performance, and stay connected — all from your mobile device.'}
            </p>

            {/* Checklist — style image 2 */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
              {valuePoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(var(--primary))' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {getTitle(point)}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons — pills sombres style image 2 */}
            <div className="flex flex-col sm:flex-row gap-3" data-testid="app-promo-ctas">
              {/* Google Play */}
              <a
                href="#"
                data-testid="google-play-btn-promo"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-85 active:scale-95"
                style={{
                  background: 'hsl(var(--foreground))',
                  color: 'hsl(var(--background))',
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                <div className="text-start">
                  <p className="text-[10px] leading-none opacity-60 uppercase tracking-wide">
                    {isRTL ? 'احصل عليه من' : 'Get it on'}
                  </p>
                  <p className="font-bold leading-tight">Google Play</p>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#"
                data-testid="app-store-btn-promo"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-85 active:scale-95"
                style={{
                  background: 'hsl(var(--foreground))',
                  color: 'hsl(var(--background))',
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-start">
                  <p className="text-[10px] leading-none opacity-60 uppercase tracking-wide">
                    {isRTL ? 'حمّل من' : 'Download on the'}
                  </p>
                  <p className="font-bold leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ── DROITE — phone unique grand centré style image 2 ── */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Phones échelonnés */}
            <div className="relative flex items-end gap-3 justify-center">

              {/* Phone gauche — petit, décalé */}
              <motion.div
                className="w-32 md:w-36 mb-8 relative opacity-70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <img
                  src={SCREEN_GROUPS}
                  alt="Groups standings"
                  className="w-full h-auto rounded-[2rem]"
                  style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}
                  data-testid="app-screen-groups"
                />
              </motion.div>

              {/* Phone centre — grand, devant */}
              <motion.div
                className="w-44 md:w-56 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <img
                  src={SCREEN_MATCH}
                  alt="Match schedule"
                  className="w-full h-auto rounded-[2.5rem]"
                  style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.22)' }}
                  data-testid="app-screen-match"
                />
              </motion.div>

              {/* Phone droite — petit, décalé */}
              <motion.div
                className="w-32 md:w-36 mb-8 relative opacity-70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <img
                  src={SCREEN_BRACKETS}
                  alt="Brackets view"
                  className="w-full h-auto rounded-[2rem]"
                  style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}
                  data-testid="app-screen-brackets"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};