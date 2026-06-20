import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Remet le scroll en haut de page à chaque changement de route.
 * Si l'URL contient un #hash (ex: /#pricing), on laisse le Header
 * gérer le scroll vers la section concernée — pas de reset ici.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // le Header s'occupe du scroll vers la section
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};