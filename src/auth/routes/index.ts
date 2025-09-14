import express from 'express';
import activityLogsRouters from './activityLogsRouters';
import userRoutes from './userRoutes';
import loginRouters from './loginRouters';
import logoutRouter from './logoutRouters';
import refreshTokenRoute from './refreshTokenRoute';
import rightRouters from './rightRouters';
import roleRightRouters from './roleRightRouters';
import roleRouters from './roleRouters';
import zoneRouters from './zoneRouters';
import UserZoneRoleRoute from './userZoneRoleRouters';
import organizationRouters from './organizationRouters';


const router = express();
router.use('/activity-logs', activityLogsRouters);
router.use('/organization', organizationRouters);
router.use('/user', userRoutes);
router.use('/login', loginRouters);
router.use('/logout', logoutRouter);
router.use('/refresh-token', refreshTokenRoute);
router.use('/right', rightRouters);
router.use('/role', roleRouters);
router.use('/role-right', roleRightRouters);
router.use('/zone', zoneRouters);
router.use('/user-zone-role', UserZoneRoleRoute);


export default router;