import express from 'express';
const router = express.Router();
import {getRoleTemplateContent,insertRoleTemplateContent,updateRoleTemplateContent,deleteRoleTemplateContent,getRoleTemplateContents} from '../controllers/roleTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRoleTemplateContent"], isAllowChildZone: true}), getRoleTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRoleTemplateContent"], isAllowChildZone: false}), insertRoleTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRoleTemplateContent"], isAllowChildZone: false}), updateRoleTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRoleTemplateContent"], isAllowChildZone: false}), deleteRoleTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRoleTemplateContent"], isAllowChildZone: true}), getRoleTemplateContents);

export default router;