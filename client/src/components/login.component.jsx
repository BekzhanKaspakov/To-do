import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postUserStartAsync, setError } from "store/user/user.action";
import { selectError } from "store/user/user.selector";

const defaultFormFields = {
  email: "",
  password: "",
};

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 3) {
    errors.password = "Minimum be 3 characters or more";
  }
  return errors;
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validate(formFields);
    if (Object.keys(error).length > 0) {
      dispatch(setError("login", error));
      return;
    }

    try {
      dispatch(
        postUserStartAsync("login", formFields.email, formFields.password)
      );
    } catch (error) {
      console.log("error adding food: ", error);
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      {/* email */}
      <Form.Group controlId="formLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formFields.email}
          onChange={handleChange}
          placeholder="Enter email"
          isInvalid={
            error != null && error.login != null && error.login.email != null
              ? true
              : undefined
          }
        />
        <Form.Control.Feedback type="invalid">
          {error != null && error.login != null && error.login.email}
        </Form.Control.Feedback>
      </Form.Group>

      {/* password */}
      <Form.Group controlId="formLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleChange}
          placeholder="Password"
          isInvalid={
            error != null && error.login != null && error.login.password != null
              ? true
              : undefined
          }
        />
        <Form.Control.Feedback type="invalid">
          {error != null && error.login != null && error.login.password}
        </Form.Control.Feedback>
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
      {error && error.login && error.login.loginMessage && (
        <div className="alert alert-danger" role="alert">
          {error.login.loginMessage}
        </div>
      )}
    </Form>
  );
};

export default Login;
