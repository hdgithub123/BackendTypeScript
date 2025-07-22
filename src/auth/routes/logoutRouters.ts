const express = require('express');
const router = express.Router();
import logoutController from '../controllers/logoutControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';

// Định tuyến POST cho trang chủ logout
router.post('/',authorization,logoutController,insertActivityLogsInfo({action: 'logout', description: "user logout"},false));

// router.post('/authenticate', loginController.loginAuthenticate);

export default router;