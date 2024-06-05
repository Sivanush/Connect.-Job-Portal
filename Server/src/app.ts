import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'

dotenv.config()

const app = express()

app.use(express.json())
const corsOption={
    origin:'http://localhost:4200',
    optionsSuccessStatus:200
}

app.use(cors(corsOption))

app.use('/admin',adminRoutes)
app.use('/candidate',userRoutes)

connectDB();

const PORT = 5001;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})