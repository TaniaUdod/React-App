import { createSlice } from "@reduxjs/toolkit";
import { createTaskList } from "./listOperations";

interface TaskListState {
  boardName: string;
  taskListId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskListState = {
  boardName: "",
  taskListId: null,
  loading: false,
  error: null,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskList.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskList.fulfilled, (state, action) => {
        state.boardName = action.payload.title;
        state.taskListId = action.payload.id;
        state.loading = false;
        state.error = null;
      })
      .addCase(createTaskList.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  },
});

export default taskListSlice.reducer;
