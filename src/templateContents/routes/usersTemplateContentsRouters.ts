import express from 'express';
const router = express.Router();
import {getUsersTemplateContent,insertUsersTemplateContent,updateUsersTemplateContent,deleteUsersTemplateContent,getUsersTemplateContents} from '../controllers/usersTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUsersTemplateContent"], isAllowChildZone: true}), getUsersTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUsersTemplateContent"], isAllowChildZone: false}), insertUsersTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUsersTemplateContent"], isAllowChildZone: false}), updateUsersTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUsersTemplateContent"], isAllowChildZone: false}), deleteUsersTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetUsersTemplateContent"], isAllowChildZone: true}), getUsersTemplateContents);

export default router;