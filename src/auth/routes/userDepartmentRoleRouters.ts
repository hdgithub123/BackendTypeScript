import express from 'express';
const router = express.Router();
import {getUserDepartmentRoles,insertUserDepartmentRoles,updateUserDepartmentRoles,deleteUserDepartmentRoles,getUserDepartmentRole,insertUserDepartmentRole,updateUserDepartmentRole,deleteUserDepartmentRole} from '../controllers/userDepartmentRoleControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';



//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUserDepartmentRole"], isAllowChildZone: true}), getUserDepartmentRole);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUserDepartmentRole"], isAllowChildZone: false}), insertUserDepartmentRole,insertActivityLogsInfo({action: 'insertUserDepartmentRole', tableName: 'user_department_role', description:"insert user department role"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUserDepartmentRole"], isAllowChildZone: false}), updateUserDepartmentRole,insertActivityLogsInfo({action: 'updateUserDepartmentRole', tableName: 'user_department_role', description:"update user department role"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUserDepartmentRole"], isAllowChildZone: false}), deleteUserDepartmentRole,insertActivityLogsInfo({action: 'deleteUserDepartmentRole', tableName: 'user_department_role', description:"delete user department role"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetUserDepartmentRoles"], isAllowChildZone: true}),getUserDepartmentRoles);
router.post('/list',authorization,checkPermission({rightCodes: ["PostUserDepartmentRoles"], isAllowChildZone: false}), insertUserDepartmentRoles,insertActivityLogsInfo({action: 'insertUserDepartmentRoles', tableName: 'user_department_role', description:"insert user department roles"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutUserDepartmentRoles"], isAllowChildZone: false}), updateUserDepartmentRoles,insertActivityLogsInfo({action: 'updateUserDepartmentRoles', tableName: 'user_department_role', description:"update user department roles"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteUserDepartmentRoles"], isAllowChildZone: false}), deleteUserDepartmentRoles,insertActivityLogsInfo({action: 'deleteUserDepartmentRoles', tableName: 'user_department_role', description:"delete user department roles"}));



export default router;