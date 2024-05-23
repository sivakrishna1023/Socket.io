import React, { useState } from 'react'
import {Typography,Stack,Avatar,IconButton,styled,TextField,Button,Container,Paper} from "@mui/material"
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Link } from 'react-router-dom';



const SignUp = () => {
    const [isLoading,setisLoading]=useState(false);
    const handleSignUp=()=>{
       console.log("clicked")
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
                    // src={avatar.preview}
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
                 
                />

                <TextField
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  
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
