const express= require("express")
const chats=require("./data")
const dotenv=require("dotenv")
const cors=require('cors')
const app=express();
dotenv.config();

app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.get("/api",(req,res)=>{
    res.send("I am alive");
})
app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const singlechat=chats.find((c)=>c._id===req.params.id);
    res.send(singlechat);
})

app.listen(process.env.PORT,console.log(`listening in port ${process.env.PORT}`))