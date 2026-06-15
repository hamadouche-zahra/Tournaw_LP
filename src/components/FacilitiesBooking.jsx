import { motion } from 'framer-motion';
import { MapPin, Calendar, CreditCard, Building2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FACILITY_IMG =
  'https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/z1hpmmoc_ref%202.jpg';

const STEPS = [
  {
    icon: MapPin,
    en: { title: 'Find & Browse', desc: 'Search courts, pitches, and venues near you. Filter by sport, location, and availability.' },
    ar: { title: 'ابحث وتصفّح', desc: 'ابحث عن الملاعب والمنشآت القريبة منك حسب الرياضة والموقع.' },
  },
  {
    icon: Calendar,
    en: { title: 'Pick a Slot', desc: 'View live availability and choose your preferred date and time — no conflicts, guaranteed.' },
    ar: { title: 'اختر موعداً', desc: 'اطّلع على الفترات المتاحة في الوقت الفعلي واختر تاريخك ووقتك المفضّل.' },
  },
  {
    icon: CreditCard,
    en: { title: 'Pay & Confirm', desc: 'Pay securely online or at the venue. Instant confirmation sent directly to you.' },
    ar: { title: 'ادفع وأكّد', desc: 'ادفع بأمان إلكترونياً أو في الموقع، مع تأكيد فوري.' },
  },
  {
    icon: Building2,
    en: { title: 'Play & Manage', desc: 'Access your booking, invite teammates, and reschedule anytime from your dashboard.' },
    ar: { title: 'العب وأدر', desc: 'ادخل إلى حجزك وادعُ زملاءك وأعد الجدولة في أي وقت.' },
  },
];

export const FacilitiesBooking = () => {
  const { isRTL } = useLanguage();
  const r = (en, ar) => (isRTL ? ar : en);

  return (
    <section
      data-testid="facilities-booking-section"
      className="py-20 md:py-28 bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        {/* ── Top label row ─────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground leading-tight"
          >
            {r('Facilities Booking', 'حجز المنشآت')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span
              className="inline-block text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-5"
              style={{
                background: 'hsla(var(--primary), 0.15)',
                color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--primary) / 0.30)',
              }}
            >
              {r('Coming Soon\u00a0', 'قريباً\u00a0')}
            </span>
          </motion.div>
        </div>

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ alignItems: 'stretch' }}>

          {/* LEFT — image qui prend toute la hauteur de la colonne droite */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden shadow-2xl min-h-[400px]"
          >
            {/* Image en absolute pour remplir toute la hauteur */}
            <img
              src={FACILITY_IMG}
              alt="Sports facility - padel court"
              className="absolute inset-0 w-full h-full object-cover"
              data-testid="facilities-image"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Booking UI overlay en bas */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {isRTL ? 'حجز الملعب' : 'Court Booking'}
                    </p>
                    <p className="text-sm font-bold text-foreground">Padel Court A</p>
                  </div>
                  <div className="px-2 py-1 bg-green-500/10 rounded">
                    <p className="text-xs font-semibold text-green-600">Open</p>
                  </div>
                </div>
                {/* Mini calendar */}
                <div className="mb-2">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">June 2026</p>
                  <div className="grid grid-cols-7 gap-0.5 text-center">
                    {['M','T','W','T','F','S','S'].map((d, i) => (
                      <span key={i} className="text-[9px] font-medium text-muted-foreground">{d}</span>
                    ))}
                    {[1,2,3,4,5,6,7].map((d) => (
                      <span
                        key={d}
                        className={`text-[10px] py-0.5 rounded ${d === 4 ? 'bg-primary text-white font-bold' : 'text-foreground'}`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {['18:00', '19:00', '20:00', '21:00'].map((time) => (
                    <div
                      key={time}
                      className="flex-1 py-1.5 text-center text-xs font-medium bg-primary/10 text-primary rounded"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — numbered steps */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <ul className="divide-y divide-border h-full flex flex-col justify-between">
              {STEPS.map(({ icon: Icon, en, ar }, idx) => {
                const step = isRTL ? ar : en;
                const num = String(idx + 1).padStart(2, '0');
                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 + idx * 0.07 }}
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center flex-shrink-0 bg-background">
                      <Icon className="w-[18px] h-[18px] text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-[15px] font-bold text-foreground">{step.title}</p>
                        <span className="text-[12px] tabular-nums text-muted-foreground flex-shrink-0">
                          {num}
                        </span>
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};