import express from 'express';
const router = express.Router();
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';
import {getRoles,insertRoles,updateRoles,deleteRoles,getRole,insertRole,updateRole,deleteRole} from '../controllers/roleControllers';
// Định tuyến cho trang role

//chú ý route cha phải được đặt sau route con
router.get('/detail/:code',authorization,checkPermission({rightCodes: ["GetRole"], isAllowChildZone: true}), getRole);
// router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRole"], isAllowChildZone: false}), insertRole,insertActivityLogsInfo({action: 'insertRole',tableName: 'role',description:"insert role"}));
router.post('/detail/insert', insertRole,insertActivityLogsInfo({action: 'insertRole',tableName: 'role',description:"insert role"}));
//router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRole"], isAllowChildZone: false}), updateRole,insertActivityLogsInfo({action: 'updateRole',tableName: 'role',description:"update role"}));
router.put('/detail/:id', updateRole,insertActivityLogsInfo({action: 'updateRole',tableName: 'role',description:"update role"}));

router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRole"], isAllowChildZone: false}), deleteRole,insertActivityLogsInfo({action: 'deleteRole',tableName: 'role',description:"delete role"}));

// router cha
//router.get('/list',authorization,checkPermission({rightCodes: ["GetRoles"], isAllowChildZone: true}),getRoles);
router.get('/list',getRoles);

router.post('/list',authorization,checkPermission({rightCodes: ["PostRoles"], isAllowChildZone: false}),insertRoles,insertActivityLogsInfo({action: 'insertRoles',tableName: 'role',description:"insert roles"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutRoles"], isAllowChildZone: false}), updateRoles,insertActivityLogsInfo({action: 'updateRoles',tableName: 'role',description:"update roles"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteRoles"], isAllowChildZone: false}), deleteRoles,insertActivityLogsInfo({action: 'deleteRoles',tableName: 'role',description:"delete roles"}));



export default router;