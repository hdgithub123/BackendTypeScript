const express = require('express');
const router = express.Router();
//import {getZones,insertZones,updateZones,deleteZones,getZone,insertZone,updateZone,deleteZone} from '../controllers/zonesControllers';
import {getZone,getZones,insertZone,updateZone,insertZones,updateZones,deleteZone, deleteZones,insertZonesByCode} from '../controllers/zonesControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id', getZone);
router.post('/detail/insert', insertZone);
router.put('/detail/update/:id', updateZone);
router.delete('/detail/:id', deleteZone);

// router cha
router.post('/list/code', insertZonesByCode,insertActivityLogsInfo({action: 'insertZones',tableName: 'zone',description:"insert zones by code"}));
router.get('/list',getZones);
router.post('/list', insertZones,insertActivityLogsInfo({action: 'insertZones',tableName: 'zone',description:"insert zones"}));
router.put('/list', updateZones,insertActivityLogsInfo({action: 'updateZones',tableName: 'zone',description:"update zones"}));
router.delete('/list', deleteZones,insertActivityLogsInfo({action: 'deleteZones',tableName: 'zone',description:"delete zones"}));



export default router;