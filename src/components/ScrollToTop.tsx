import { useEffect } from "react";
import { useLocation } from "react-router"; // or 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window
    window.scrollTo(0, 0);
  }, [pathname]); // This runs every time the path changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;