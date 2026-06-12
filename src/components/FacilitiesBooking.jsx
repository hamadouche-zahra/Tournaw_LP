import { motion } from 'framer-motion';
import { MapPin, Calendar, CreditCard, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FACILITY_IMG =
  'https://customer-assets.emergentagent.com/job_event-platform-54/artifacts/z1hpmmoc_ref%202.jpg';

// Real-looking profile photos from randomuser.me (free, no auth required)
const AVATARS = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/65.jpg',
  'https://randomuser.me/api/portraits/women/17.jpg',
];

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
            className="flex items-center gap-2 text-sm text-muted-foreground"
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
            <span className="font-medium">
            </span>
          </motion.div>
        </div>

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — images + stats */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {/* Main tall image */}
            <div className="relative rounded-2xl overflow-hidden h-64">
              <img
                src={FACILITY_IMG}
                alt="Sports facility"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[13px] font-bold text-white leading-snug">
                  {r(
                    'Premium courts & venues\u00a0— ready to book',
                    'ملاعب ومنشآت مميزة\u00a0— جاهزة للحجز',
                  )}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">

              {/* Stat 1 — venues count with real avatar photos */}
              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                {/* Avatar stack with real profile photos */}
                <div className="flex items-center">
                  {AVATARS.map((src, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-card overflow-hidden flex-shrink-0"
                      style={{ marginLeft: i === 0 ? 0 : -10, zIndex: AVATARS.length - i }}
                    >
                      <img
                        src={src}
                        alt={`User ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[30px] font-extrabold text-foreground leading-none mb-1">50+</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {r('Verified venues &\nsports facilities', 'منشآت رياضية\nموثوقة')}
                  </p>
                </div>
              </div>

              {/* Stat 2 — live availability */}
              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between gap-3">
                <div className="flex items-end gap-[3px] h-8">
                  {[40, 65, 45, 80, 55, 90, 60].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 5 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)',
                      }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-[30px] font-extrabold text-foreground leading-none mb-1">
                    {r('Live', 'مباشر')}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {r('Real-time availability,\nno double bookings', 'توفر فوري بدون\nتعارض في الحجوزات')}
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary image */}
            <div className="relative rounded-2xl overflow-hidden h-36">
              <img
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                alt="Padel court"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[12px] font-bold text-white leading-snug">
                  {r(
                    'Padel · Football · Basketball · and more',
                    'بادل · كرة قدم · كرة سلة · والمزيد',
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — numbered steps */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <ul className="divide-y divide-border">
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
                    className="flex items-start gap-4 py-5 first:pt-0"
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

            {/* CTA button — new style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.42 }}
              className="mt-8"
            >
           <button
            className="inline-flex items-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'hsl(var(--primary))',
              color: '#fff',
              borderRadius: 999,
              paddingLeft: 20,
              paddingRight: 6,
              paddingTop: 6,
              paddingBottom: 6,
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              }}
             >
             <span>{r('Join Waitlist', 'انضم للقائمة')}</span>
             <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.20)' }}
             >
              <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
              </span>
             </button>

           
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};