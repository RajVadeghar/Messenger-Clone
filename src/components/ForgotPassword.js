import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
  return (
    <div className="login">
      <div className="login__card w-100">
        <Card>
          <Card.Body>
            <h2 clalssName="mb-5" style={{ textAlign: "center" }}>
              Reset Password
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required autoFocus />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
              </Button>
            </Form>

            <div className="w-100 text-center mt-3">
              <Link to="/Login">Log In</Link>
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

export default ForgotPassword;
