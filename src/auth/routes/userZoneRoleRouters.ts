import express from 'express';
const router = express.Router();
import {getUserZoneRoles,insertUserZoneRoles,updateUserZoneRoles,deleteUserZoneRoles,getUserZoneRole,insertUserZoneRole,updateUserZoneRole,deleteUserZoneRole} from '../controllers/userZoneRoleControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail', getUserZoneRole);
router.post('/detail/insert', insertUserZoneRole);
router.put('/detail', updateUserZoneRole);
router.delete('/detail', deleteUserZoneRole);

// router cha
router.get('/list',getUserZoneRoles);
router.post('/list', insertUserZoneRoles);
router.put('/list', updateUserZoneRoles);
router.delete('/list', deleteUserZoneRoles);



export default router;