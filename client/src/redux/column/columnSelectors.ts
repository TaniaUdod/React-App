import { RootState } from "../store";

export const selectColumns = (state: RootState) => state.columns.columns;
export const selectNewColumnName = (state: RootState) =>
  state.columns.newColumnName;
export const selectNewColumnCardCount = (state: RootState) =>
  state.columns.newColumnCardCount;
export const selectLoading = (state: RootState) => state.columns.loading;
export const selectError = (state: RootState) => state.columns.error;
