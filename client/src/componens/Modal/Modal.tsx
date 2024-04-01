import React, { useEffect, ReactNode, FC } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
      document.body.style.overflow = "visible";
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.modal_overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.close_button} onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default Modal;
