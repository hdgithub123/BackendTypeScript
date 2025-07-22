import express from 'express';
const router = express.Router();
import {getRights,insertRights,updateRights,deleteRights,getRight,insertRight,updateRight,deleteRight} from '../controllers/rightControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code',authorization,checkPermission({rightCodes: ["GetRight"], isAllowChildZone: true}), getRight);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRight"], isAllowChildZone: false}), insertRight,insertActivityLogsInfo({action: 'insertRight', tableName: 'right', description:"insert right"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PostRight"], isAllowChildZone: false}), updateRight,insertActivityLogsInfo({action: 'updateRight', tableName: 'right', description:"update right"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRight"], isAllowChildZone: false}), deleteRight,insertActivityLogsInfo({action: 'deleteRight', tableName: 'right', description:"delete right"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetRights"], isAllowChildZone: true}),getRights);
router.post('/list',authorization,checkPermission({rightCodes: ["PostRights"], isAllowChildZone: false}), insertRights,insertActivityLogsInfo({action: 'insertRights', tableName: 'right', description:"insert rights"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutRights"], isAllowChildZone: false}), updateRights,insertActivityLogsInfo({action: 'updateRights', tableName: 'right', description:"update rights"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteRights"], isAllowChildZone: false}), deleteRights,insertActivityLogsInfo({action: 'deleteRights', tableName: 'right', description:"delete rights"}));



export default router;