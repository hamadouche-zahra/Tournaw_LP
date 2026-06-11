import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const FAQ = () => {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
  ];

  return (
    <section
      id="faq"
      data-testid="faq-section"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="py-16 md:py-24 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── COLONNE GAUCHE ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-32">

            {/* Badge FAQ */}
            <div className="mb-6">
             <span
               className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
               style={{
                background: 'hsla(var(--primary), 0.15)',
                color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--primary))',
               }}
              >
             {t('faq.overline')}
            </span>
            </div>
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-5 text-foreground"
              data-testid="faq-title"
            >
              {t('faq.title')}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* ── COLONNE DROITE — liste cards ───────────────────── */}
          <div className="flex flex-col gap-3" data-testid="faq-accordion">
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <div
                  key={index}
                  data-testid={`faq-item-${index}`}
                  className="rounded-2xl border transition-all duration-200"
                  style={{
                    borderColor: isOpen
                      ? 'hsl(var(--primary) / 0.35)'
                      : 'hsl(var(--border))',
                    background: 'hsl(var(--card))',
                  }}
                >
                  {/* Trigger */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                    data-testid={`faq-trigger-${index}`}
                  >
                    {/* Icône +/× */}
                    <span
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors"
                      style={{ color: 'hsl(var(--primary))' }}
                    >
                      {isOpen
                        ? <X size={15} strokeWidth={2.5} />
                        : <Plus size={15} strokeWidth={2.5} />
                      }
                    </span>

                    {/* Question */}
                    <span
                      className="text-sm sm:text-base font-semibold leading-snug transition-colors"
                      style={{
                        color: isOpen
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--foreground))',
                      }}
                    >
                      {faq.question}
                    </span>
                  </button>

                  {/* Réponse — inline dans la card */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <div
                        className="w-full h-px mb-4"
                        style={{ background: 'hsl(var(--border))' }}
                      />
                      <p
                        className="text-sm leading-relaxed pl-10"
                        style={{ color: 'hsl(var(--muted-foreground))' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};