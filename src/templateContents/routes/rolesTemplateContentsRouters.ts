import express from 'express';
const router = express.Router();
import {getRolesTemplateContent,insertRolesTemplateContent,updateRolesTemplateContent,deleteRolesTemplateContent,getRolesTemplateContents} from '../controllers/rolesTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRolesTemplateContent"], isAllowChildZone: true}), getRolesTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRolesTemplateContent"], isAllowChildZone: false}), insertRolesTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRolesTemplateContent"], isAllowChildZone: false}), updateRolesTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRolesTemplateContent"], isAllowChildZone: false}), deleteRolesTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRolesTemplateContent"], isAllowChildZone: true}), getRolesTemplateContents);

export default router;