const express = require('express');
const router = express.Router();
import loginController from '../controllers/loginControllers';


// Định tuyến GET cho trang chủ login
router.post('/',loginController);

// router.post('/authenticate', loginController.loginAuthenticate);

export default router;