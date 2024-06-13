import { useEffect, useRef, useCallback } from 'react';

const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useClickOutside;
