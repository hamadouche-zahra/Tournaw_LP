import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
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

export const Footer = () => {
  const [isDark, setIsDark] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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
      title: t('footer.product'),
      links: [
        { label: t('nav.features'),    href: "#features" },
        { label: t('nav.howItWorks'),  href: "#how-it-works" },
        { label: t('nav.useCases'),    href: "#use-cases" },
        { label: t('nav.pricing'),     href: "#pricing" },
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.aboutUs'),  href: "#" },
        { label: t('footer.careers'),  href: "#" },
        { label: t('footer.blog'),     href: "#" },
        { label: t('footer.contact'),  href: "#" },
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

  return (
    <footer
      data-testid="footer"
      className="bg-card border-t border-border"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-14">

          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <a href="#" data-testid="footer-logo-link">
              <img
                src={isDark ? LOGO_DARK : LOGO_LIGHT}
                alt="Tournwa"
                className="h-10 md:h-12 w-auto mb-5"
                data-testid="footer-logo"
              />
            </a>
            <p className="font-sans text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs" data-testid="footer-tagline">
              {t('footer.tagline')}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-7" data-testid="footer-contact">
              <p className="font-sans text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{t('footer.email')}:</span> hello@tournwa.com
              </p>
              <p className="font-sans text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{t('footer.address')}:</span> {t('footer.addressValue')}
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
                  className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* App Download Buttons — rounded */}
            <div data-testid="footer-app-downloads">
              <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {t('footer.downloadApp')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  data-testid="app-store-link"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
                >
                  <AppStoreIcon className="w-5 h-5" />
                  <div className="text-start">
                    <div className="text-[10px] leading-none opacity-70">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">{t('footer.appStore')}</div>
                  </div>
                </a>
                <a
                  href="#"
                  data-testid="google-play-link"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
                >
                  <GooglePlayIcon className="w-5 h-5" />
                  <div className="text-start">
                    <div className="text-[10px] leading-none opacity-70">GET IT ON</div>
                    <div className="text-sm font-semibold leading-tight">{t('footer.googlePlay')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group, index) => (
            <div key={index} data-testid={`footer-links-${index}`}>
              <h4 className="font-heading text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-muted-foreground" data-testid="footer-copyright">
            © {new Date().getFullYear()} Tournwa. {t('footer.copyright')}
          </p>
          <p className="font-sans text-xs text-muted-foreground" data-testid="footer-made-with">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};