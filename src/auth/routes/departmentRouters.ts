import express from 'express';
const router = express.Router();
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';
import {getSettingDepartments,getDepartments,insertDepartments,insertDepartmentsByCode,updateDepartments,updateDepartmentsByCode,deleteDepartments,getDepartment,insertDepartment,updateDepartment,deleteDepartment,checkExistenceDepartment,checkExistenceDepartments,getIdDepartmentsByCodes} from '../controllers/departmentControllers';
// Định tuyến cho trang department

//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetDepartment"], isAllowMoreDepartment: true}), getDepartment);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostDepartment"], isAllowMoreDepartment: false}), insertDepartment,insertActivityLogsInfo({action: 'insertDepartment',tableName: 'departments',description:"insert department"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutDepartment"], isAllowMoreDepartment: false}), updateDepartment,insertActivityLogsInfo({action: 'updateDepartment',tableName: 'departments',description:"update department"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteDepartment"], isAllowMoreDepartment: false}), deleteDepartment,insertActivityLogsInfo({action: 'deleteDepartment',tableName: 'departments',description:"delete department"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetDepartments"], isAllowMoreDepartment: true}),getDepartments);
router.post('/list',authorization,checkPermission({rightCodes: ["PostDepartments"], isAllowMoreDepartment: false}),insertDepartments,insertActivityLogsInfo({action: 'insertDepartments',tableName: 'departments',description:"insert departments"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutDepartments"], isAllowMoreDepartment: false}), updateDepartments,insertActivityLogsInfo({action: 'updateDepartments',tableName: 'departments',description:"update departments"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteDepartments"], isAllowMoreDepartment: false}), deleteDepartments,insertActivityLogsInfo({action: 'deleteDepartments',tableName: 'departments',description:"delete departments"}));

router.post('/list/code',authorization,checkPermission({rightCodes: ["PostDepartments"], isAllowMoreDepartment: false}),insertDepartmentsByCode,insertActivityLogsInfo({action: 'insertDepartments',tableName: 'departments',description:"insert departments"}));
router.put('/list/code',authorization,checkPermission({rightCodes: ["PutDepartments"], isAllowMoreDepartment: false}), updateDepartmentsByCode,insertActivityLogsInfo({action: 'updateDepartments',tableName: 'departments',description:"update departments"}));

router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetDepartments", "PutDepartments"], isAllowMoreDepartment: true}),getIdDepartmentsByCodes);
router.post('/check-department',authorization,checkPermission({rightCodes: ["PostDepartment","PutDepartment"], isAllowMoreDepartment: false}),checkExistenceDepartment);
router.post('/check-departments',authorization,checkPermission({rightCodes: ["PostDepartments","PutDepartments"], isAllowMoreDepartment: false}),checkExistenceDepartments);



router.get('/setting/list',authorization,getSettingDepartments);

export default router;