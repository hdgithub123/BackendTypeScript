import express from 'express';
const router = express.Router();
import {getRightsOfOwnerTemplateContent,insertRightsOfOwnerTemplateContent,updateRightsOfOwnerTemplateContent,deleteRightsOfOwnerTemplateContent,getRightsOfOwnerTemplateContents} from '../controllers/rightsOfOwnerTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightsOfOwnerTemplateContent"], isAllowChildZone: true}), getRightsOfOwnerTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightsOfOwnerTemplateContent"], isAllowChildZone: false}), insertRightsOfOwnerTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightsOfOwnerTemplateContent"], isAllowChildZone: false}), updateRightsOfOwnerTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightsOfOwnerTemplateContent"], isAllowChildZone: false}), deleteRightsOfOwnerTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightsOfOwnerTemplateContent"], isAllowChildZone: true}), getRightsOfOwnerTemplateContents);

export default router;