import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const defaultFormFields = {
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.task_text = "Required";
  } else if (values.task_text.length < 8) {
    errors.task_text = "Minimum be 8 characters or more";
  }
  return errors;
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

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
        Register
      </Button>
    </Form>
  );
};

export default Register;
