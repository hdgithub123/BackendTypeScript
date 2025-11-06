import express from 'express';
const router = express.Router();
//import {getRights,insertRights,updateRights,deleteRights,getRight,insertRight,updateRight,deleteRight} from '../controllers/rightControllers';
import {getRights,getRight} from '../controllers/rightControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code',authorization,checkPermission({rightCodes: ["GetRight"], isAllowMoreDepartment: true}), getRight);
//router.get('/owner/detail/:code',authorization,checkPermission({rightCodes: ["GetRightOfOwner"], isAllowMoreDepartment: true}), getRightOfOwner);

// router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRight"], isAllowMoreDepartment: false}), insertRight,insertActivityLogsInfo({action: 'insertRight', tableName: 'right', description:"insert right"}));
// router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PostRight"], isAllowMoreDepartment: false}), updateRight,insertActivityLogsInfo({action: 'updateRight', tableName: 'right', description:"update right"}));
// router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRight"], isAllowMoreDepartment: false}), deleteRight,insertActivityLogsInfo({action: 'deleteRight', tableName: 'right', description:"delete right"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetRights"], isAllowMoreDepartment: true}),getRights);
//router.get('/owner/list',authorization,checkPermission({rightCodes: ["GetRightsOfOwner"], isAllowMoreDepartment: true}), getRightsOfOwner);
// router.post('/list',authorization,checkPermission({rightCodes: ["PostRights"], isAllowMoreDepartment: false}), insertRights,insertActivityLogsInfo({action: 'insertRights', tableName: 'right', description:"insert rights"}));
// router.put('/list',authorization,checkPermission({rightCodes: ["PutRights"], isAllowMoreDepartment: false}), updateRights,insertActivityLogsInfo({action: 'updateRights', tableName: 'right', description:"update rights"}));
// router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteRights"], isAllowMoreDepartment: false}), deleteRights,insertActivityLogsInfo({action: 'deleteRights', tableName: 'right', description:"delete rights"}));



export default router;