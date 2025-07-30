import express from 'express';
import cors from 'cors'
import UserRouter from './Controllers/user.js';
import {ImageRouter} from './Controllers/Imageuploader.js';
import SubscriptionRouter from './Controllers/subscription.js';
const app = new express();

app.use(express.json());

app.use(cors());
app.use(express.static('public'))

app.use('/api/users/', UserRouter);
app.use('/api/uploadimg/',ImageRouter);
app.use('/api/subscribers/',SubscriptionRouter)

// app.use('/api/users/',UserRouter)
export default app;



