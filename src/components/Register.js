import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link, useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "./Register.css";

function Register() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <div className="register">
      <div className="register__card w-100">
        <Card>
          <Card.Body>
            <h2 clalssName="mb-5" style={{ textAlign: "center" }}>
              Sign Up
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  ref={usernameRef}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group id="email">
                <Form.Control
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>

              <Form.Row>
                <Form.Group className="mr-2" id="password">
                  <Form.Control
                    placeholder="Password"
                    type="password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>

                <Form.Group id="password-confirm">
                  <Form.Control
                    placeholder="Password Confirmation"
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
              </Form.Row>
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
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </Form>
            <div className="w-100 text-center mt-4">
              Already have an account? <Link to="/Login">Log In</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Register;
