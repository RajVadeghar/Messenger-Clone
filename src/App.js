import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/Register">
          <Register />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
