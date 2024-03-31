import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./lists/listSlice";
import columnsReducer from "./column/columnSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
