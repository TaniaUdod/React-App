import { FC, useState } from "react";
import ModalColumn from "../ModalColumn/ModalColumn";
import AddCard from "../AddCard/AddCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import css from "./ColumnItem.module.css";
import { useSelector } from "react-redux";
import { selectTaskCardsByColumnId } from "../../redux/card/cardSelectors";

interface ColumnItemProps {
  column: any;
}

const ColumnItem: FC<ColumnItemProps> = ({ column }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cards = useSelector(selectTaskCardsByColumnId(column.id));

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={css.wrap}>
        <h3 className={css.title}>{column.title}</h3>
        <p>{cards ? cards.length : 0}</p>

        <button className={css.button} onClick={toggleModal}>
          <MoreVertIcon />
        </button>

        {isModalOpen && (
          <ModalColumn
            onClose={toggleModal}
            columnId={column.id}
            initialColumnName={column.title}
          />
        )}
      </div>

      <div>
        <AddCard columnId={column.id} columnName={column.title} />
      </div>
    </>
  );
};

export default ColumnItem;
