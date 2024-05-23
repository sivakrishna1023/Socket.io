import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import Chat from "./Components/Chat"
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
