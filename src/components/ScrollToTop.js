import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({children}) {
  const location = useLocation();

  // on page load position viewport at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
}