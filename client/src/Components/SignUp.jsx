import React, { useState } from 'react'
import {Typography,Stack,Avatar,IconButton,styled,TextField,Button,Container,Paper} from "@mui/material"
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { server } from '../constants/config';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const SignUp = () => {
 
    const [isLoading,setisLoading]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [avatar,setAvatar]=useState("");
    const uploadPic=(pics)=>{
         if(pics===undefined){
          toast.error("No Pic found for Avatar");
          return;
         }
         console.log(pics);
         if(pics.type==='image/jpeg' || pics.type==='image/png'){
           const data=new FormData();
           data.append('file',pics);
           data.append("upload_preset",'sockets') 
           data.append("cloud_name", "dugapub8i");
        fetch("https://api.cloudinary.com/v1_1/dugapub8i/image/upload", {
              method: "post",
              body: data,
        }).then((res) => res.json()).then((data) => {
          setAvatar(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });

         }else{
          toast.error("Please Select an Image");
          return; 
         }
    }
    const handleSignUp=async(e)=>{
       e.preventDefault();
       if(!name || !email || !password || !confirmPassword){
        toast.error('Please Enter all Details');
        return;
       }
       if(password!==confirmPassword){
        toast.error('Password Not Matched');
        return;
       }
       setisLoading(true);
       try{
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const {data}=await axios.post(`${server}/api/user`,
          {
            name:name, 
            email:email, 
            password:password,
            pic:avatar
          },
          config
        );
         if(data){
          window.location.href = '/chat';
         }
       }catch(error){
          toast.error("Try again Later");
          console.log(error);
       }
       setisLoading(false);
    }
    const VisuallyHiddenInput = styled("input")({
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width: 1,
      });
  return ( <>
  <Toaster />
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
            <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      left:"2rem",
                      width: "5rem",
                      height: "5rem",
                      objectFit: "contain",
                    }}
                    src={avatar}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "2rem",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon sx={{ fontSize: 15 }}  />
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadPic(e.target.files[0])}
                        // onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {/* {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )} */}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />

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
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

                {/* {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )} */}

                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
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
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Link to={"/LogIn"}  >
                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                >
                  Login Instead
                </Button>
                </Link>
              </form>
        </Paper>
    </Container>
    
            </>
  )
}

export default SignUp
