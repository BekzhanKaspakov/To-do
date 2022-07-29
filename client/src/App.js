import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Todo from "./routes/todo/todo.component";
import Navigation from "./components/navigation.component";
import Authentication from "./routes/auth/auth.component";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "store/user/user.selector";

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth currentUser={currentUser}>
                <Todo />
              </RequireAuth>
            }
          />
          <Route
            path="auth"
            element={
              <NotRequireAuth currentUser={currentUser}>
                <Authentication />
              </NotRequireAuth>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

function RequireAuth({ children, currentUser }) {
  let location = useLocation();

  if (currentUser == null || Object.keys(currentUser).length === 0) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

function NotRequireAuth({ children, currentUser }) {
  if (currentUser != null && Object.keys(currentUser).length > 0) {
    return <Navigate to="/" />;
  }

  return children;
}

export default App;
