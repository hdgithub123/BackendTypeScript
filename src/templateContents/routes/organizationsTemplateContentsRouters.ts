import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetOrganizationsTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("organization"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostOrganizationsTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("organization"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutOrganizationsTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("organization"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteOrganizationsTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("organization"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetOrganizationsTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("organization"));

export default router;