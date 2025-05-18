import express from 'express';
const router = express.Router();
import {getRoles,insertRoles,updateRoles,deleteRoles,getRole,insertRole,updateRole,deleteRole} from '../controllers/roleControllers';
// Định tuyến cho trang user


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code', getRole);
router.post('/detail/insert', insertRole);
router.put('/detail/:id', updateRole);
router.delete('/detail/:id', deleteRole);

// router cha
router.get('/list',getRoles);
router.post('/list', insertRoles);
router.put('/list', updateRoles);
router.delete('/list', deleteRoles);



export default router;