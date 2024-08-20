
import mongoose from 'mongoose'
import './config.js'
const { MONGODB_URL } = process.env;

const connect =async ()=>{
    mongoose.connect(MONGODB_URL).then(()=>{
        console.log('Connected to MongoDB')
    }).catch((error)=>{
        console.log(error,'Error while connecting to MongoDB')
    });
}
export default connect;