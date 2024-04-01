export interface TaskCardResponse {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  taskListId: number;
  taskColumnId: number;
}

export interface CreateTaskCardDto {
  title: string;
  description?: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  taskListId: number;
  taskColumnId: number;
}

export interface UpdateTaskCardDto {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  taskColumnId?: number;
}
