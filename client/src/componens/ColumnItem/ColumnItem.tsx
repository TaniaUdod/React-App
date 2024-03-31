import { FC, useState } from "react";
import ModalColumn from "../ModalColumn/ModalColumn";
import AddCard from "../AddCard/AddCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import css from "./ColumnItem.module.css";

interface ColumnItemProps {
  column: any;
}

const ColumnItem: FC<ColumnItemProps> = ({ column }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  const toggleAddCard = () => {
    setIsAddCardOpen(!isAddCardOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={css.wrap}>
        <h3 className={css.title}>{column.title}</h3>
        <p>cards</p>

        <button className={css.button} onClick={toggleModal}>
          <MoreVertIcon />
        </button>

        {isModalOpen && <ModalColumn onClose={toggleModal} />}
      </div>

      <div>
        <AddCard onClick={toggleAddCard} />
      </div>
    </>
  );
};

export default ColumnItem;
