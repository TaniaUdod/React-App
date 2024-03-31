import { FC } from "react";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import css from "./ModalFormBoard.module.css";

interface FormValues {
  boardName: string;
}

interface ModalFormBoardProps {
  onSubmit: (data: FormValues) => void;
}

const ModalFormBoard: FC<ModalFormBoardProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitForm: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={css.wrap}>
        <label className={css.label} htmlFor="boardName">
          Board name:
        </label>
        <input
          className={css.input}
          type="text"
          id="boardName"
          {...register("boardName", { required: true } as RegisterOptions)}
        />
        {errors.boardName && (
          <span style={{ color: "rgb(233 30 8)", fontSize: "14px" }}>
            This field is required
          </span>
        )}
      </div>
      <button className={css.button} type="submit">
        Create board
      </button>
    </form>
  );
};

export default ModalFormBoard;
