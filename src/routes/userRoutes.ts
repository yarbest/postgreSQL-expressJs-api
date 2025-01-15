import express from 'express';
import UserController from '../controllers/UserController';

const app = express();

app.get('/users', UserController.getUsers);
app.get('/users/:id', UserController.getOneUser);
app.post('/users', UserController.createUser);
app.put('/users', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);

export default app;