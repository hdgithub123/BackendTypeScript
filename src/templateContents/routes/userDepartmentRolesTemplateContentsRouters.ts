import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUserDepartmentRolesTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContent("user_department_roles"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUserDepartmentRolesTemplateContent"], isAllowChildZone: false}), insertSubjectTemplateContent("user_department_roles"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUserDepartmentRolesTemplateContent"], isAllowChildZone: false}), updateSubjectTemplateContent("user_department_roles"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUserDepartmentRolesTemplateContent"], isAllowChildZone: false}), deleteSubjectTemplateContent("user_department_roles"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetUserDepartmentRolesTemplateContent"], isAllowChildZone: true}), getSubjectTemplateContents("user_department_roles"));

export default router;