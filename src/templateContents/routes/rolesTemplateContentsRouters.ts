import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRolesTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("roles"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRolesTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("roles"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRolesTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("roles"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRolesTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("roles"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRolesTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("roles"));

export default router;