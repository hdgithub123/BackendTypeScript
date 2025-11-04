import express from 'express';
const router = express.Router();
import { authorization, checkPermission} from '../middleware';
import {insertActivityLogs, getActivityLogs,getActivityLogsByUsername,deleteActivityLogs} from '../controllers/activityLogControllers';
// Định tuyến cho trang activity logs
router.get('/:username', getActivityLogsByUsername);
//DeleteActivityLogs
//chú ý route cha phải được đặt sau route con
router.get('/',authorization,checkPermission({rightCodes: ["GetActivityLogs"], isAllowMoreDepartment: true}), getActivityLogs);
router.post('/',authorization,checkPermission({rightCodes: ["PostActivityLogs"], isAllowMoreDepartment: false}), insertActivityLogs);
router.delete('/',authorization,checkPermission({rightCodes: ["DeleteActivityLogs"], isAllowMoreDepartment: true}), deleteActivityLogs);

//router.get('/', getActivityLogs);

export default router;