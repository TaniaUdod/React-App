import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import css from "./ModalColumn.module.css";

interface ModalProps {
  onClose: () => void;
}

const ModalColumn: FC<ModalProps> = ({ onClose }) => {
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
        <div className={css.wrap}>
          <button className={css.btn}>
            <EditOutlinedIcon /> Edit
          </button>
          <button className={css.btn}>
            <AddIcon /> Add new card
          </button>
          <button style={{ color: "#f90606" }} className={css.btn}>
            <DeleteIcon style={{ fill: "#f90606" }} /> Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default ModalColumn;
