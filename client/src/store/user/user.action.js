import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { login, register } from "utils/api/api.utils";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const postUserStart = () =>
  createAction(USER_ACTION_TYPES.POST_USER_START);

export const loginUserSuccess = (response) =>
  createAction(USER_ACTION_TYPES.LOGIN_USER_SUCCESS, response);

export const registerUserSuccess = (response) =>
  createAction(USER_ACTION_TYPES.REGISTER_USER_SUCCESS, response);

export const postUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.POST_USER_FAILED, error);

export const postUserStartAsync = (method, email, password) => {
  return async (dispatch) => {
    dispatch(postUserStart());
    try {
      let response;
      switch (method) {
        case "login":
          response = await login(email, password);
          cookies.set("TOKEN", response.token, {
            path: "/",
          });
          dispatch(loginUserSuccess(response));
          break;
        case "register":
          response = await register(email, password);
          dispatch(registerUserSuccess(response.message));
          break;
        default:
          dispatch(postUserFailed({ error: "Invalid method applied" }));
          return;
      }
    } catch (error) {
      dispatch(postUserFailed(error));
    }
  };
};