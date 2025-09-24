import express from 'express';
const router = express.Router();
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';
import {getBranches,insertBranches,updateBranches,deleteBranches,getBranch,insertBranch,updateBranch,deleteBranch,checkExistenceBranch,checkExistenceBranches,getIdBranchesByCodes} from '../controllers/branchControllers';
// Định tuyến cho trang branch



//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetBranch"], isAllowChildZone: true}), getBranch);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostBranch"], isAllowChildZone: false}), insertBranch,insertActivityLogsInfo({action: 'insertBranch',tableName: 'branches',description:"insert branch"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutBranch"], isAllowChildZone: false}), updateBranch,insertActivityLogsInfo({action: 'updateBranch',tableName: 'branches',description:"update branch"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteBranch"], isAllowChildZone: false}), deleteBranch,insertActivityLogsInfo({action: 'deleteBranch',tableName: 'branches',description:"delete branch"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetBranches"], isAllowChildZone: true}),getBranches);
router.post('/list',authorization,checkPermission({rightCodes: ["PostBranches"], isAllowChildZone: false}),insertBranches,insertActivityLogsInfo({action: 'insertBranches',tableName: 'branches',description:"insert branches"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutBranches"], isAllowChildZone: false}), updateBranches,insertActivityLogsInfo({action: 'updateBranches',tableName: 'branches',description:"update branches"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteBranches"], isAllowChildZone: false}), deleteBranches,insertActivityLogsInfo({action: 'deleteBranches',tableName: 'branches',description:"delete branches"}));

router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetBranches", "PutBranches"], isAllowChildZone: true}),getIdBranchesByCodes);
router.post('/check-branch',authorization,checkPermission({rightCodes: ["PostBranch","PutBranch"], isAllowChildZone: false}),checkExistenceBranch);
router.post('/check-branches',authorization,checkPermission({rightCodes: ["PostBranches","PutBranches"], isAllowChildZone: false}),checkExistenceBranches);

export default router;