import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectTaskListId } from "../../redux/lists/listSelectors";
import {
  selectColumns,
  selectLoading,
} from "../../redux/column/columnSelectors";
import { createTaskColumn } from "../../redux/column/columnOperation";
import AddColumn from "../../componens/AddColumn/AddColumn";
import Modal from "../../componens/Modal/Modal";
import ModalFormColumn from "../../componens/ModalFormColumn/ModalFormColumn";
import Loader from "../../componens/Loader/Loader";
import ColumnItem from "../../componens/ColumnItem/ColumnItem";
import css from "./TaskBoard.module.css";

const TaskBoard: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const taskListId = useSelector(selectTaskListId);
  const columns = useSelector(selectColumns);
  const isLoading = useSelector(selectLoading);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);

  const toggleAddColumn = () => {
    setIsAddColumnOpen(!isAddColumnOpen);
  };

  const handleFormSubmit = (data: { columnName: string }) => {
    if (taskListId !== null) {
      dispatch(createTaskColumn({ title: data.columnName, taskListId }));
      toggleAddColumn();
    }
  };

  return (
    <div>
      {columns && columns.length > 0 ? (
        <ul className={css.column_list}>
          {columns.map((column) => (
            <li key={column.id} className={css.addColumn}>
              <ColumnItem column={column} />
            </li>
          ))}
          <li className={css.addColumn}>
            <AddColumn click={toggleAddColumn} />
          </li>
        </ul>
      ) : (
        <AddColumn click={toggleAddColumn} />
      )}
      {isAddColumnOpen && (
        <Modal onClose={toggleAddColumn}>
          <ModalFormColumn onSubmit={handleFormSubmit} />
        </Modal>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default TaskBoard;
