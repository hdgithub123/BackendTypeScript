import express from 'express';
import dotenv from 'dotenv';



import cors from 'cors';

const cookieParser = require('cookie-parser');
require('dotenv').config();


import userRoutes from './auth/routes/userRoutes';
import loginRoutes from './auth/routes/loginRouters';
import logoutRouters from './auth/routes/logoutRouters';
import refreshTokenRoute from './auth/routes/refreshTokenRoute'
import rightRoute from './auth/routes/rightRouters'
import roleRoute from './auth/routes/roleRouters'
import roleRightRoute from './auth/routes/roleRightRouters'
import UserZoneRoleRoute from './auth/routes/userZoneRoleRouters'
import zoneRouters from './auth/routes/zoneRouters';
import activityLogsRouters from './auth/routes/activityLogsRouters';
import authRouter from './auth/routes';

import authorization from './auth/middleware/authorization';
import checkPermission from './auth/middleware/checkPermission';

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

// app.use('/user', authorization, checkPermission({rightIds: [1,20]}), userRoutes);

// app.use('/user', authorization, checkPermission({rightCodes: ["9e25a246-3404-11f0-9c72-0242ac110002",'20',"CREATE_USER"], isAllowChildZone: false}), userRoutes);
// //app.use('/user', userRoutes);
// app.use('/activity-logs', activityLogsRouters);
// app.use('/zone', zoneRouters); //-- dang thu
// app.use('/roleright', roleRightRoute);
// app.use('/userzonerole', UserZoneRoleRoute);
// app.use('/role', roleRoute);
// app.use('/right', rightRoute);
// app.use('/login', loginRoutes);
// app.use('/logout', logoutRouters);
// app.use('/auth', refreshTokenRoute);
app.use('/auth', authRouter);
app.use('/', (req, res) => {
  res.send('hello!');
});

// Sử dụng router userRoutes cho các định tuyến liên quan đến trang user



app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
