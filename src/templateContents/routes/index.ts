import express from 'express';
import userRoutes from './userTemplateContentsRouters';
import usersRoutes from './usersTemplateContentsRouters';
import organizationRoutes from './organizationTemplateContentsRouters'
import organizationsRoutes from './organizationsTemplateContentsRouters'
import branchRoutes from './branchTemplateContentsRouters'
import branchesRoutes from './branchesTemplateContentsRouters'
import rightRoutes from './rightTemplateContentsRouters'
import rightsRoutes from './rightsTemplateContentsRouters'
import rightOfOwnerRoutes from './rightOfOwnerTemplateContentsRouters' 
import rightsOfOwnerRoutes from './rightsOfOwnerTemplateContentsRouters'
import rolesRoutes from './rolesTemplateContentsRouters'
import roleRoutes from './roleTemplateContentsRouters' 

import templateContentsRouters from './templateContentsRouters';

const router = express();
router.use('/', templateContentsRouters);
router.use('/user', userRoutes);
router.use('/users', usersRoutes);
router.use('/organization', organizationRoutes);
router.use('/organizations', organizationsRoutes);
router.use('/branch', branchRoutes);
router.use('/branches', branchesRoutes);
router.use('/right', rightRoutes);
router.use('/rights', rightsRoutes);
router.use('/right-of-owner', rightOfOwnerRoutes);
router.use('/rights-of-owner', rightsOfOwnerRoutes);
router.use('/roles', rolesRoutes);
router.use('/role', roleRoutes);

// router.use('/login', loginRouters);
// router.use('/logout', logoutRouter);
// router.use('/refresh-token', refreshTokenRoute);
// router.use('/right', rightRouters);
// router.use('/role', roleRouters);
// router.use('/role-right', roleRightRouters);
// router.use('/zone', zoneRouters);
// router.use('/user-zone-role', UserZoneRoleRoute);

export default router;