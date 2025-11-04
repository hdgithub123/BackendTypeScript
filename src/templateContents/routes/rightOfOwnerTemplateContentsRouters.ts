import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightOfOwnerTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("rightOfOwner"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightOfOwnerTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("rightOfOwner"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightOfOwnerTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("rightOfOwner"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightOfOwnerTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("rightOfOwner"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightOfOwnerTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("rightOfOwner"));

export default router;