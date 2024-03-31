import { createSlice } from "@reduxjs/toolkit";
import {
  createTaskColumn,
  deleteTaskColumn,
  // fetchTaskColumns,
  updateTaskColumn,
} from "./columnOperation";

interface TaskColumn {
  id: number;
  title: string;
  taskList: { id: number };
}

interface InitialState {
  columns: TaskColumn[];
  loading: boolean;
  error: string | null;
  newColumnName: string | null;
  newColumnCardCount: number;
}

const initialState: InitialState = {
  columns: [],
  loading: false,
  error: null,
  newColumnName: null,
  newColumnCardCount: 0,
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskColumn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.columns.push(action.payload);
      })
      .addCase(createTaskColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      // .addCase(fetchTaskColumns.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchTaskColumns.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.columns = action.payload;
      // })
      // .addCase(fetchTaskColumns.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || "An error occurred";
      // })
      .addCase(updateTaskColumn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskColumn.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.columns.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.columns[index] = action.payload;
        }
      })
      .addCase(updateTaskColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(deleteTaskColumn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.columns = state.columns.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteTaskColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default columnSlice.reducer;
