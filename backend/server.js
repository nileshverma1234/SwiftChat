import  express  from "express";
import  dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js";
import messageRoutes from "./routes/messageRoutes.js";


const app = express();
const PORT= process.env.PORT_BACKEND || 5000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
// app.get('/', (req,res)=>{
//     res.send({message: "Server is running fine"});
// });


app.listen(PORT, ()=>{
    connectDB();
    console.log(`App is listining in port ${PORT}`);
});