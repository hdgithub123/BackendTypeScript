import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware'; 


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetDepartmentTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("department"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostDepartmentTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("department"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutDepartmentTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("department"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteDepartmentTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("department"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetDepartmentTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("department"));

export default router;