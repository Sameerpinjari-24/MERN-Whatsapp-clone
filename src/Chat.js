import React, { useState } from 'react'
import "./Chat.css"
import {IconButton, Avatar} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AttachFile, InsertEmoticon, SearchOutlined} from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import axios from './axios.js'

function Chat( {messages} ) {
  
  const [input,setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Demo app",
      timeStamp: "Nowww",
      received: false
    });

    setInput("");
  }
  
  
  return (
        <div className="chat">
           <div className="chat_header">
              <Avatar />
              <div className = "chat_headerInfo">
                <h3>Room Name</h3>
                <p>Last seen at.....</p>
              </div>
              <div className = "chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>

                    <IconButton>
                        <AttachFile/>                    
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
              </div>
           </div>
           <div className="chat_body">
             {messages.map((message)=> {
               return( 
                  <p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className='chat_name'>{message.name}</span>
                    {message.message}
                    <span className='chat_timestamp'>{message.timestamp}</span>
                  </p>
               );
             })}
            </div>

            <div className='chat_footer'>
              <InsertEmoticon/>
              <form>
                <input 
                value={input} 
                onChange={(e)=> setInput(e.target.value)} 
                placeholder="Type a message" 
                input="text"/>
                <button onClick={sendMessage} type= 'submit'>Send a message</button>
              </form>
              <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
