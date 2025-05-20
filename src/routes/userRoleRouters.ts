import express from 'express';
const router = express.Router();
import {getUserRoles,insertUserRoles,updateUserRoles,deleteUserRoles,getUserRole,insertUserRole,updateUserRole,deleteUserRole} from '../controllers/userRoleControllers';
// Định tuyến cho trang user


//chú ý route cha phải được đặt sau route con
router.get('/detail', getUserRole);
router.post('/detail/insert', insertUserRole);
router.put('/detail', updateUserRole);
router.delete('/detail', deleteUserRole);

// router cha
router.get('/list',getUserRoles);
router.post('/list', insertUserRoles);
router.put('/list', updateUserRoles);
router.delete('/list', deleteUserRoles);



export default router;