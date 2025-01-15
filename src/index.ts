import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});