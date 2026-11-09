import { useEffect } from 'react';

export const useKeyboardShortcut = (keyCombo: { key: string; ctrlOrCmd?: boolean; shift?: boolean }, callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdOrCtrl = keyCombo.ctrlOrCmd ? (event.metaKey || event.ctrlKey) : true;
      const isShift = keyCombo.shift ? event.shiftKey : true;
      const isKey = event.key.toLowerCase() === keyCombo.key.toLowerCase();

      if (isCmdOrCtrl && isShift && isKey) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCombo, callback]);
};