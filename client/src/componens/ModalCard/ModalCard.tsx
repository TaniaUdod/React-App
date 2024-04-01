import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./ModalCard.module.css";
import TaskInfo from "../TaskInfo/TaskInfo";
import Activity from "../Activity/Activity";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  onClose: () => void;
  columnId: number;
  columnName: string;
  onAddCard: (card: {
    title: string;
    description: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
  }) => void;
}

const ModalCard: FC<ModalProps> = ({
  onClose,
  columnId,
  columnName,
  onAddCard,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
      document.body.style.overflow = "visible";
    }
  };

  const handleAddCard = (card: {
    title: string;
    description: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
  }) => {
    onAddCard(card);
    onClose();
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
        <div className={css.wrap}>
          <TaskInfo
            columnName={columnName}
            taskColumnId={columnId}
            onAddCard={handleAddCard}
          />
          <Activity />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default ModalCard;
