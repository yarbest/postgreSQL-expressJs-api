import express from 'express';
import PostController from '../controllers/PostController';

const app = express();

app.post('/posts', PostController.createPost);
app.get('/posts', PostController.getPostsByUser);

export default app;