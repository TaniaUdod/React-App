import { createSlice } from "@reduxjs/toolkit";
import {
  createTaskCard,
  deleteTaskCard,
  moveTaskCard,
  updateTaskCard,
} from "./cardOperations";

interface TaskCard {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  taskColumnId: { id: number };
}

interface TaskColumn {
  id: number;
  title: string;
  taskList: { id: number };
  cards: TaskCard[];
}

interface TaskCardState {
  taskCards: TaskCard[];
  loading: boolean;
  error: any;
  columns: TaskColumn[];
}

const initialState: TaskCardState = {
  taskCards: [],
  loading: false,
  error: null,
  columns: [],
};

export const taskCardSlice = createSlice({
  name: "taskCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskCard.fulfilled, (state, action) => {
        state.loading = false;
        const columnIndex = state.columns.findIndex(
          (c) => c.id === action.payload.taskColumnId
        );
        if (columnIndex !== -1) {
          state.columns[columnIndex].cards.push(action.payload);
        }
      })
      .addCase(createTaskCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskCard.fulfilled, (state, action) => {
        const index = state.taskCards.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.taskCards[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTaskCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTaskCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskCard.fulfilled, (state, action) => {
        state.loading = false;
        state.taskCards = state.taskCards.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(deleteTaskCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(moveTaskCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveTaskCard.fulfilled, (state, action) => {
        const index = state.taskCards.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.taskCards[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(moveTaskCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskCardSlice.reducer;
