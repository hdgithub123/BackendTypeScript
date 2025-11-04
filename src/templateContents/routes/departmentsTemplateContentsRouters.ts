import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';



//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetDepartmentsTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("departments"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostDepartmentsTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("departments"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutDepartmentsTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("departments"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteDepartmentsTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("departments"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetDepartmentsTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("departments"));

export default router;