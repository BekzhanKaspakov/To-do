import { createSelector } from "reselect";

const selectTasksReducer = (state) => state.tasks;

export const selectTasks = createSelector(
  [selectTasksReducer],
  (tasksSlice) => {
    return tasksSlice.tasks;
  }
);

export const selectCurrentPage = createSelector(
  [selectTasksReducer],
  (tasksSlice) => {
    return tasksSlice.currentPage;
  }
);

export const selectPerPage = createSelector(
  [selectTasksReducer],
  (tasksSlice) => {
    return tasksSlice.perPage;
  }
);

export const selectTotalCount = createSelector(
  [selectTasksReducer],
  (tasksSlice) => {
    return tasksSlice.totalCount;
  }
);

export const selectIsLoading = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.isLoading
);

export const selectSortBy = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.sortBy
);

export const selectSortOrder = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.sortOrder
);

export const selectError = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.error
);

export const selectSuccess = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.success
);
