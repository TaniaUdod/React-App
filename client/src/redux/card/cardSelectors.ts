import { RootState } from "../store";

export const selectAllTaskCards = (state: RootState) =>
  state.taskCards.taskCards;

export const selectTaskCardById = (id: number) => (state: RootState) => {
  return state.taskCards.taskCards.find((taskCard) => taskCard.id === id);
};

export const selectTaskCardsByColumnId =
  (taskColumnId: number) => (state: RootState) => {
    return state.taskCards.taskCards.filter(
      (taskCard) => taskCard.taskColumnId.id === taskColumnId
    );
  };

export const selectTaskCardLoading = (state: RootState) =>
  state.taskCards.loading;

export const selectTaskCardError = (state: RootState) => state.taskCards.error;
