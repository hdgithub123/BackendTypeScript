import express from 'express';
import userRoutes from './userTemplateContentsRouters';
import usersRoutes from './usersTemplateContentsRouters';
import organizationRoutes from './organizationTemplateContentsRouters'
import organizationsRoutes from './organizationsTemplateContentsRouters'
import branchRoutes from './branchTemplateContentsRouters'
import branchesRoutes from './branchesTemplateContentsRouters'
import departmentRoutes from './departmentTemplateContentsRouters'
import departmentsRoutes from './departmentsTemplateContentsRouters'


import rightRoutes from './rightTemplateContentsRouters'
import rightsRoutes from './rightsTemplateContentsRouters'
import rolesRoutes from './rolesTemplateContentsRouters'
import roleRoutes from './roleTemplateContentsRouters' 
import userDepartmentRoleRotes from './userDepartmentRoleTemplateContentsRouters'
import userDepartmentRolesRotes from './userDepartmentRolesTemplateContentsRouters'


import templateContentsRouters from './templateContentsRouters';

const router = express();
router.use('/', templateContentsRouters);
router.use('/user', userRoutes);
router.use('/users', usersRoutes);
router.use('/organization', organizationRoutes);
router.use('/organizations', organizationsRoutes);
router.use('/branch', branchRoutes);
router.use('/branches', branchesRoutes);
router.use('/department', departmentRoutes);
router.use('/departments', departmentsRoutes);
router.use('/right', rightRoutes);
router.use('/rights', rightsRoutes);
router.use('/roles', rolesRoutes);
router.use('/role', roleRoutes);
router.use('/user-department-role', userDepartmentRoleRotes);
router.use('/user-department-roles', userDepartmentRolesRotes);

export default router;