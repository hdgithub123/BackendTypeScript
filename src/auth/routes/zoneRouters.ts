const express = require('express');
const router = express.Router();
//import {getZones,insertZones,updateZones,deleteZones,getZone,insertZone,updateZone,deleteZone} from '../controllers/zonesControllers';
import {getZone,getZones,insertZone,updateZone,insertZones,updateZones,deleteZone, deleteZones,insertZonesByCode} from '../controllers/zonesControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


// //chú ý route cha phải được đặt sau route con
// router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetZone"], isAllowChildZone: true}), getZone);
// router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostZone"], isAllowChildZone: false}), insertZone,insertActivityLogsInfo({action: 'insertZone',tableName: 'zone',description:"insert zone"}));
// router.put('/detail/update/:id',authorization ,checkPermission({rightCodes: ["PutZone"], isAllowChildZone: false}), updateZone,insertActivityLogsInfo({action: 'updateZone',tableName: 'zone',description:"update zone"}));
// router.delete('/detail/:id',authorization ,checkPermission({rightCodes: ["DeleteZone"], isAllowChildZone: false}), deleteZone,insertActivityLogsInfo({action: 'deleteZone',tableName: 'zone',description:"delete zone"}));

// // router cha
// router.post('/list/code',authorization ,checkPermission({rightCodes: ["PostZones"], isAllowChildZone: false}), insertZonesByCode,insertActivityLogsInfo({action: 'insertZones',tableName: 'zone',description:"insert zones by code"}));
// router.get('/list',authorization ,checkPermission({rightCodes: ["GetZones"], isAllowChildZone: true}),getZones);
// router.post('/list',authorization ,checkPermission({rightCodes: ["PostZones"], isAllowChildZone: false}), insertZones,insertActivityLogsInfo({action: 'insertZones',tableName: 'zone',description:"insert zones"}));
// router.put('/list',authorization ,checkPermission({rightCodes: ["PutZones"], isAllowChildZone: false}), updateZones,insertActivityLogsInfo({action: 'updateZones',tableName: 'zone',description:"update zones"}));
// router.delete('/list',authorization ,checkPermission({rightCodes: ["DeleteZones"], isAllowChildZone: false}), deleteZones,insertActivityLogsInfo({action: 'deleteZones',tableName: 'zone',description:"delete zones"}));

//chú ý route cha phải được đặt sau route con
router.get('/detail/:id', getZone);
router.post('/detail/insert', insertZone,insertActivityLogsInfo({action: 'insertZone',tableName: 'zone',description:"insert zone"}));
router.put('/detail/update/:id', updateZone,insertActivityLogsInfo({action: 'updateZone',tableName: 'zone',description:"update zone"}));
router.delete('/detail/:id', deleteZone,insertActivityLogsInfo({action: 'deleteZone',tableName: 'zone',description:"delete zone"}));

// router cha
router.post('/list/code', insertZonesByCode,insertActivityLogsInfo({action: 'insertZones',tableName: 'zone',description:"insert zones by code"}));
router.get('/list',getZones);
router.post('/list', insertZones,insertActivityLogsInfo({action: 'insertZones',tableName: 'zone',description:"insert zones"}));
router.put('/list', updateZones,insertActivityLogsInfo({action: 'updateZones',tableName: 'zone',description:"update zones"}));
router.delete('/list', deleteZones,insertActivityLogsInfo({action: 'deleteZones',tableName: 'zone',description:"delete zones"}));



export default router;