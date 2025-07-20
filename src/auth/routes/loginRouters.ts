const express = require('express');
const router = express.Router();
import loginController from '../controllers/loginControllers';
import {insertActivityLogsInfo} from '../controllers/activityLogControllers';

// Định tuyến GET cho trang chủ login
router.post('/',loginController, insertActivityLogsInfo({action: 'login', description: "user login"}));

// router.post('/authenticate', loginController.loginAuthenticate);

export default router;