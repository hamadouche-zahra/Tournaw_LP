import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Youtube, Shield, School, GraduationCap, Users, Award, Star, Activity } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const LOGO_LIGHT = "https://customer-assets.emergentagent.com/job_d34f459c-6fce-4979-aa1a-64d570b2fca9/artifacts/rdq092oq_logo%20PNG-03.png";
const LOGO_DARK  = "https://customer-assets.emergentagent.com/job_d34f459c-6fce-4979-aa1a-64d570b2fca9/artifacts/b665zz1q_Tournwa.png";

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const AppStoreIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const GooglePlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
  </svg>
);

// Logos de paiement
const VisaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
    <path d="M19.5 21.5h-2.7l1.7-10.5h2.7l-1.7 10.5zM30.4 11.2c-.5-.2-1.4-.4-2.5-.4-2.7 0-4.6 1.4-4.6 3.4 0 1.5 1.3 2.3 2.4 2.8 1.1.5 1.4.8 1.4 1.3 0 .7-.9 1-1.7 1-1.1 0-1.8-.2-2.7-.6l-.4-.2-.4 2.4c.6.3 1.8.5 3 .5 2.9 0 4.7-1.4 4.7-3.5 0-1.2-.7-2.1-2.3-2.8-1-.5-1.6-.8-1.6-1.3 0-.4.5-.9 1.6-.9.9 0 1.6.2 2.1.4l.3.1.4-2.2zM37.5 11h-2.1c-.6 0-1.1.2-1.4.9l-3.9 9.6h2.8l.6-1.6h3.4l.3 1.6h2.5L37.5 11zm-3.2 6.8l1.1-3.1.6 3.1h-1.7zM15.8 11l-2.6 7.2-.3-1.4c-.5-1.6-1.9-3.3-3.5-4.2l2.4 9h2.8l4.2-10.6h-3z" fill="#FFFFFF"/>
  </svg>
);

const StripeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#635BFF"/>
    <path d="M22.3 13.9c0-.7.6-1 1.5-1 1.4 0 3.1.4 4.4 1.1V10c-1.5-.6-2.9-.8-4.4-.8-3.6 0-6 1.9-6 5 0 4.9 6.7 4.1 6.7 6.2 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.4v4c1.7.7 3.4 1 4.9 1 3.7 0 6.2-1.8 6.2-5 0-5.3-6.7-4.3-6.7-6.2z" fill="#FFFFFF"/>
  </svg>
);

const PayPalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
    <path d="M20.2 10h-4.6c-.3 0-.6.2-.6.6l-1.9 11.8c0 .2.2.4.4.4h2.2c.3 0 .6-.2.6-.6l.5-3.3c0-.3.3-.6.6-.6h1.4c2.9 0 4.6-1.4 5-4.1.2-1.2 0-2.1-.6-2.8-.6-.7-1.7-1-3-1.1l-.0.7zm.5 4.1c-.2 1.6-1.5 1.6-2.7 1.6h-.7l.5-3.1c0-.2.2-.3.4-.3h.3c.8 0 1.6 0 2 .5.2.3.3.7.2 1.3z" fill="#003087"/>
    <path d="M30.5 10h-4.6c-.3 0-.6.2-.6.6l-1.9 11.8c0 .2.2.4.4.4h2.4c.3 0 .5-.2.6-.4l.5-3.5c0-.3.3-.6.6-.6h1.4c2.9 0 4.6-1.4 5-4.1.2-1.2 0-2.1-.6-2.8-.6-.7-1.6-1-2.9-1.1l-.3-.3zm.6 4.1c-.2 1.6-1.5 1.6-2.7 1.6h-.7l.5-3.1c0-.2.2-.3.4-.3h.3c.8 0 1.6 0 2 .5.3.3.4.7.2 1.3z" fill="#0070BA"/>
  </svg>
);

