import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.route.js';

dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authrouter);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectDb();
});