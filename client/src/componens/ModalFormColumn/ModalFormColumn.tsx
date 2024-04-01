import { FC } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import css from "./ModalFormColumn.module.css";

interface FormValues {
  columnName: string;
}

interface ModalFormColumnProps {
  onSubmit: (data: FormValues) => void;
}
const ModalFormColumn: FC<ModalFormColumnProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitForm: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={css.wrap}>
          <label className={css.label} htmlFor="columnName">
            Column name:
          </label>
          <input
            className={css.input}
            type="text"
            id="columnName"
            {...register("columnName", { required: true } as RegisterOptions)}
          />
          {errors.columnName && (
            <span style={{ color: "rgb(233 30 8)", fontSize: "14px" }}>
              This field is required
            </span>
          )}
        </div>
        <button className={css.button} type="submit">
          Create column
        </button>
      </form>
    </div>
  );
};

export default ModalFormColumn;
