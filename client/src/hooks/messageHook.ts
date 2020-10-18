import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback((text: string | string[] | null) => {
    if (window.M && text) {
      if (Array.isArray(text)) {
        text.forEach(str => {
          const toastHTML = `<div>${str}</div>`;

          window.M.toast({ html: toastHTML });
        });
      } else {
        window.M.toast({ html: text });
      }
    }
  }, []);
};
