import express from 'express';
const router = express.Router();
import authorization from '../middleware/authorization';
import {insertActivityLogs, getActivityLogs,getActivityLogsByUsername,deleteActivityLogs} from '../controllers/activityLogControllers';
// Định tuyến cho trang activity logs
router.get('/:username', getActivityLogsByUsername);

//chú ý route cha phải được đặt sau route con
router.get('/',authorization, getActivityLogs);
router.post('/',authorization, insertActivityLogs);
router.delete('/',authorization, deleteActivityLogs);

export default router;