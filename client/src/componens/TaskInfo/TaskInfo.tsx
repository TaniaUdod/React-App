import { FC, useState } from "react";
import css from "./TaskInfo.module.css";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createTaskCard } from "../../redux/card/cardOperations";

interface TaskInfoProps {
  taskColumnId: number;
  columnName: string;
  onAddCard: (card: {
    title: string;
    description: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
  }) => void;
}

const TaskInfo: FC<TaskInfoProps> = ({
  taskColumnId,
  columnName,
  onAddCard,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [boardName, setBoardName] = useState("Task name");
  const [description, setDescription] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value as "low" | "medium" | "high");
  };

  const handleCreateCard = () => {
    const newCard = {
      title: boardName,
      description: description,
      dueDate: startDate || new Date(),
      priority: priority,
    };

    onAddCard(newCard);

    dispatch(
      createTaskCard({
        title: boardName,
        description: description,
        dueDate: startDate || new Date(),
        priority: priority,
        taskColumnId: taskColumnId,
      })
    );

    setPriority("low");
    setStartDate(new Date());
    setBoardName("Task name");
    setDescription("");
  };

  return (
    <div className={css.wrap}>
      <div className={css.title}>
        <input
          type="text"
          className={css.boardInput}
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <button className={css.button_edit}>
          <EditOutlinedIcon />
          Edit task
        </button>
      </div>

      <div>
        <div className={css.main}>
          <div className={css.category}>
            <div className={css.category_title}>
              <LocationSearchingIcon />
              <h3>Status</h3>
            </div>

            <div className={css.category_title}>
              <CalendarTodayOutlinedIcon />
              <h3>Due date</h3>
            </div>

            <div className={css.category_title}>
              <SellOutlinedIcon />
              <h3>Priority</h3>
            </div>
          </div>

          <div className={css.variant}>
            <h4 style={{ marginBottom: "25px", fontSize: "18px" }}>
              {columnName}
            </h4>
            <DatePicker
              className={css.datePicker}
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              minDate={new Date()}
              calendarStartDay={1}
              dateFormat="EEE, d MMM"
              placeholderText="Select a date"
              autoComplete="off"
            />
            <select
              className={css.prioritySelect}
              value={priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <h3 style={{ marginBottom: "12px" }}>Description</h3>
        <textarea
          className={css.textarea}
          placeholder="Task description should be correct and uniformly designed."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className={css.button} onClick={handleCreateCard}>
        Create card
      </button>
    </div>
  );
};

export default TaskInfo;
