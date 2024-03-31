export interface TaskColumnResponse {
  id: number;
  title: string;
  taskListId: number;
}

export interface CreateTaskColumnDto {
  title: string;
  taskListId: number;
}

export interface UpdateTaskColumnDto {
  title?: string;
}
