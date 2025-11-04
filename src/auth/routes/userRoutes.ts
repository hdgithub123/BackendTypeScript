const express = require('express');
const router = express.Router();
import {getUsers,insertUsers,updateUsers,deleteUsers,getUser,insertUser,updateUser,deleteUser,checkExistenceUser,checkExistenceUsers,getIdUsersByCodes} from '../controllers/userControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:username',authorization,checkPermission({rightCodes: ["GetUser"], isAllowMoreDepartment: true}), getUser);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUser"], isAllowMoreDepartment: false}), insertUser,insertActivityLogsInfo({action: 'insertUser',tableName: 'user',description:"insert user"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUser"], isAllowMoreDepartment: false}), updateUser,insertActivityLogsInfo({action: 'updateUser',tableName: 'user',description:"update user"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUser"], isAllowMoreDepartment: false}), deleteUser,insertActivityLogsInfo({action: 'deleteUser',tableName: 'user',description:"delete user"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetUsers"], isAllowMoreDepartment: true}),getUsers);
router.post('/list',authorization,checkPermission({rightCodes: ["PostUsers"], isAllowMoreDepartment: false}), insertUsers,insertActivityLogsInfo({action: 'insertUsers',tableName: 'user',description:"insert users"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutUsers"], isAllowMoreDepartment: false}), updateUsers,insertActivityLogsInfo({action: 'updateUsers',tableName: 'user',description:"update users"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteUsers"], isAllowMoreDepartment: false}), deleteUsers,insertActivityLogsInfo({action: 'deleteUsers',tableName: 'user',description:"delete users"}));


router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetUsers", "PutUsers"], isAllowMoreDepartment: true}),getIdUsersByCodes);
router.post('/check-user',authorization,checkPermission({rightCodes: ["PostUser","PutUser"], isAllowMoreDepartment: false}),checkExistenceUser);
router.post('/check-users',authorization,checkPermission({rightCodes: ["PostUsers","PutUsers"], isAllowMoreDepartment: false}),checkExistenceUsers);



export default router;
