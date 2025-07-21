import express from 'express';
const router = express.Router();
import {getRights,insertRights,updateRights,deleteRights,getRight,insertRight,updateRight,deleteRight} from '../controllers/rightControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code', getRight);
router.post('/detail/insert', insertRight,insertActivityLogsInfo({action: 'insertRight', tableName: 'right', description:"insert right"}));
router.put('/detail/:id', updateRight,insertActivityLogsInfo({action: 'updateRight', tableName: 'right', description:"update right"}));
router.delete('/detail/:id', deleteRight,insertActivityLogsInfo({action: 'deleteRight', tableName: 'right', description:"delete right"}));

// router cha
router.get('/list',getRights);
router.post('/list', insertRights,insertActivityLogsInfo({action: 'insertRights', tableName: 'right', description:"insert rights"}));
router.put('/list', updateRights,insertActivityLogsInfo({action: 'updateRights', tableName: 'right', description:"update rights"}));
router.delete('/list', deleteRights,insertActivityLogsInfo({action: 'deleteRights', tableName: 'right', description:"delete rights"}));



export default router;