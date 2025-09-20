import express from 'express';
const router = express.Router();
import {getRightsTemplateContent,insertRightsTemplateContent,updateRightsTemplateContent,deleteRightsTemplateContent,getRightsTemplateContents} from '../controllers/rightsTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightsTemplateContent"], isAllowChildZone: true}), getRightsTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightsTemplateContent"], isAllowChildZone: false}), insertRightsTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightsTemplateContent"], isAllowChildZone: false}), updateRightsTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightsTemplateContent"], isAllowChildZone: false}), deleteRightsTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightsTemplateContent"], isAllowChildZone: true}), getRightsTemplateContents);

export default router;