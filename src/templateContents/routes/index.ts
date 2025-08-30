import express from 'express';
import userRoutes from './userTemplateContentsRouters';
import usersRoutes from './usersTemplateContentsRouters';
import templateContentsRouters from './templateContentsRouters';

const router = express();
router.use('/', templateContentsRouters);
router.use('/user', userRoutes);
router.use('/users', usersRoutes);
// router.use('/login', loginRouters);
// router.use('/logout', logoutRouter);
// router.use('/refresh-token', refreshTokenRoute);
// router.use('/right', rightRouters);
// router.use('/role', roleRouters);
// router.use('/role-right', roleRightRouters);
// router.use('/zone', zoneRouters);
// router.use('/user-zone-role', UserZoneRoleRoute);

export default router;