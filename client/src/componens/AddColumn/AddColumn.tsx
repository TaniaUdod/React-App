import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import css from "./AddColumn.module.css";

interface AddColumnProps {
  click: () => void;
}

const AddColumn: FC<AddColumnProps> = ({ click }) => {
  return (
    <div>
      <button onClick={click} className={css.add_card}>
        <AddIcon />
        Add another column
      </button>
    </div>
  );
};

export default AddColumn;
