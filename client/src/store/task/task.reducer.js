import { TASKS_ACTION_TYPES } from "./task.types";

export const TASKS_INITIAL_STATE = {
  tasks: [],
  isLoading: false,
  error: null,
  success: null,
  currentPage: 1,
  perPage: 3,
  totalCount: 0,
  sortBy: "_id",
  sortOrder: "asc",
};

export const tasksReducer = (state = TASKS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TASKS_ACTION_TYPES.TASK_ACTION_START:
      return {
        ...state,
        isLoading: true,
      };
    case TASKS_ACTION_TYPES.TASK_ACTION_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case TASKS_ACTION_TYPES.TASK_ACTION_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        totalCount: payload.totalCount ?? state.totalCount,
        success: payload.success,
      };
    case TASKS_ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case TASKS_ACTION_TYPES.SET_SORT:
      return {
        ...state,
        sortBy: payload.sortBy,
        sortOrder: payload.sortOrder,
      };
    case TASKS_ACTION_TYPES.SET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case TASKS_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
