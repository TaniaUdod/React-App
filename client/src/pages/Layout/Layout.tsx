import { Suspense, useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createTaskList } from "../../redux/lists/listOperations";
import {
  selectBoardName,
  selectLoading,
} from "../../redux/lists/listSelectors";
import Loader from "../../componens/Loader/Loader";
import TaskBoard from "../TaskBoard/TaskBoard";
import Modal from "../../componens/Modal/Modal";
import ModalForm from "../../componens/ModalFormBoard/ModalFormBoard";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
import css from "./Layout.module.css";

const Layout: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const boardName = useSelector(selectBoardName);
  const isLoading = useSelector(selectLoading);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleFormSubmit = (data: { boardName: string }) => {
    dispatch(createTaskList({ title: data.boardName }));
    setIsModalOpen(false);
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    if (boardName) {
      document.body.style.overflow = "visible";
    }
  }, [boardName]);

  return (
    <div className="container">
      <header className={css.header}>
        <h1 className={css.title}>{boardName || "My Task Board"}</h1>
        <button className={css.button}>
          <ReplayIcon />
          History
        </button>
        <button className={css.button} onClick={openModal}>
          <AddIcon />
          Create new list
        </button>
      </header>

      <Suspense fallback={<Loader />}>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <ModalForm onSubmit={handleFormSubmit} />
          </Modal>
        )}

        {boardName ? (
          /* <TaskBoard boardName={boardName} */
          <TaskBoard />
        ) : (
          <p className={css.text}>
            Before starting your project, it is essential{" "}
            <button className={css.text_accent} onClick={openModal}>
              to create a board
            </button>{" "}
            to visualize and track all the necessary tasks and milestones.
          </p>
        )}

        {isLoading && <Loader />}
      </Suspense>
    </div>
  );
};

export default Layout;
