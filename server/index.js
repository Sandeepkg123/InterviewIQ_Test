import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';

dotenv.config();
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectDb();
});