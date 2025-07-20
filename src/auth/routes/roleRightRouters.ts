import express from 'express';
const router = express.Router();
import {getRoleRights,insertRoleRights,updateRoleRights,deleteRoleRights,getRoleRight,insertRoleRight,updateRoleRight,deleteRoleRight} from '../controllers/roleRightControllers';
// Định tuyến cho trang user


//chú ý route cha phải được đặt sau route con
router.get('/detail', getRoleRight);
router.post('/detail/insert', insertRoleRight);
router.put('/detail', updateRoleRight);
router.delete('/detail', deleteRoleRight);

// router cha
router.get('/list',getRoleRights);
router.post('/list', insertRoleRights);
router.put('/list', updateRoleRights);
router.delete('/list', deleteRoleRights);



export default router;