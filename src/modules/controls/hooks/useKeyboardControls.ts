import * as React from 'react';

interface $Props {
  togglePlaying(): void;
  toggleSearch(forced?: boolean): void;
}

export default function useKeyboardControls({togglePlaying, toggleSearch}: $Props) {
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLInputElement && event.key != 'Escape') {
        return;
      }
      switch (event.key) {
        case ' ':
          event.preventDefault();
          return togglePlaying();
        case 's':
          event.preventDefault();
          return toggleSearch();
        case 'Escape':
          event.preventDefault();
          return toggleSearch(false);
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);
}
