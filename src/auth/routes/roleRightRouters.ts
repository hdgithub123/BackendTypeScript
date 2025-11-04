import express from 'express';
const router = express.Router();
// import {getRoleRights,insertRoleRights,updateRoleRights,deleteRoleRights,getRoleRight,insertRoleRight,updateRoleRight,deleteRoleRight} from '../controllers/roleRightControllers';
import {getRightsFromRoleId,getRightsNotInRoleId,insertRoleRights,updateRoleRights, deleteRoleRights} from '../controllers/roleRightControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
// router.get('/detail',authorization,checkPermission({rightCodes: ["GetRoleRight"], isAllowMoreDepartment: true}), getRoleRight);
// router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRoleRight"], isAllowMoreDepartment: false}), insertRoleRight,insertActivityLogsInfo({action: 'insertRoleRight', tableName: 'role_right', description:"insert role right"}));
// router.put('/detail',authorization,checkPermission({rightCodes: ["PutRoleRight"], isAllowMoreDepartment: false}), updateRoleRight,insertActivityLogsInfo({action: 'updateRoleRight', tableName: 'role_right', description:"update role right"}));
// router.delete('/detail',authorization,checkPermission({rightCodes: ["DeleteRoleRight"], isAllowMoreDepartment: false}), deleteRoleRight,insertActivityLogsInfo({action: 'deleteRoleRight', tableName: 'role_right', description:"delete role right"}));

// // router cha
// router.get('/list',authorization,checkPermission({rightCodes: ["GetRoleRights"], isAllowMoreDepartment: true}),getRoleRights);
router.post('/list',authorization,checkPermission({rightCodes: ["PostRoleRights"], isAllowMoreDepartment: false}), insertRoleRights,insertActivityLogsInfo({action: 'insertRoleRights', tableName: 'role_right', description:"insert role rights"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutRoleRights"], isAllowMoreDepartment: false}), updateRoleRights,insertActivityLogsInfo({action: 'updateRoleRights', tableName: 'role_right', description:"update role rights"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteRoleRights"], isAllowMoreDepartment: false}), deleteRoleRights,insertActivityLogsInfo({action: 'deleteRoleRights', tableName: 'role_right', description:"delete role rights"}));

router.get('/role-rights/:id',authorization,checkPermission({rightCodes: ["GetRoleRights"], isAllowMoreDepartment: true}), getRightsFromRoleId);
router.get('/role-not-have-rights/:id',authorization,checkPermission({rightCodes: ["GetRoleRights"], isAllowMoreDepartment: true}), getRightsNotInRoleId);

export default router;