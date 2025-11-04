import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRoleTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("role"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRoleTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("role"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRoleTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("role"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRoleTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("role"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRoleTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("role"));

export default router;