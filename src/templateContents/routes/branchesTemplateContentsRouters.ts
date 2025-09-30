import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetBranchesTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("branches"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostBranchesTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("branches"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutBranchesTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("branches"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteBranchesTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("branches"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetBranchesTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("branches"));

export default router;