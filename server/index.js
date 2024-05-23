const express= require("express")
const chats=require("./data")
const dotenv=require("dotenv")

const app=express();
dotenv.config();

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const singlechat=chats.find((c)=>c._id===req.params.id);
    res.send(singlechat);
})

app.listen(process.env.PORT,console.log(`listening in port ${process.env.PORT}`))