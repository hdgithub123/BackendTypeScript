import express from 'express';
const router = express.Router();
import {getRightOfOwnerTemplateContent,insertRightOfOwnerTemplateContent,updateRightOfOwnerTemplateContent,deleteRightOfOwnerTemplateContent,getRightOfOwnerTemplateContents} from '../controllers/rightOfOwnerTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightOfOwnerTemplateContent"], isAllowChildZone: true}), getRightOfOwnerTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightOfOwnerTemplateContent"], isAllowChildZone: false}), insertRightOfOwnerTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightOfOwnerTemplateContent"], isAllowChildZone: false}), updateRightOfOwnerTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightOfOwnerTemplateContent"], isAllowChildZone: false}), deleteRightOfOwnerTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightOfOwnerTemplateContent"], isAllowChildZone: true}), getRightOfOwnerTemplateContents);

export default router;