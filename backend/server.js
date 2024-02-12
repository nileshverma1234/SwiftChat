import  express  from "express";
import  dotenv  from "dotenv";


const app = express();
dotenv.config();

const PORT= process.env.PORT_BACKEND || 5000;
app.get('/', (req,res)=>{
    res.send({message: "Server is running fine"});
});


app.listen(PORT, ()=>{
    console.log(`App is listining in port ${PORT}`);
});