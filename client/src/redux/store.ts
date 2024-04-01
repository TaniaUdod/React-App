import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./lists/listSlice";
import columnsReducer from "./column/columnSlice";
import taskCardsReducer from "./card/cardSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
    columns: columnsReducer,
    taskCards: taskCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
