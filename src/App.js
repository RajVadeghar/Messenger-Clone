import './App.css';
import React, {useState, useEffect} from "react";
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Message from './components/Message';
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move"
import SendIcon from '@material-ui/icons/Send';
import { IconButton, DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, [] )

  useEffect(() => {
    setOpen(true);
    // setUsername(prompt("Enter your name"));
  }, [] )

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    setInput("");
  }

  const messagesList = messages.map(({id, message}) => (
    <Message key={id} username={username} message={message} />
  ))
    

  return (
    <div className="App">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            className="app__textField"
            margin="dense"
            id="name"
            label="Enter your Name"
            type="email"
            onChange={event => setUsername(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <img 
        src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=150&h=150" 
        alt="dad's image">
      </img>
      <h2 className="app__heading">Welcome <span className="app__userName">{username}</span></h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input 
            className="app__input"
            placeholder="Enter a message here..." 
            value={input} 
            onChange={event => setInput(event.target.value)} 
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
      
      <FlipMove>
        {messagesList}
      </FlipMove>

    </div>
  );
}

export default App;
