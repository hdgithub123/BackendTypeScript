const express = require('express');
const router = express.Router();
import logoutController from '../controllers/logoutControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';

router.post('/',logoutController,insertActivityLogsInfo({action: 'logout', description: "user logout"},false));

export default router;