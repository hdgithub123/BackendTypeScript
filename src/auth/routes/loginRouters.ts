const express = require('express');
const router = express.Router();
import loginController from '../controllers/loginControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';

router.post('/',loginController, insertActivityLogsInfo({action: 'login', description: "user login"}));


export default router;