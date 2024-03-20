import  express  from "express";
import  dotenv  from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {app, server} from "./socket/socket.js";




const __dirname = path.resolve();

dotenv.config();
const PORT= process.env.PORT_BACKEND || 5000;


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get('/', (req,res)=>{
//     res.send({message: "Server is running fine"});
// });


server.listen(PORT, ()=>{
    connectDB();
    console.log(`App is listining in port ${PORT}`);
});