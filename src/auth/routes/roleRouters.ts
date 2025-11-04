import express from 'express';
const router = express.Router();
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';
import {getRoles,insertRoles,updateRoles,deleteRoles,getRole,insertRole,updateRole,deleteRole,checkExistenceRole,checkExistenceRoles,getIdRolesByCodes} from '../controllers/roleControllers';
// Định tuyến cho trang role

//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRole"], isAllowMoreDepartment: true}), getRole);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRole"], isAllowMoreDepartment: false}), insertRole,insertActivityLogsInfo({action: 'insertRole',tableName: 'role',description:"insert role"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRole"], isAllowMoreDepartment: false}), updateRole,insertActivityLogsInfo({action: 'updateRole',tableName: 'role',description:"update role"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRole"], isAllowMoreDepartment: false}), deleteRole,insertActivityLogsInfo({action: 'deleteRole',tableName: 'role',description:"delete role"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetRoles"], isAllowMoreDepartment: true}),getRoles);
router.post('/list',authorization,checkPermission({rightCodes: ["PostRoles"], isAllowMoreDepartment: false}),insertRoles,insertActivityLogsInfo({action: 'insertRoles',tableName: 'role',description:"insert roles"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutRoles"], isAllowMoreDepartment: false}), updateRoles,insertActivityLogsInfo({action: 'updateRoles',tableName: 'role',description:"update roles"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteRoles"], isAllowMoreDepartment: false}), deleteRoles,insertActivityLogsInfo({action: 'deleteRoles',tableName: 'role',description:"delete roles"}));

router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetRoles", "PutRoles"], isAllowMoreDepartment: true}),getIdRolesByCodes);
router.post('/check-role',authorization,checkPermission({rightCodes: ["PostRole","PutRole"], isAllowMoreDepartment: false}),checkExistenceRole);
router.post('/check-roles',authorization,checkPermission({rightCodes: ["PostRoles","PutRoles"], isAllowMoreDepartment: false}),checkExistenceRoles);

export default router;