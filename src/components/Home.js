import React, { useState, useEffect } from "react";
import { Button, FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import { db } from "../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../AuthContext";
import { Alert } from "react-bootstrap";

function Home() {
  const { currentUser, logout } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [demoName, setDemoName] = useState("");

  async function handleAuthenticaton() {
    setError("");
    setDemoName("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="home">
      <div className="home__navbar shadow-sm">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className="home__image"
            src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?"
            alt="messenger logo"
          ></img>

          <h2 className="app__heading font-weight-bold">
            Welcome{" "}
            <span className="app__userName">
              {currentUser ? currentUser.displayName : demoName}
            </span>
          </h2>
        </div>

        <div>
          <div className="app__loginContainer">
            <Link to={!currentUser && "/Login"}>
              <Button
                style={{ marginRight: "10px", marginBottom: "10px" }}
                variant="contained"
                color="primary"
                onClick={handleAuthenticaton}
              >
                {currentUser ? "Sign Out" : "Sign In"}
              </Button>
            </Link>

            {!currentUser && (
              <Button
                style={{ marginRight: "10px", marginBottom: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => setDemoName(prompt("Enter your name"))}
              >
                Demo Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {currentUser || demoName ? (
        <form className="app__form">
          <FormControl className="app__formControl">
            <Input
              className="app__input"
              placeholder="Enter a message here..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
              className="app__iconButton"
              variant="contained"
              color="primary"
              size="small"
              disabled={!input}
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      ) : (
        <p className="mt-4">
          <Link to="/Login">
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              color="primary"
              onClick={setDemoName("")}
              className="app__loginMessage"
            >
              Sign In
            </Button>
          </Link>
          to write a message
        </p>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {currentUser && (
        <Alert variant="success">
          You my friend, now have access to write a message
        </Alert>
      )}
      {demoName && (
        <Alert variant="success">
          You my friend, now have access to write a message. Refresh to Sign Out
        </Alert>
      )}
      <FlipMove style={{ padding: "5px 20px 5px 20px" }}>
        {messages.map(({ id, message }) => (
          <Message
            key={id}
            username={currentUser ? currentUser.displayName : demoName}
            message={message}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Home;
