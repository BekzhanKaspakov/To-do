import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { setCurrentUser } from "store/user/user.action";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "store/user/user.selector";
const cookies = new Cookies();
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    dispatch(setCurrentUser(null));
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="">Calories App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">To do list</Nav.Link>
              {currentUser ? (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/auth">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
