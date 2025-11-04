import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUsersTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("users"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUsersTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("users"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUsersTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("users"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUsersTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("users"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetUsersTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("users"));

export default router;