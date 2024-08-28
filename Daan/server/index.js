import express from 'express';
import cors from 'cors';
import mainRouter from './routes/index.js'
import connect from './Database.js';  
import cookieParser from 'cookie-parser';
const app=express();
app.use(cookieParser());
app.use(cors({  
    credentials: true,
     origin: 'http://localhost:5173'
}));


app.use(express.json());
connect(); 

app.use("/api/v1",mainRouter)
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
