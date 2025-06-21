import express from 'express';
import dotenv from 'dotenv';



import cors from 'cors';

const cookieParser = require('cookie-parser');
require('dotenv').config();


import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRouters';
import refreshTokenRoute from './routes/refreshTokenRoute'
import rightRoute from './routes/rightRouters'
import roleRoute from './routes/roleRouters'
import roleRightRoute from './routes/roleRightRouters'
import UserRoleRoute from './routes/userRoleRouters'
import zoneRouters from './routes/zoneRouters';


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

app.use('/user', authorization, checkPermission({rightCodes: ["9e25a246-3404-11f0-9c72-0242ac110002",'20',"CREATE_USER"], isAllowChildZone: false}), userRoutes);
//app.use('/user', userRoutes);
 app.use('/zone', zoneRouters); //-- dang thu
app.use('/roleright', roleRightRoute);
app.use('/userrole', UserRoleRoute);
app.use('/role', roleRoute);
app.use('/right', rightRoute);
app.use('/login', loginRoutes);
app.use('/auth', refreshTokenRoute);
app.use('/', (req, res) => {
  res.send('hello!');
});

// Sử dụng router userRoutes cho các định tuyến liên quan đến trang user



app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
