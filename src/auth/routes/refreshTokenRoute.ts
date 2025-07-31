const express = require('express');
const router = express.Router();
import  refreshToken  from '../services/refreshToken';

router.post('/', refreshToken);

export default router;