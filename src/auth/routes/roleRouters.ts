import express from 'express';
const router = express.Router();
import authorization from '../middleware/authorization';
import {insertActivityLogsInfo} from '../controllers/activityLogControllers';
import {getRoles,insertRoles,updateRoles,deleteRoles,getRole,insertRole,updateRole,deleteRole} from '../controllers/roleControllers';
// Định tuyến cho trang role

//chú ý route cha phải được đặt sau route con
router.get('/detail/:code', getRole);
router.post('/detail/insert', insertRole);
router.put('/detail/:id', updateRole);
router.delete('/detail/:id', deleteRole);

// router cha
router.get('/list',authorization,getRoles,insertActivityLogsInfo({action: 'getRoles',tableName: 'role',description:"get roles"}));
router.post('/list',insertRoles,insertActivityLogsInfo({action: 'insertRoles',tableName: 'role',description:"insert roles"}));
router.put('/list', updateRoles);
router.delete('/list', deleteRoles);



export default router;