import express from 'express';
const router = express.Router();
import {getUserZoneRoles,insertUserZoneRoles,updateUserZoneRoles,deleteUserZoneRoles,getUserZoneRole,insertUserZoneRole,updateUserZoneRole,deleteUserZoneRole} from '../controllers/userZoneRoleControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail',authorization,checkPermission({rightCodes: ["GetUserZoneRole"], isAllowChildZone: true}), getUserZoneRole);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUserZoneRole"], isAllowChildZone: false}), insertUserZoneRole,insertActivityLogsInfo({action: 'insertUserZoneRole', tableName: 'user_zone_role', description:"insert user zone role"}));
router.put('/detail',authorization,checkPermission({rightCodes: ["PutUserZoneRole"], isAllowChildZone: false}), updateUserZoneRole,insertActivityLogsInfo({action: 'updateUserZoneRole', tableName: 'user_zone_role', description:"update user zone role"}));
router.delete('/detail',authorization,checkPermission({rightCodes: ["DeleteUserZoneRole"], isAllowChildZone: false}), deleteUserZoneRole,insertActivityLogsInfo({action: 'deleteUserZoneRole', tableName: 'user_zone_role', description:"delete user zone role"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetUserZoneRoles"], isAllowChildZone: true}),getUserZoneRoles);
router.post('/list',authorization,checkPermission({rightCodes: ["PostUserZoneRoles"], isAllowChildZone: false}), insertUserZoneRoles,insertActivityLogsInfo({action: 'insertUserZoneRoles', tableName: 'user_zone_role', description:"insert user zone roles"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutUserZoneRoles"], isAllowChildZone: false}), updateUserZoneRoles,insertActivityLogsInfo({action: 'updateUserZoneRoles', tableName: 'user_zone_role', description:"update user zone roles"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteUserZoneRoles"], isAllowChildZone: false}), deleteUserZoneRoles,insertActivityLogsInfo({action: 'deleteUserZoneRoles', tableName: 'user_zone_role', description:"delete user zone roles"}));



export default router;