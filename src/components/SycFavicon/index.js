import React, { useEffect } from 'react';

export default function SycFavicon({ href }) {
  useEffect(() => {
    if (href) {
      document.getElementById('tabLogo').href = href;
    }
  }, [href]);

  return null;
}
