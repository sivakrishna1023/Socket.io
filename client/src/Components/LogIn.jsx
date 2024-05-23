import React, { useState } from 'react'
import {Container,Paper, Typography, TextField, Button} from "@mui/material"
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [isLoading,setisLoading]=useState(false);
   
    const handleLogin = ()=>{
    
    }
  return ( <div
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
                  
                  
                  />

                  <TextField
                    required
                    fullWidth
                    label="Password"
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
  )
}

export default LogIn



