import express from 'express';
const router = express.Router();
import {getRightTemplateContent,insertRightTemplateContent,updateRightTemplateContent,deleteRightTemplateContent,getRightTemplateContents} from '../controllers/rightTemplateContentsControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetRightTemplateContent"], isAllowChildZone: true}), getRightTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostRightTemplateContent"], isAllowChildZone: false}), insertRightTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutRightTemplateContent"], isAllowChildZone: false}), updateRightTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteRightTemplateContent"], isAllowChildZone: false}), deleteRightTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetRightTemplateContent"], isAllowChildZone: true}), getRightTemplateContents);

export default router;