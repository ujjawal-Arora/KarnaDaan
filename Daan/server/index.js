import express from 'express';
import cors from 'cors';
import mainRouter from './routes/index.js'
import connect from './Database.js';  
import cookieParser from 'cookie-parser';
import {app,server} from './Socket/index.js'
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
  }));
  
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});


app.use(express.json());
connect(); 

app.use("/api/v1",mainRouter)
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
