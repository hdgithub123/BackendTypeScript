const express = require('express');
const router = express.Router();
import {getUsers,insertUsers,updateUsers,deleteUsers,getUser,insertUser,updateUser,deleteUser} from '../controllers/userControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:username', getUser);
router.post('/detail/insert', insertUser);
router.put('/detail/:id', updateUser);
router.delete('/detail/:id', deleteUser);

// router cha
router.get('/list',getUsers);
router.post('/list', insertUsers);
router.put('/list', updateUsers);
router.delete('/list', deleteUsers);



export default router;
