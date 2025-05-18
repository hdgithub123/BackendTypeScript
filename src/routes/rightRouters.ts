import express from 'express';
const router = express.Router();
import {getRights,insertRights,updateRights,deleteRights,getRight,insertRight,updateRight,deleteRight} from '../controllers/rightControllers';
// Định tuyến cho trang user


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code', getRight);
router.post('/detail/insert', insertRight);
router.put('/detail/:id', updateRight);
router.delete('/detail/:id', deleteRight);

// router cha
router.get('/list',getRights);
router.post('/list', insertRights);
router.put('/list', updateRights);
router.delete('/list', deleteRights);



export default router;