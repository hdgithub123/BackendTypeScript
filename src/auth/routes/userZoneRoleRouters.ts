import express from 'express';
const router = express.Router();
import {getUserZoneRoles,insertUserZoneRoles,updateUserZoneRoles,deleteUserZoneRoles,getUserZoneRole,insertUserZoneRole,updateUserZoneRole,deleteUserZoneRole} from '../controllers/userZoneRoleControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail', getUserZoneRole);
router.post('/detail/insert', insertUserZoneRole,insertActivityLogsInfo({action: 'insertUserZoneRole', tableName: 'user_zone_role', description:"insert user zone role"}));
router.put('/detail', updateUserZoneRole,insertActivityLogsInfo({action: 'updateUserZoneRole', tableName: 'user_zone_role', description:"update user zone role"}));
router.delete('/detail', deleteUserZoneRole,insertActivityLogsInfo({action: 'deleteUserZoneRole', tableName: 'user_zone_role', description:"delete user zone role"}));

// router cha
router.get('/list',getUserZoneRoles);
router.post('/list', insertUserZoneRoles,insertActivityLogsInfo({action: 'insertUserZoneRoles', tableName: 'user_zone_role', description:"insert user zone roles"}));
router.put('/list', updateUserZoneRoles,insertActivityLogsInfo({action: 'updateUserZoneRoles', tableName: 'user_zone_role', description:"update user zone roles"}));
router.delete('/list', deleteUserZoneRoles,insertActivityLogsInfo({action: 'deleteUserZoneRoles', tableName: 'user_zone_role', description:"delete user zone roles"}));



export default router;