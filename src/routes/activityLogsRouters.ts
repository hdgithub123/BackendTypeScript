import express from 'express';
const router = express.Router();
import {insertActivityLogs, getActivityLogs} from '../controllers/activityLogControllers';
// Định tuyến cho trang user


//chú ý route cha phải được đặt sau route con
router.get('/', getActivityLogs);
router.post('/', insertActivityLogs);

export default router;