import React, { useEffect, useState } from 'react'
import axios from "axios"
import {server} from "../constants/config"

const Chat = () => {
    const [chats,setchats]=useState([]);
    const fetchChat=async()=>{
        const {data}=await axios.get(`${server}/api/chat`)
        console.log(data);
        setchats(data);
    }
    useEffect(()=>{
        fetchChat();
    },[])
  return (
    <div>
      {
        chats.map((c,i)=>(
            <div key={i}  >{c.chatName}</div>
        )) 
      }
    </div>
  )
}

export default Chat
