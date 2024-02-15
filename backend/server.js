import  express  from "express";
import  dotenv  from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js";

const app = express();
const PORT= process.env.PORT_BACKEND || 5000;
dotenv.config();

app.use(express.json());

app.use('/api/auth',authRoutes);

// app.get('/', (req,res)=>{
//     res.send({message: "Server is running fine"});
// });


app.listen(PORT, ()=>{
    connectDB();
    console.log(`App is listining in port ${PORT}`);
});