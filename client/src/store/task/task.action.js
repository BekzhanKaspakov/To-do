import { TASKS_ACTION_TYPES } from "./task.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getTasks } from "../../utils/api/api.utils";

export const fetchTasksStart = () =>
  createAction(TASKS_ACTION_TYPES.FETCH_TASKS_START);

export const fetchTasksSuccess = (response) =>
  createAction(TASKS_ACTION_TYPES.FETCH_TASKS_SUCCESS, response);

export const fetchTasksFailed = (error) =>
  createAction(TASKS_ACTION_TYPES.FETCH_TASKS_FAILED, error);

export const fetchTasksStartAsync = (
  currentPage,
  perPage,
  sortBy,
  sortOrder
) => {
  return async (dispatch) => {
    dispatch(fetchTasksStart());
    try {
      const response = await getTasks(currentPage, perPage, sortBy, sortOrder);
      dispatch(fetchTasksSuccess(response));
    } catch (error) {
      dispatch(fetchTasksFailed(error));
    }
  };
};

export const setCurrentPage = (page) =>
  createAction(TASKS_ACTION_TYPES.SET_CURRENT_PAGE, page);

export const setPerPage = (perPage) =>
  createAction(TASKS_ACTION_TYPES.SET_PER_PAGE, perPage);

export const setSort = (sortBy, sortOrder, newSortBy) => {
  let newSortOrder = "asc";
  if (sortBy === newSortBy) {
    newSortOrder = sortOrder === "asc" ? "desc" : "asc";
  }
  return createAction(TASKS_ACTION_TYPES.SET_SORT, {
    sortBy: newSortBy,
    sortOrder: newSortOrder,
  });
};
