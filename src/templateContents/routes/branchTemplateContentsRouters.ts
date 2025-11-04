import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware'; 


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetBranchTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("branch"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostBranchTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("branch"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutBranchTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("branch"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteBranchTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("branch"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetBranchTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("branch"));

export default router;