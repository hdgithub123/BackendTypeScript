import express from 'express';
const router = express.Router();
import {getTemplateContents,insertTemplateContents,updateTemplateContents,deleteTemplateContents,getTemplateContent,insertTemplateContent,updateTemplateContent,deleteTemplateContent} from '../controllers/TemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code',authorization,checkPermission({rightCodes: ["GetTemplateContent"], isAllowChildZone: true}), getTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostTemplateContent"], isAllowChildZone: false}), insertTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutTemplateContent"], isAllowChildZone: false}), updateTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteTemplateContent"], isAllowChildZone: false}), deleteTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetTemplateContents"], isAllowChildZone: true}),getTemplateContents);
router.post('/list',authorization,checkPermission({rightCodes: ["PostTemplateContents"], isAllowChildZone: false}), insertTemplateContents,insertActivityLogsInfo({action: 'insertTemplateContents', tableName: 'template_contents', description:"insert template contents"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutTemplateContents"], isAllowChildZone: false}), updateTemplateContents,insertActivityLogsInfo({action: 'updateTemplateContents', tableName: 'template_contents', description:"update template contents"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteTemplateContents"], isAllowChildZone: false}), deleteTemplateContents,insertActivityLogsInfo({action: 'deleteTemplateContents', tableName: 'template_contents', description:"delete template contents"}));

export default router;