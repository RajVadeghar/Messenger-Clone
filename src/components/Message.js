import { Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <p className="message__username">
        {!isUser && `${message.username || "Unknown User"}`}
      </p>
      <div className={isUser ? "message__userCard" : "message__guestCard"}>
        <Typography variant="h6" className="message__text" component="h2">
          <p>{message.message}</p>
          <p className="message__timestamp">
            {message.timestamp.toDate().toString().slice(0, 24)}
          </p>
        </Typography>
      </div>
    </div>
  );
});

export default Message;
