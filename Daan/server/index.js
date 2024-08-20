import express from 'express';
import cors from 'cors';
import mainRouter from './routes/index.js'
import connect from './Database.js';  
const app=express();

app.use(cors());


app.use(express.json());
connect(); 

app.use("/api/v1",mainRouter)
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
