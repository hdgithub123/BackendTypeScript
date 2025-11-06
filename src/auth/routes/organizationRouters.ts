import express from 'express';
const router = express.Router();
import {getOrganizations,insertOrganizations,updateOrganizations,deleteOrganizations,getOrganization,insertOrganization,updateOrganization,deleteOrganization,getIdOrganizationsByCodes,checkExistenceOrganization,checkExistenceOrganizations} from '../controllers/organizationControllers';
import {insertActivityLogsInfo, authorization, checkPermission} from '../middleware';


//chú ý route cha phải được đặt sau route con
router.get('/detail/:code',authorization,checkPermission({rightCodes: ["GetOrganization"], isAllowMoreDepartment: true}), getOrganization);
router.post('/detail/insert',authorization,checkPermission({rightCodes: ["PostOrganization"], isAllowMoreDepartment: false}), insertOrganization,insertActivityLogsInfo({action: 'insertOrganization', tableName: 'organizations', description:"insert organization"}));
router.put('/detail/:id',authorization,checkPermission({rightCodes: ["PutOrganization"], isAllowMoreDepartment: false}), updateOrganization,insertActivityLogsInfo({action: 'updateOrganization', tableName: 'organizations', description:"update organization"}));
router.delete('/detail/:id',authorization,checkPermission({rightCodes: ["DeleteOrganization"], isAllowMoreDepartment: false}), deleteOrganization,insertActivityLogsInfo({action: 'deleteOrganization', tableName: 'organizations', description:"delete organization"}));

// router cha
router.get('/list',authorization,checkPermission({rightCodes: ["GetOrganizations"], isAllowMoreDepartment: true}),getOrganizations);

router.post('/list',authorization,checkPermission({rightCodes: ["PostOrganizations"], isAllowMoreDepartment: false}), insertOrganizations,insertActivityLogsInfo({action: 'insertOrganizations', tableName: 'organizations', description:"insert organizations"}));
router.put('/list',authorization,checkPermission({rightCodes: ["PutOrganizations"], isAllowMoreDepartment: false}), updateOrganizations,insertActivityLogsInfo({action: 'updateOrganizations', tableName: 'organizations', description:"update organizations"}));
router.delete('/list',authorization,checkPermission({rightCodes: ["DeleteOrganizations"], isAllowMoreDepartment: false}), deleteOrganizations,insertActivityLogsInfo({action: 'deleteOrganizations', tableName: 'organizations', description:"delete organizations"}));

router.post('/ids-codes',authorization,checkPermission({rightCodes: ["GetOrganization", "PutOrganizations"], isAllowMoreDepartment: true}),getIdOrganizationsByCodes);
router.post('/check-organization',authorization,checkPermission({rightCodes: ["PostOrganization","PutOrganization"], isAllowMoreDepartment: false}),checkExistenceOrganization);

//router.post('/check-organization',checkExistenceOrganization);

router.post('/check-organizations',authorization,checkPermission({rightCodes: ["PostOrganizations","PutOrganizations"], isAllowMoreDepartment: false}),checkExistenceOrganizations);


export default router;