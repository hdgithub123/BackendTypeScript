const express = require('express');
const router = express.Router();
import  refreshToken  from '../services/refreshToken';

router.post('/refresh-token', refreshToken);

export default router;