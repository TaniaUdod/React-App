import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import css from "./ModalColumn.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskColumn,
  updateTaskColumn,
} from "../../redux/column/columnOperation";
import { AppDispatch } from "../../redux/store";
import { selectNewColumnName } from "../../redux/column/columnSelectors";

interface ModalProps {
  onClose: () => void;
  columnId: number;
  initialColumnName: string;
}

const ModalColumn: FC<ModalProps> = ({
  onClose,
  columnId,
  initialColumnName,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [columnName, setColumnName] = useState(initialColumnName);
  const newColumnName = useSelector(selectNewColumnName);

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

  const handleSave = () => {
    dispatch(updateTaskColumn({ id: columnId, title: columnName }));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteTaskColumn(columnId));
    onClose();
  };

  useEffect(() => {
    if (newColumnName) {
      setColumnName(newColumnName);
      setIsEditing(false);
    }
  }, [newColumnName]);

  return createPortal(
    <div className={css.modal_overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.wrap}>
          {isEditing ? (
            <>
              <input
                className={css.input}
                type="text"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              />
              <div className={css.button_wrap}>
                <button className={css.button} onClick={handleSave}>
                  Save
                </button>
                <button
                  className={css.button}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <button className={css.btn} onClick={() => setIsEditing(true)}>
                <EditOutlinedIcon /> Edit
              </button>
              <button className={css.btn}>
                <AddIcon /> Add new card
              </button>
              <button
                style={{ color: "#f90606" }}
                className={css.btn}
                onClick={handleDelete}
              >
                <DeleteIcon style={{ fill: "#f90606" }} /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default ModalColumn;
