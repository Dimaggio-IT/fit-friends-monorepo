import { PropsWithChildren, useCallback, useEffect } from 'react';
import './popup-window.css';

type TPopupProps = PropsWithChildren<{
  onClose?: () => void;
}>;

function Popup({ children, onClose }: TPopupProps) {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const close = (evt: KeyboardEvent | React.KeyboardEvent) => {
      if (evt.key === 'Escape' && handleClose) {
        handleClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [handleClose]);

  return (
    <div className="popup-box">
      <div className="box">{children}</div>
    </div>
  );
}

export { Popup };
