import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';



//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUserDepartmentRoleTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("user_department_role"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUserDepartmentRoleTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("user_department_role"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUserDepartmentRoleTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("user_department_role"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUserDepartmentRoleTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("user_department_role"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetUserDepartmentRoleTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("user_department_role"));

export default router;