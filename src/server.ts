import express from 'express';
import dotenv from 'dotenv';



import cors from 'cors';

const cookieParser = require('cookie-parser');
require('dotenv').config();


import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRouters';
import refreshTokenRoute from './routes/refreshTokenRoute'

import authorization from './middleware/authorization';
import checkPermission from './middleware/checkPermission';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:4001', // Thay bằng domain của client
  credentials: true
}));

// khai báo con truoc cha

// app.use('/user', authorization, checkPermission({rightIds: [1,20]}), userRoutes);

app.use('/user', authorization, checkPermission({rightIds: ['1','20']}), userRoutes);
//app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/auth', refreshTokenRoute);
app.use('/', (req, res) => {
  res.send('hello!');
});

// Sử dụng router userRoutes cho các định tuyến liên quan đến trang user



app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
