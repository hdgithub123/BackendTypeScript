import express from 'express';
const router = express.Router();
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';
import {getRoles,insertRoles,updateRoles,deleteRoles,getRole,insertRole,updateRole,deleteRole} from '../controllers/roleControllers';
// Định tuyến cho trang role

//chú ý route cha phải được đặt sau route con
router.get('/detail/:code', getRole);
router.post('/detail/insert', insertRole,insertActivityLogsInfo({action: 'insertRole',tableName: 'role',description:"insert role"}));
router.put('/detail/:id', updateRole,insertActivityLogsInfo({action: 'updateRole',tableName: 'role',description:"update role"}));
router.delete('/detail/:id', deleteRole,insertActivityLogsInfo({action: 'deleteRole',tableName: 'role',description:"delete role"}));

// router cha
router.get('/list',getRoles);
router.post('/list',insertRoles,insertActivityLogsInfo({action: 'insertRoles',tableName: 'role',description:"insert roles"}));
router.put('/list', updateRoles,insertActivityLogsInfo({action: 'updateRoles',tableName: 'role',description:"update roles"}));
router.delete('/list', deleteRoles,insertActivityLogsInfo({action: 'deleteRoles',tableName: 'role',description:"delete roles"}));



export default router;