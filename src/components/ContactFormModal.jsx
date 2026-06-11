import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { X, CheckCircle } from 'lucide-react';
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        data-testid="contact-form-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border p-8"
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? 'rtl' : 'ltr'}
          data-testid="contact-form-modal"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 text-muted-foreground hover:text-foreground transition-colors`}
            data-testid="contact-form-close"
            aria-label={t('contactForm.close')}
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            // Success State
            <div className="text-center py-8" data-testid="contact-form-success">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                {t('contactForm.successTitle')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('contactForm.successMessage')}
              </p>
              <Button onClick={handleClose} data-testid="contact-form-close-btn">
                {t('contactForm.close')}
              </Button>
            </div>
          ) : (
            // Form State
            <>
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {t('contactForm.title')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('contactForm.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {t('contactForm.firstName')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                      data-testid="contact-form-firstname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {t('contactForm.lastName')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                      data-testid="contact-form-lastname"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contactForm.email')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    data-testid="contact-form-email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contactForm.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    data-testid="contact-form-phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contactForm.organization')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    data-testid="contact-form-organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contactForm.organizationType')} <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                    data-testid="contact-form-org-type"
                  >
                    <option value="">--</option>
                    <option value="club">{t('contactForm.orgTypeClub')}</option>
                    <option value="academy">{t('contactForm.orgTypeAcademy')}</option>
                    <option value="school">{t('contactForm.orgTypeSchool')}</option>
                    <option value="organizer">{t('contactForm.orgTypeOrganizer')}</option>
                    <option value="other">{t('contactForm.orgTypeOther')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('contactForm.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    data-testid="contact-form-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 py-6"
                  data-testid="contact-form-submit"
                >
                  {isSubmitting ? t('contactForm.submitting') : t('contactForm.submit')}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
