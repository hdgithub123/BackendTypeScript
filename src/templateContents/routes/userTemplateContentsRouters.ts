import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUserTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("user"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUserTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("user"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUserTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("user"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUserTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("user"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetUserTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("user"));

export default router;