import { Button, Modal, Form } from "react-bootstrap";

function ModalComponent({
  formFields,
  show,
  handleChange,
  handleClose,
  handleSubmit,
  modalTitle,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={(event) => handleSubmit(event)}>
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(event) => {
                handleChange(event);
              }}
              name="email"
              value={formFields.email}
            />
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
            />
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
      </form>
    </Modal>
  );
}

export default ModalComponent;
