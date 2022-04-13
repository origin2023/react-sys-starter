import React, { useEffect } from 'react';

export default function DocTitle({ title }) {
  useEffect(() => {
    if (title && document.getElementById('docTitle')) {
      document.getElementById('docTitle').innerHTML = title;
    }
  }, [title]);

  return null;
}
