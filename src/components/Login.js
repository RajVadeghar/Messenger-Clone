import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link, useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "./Login.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }
  return (
    <div className="login">
      <div className="login__card w-100">
        <Card>
          <Card.Body>
            <h2 clalssName="mb-5" style={{ textAlign: "center" }}>
              Log In
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Control
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group id="password">
                <Form.Control
                  placeholder="Password"
                  type="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{" "}
                {loading ? "Loading..." : "Log In"}
              </Button>
            </Form>

            <div className="w-100 text-center mt-3">
              <Link to="forgot-password">forgot password</Link>
            </div>

            <div className="w-100 text-center mt-4">
              Need an account? <Link to="/Register">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
