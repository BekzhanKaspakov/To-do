import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const defaultFormFields = {
  email: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // dispatch(addTaskStartAsync(tasks, formFields));
      // setShow(false);
    } catch (error) {
      console.log("error adding food: ", error);
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      {/* email */}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formFields.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </Form.Group>

      {/* password */}
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </Form.Group>

      {/* submit button */}
      <Button
        style={{ margin: "1rem 0" }}
        variant="primary"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Login
      </Button>
    </Form>
  );
};

export default Login;
