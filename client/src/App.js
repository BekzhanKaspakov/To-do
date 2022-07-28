import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./routes/todo/todo.component";
import Navigation from "./components/navigation.component";
import Authentication from "./routes/auth/auth.component";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              // <RequireAuth currentUser={currentUser}>
              <Todo />
              // </RequireAuth>
            }
          />
          <Route
            path="auth"
            element={
              // <NotRequireAuth currentUser={currentUser}>
              <Authentication />
              // </NotRequireAuth>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
