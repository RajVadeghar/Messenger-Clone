import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react'
import './Message.css'

const Message = forwardRef(({message, username}, ref) => {
    const isUser = username === message.username;
    const date = message.timestamp.toDate().toDateString();
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                        color="white"
                        variant="h6"
                        className="message__text"
                        component="h2"
                    >
                        <p><b>{!isUser && `${message.username || 'Unknown User'}: `}</b> {message.message}</p>
                        <span className="message__date">{date}</span>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
