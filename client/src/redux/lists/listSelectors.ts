import { RootState } from "../store";

export const selectBoardName = (state: RootState) => state.taskList.boardName;
export const selectTaskListId = (state: RootState) => state.taskList.taskListId;
export const selectLoading = (state: RootState) => state.taskList.loading;
export const selectError = (state: RootState) => state.taskList.error;
