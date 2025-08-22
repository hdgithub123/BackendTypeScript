import express from 'express';
const router = express.Router();
import {getUserTemplateContent,insertUserTemplateContent,updateUserTemplateContent,deleteUserTemplateContent,getUserTemplateContents} from '../controllers/userTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetUserTemplateContent"], isAllowChildZone: true}), getUserTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostUserTemplateContent"], isAllowChildZone: false}), insertUserTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutUserTemplateContent"], isAllowChildZone: false}), updateUserTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteUserTemplateContent"], isAllowChildZone: false}), deleteUserTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetUserTemplateContent"], isAllowChildZone: true}), getUserTemplateContents);

export default router;