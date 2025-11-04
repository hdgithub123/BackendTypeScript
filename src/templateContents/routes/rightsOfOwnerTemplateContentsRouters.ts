import express from 'express';
const router = express.Router();
import {getSubjectTemplateContent,insertSubjectTemplateContent,updateSubjectTemplateContent,deleteSubjectTemplateContent,getSubjectTemplateContents} from '../controllers/subjectTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightsOfOwnerTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContent("rightsOfOwner"));
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightsOfOwnerTemplateContent"], isAllowMoreDepartment: false}), insertSubjectTemplateContent("rightsOfOwner"),insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightsOfOwnerTemplateContent"], isAllowMoreDepartment: false}), updateSubjectTemplateContent("rightsOfOwner"),insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightsOfOwnerTemplateContent"], isAllowMoreDepartment: false}), deleteSubjectTemplateContent("rightsOfOwner"),insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightsOfOwnerTemplateContent"], isAllowMoreDepartment: true}), getSubjectTemplateContents("rightsOfOwner"));

export default router;