export const Footer = () => {
  const { t, isRTL } = useLanguage();

  const socialLinks = [
    { icon: Twitter,   label: "Twitter",   href: "#" },
    { icon: Linkedin,  label: "LinkedIn",  href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook,  label: "Facebook",  href: "#" },
    { icon: TikTokIcon,label: "TikTok",    href: "#" },
    { icon: Youtube,   label: "YouTube",   href: "#" },
  ];

  const footerLinks = [
    {
      title: t('footer.solutions'),
      links: [
        { label: t('nav.federations'),         href: "#" },
        { label: t('nav.academies'),           href: "#" },
        { label: t('nav.schools'),             href: "#" },
        { label: t('nav.clubs'),               href: "#" },
        { label: t('nav.individualOrganizers'),href: "#" },
        { label: t('nav.sportFacilities'),     href: "#" },
        { label: t('nav.athletesCoaches'),     href: "#" },
      ]
    },
    {
      title: t('footer.product'),
      links: [
        { label: t('nav.features'),    href: "#features" },
        { label: t('nav.howItWorks'),  href: "#how-it-works" },
        { label: t('nav.useCases'),    href: "#use-cases" },
        { label: t('nav.pricing'),     href: "#pricing" },
        { label: t('nav.faq'),         href: "#faq" },
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.aboutUs'),       href: "#" },
        { label: t('footer.careers'),       href: "#" },
        { label: t('nav.news'),             href: "/insights" },
        { label: t('footer.contact'),       href: "#" },
        { label: t('footer.helpSupport'),   href: "#" },
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacyPolicy'),   href: "#" },
        { label: t('footer.termsOfService'),  href: "#" },
        { label: t('footer.cookiePolicy'),    href: "#" },
      ]
    }
  ];

  const footerBgStyle = {
    background: 'rgba(28, 28, 28, 0.96)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.10)',
  };

  return (
    <footer
      data-testid="footer"
      style={footerBgStyle}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8 mb-14">

          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <a href="#" data-testid="footer-logo-link">
              <img
                src={LOGO_DARK}
                alt="Tournwa"
                className="h-10 md:h-12 w-auto mb-5"
                data-testid="footer-logo"
              />
            </a>
            <p className="font-sans text-sm text-white/60 mb-6 leading-relaxed max-w-xs" data-testid="footer-tagline">
              {t('footer.tagline')}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-7" data-testid="footer-contact">
              <p className="font-sans text-sm text-white/60">
                <span className="font-medium text-white">{t('footer.email')}:</span> hello@tournwa.com
              </p>
              <p className="font-sans text-sm text-white/60">
                <span className="font-medium text-white">{t('footer.address')}:</span> {t('footer.addressValue')}
              </p>
            </div>

            {/* Social Links — rounded */}
            <div className="flex items-center gap-2.5 mb-8" data-testid="footer-social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-[hsl(var(--primary))] hover:text-white hover:border-[hsl(var(--primary))] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* App Download Buttons — rounded */}
            <div data-testid="footer-app-downloads">
              <p className="font-sans text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                {t('footer.downloadApp')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  data-testid="app-store-link"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  <AppStoreIcon className="w-5 h-5" />
                  <div className="text-start">
                    <div className="text-[10px] leading-none opacity-60">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">{t('footer.appStore')}</div>
                  </div>
                </a>
                <a
                  href="#"
                  data-testid="google-play-link"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  <GooglePlayIcon className="w-5 h-5" />
                  <div className="text-start">
                    <div className="text-[10px] leading-none opacity-60">GET IT ON</div>
                    <div className="text-sm font-semibold leading-tight">{t('footer.googlePlay')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group, index) => (
            <div key={index} data-testid={`footer-links-${index}`}>
              <h4 className="font-heading text-xs font-semibold text-white uppercase tracking-widest mb-5">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-white/60 hover:text-[hsl(var(--primary))] transition-colors duration-200"
                      data-testid={`footer-link-${index}-${lIndex}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-white/10" data-testid="footer-payment-methods">
  <p className="font-sans text-xs font-semibold text-white/40 uppercase tracking-wider">
    {t('footer.securePayments')}
  </p>
  <div className="flex items-center gap-2">
    {[
        { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg", alt: "Visa" },
    { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg", alt: "Mastercard" },
    { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg", alt: "Stripe" },
    ].map(({ src, alt }) => (
      <div
        key={alt}
        className="flex items-center justify-center  px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
      >
        <img
          src={src}
          alt={alt}
          className="h-5 w-auto brightness-0 invert opacity-75 hover:opacity-100 transition-opacity"
        />
      </div>
    ))}
  </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-white/50" data-testid="footer-copyright">
            © {new Date().getFullYear()} Tournwa. {t('footer.copyright')}
          </p>
           <p className="font-sans text-xs text-white/40" data-testid="footer-powered-by">
            {t('footer.poweredBy')} <span className="font-semibold text-white/60">NexaVision</span>
          </p>
          <p className="font-sans text-xs text-white/50" data-testid="footer-made-with">
            {t('footer.madeWith')}
          </p>
         
        </div>
      </div>
    </footer>
  );
};