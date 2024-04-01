import { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import css from "./AddCard.module.css";
import ModalCard from "../ModalCard/ModalCard";
import TaskCard from "../TaskCard/TaskCard";

interface AddCardProps {
  columnId: number;
  columnName: string;
}

const AddCard: FC<AddCardProps> = ({ columnId, columnName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdCards, setCreatedCards] = useState<any[]>([]);

  const handleAddCard = (card: {
    title: string;
    description: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
  }) => {
    setIsModalOpen(false);
    setCreatedCards([...createdCards, card]);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className={css.add_card}>
        <AddIcon />
        Add new card
      </button>

      {isModalOpen && (
        <ModalCard
          onClose={() => setIsModalOpen(false)}
          columnName={columnName}
          columnId={columnId}
          onAddCard={handleAddCard}
        />
      )}

      {createdCards.map((card, index) => (
        <TaskCard
          key={index}
          title={card.title}
          description={card.description}
          dueDate={card.dueDate}
          priority={card.priority}
        />
      ))}
    </div>
  );
};

export default AddCard;
