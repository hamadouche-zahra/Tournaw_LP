import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ContactFormModal = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    organizationType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      organizationType: '',
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const inputStyle = "w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200";
  const labelStyle = "block text-sm font-semibold text-foreground mb-1";

  return (
    <AnimatePresence>
      <style>{`
        .contact-modal-scroll::-webkit-scrollbar { display: none; }
        .contact-modal-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
        data-testid="contact-form-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl max-h-[95vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl contact-modal-scroll"
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? 'rtl' : 'ltr'}
          data-testid="contact-form-modal"
          style={{ boxShadow: '0 25px 70px -15px hsla(var(--primary), 0.25)' }}
        >
          {/* Decorative gradient glow at top */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-3xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, hsla(var(--primary), 0.15) 0%, transparent 70%)',
            }}
          />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 p-1.5 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200`}
            data-testid="contact-form-close"
            aria-label={t('contactForm.close')}
          >
            <X size={16} />
          </button>

          <div className="relative p-5 md:p-7">
            {isSuccess ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
                data-testid="contact-form-success"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'hsla(var(--primary), 0.12)',
                    boxShadow: '0 0 0 8px hsla(var(--primary), 0.06)',
                  }}
                >
                  <CheckCircle className="w-7 h-7" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {t('contactForm.successTitle')}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                  {t('contactForm.successMessage')}
                </p>
                <button
                  onClick={handleClose}
                  data-testid="contact-form-close-btn"
                  className="px-7 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: 'hsl(var(--primary))',
                    boxShadow: '0 8px 24px hsla(var(--primary), 0.35)',
                  }}
                >
                  {t('contactForm.close')}
                </button>
              </motion.div>
            ) : (
              // Form State
              <>
                <div className="mb-5">
                  <span
                    className="inline-block text-[11px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full mb-3"
                    style={{
                      background: 'hsla(var(--primary), 0.12)',
                      color: 'hsl(var(--primary))',
                      border: '1px solid hsl(var(--primary) / 0.25)',
                    }}
                  >
                    {t('nav.bookDemo')}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-black text-foreground mb-1.5 tracking-tight">
                    {t('contactForm.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t('contactForm.subtitle')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3" data-testid="contact-form">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelStyle}>
                        {t('contactForm.firstName')} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                        data-testid="contact-form-firstname"
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>
                        {t('contactForm.lastName')} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                        data-testid="contact-form-lastname"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelStyle}>
                        {t('contactForm.email')} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                        data-testid="contact-form-email"
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>
                        {t('contactForm.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputStyle}
                        data-testid="contact-form-phone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelStyle}>
                        {t('contactForm.organization')} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                        data-testid="contact-form-organization"
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>
                        {t('contactForm.organizationType')} <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleChange}
                        required
                        className={`${inputStyle} cursor-pointer`}
                        data-testid="contact-form-org-type"
                      >
                        <option value="">--</option>
                        <option value="federation">{t('contactForm.orgTypeFederation')}</option>
                        <option value="academy">{t('contactForm.orgTypeAcademy')}</option>
                        <option value="school">{t('contactForm.orgTypeSchool')}</option>
                        <option value="club">{t('contactForm.orgTypeClub')}</option>
                        <option value="individual_organizer">{t('contactForm.orgTypeIndividualOrganizer')}</option>
                        <option value="facility">{t('contactForm.orgTypeFacility')}</option>
                        <option value="athlete">{t('contactForm.orgTypeAthlete')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>
                      {t('contactForm.message')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      className={`${inputStyle} resize-none`}
                      data-testid="contact-form-message"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="contact-form-submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                    style={{
                      background: 'hsl(var(--primary))',
                      boxShadow: '0 8px 24px hsla(var(--primary), 0.35)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {t('contactForm.submitting')}
                      </>
                    ) : (
                      <>
                        {t('contactForm.submit')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};