import express from 'express';
const router = express.Router();
import {getRoleRights,insertRoleRights,updateRoleRights,deleteRoleRights,getRoleRight,insertRoleRight,updateRoleRight,deleteRoleRight} from '../controllers/roleRightControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail', getRoleRight);
router.post('/detail/insert', insertRoleRight,insertActivityLogsInfo({action: 'insertRoleRight', tableName: 'role_right', description:"insert role right"}));
router.put('/detail', updateRoleRight,insertActivityLogsInfo({action: 'updateRoleRight', tableName: 'role_right', description:"update role right"}));
router.delete('/detail', deleteRoleRight,insertActivityLogsInfo({action: 'deleteRoleRight', tableName: 'role_right', description:"delete role right"}));

// router cha
router.get('/list',getRoleRights);
router.post('/list', insertRoleRights,insertActivityLogsInfo({action: 'insertRoleRights', tableName: 'role_right', description:"insert role rights"}));
router.put('/list', updateRoleRights,insertActivityLogsInfo({action: 'updateRoleRights', tableName: 'role_right', description:"update role rights"}));
router.delete('/list', deleteRoleRights,insertActivityLogsInfo({action: 'deleteRoleRights', tableName: 'role_right', description:"delete role rights"}));



export default router;