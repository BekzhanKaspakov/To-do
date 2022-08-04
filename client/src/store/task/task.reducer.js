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
    case TASKS_ACTION_TYPES.FETCH_TASKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case TASKS_ACTION_TYPES.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: payload.items,
        totalCount: payload.totalCount,
      };
    case TASKS_ACTION_TYPES.FETCH_TASKS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case TASKS_ACTION_TYPES.ADD_TASK_START:
      return {
        ...state,
        isLoading: true,
      };
    case TASKS_ACTION_TYPES.ADD_TASK_SUCCESS:
      return {
        ...state,
        success: { addMessage: "New task successfully added" },
        isLoading: false,
        tasks: payload,
        totalCount: state.totalCount + 1,
      };
    case TASKS_ACTION_TYPES.ADD_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case TASKS_ACTION_TYPES.EDIT_TASK_START:
      return {
        ...state,
        isLoading: true,
      };
    case TASKS_ACTION_TYPES.EDIT_TASK_SUCCESS:
      return {
        ...state,
        success: { editMessage: "Edit task successfully added" },
        isLoading: false,
        tasks: payload,
      };
    case TASKS_ACTION_TYPES.EDIT_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
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
