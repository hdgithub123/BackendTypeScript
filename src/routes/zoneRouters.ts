const express = require('express');
const router = express.Router();
//import {getZones,insertZones,updateZones,deleteZones,getZone,insertZone,updateZone,deleteZone} from '../controllers/zonesControllers';
import {getZones,insertZone} from '../controllers/zonesControllers';
// Định tuyến cho trang user


//chú ý route cha phải được đặt sau route con
// router.get('/detail/:id', getZone);
router.post('/detail/insert', insertZone);
// router.put('/detail/:id', updateZone);
// router.delete('/detail/:id', deleteZone);

// router cha
router.get('/list',getZones);
// router.post('/list', insertZones);
// router.put('/list', updateZones);
// router.delete('/list', deleteZones);



export default router;