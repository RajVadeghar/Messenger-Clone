import { Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  const demoUser = `Guest-${username}` === message.username;

  return (
    <div
      ref={ref}
      className={`message ${(isUser || demoUser) && "message__user"}`}
    >
      <p className="message__username">
        {(!isUser || !demoUser) && `${message.username || "Unknown User"}`}
      </p>
      <div
        className={
          isUser || demoUser ? "message__userCard" : "message__guestCard"
        }
      >
        <Typography variant="h6" className="message__text" component="h2">
          <p>{message.message}</p>
          <p className="message__timestamp">
            {!isUser && !demoUser
              ? message.timestamp.toDate().toString().slice(0, 24)
              : ""}
          </p>
        </Typography>
      </div>
    </div>
  );
});

export default Message;
