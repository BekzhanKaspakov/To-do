import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTasks,
  selectCurrentPage,
  selectPerPage,
  selectTotalCount,
  selectSortBy,
  selectSortOrder,
} from "../../store/task/task.selector";
import {
  addTaskStartAsync,
  fetchTasksStartAsync,
  setCurrentPage,
  setSort,
} from "../../store/task/task.action";
import { createPages } from "../../utils/func";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/fontawesome-free-solid";
import ModalComponent from "../../components/modal.component";

fontawesome.library.add(faAngleUp, faAngleDown);

const defaultFormFields = {
  username: "",
  email: "",
  task_text: "",
  isDone: false,
};

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Minimum is 3 characters or more";
  } else if (values.username.length > 30) {
    errors.username = "Maximum is 30 characters";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.task_text) {
    errors.task_text = "Required";
  } else if (values.task_text.length < 3) {
    errors.task_text = "Minimum be 3 characters or more";
  }
  return errors;
};

const Todo = () => {
  const [show, setShow] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const currentPage = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPage);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const totalCount = useSelector(selectTotalCount);
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(fetchTasksStartAsync(currentPage, perPage, sortBy, sortOrder));
  }, [dispatch, currentPage, perPage, sortBy, sortOrder]);

  const sortHandler = (event) => {
    const newSortBy = event.currentTarget.getAttribute("data-val");
    dispatch(setSort(sortBy, sortOrder, newSortBy));
  };

  const handleClose = () => {
    setShow(false);
    resetFormFields();
  };
  const handleShow = () => setShow(true);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validate(formFields);
    if (Object.keys(error).length > 0) {
      let errorMessage = "Errors: \n";
      for (const key in error) {
        errorMessage += `${key}: ${error[key]}\n`;
      }
      alert(errorMessage);
      return;
    }

    try {
      dispatch(addTaskStartAsync(tasks, formFields));
      setShow(false);
    } catch (error) {
      console.log("error adding food: ", error);
    }
  };
  return (
    <>
      <div
        style={{
          margin: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button variant="primary" onClick={handleShow}>
          Add New Food Entry
        </Button>
        <table style={{ maxWidth: "900px" }} className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" data-val="username" onClick={sortHandler}>
                <span>User</span>
                {sortBy === "username" &&
                  (sortOrder === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-angle-up" />
                  ))}
              </th>
              <th scope="col" data-val="email" onClick={sortHandler}>
                <span>Email</span>
                {sortBy === "email" &&
                  (sortOrder === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-angle-up" />
                  ))}
              </th>
              <th scope="col" data-val="task_text" onClick={sortHandler}>
                <span>Task</span>
                {sortBy === "task_text" &&
                  (sortOrder === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-angle-up" />
                  ))}
              </th>
              <th scope="col" data-val="isDone" onClick={sortHandler}>
                <span>Status</span>
                {sortBy === "isDone" &&
                  (sortOrder === "asc" ? (
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-angle-up" />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((val, index) => (
              <tr key={val._id}>
                <th scope="row">{index + 1}</th>
                <td>{val.username}</td>
                <td>{val.email}</td>
                <td>{val.task_text}</td>
                <td>{val.isDone ? "Done" : "Not done"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pages">
          {pages.map((page, index) => (
            <span
              className={
                currentPage === page ? "btn btn-primary" : "btn btn-secondary"
              }
              key={index}
              onClick={() => dispatch(setCurrentPage(page))}
            >
              {page}
            </span>
          ))}
        </div>
      </div>
      <ModalComponent
        formFields={formFields}
        show={show}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        modalTitle="Add new task"
      ></ModalComponent>
    </>
  );
};

export default Todo;
