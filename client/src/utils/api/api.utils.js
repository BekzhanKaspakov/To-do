export const getTasks = async (currentPage, perPage, sortBy, sortOrder) => {
  const paramsObject = {};
  if (currentPage) paramsObject["currentPage"] = currentPage;
  if (perPage) paramsObject["perPage"] = perPage;
  if (sortBy) paramsObject["sortBy"] = sortBy;
  if (sortOrder) paramsObject["sortOrder"] = sortOrder;
  const params = new URLSearchParams(paramsObject);
  try {
    const response = await fetch(`/api/tasks?${params.toString()}`);

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
  console.log(body);
  try {
    const response = await fetch(`/api/add-task`, {
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

export const editTaskApi = async (newTask) => {
  const body = { ...newTask };
  console.log(body);
  try {
    const response = await fetch(`/api/edit-task`, {
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

export const login = async (email, password) => {
  const body = { email, password };

  try {
    const response = await fetch(`/api/login`, {
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
    const response = await fetch(`/api/register`, {
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
