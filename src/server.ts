import express from 'express';
import dotenv from 'dotenv';



import cors from 'cors';

const cookieParser = require('cookie-parser');
require('dotenv').config();

import authRouter from './auth/routes';
import templateContentsRouters from './templateContents/routes/templateContentsRouters';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:4000', // Thay bằng domain của client
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'is_child_zone', 'zone'],
}));

// khai báo con truoc cha
app.use('/auth', authRouter);
app.use('/template-contents', templateContentsRouters);
app.use('/', (req, res) => {
  res.send('hello!');
});


app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
