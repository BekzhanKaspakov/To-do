import Cookies from "universal-cookie";

const cookies = new Cookies();
const url = "https://todo-list-app-bekzhan.herokuapp.com";

export const getTasks = async (currentPage, perPage, sortBy, sortOrder) => {
  const paramsObject = {};
  if (currentPage) paramsObject["currentPage"] = currentPage;
  if (perPage) paramsObject["perPage"] = perPage;
  if (sortBy) paramsObject["sortBy"] = sortBy;
  if (sortOrder) paramsObject["sortOrder"] = sortOrder;
  const params = new URLSearchParams(paramsObject);
  try {
    const response = await fetch(`${url}/api/tasks?${params.toString()}`);

    const data = await response.json();

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const addTask = async (username, email, task_text, isDone) => {
  const body = { username, email, task_text, isDone };

  const response = await fetch(`${url}/api/add-task`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
  });

  // check for error response
  if (!response.ok) {
    // get error message from body or default to response statusText
    const data = await response.json();
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  const data = await response.json();

  return data;
};

export const editTaskApi = async (newTask) => {
  const body = { ...newTask };
  const token = cookies.get("TOKEN");
  const response = await fetch(`${url}/api/edit-task`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
  });

  // check for error response
  if (!response.ok) {
    // get error message from body or default to response statusText
    if (response.status === 401)
      return Promise.reject("Unauthorized, try logging in again");
    const data = await response.json();
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  const data = await response.json();

  return data;
};

export const login = async (email, password) => {
  const body = { email, password };

  try {
    const response = await fetch(`${url}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    const returnObject = { email: data.email, token: data.token };
    if (data.role) {
      returnObject["role"] = data.role;
    }
    return returnObject;
  } catch (error) {
    return error;
  }
};

export const register = async (email, password) => {
  const body = { email, password };

  try {
    const response = await fetch(`${url}/api/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const logout = async (token) => {
  const body = { token };

  try {
    const response = await fetch(`${url}/api/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  } catch (error) {
    return error;
  }
};
