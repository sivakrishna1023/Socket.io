import React, { useState } from 'react'
import {Container,Paper, Typography, TextField, Button} from "@mui/material"
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { server } from '../constants/config';

const LogIn = () => {
    const [isLoading,setisLoading]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleLogin = async (e)=>{
      e.preventDefault();
      console.log(email, password)
      if(email==="" || password===""){
         toast.error('Please Enter all Details')
         return; 
      }
      setisLoading(true);
      try{
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const {data}=await axios.post(`${server}/api/user/login`,
          {
            email:email, 
            password:password,
          },
          config
        );
         if(data){
          window.location.href = '/chat';
         }
      }catch(error){
        console.log(error);
      }
      setisLoading(false)
      console.log("clicked");
    }
  return ( 
    <>
    <Toaster />
    <div
      style={{
        backgroundColor: "",
      }}
     >
        <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
       >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
       <>
                <Typography variant="h5">Login</Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />

                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />

                  <Button
                    sx={{
                      marginTop: "1rem",
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                  >
                    Login
                  </Button>

                  <Typography textAlign={"center"} m={"1rem"}>
                    OR
                  </Typography>

                  <Link to={'/SignUp'} >
                  <Button
                    disabled={isLoading}
                    fullWidth
                    variant="text"
                  >
                    Sign Up Instead
                  </Button>
                  </Link>

                  <Button
                    disabled={isLoading}
                    fullWidth
                    variant="text"
                  >
                    Continue As Guest User
                  </Button>
                </form>
              </>
        </Paper>
        </Container>
    </div>
    </>
  )
}

export default LogIn



