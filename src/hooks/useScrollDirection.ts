import { useEffect, useState, useCallback } from 'react';

export const useScrollDirection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  const toggleVisibility = useCallback(() => {
    setManualOverride((prev) => {
      const newValue = prev === null ? !isVisible : !prev;
      return newValue;
    });
  }, [isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      // If manual override is set, ignore scroll behavior
      if (manualOverride !== null) return;

      const currentScrollY = window.scrollY;
      
      // Show FABs at the top or when scrolling up
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide FABs
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show FABs
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, manualOverride]);

  // Apply manual override
  useEffect(() => {
    if (manualOverride !== null) {
      setIsVisible(manualOverride);
    }
  }, [manualOverride]);

  return { isVisible, toggleVisibility };
};
