import { TASKS_ACTION_TYPES } from "./task.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getTasks, addTask, editTaskApi } from "../../utils/api/api.utils";
import { setCurrentUser } from "store/user/user.action";

export const setError = (error) =>
  createAction(TASKS_ACTION_TYPES.SET_ERROR, error);

export const setTasks = (payload) =>
  createAction(TASKS_ACTION_TYPES.SET_TASKS, payload);

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
      dispatch(fetchTasksFailed({ fetch: "Error fetching" }));
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

export const addTaskStart = () =>
  createAction(TASKS_ACTION_TYPES.ADD_TASK_START);

export const addTaskSuccess = (response) =>
  createAction(TASKS_ACTION_TYPES.ADD_TASK_SUCCESS, response);

export const addTaskFailed = (error) =>
  createAction(TASKS_ACTION_TYPES.ADD_TASK_FAILED, error);

export const addTaskStartAsync = (
  tasks,
  { username, email, task_text, isDone }
) => {
  return async (dispatch) => {
    dispatch(addTaskStart());
    try {
      const response = await addTask(username, email, task_text, isDone);
      dispatch(
        addTaskSuccess([
          ...tasks,
          { _id: response.id, username, email, task_text, isDone },
        ])
      );
    } catch (error) {
      dispatch(addTaskFailed({ addTask: "Error adding new task" }));
    }
  };
};

export const editTaskStart = () =>
  createAction(TASKS_ACTION_TYPES.EDIT_TASK_START);

export const editTaskSuccess = (newTasks) =>
  createAction(TASKS_ACTION_TYPES.EDIT_TASK_SUCCESS, newTasks);

export const editTaskFailed = (error) =>
  createAction(TASKS_ACTION_TYPES.EDIT_TASK_FAILED, error);

export const editTaskStartAsync = (tasks, newTask) => {
  return async (dispatch) => {
    dispatch(editTaskStart());
    try {
      await editTaskApi(newTask);
      const newTasks = tasks.map((task) =>
        task._id !== newTask._id ? task : newTask
      );
      dispatch(editTaskSuccess(newTasks));
    } catch (error) {
      dispatch(editTaskFailed({ edit: error }));
      dispatch(setCurrentUser(null));
    }
  };
};
