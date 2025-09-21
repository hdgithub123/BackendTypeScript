const express = require('express');
const router = express.Router();
import {getUsers,insertUsers,updateUsers,deleteUsers,getUser,insertUser,updateUser,deleteUser,checkExistenceUser,checkExistenceUsers,getIdUsersByCodes} from '../controllers/userControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:username',authorization,checkPermission({rightCodes: ["GetUser"], isAllowChildZone: true}), getUser);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUser"], isAllowChildZone: false}), insertUser,insertActivityLogsInfo({action: 'insertUser',tableName: 'user',description:"insert user"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUser"], isAllowChildZone: false}), updateUser,insertActivityLogsInfo({action: 'updateUser',tableName: 'user',description:"update user"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUser"], isAllowChildZone: false}), deleteUser,insertActivityLogsInfo({action: 'deleteUser',tableName: 'user',description:"delete user"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetUsers"], isAllowChildZone: true}),getUsers);
router.post('/list',authorization,checkPermission({rightCodes: ["PostUsers"], isAllowChildZone: false}), insertUsers,insertActivityLogsInfo({action: 'insertUsers',tableName: 'user',description:"insert users"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutUsers"], isAllowChildZone: false}), updateUsers,insertActivityLogsInfo({action: 'updateUsers',tableName: 'user',description:"update users"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteUsers"], isAllowChildZone: false}), deleteUsers,insertActivityLogsInfo({action: 'deleteUsers',tableName: 'user',description:"delete users"}));


router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetUsers", "PutUsers"], isAllowChildZone: true}),getIdUsersByCodes);
router.post('/check-user',authorization,checkPermission({rightCodes: ["PostUser","PutUser"], isAllowChildZone: false}),checkExistenceUser);
router.post('/check-users',authorization,checkPermission({rightCodes: ["PostUsers","PutUsers"], isAllowChildZone: false}),checkExistenceUsers);



export default router;
