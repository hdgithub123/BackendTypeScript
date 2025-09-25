import express from 'express';
const router = express.Router();
import {getDepartmentsTemplateContent,insertDepartmentsTemplateContent,updateDepartmentsTemplateContent,deleteDepartmentsTemplateContent,getDepartmentsTemplateContents} from '../controllers/departmentsTemplateContentsControllers'; 
import {insertActivityLogsInfo, authorization, checkPermission} from '../../auth/middleware';



//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetDepartmentsTemplateContent"], isAllowChildZone: true}), getDepartmentsTemplateContent);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostDepartmentsTemplateContent"], isAllowChildZone: false}), insertDepartmentsTemplateContent,insertActivityLogsInfo({action: 'insertTemplateContent', tableName: 'template_contents', description:"insert template content"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutDepartmentsTemplateContent"], isAllowChildZone: false}), updateDepartmentsTemplateContent,insertActivityLogsInfo({action: 'updateTemplateContent', tableName: 'template_contents', description:"update template content"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteDepartmentsTemplateContent"], isAllowChildZone: false}), deleteDepartmentsTemplateContent,insertActivityLogsInfo({action: 'deleteTemplateContent', tableName: 'template_contents', description:"delete template content"}));


router.get('/list',authorization,checkPermission({rightCodes: ["GetDepartmentsTemplateContent"], isAllowChildZone: true}), getDepartmentsTemplateContents);

export default router;