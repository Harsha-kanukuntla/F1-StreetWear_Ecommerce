// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation(); // Get the current path

  useEffect(() => {
    // Whenever the pathname changes (i.e., a new route is visited)
    // scroll to the top of the window.
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run this effect whenever pathname changes

  return null; // This component doesn't render anything itself
}

export default ScrollToTop;