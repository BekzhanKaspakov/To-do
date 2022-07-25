import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
  selectTasks,
  selectCurrentPage,
  selectPerPage,
  selectTotalCount,
  selectSortBy,
  selectSortOrder,
} from "./store/task/task.selector";
import {
  fetchTasksStartAsync,
  setCurrentPage,
  setSort,
} from "./store/task/task.action";
import { createPages } from "./utils/func";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faAngleUp, faAngleDown);

function App() {
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

  return (
    <div className="App">
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
          {/* <button className="btn btn-secondary">Previous</button>
          <button className="btn btn-primary">Next</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
