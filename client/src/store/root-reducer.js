import { combineReducers } from "redux";

import { tasksReducer } from "./task/task.reducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});
