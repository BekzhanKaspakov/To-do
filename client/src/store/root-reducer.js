import { combineReducers } from "redux";

import { tasksReducer } from "./task/task.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  user: userReducer,
});
