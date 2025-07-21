const express = require('express');
const router = express.Router();
import {getUsers,insertUsers,updateUsers,deleteUsers,getUser,insertUser,updateUser,deleteUser} from '../controllers/userControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:username', getUser);
router.post('/detail/insert', insertUser,insertActivityLogsInfo({action: 'insertUser',tableName: 'user',description:"insert user"}));
router.put('/detail/:id', updateUser,insertActivityLogsInfo({action: 'updateUser',tableName: 'user',description:"update user"}));
router.delete('/detail/:id', deleteUser,insertActivityLogsInfo({action: 'deleteUser',tableName: 'user',description:"delete user"}));

// router cha
router.get('/list',getUsers);
router.post('/list', insertUsers,insertActivityLogsInfo({action: 'insertUsers',tableName: 'user',description:"insert users"}));
router.put('/list', updateUsers,insertActivityLogsInfo({action: 'updateUsers',tableName: 'user',description:"update users"}));
router.delete('/list', deleteUsers,insertActivityLogsInfo({action: 'deleteUsers',tableName: 'user',description:"delete users"}));



export default router;
