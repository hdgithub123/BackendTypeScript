import express from 'express';
const router = express.Router();
import {getTemplateContent,insertTemplateContent,updateTemplateContent,deleteTemplateContent,getTemplateContents} from '../controllers/organizationTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetOrganizationTemplateContent"], isAllowChildZone: true}), getTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostOrganizationTemplateContent"], isAllowChildZone: false}), insertTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutOrganizationTemplateContent"], isAllowChildZone: false}), updateTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteOrganizationTemplateContent"], isAllowChildZone: false}), deleteTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetOrganizationTemplateContent"], isAllowChildZone: true}), getTemplateContents);

export default router;