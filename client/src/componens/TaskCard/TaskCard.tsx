import { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import css from "./TaskCard.module.css";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
}

const TaskCard: FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  priority,
}) => {
  return (
    <div className={css.main}>
      <div className={css.header}>
        <p>{title}</p>
        <MoreVertIcon />
      </div>

      <p>{description}</p>
      <div className={css.date}>
        <CalendarTodayOutlinedIcon style={{ fontSize: "16px" }} />
        <p>{dueDate.toLocaleDateString()}</p>
      </div>

      <div className={css.priority}>
        <FiberManualRecordIcon style={{ fontSize: "8px" }} />
        <p>{priority}</p>
      </div>

      <button className={css.btn}>
        Move to:
        <KeyboardArrowDownIcon />
      </button>
    </div>
  );
};

export default TaskCard;
