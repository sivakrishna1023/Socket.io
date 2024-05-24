const express= require("express")
const chats=require("./data")
const dotenv=require("dotenv")
const cors=require('cors')
const app=express();
dotenv.config();
const connectDB=require('./config/db')
const userRoutes=require('./Routes/UserRoutes')
const {notFound}=require("./middleware/errorMiddleware")
const {errorHandler}=require("./middleware/errorMiddleware")

app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use("/api/user",userRoutes);
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("I am alive");
})
app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const singlechat=chats.find((c)=>c._id===req.params.id);
    res.send(singlechat);
})
app.use(notFound)
app.use(errorHandler)
connectDB();
app.listen(process.env.PORT,console.log(`listening in port ${process.env.PORT}`))