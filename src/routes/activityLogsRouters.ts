import express from 'express';
const router = express.Router();
import authorization from '../middleware/authorization';
import {insertActivityLogs, getActivityLogs} from '../controllers/activityLogControllers';
// Định tuyến cho trang activity logs


//chú ý route cha phải được đặt sau route con
router.get('/',authorization, getActivityLogs);
router.post('/',authorization, insertActivityLogs);

export default router;