import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Hook utilitaire : indique si l'écran est considéré "mobile".
 *
 * Détails :
 * - utilise `matchMedia` pour écouter les changements de taille
 * - seuil : < 768px (breakpoint Tailwind classique)
 * - retourne un booléen (jamais `undefined` côté appelant)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
