import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightsTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("rights"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightsTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("rights"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightsTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("rights"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightsTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("rights"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightsTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("rights"));

export default router;