import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postUserStartAsync } from "store/user/user.action";
import { selectSuccessMessage } from "store/user/user.selector";

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
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Minimum be 8 characters or more";
  }
  return errors;
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const successMessage = useSelector(selectSuccessMessage);
  const dispatch = useDispatch();

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
      dispatch(
        postUserStartAsync("register", formFields.email, formFields.password)
      );
    } catch (error) {
      console.log("error adding food: ", error);
    }
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formRegisterEmail">
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
        <Form.Group controlId="formRegisterPassword">
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
      {successMessage && (
        <Alert key="success" variant="success">
          Successfully registered
        </Alert>
      )}
    </>
  );
};

export default Register;
