import InlineEdit from "components/inline-edit/inline-edit.component";
import { useDispatch, useSelector } from "react-redux";
import { editTaskStartAsync } from "store/task/task.action";
import { selectTasks } from "store/task/task.selector";
import { selectCurrentUser } from "store/user/user.selector";
import "./table-row.component.scss";

const TableRow = ({ val, index }) => {
  const user = useSelector(selectCurrentUser);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const submitTaskText = (value) => {
    dispatch(
      editTaskStartAsync(tasks, { ...val, task_text: value, isEdited: true })
    );
  };

  const onChangeIsDone = (value) => {
    dispatch(editTaskStartAsync(tasks, { ...val, isDone: value }));
  };

  return (
    <tr className={val.isDone ? "done" : undefined}>
      <th className="table-cell" scope="row">
        {index + 1}
      </th>
      <td className="table-cell">
        <span>{val.username}</span>
      </td>
      <td className="table-cell">
        <span>{val.email}</span>
      </td>
      <td className="table-cell">
        {user && user.role && user.role === "admin" ? (
          <InlineEdit value={val.task_text} setValue={submitTaskText} />
        ) : (
          <span>{val.task_text}</span>
        )}
      </td>
      <td className="table-cell">
        {user && user.role && user.role === "admin" && (
          <input
            className="inline-edit"
            type="checkbox"
            aria-label="Field name"
            defaultChecked={val.isDone}
            onChange={(event) => onChangeIsDone(event.target.checked)}
          />
        )}
        <span style={{ margin: "0 5px" }}>
          {val.isDone ? "Done" : "Not done"}
          <br />
          {val.isEdited ? "Отредактировано Администратором" : ""}
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
