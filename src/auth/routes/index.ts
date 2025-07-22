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


const router = express();
router.use('/activity-logs', activityLogsRouters);
router.use('/user', userRoutes);
router.use('/login', loginRouters);
router.use('/logout', logoutRouter);
router.use('/refresh-token', refreshTokenRoute);
router.use('/right', rightRouters);
router.use('/role', roleRouters);
router.use('/role-rights', roleRightRouters);
router.use('/zone', zoneRouters);
router.use('/user-zone-role', UserZoneRoleRoute);

export default router;