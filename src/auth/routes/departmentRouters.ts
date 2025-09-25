import express from 'express';
const router = express.Router();
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';
import {getDepartments,insertDepartments,updateDepartments,deleteDepartments,getDepartment,insertDepartment,updateDepartment,deleteDepartment,checkExistenceDepartment,checkExistenceDepartments,getIdDepartmentsByCodes} from '../controllers/departmentControllers';
// Định tuyến cho trang department

//chú ý route cha phải được đặt sau route con
router.get('/detail/:id',authorization,checkPermission({rightCodes: ["GetDepartment"], isAllowChildZone: true}), getDepartment);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostDepartment"], isAllowChildZone: false}), insertDepartment,insertActivityLogsInfo({action: 'insertDepartment',tableName: 'departments',description:"insert department"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutDepartment"], isAllowChildZone: false}), updateDepartment,insertActivityLogsInfo({action: 'updateDepartment',tableName: 'departments',description:"update department"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteDepartment"], isAllowChildZone: false}), deleteDepartment,insertActivityLogsInfo({action: 'deleteDepartment',tableName: 'departments',description:"delete department"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetDepartments"], isAllowChildZone: true}),getDepartments);
router.post('/list',authorization,checkPermission({rightCodes: ["PostDepartments"], isAllowChildZone: false}),insertDepartments,insertActivityLogsInfo({action: 'insertDepartments',tableName: 'departments',description:"insert departments"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutDepartments"], isAllowChildZone: false}), updateDepartments,insertActivityLogsInfo({action: 'updateDepartments',tableName: 'departments',description:"update departments"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteDepartments"], isAllowChildZone: false}), deleteDepartments,insertActivityLogsInfo({action: 'deleteDepartments',tableName: 'departments',description:"delete departments"}));

router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetDepartments", "PutDepartments"], isAllowChildZone: true}),getIdDepartmentsByCodes);
router.post('/check-department',authorization,checkPermission({rightCodes: ["PostDepartment","PutDepartment"], isAllowChildZone: false}),checkExistenceDepartment);
router.post('/check-departments',authorization,checkPermission({rightCodes: ["PostDepartments","PutDepartments"], isAllowChildZone: false}),checkExistenceDepartments);

export default router;