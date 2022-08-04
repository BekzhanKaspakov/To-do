import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectError } from "store/task/task.selector";

function ModalComponent({
  formFields,
  show,
  handleChange,
  handleClose,
  handleSubmit,
  modalTitle,
}) {
  const error = useSelector(selectError);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>User</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Enter Name"
              onChange={(event) => {
                handleChange(event);
              }}
              name="username"
              value={formFields.username}
              isInvalid={
                error != null && error.username != null ? true : undefined
              }
            />
            <Form.Control.Feedback type="invalid">
              {error && error.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(event) => {
                handleChange(event);
              }}
              name="email"
              value={formFields.email}
              isInvalid={
                error != null && error.task_text != null ? true : undefined
              }
            />
            <Form.Control.Feedback type="invalid">
              {error && error.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTaskText">
            <Form.Label>Task</Form.Label>
            <Form.Control
              as="textarea"
              autoComplete="off"
              placeholder="Enter Task"
              onChange={(event) => {
                handleChange(event);
              }}
              name="task_text"
              value={formFields.task_text}
              isInvalid={
                error != null && error.task_text != null ? true : undefined
              }
            />
            <Form.Control.Feedback type="invalid">
              {error && error.task_text}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIsDone">
            <Form.Check
              label="Task"
              type="checkbox"
              onChange={(event) => {
                handleChange(event);
              }}
              name="isDone"
              value={formFields.isDone}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalComponent;
