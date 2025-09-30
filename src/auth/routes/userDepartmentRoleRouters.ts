import express from 'express';
const router = express.Router();
import {getDepartmentRoles,insertDepartmentRoles,updateDepartmentRoles,deleteDepartmentRoles,getDepartmentRole,insertDepartmentRole,updateDepartmentRole,deleteDepartmentRole} from '../controllers/userDepartmentRoleControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';



//chú ý route cha phải được đặt sau route con
router.get('/detail',authorization,checkPermission({rightCodes: ["GetDepartmentRole"], isAllowChildZone: true}), getDepartmentRole);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostDepartmentRole"], isAllowChildZone: false}), insertDepartmentRole,insertActivityLogsInfo({action: 'insertDepartmentRole', tableName: 'user_department_role', description:"insert user department role"}));
router.put('/detail',authorization,checkPermission({rightCodes: ["PutDepartmentRole"], isAllowChildZone: false}), updateDepartmentRole,insertActivityLogsInfo({action: 'updateDepartmentRole', tableName: 'user_department_role', description:"update user department role"}));
router.delete('/detail',authorization,checkPermission({rightCodes: ["DeleteDepartmentRole"], isAllowChildZone: false}), deleteDepartmentRole,insertActivityLogsInfo({action: 'deleteDepartmentRole', tableName: 'user_department_role', description:"delete user department role"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetDepartmentRoles"], isAllowChildZone: true}),getDepartmentRoles);
router.post('/list',authorization,checkPermission({rightCodes: ["PostDepartmentRoles"], isAllowChildZone: false}), insertDepartmentRoles,insertActivityLogsInfo({action: 'insertDepartmentRoles', tableName: 'user_department_role', description:"insert user department roles"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutDepartmentRoles"], isAllowChildZone: false}), updateDepartmentRoles,insertActivityLogsInfo({action: 'updateDepartmentRoles', tableName: 'user_department_role', description:"update user department roles"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteDepartmentRoles"], isAllowChildZone: false}), deleteDepartmentRoles,insertActivityLogsInfo({action: 'deleteDepartmentRoles', tableName: 'user_department_role', description:"delete user department roles"}));



export default router;