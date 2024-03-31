import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import css from "../AddColumn/AddColumn.module.css";

interface AddCardProps {
  onClick: () => void;
}

const AddCard: FC<AddCardProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={css.add_card}>
        <AddIcon />
        Add new card
      </button>
    </div>
  );
};

export default AddCard;
