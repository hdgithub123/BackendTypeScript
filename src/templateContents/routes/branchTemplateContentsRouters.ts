import express from 'express';
const router = express.Router();
import {getBranchTemplateContent,insertBranchTemplateContent,updateBranchTemplateContent,deleteBranchTemplateContent,getBranchTemplateContents} from '../controllers/branchTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware'; 


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetBranchTemplateContent"], isAllowChildZone: true}), getBranchTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostBranchTemplateContent"], isAllowChildZone: false}), insertBranchTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutBranchTemplateContent"], isAllowChildZone: false}), updateBranchTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteBranchTemplateContent"], isAllowChildZone: false}), deleteBranchTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetBranchTemplateContent"], isAllowChildZone: true}), getBranchTemplateContents);

export default router;