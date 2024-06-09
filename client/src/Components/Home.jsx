import React, { useEffect, useMemo, useState } from 'react'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import {io} from  'socket.io-client'
import {server} from '../constants/config'
import { blue } from '@mui/material/colors'
const Home = () => {
  console.log(server);
  const socket=useMemo(()=>io(`${server}`),[]);
  const [socketID,setSocketID]=useState("");
  const [message,setMessage]=useState("");
  const [room,setRoom]=useState("");
  const [messages,setMessages]=useState([]);
  const [roomName,setRoomName]=useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
      socket.on('update-user-list', (connectedSockets) => {
          setConnectedUsers(connectedSockets);
      });
      socket.on('update-room-list', (rooms) => {
          setAvailableRooms(rooms);
      });
      return () => {
          socket.off('update-user-list');
          socket.off('update-room-list');
      };
  }, []);

  const handleRoomSubmit=(e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName);
    setRoomName("");
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("");
  }
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("Connected",socket.id);
      setSocketID(socket.id)
    })
    socket.on("receive-message",(data)=>{
      setMessages((message)=>[...message,data])
      // console.log(data);
    })
    socket.on("welcome",(s)=>{console.log(s)})

  },[])
  return (
      <>
      <Container maxWidth="sm"  style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
     }}>
        <Typography marginBottom={'1rem'}>
          welCome to Socket.io
        </Typography>
        <Typography marginBottom={'1rem'}>
          {socketID}
        </Typography>
        <form onSubmit={handleRoomSubmit}>
        <TextField id="outlined-basic"
          label="Room Name"
          variant="outlined"
          placeholder="Enter..."
          value={roomName}
          onChange={(e)=>{setRoomName(e.target.value)}}
          size="small" 
          style={{ width: '200px', marginRight: '16px' }}
          />
          <Button type='submit' variant='Outlined'>Join</Button>
        </form>
        <form onSubmit={handleSubmit} action="" style={{flex:"column"}}>
        <TextField 
          required
          id="outlined-basic"
          label="RoomID / UserID"
          variant="outlined"
          placeholder="Enter..."
          value={room}
          onChange={(e)=>{setRoom(e.target.value)}}
          size="small" 
          style={{ width: '200px', marginRight: '16px' }}
          >
          </TextField>
          <div style={{
            display:"flex",
            flexDirection:"row"
          }} >
          <TextField id="outlined-basic"
          label="Enter Your Message"
          variant="outlined"
          placeholder="Enter..."
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          size="small" 
          style={{ width: '200px', marginRight: '16px' }}
          >
          </TextField>
          <Button type='submit' variant='Outlined'>Send</Button>
          </div>
        </form>
        <Stack>
          <Typography color={"blue"}   >List of User Available..</Typography>
          {
            connectedUsers.length>1 ? (connectedUsers.filter((room)=>room!==socketID).map((m,i)=>(
                <Typography key={i}  >{m}</Typography>
            ))):<Typography> No user Availble</Typography>
          }
        </Stack>
        <Stack>
          <Typography color={"blue"} >List of the Rooms Available</Typography>
          {
            availableRooms.length>0? (
              availableRooms.map((m,i)=>(
                  <Typography key={i}>{m}</Typography>
              ))) : <Typography>No Rooms Available </Typography>
            
          }
        </Stack>
        <Stack >
         <Typography color={"blue"}  > Messages...!!</Typography>
          {
            messages.map((m,i)=>(
              <Typography key={i} variant='h6'>
                { m}
              </Typography>
            ))
          }
        </Stack>
      </Container>
      </>
  )
}

export default Home
