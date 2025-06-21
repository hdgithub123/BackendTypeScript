import e, { Request, Response, NextFunction, RequestHandler } from 'express';
import executeQuery from "../config/mySql/executeQuery";

const checkPermission = ({ rightCodes, isAllowChildZone = false }: { rightCodes: string[] | number[], isAllowChildZone?: boolean }): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Kiểm tra req.user tồn tại và có userId
      if (!req.user || !('userId' in req.user)) {
        res.status(401).json({ message: "Người dùng chưa đăng nhập!" });
        return; // Dùng return để kết thúc hàm
      }


      const currentZoneHeader = req.headers['zone'];
      if (!currentZoneHeader) {
        res.status(400).json({ message: "Thiếu thông tin zone!" });
        return; // Dùng return để kết thúc hàm
      }
      const zoneId = typeof currentZoneHeader === 'string' ? currentZoneHeader : Array.isArray(currentZoneHeader) ? currentZoneHeader[0] : '';
      const isChildZoneHeader = req.headers['is_child_zone'];

      let isChildZone = false;

      if (!isAllowChildZone) {
        isChildZone = false;
      } else {
        isChildZone = typeof isChildZoneHeader === 'string'
          ? isChildZoneHeader === 'true' || isChildZoneHeader === '1'
          : Array.isArray(isChildZoneHeader)
            ? isChildZoneHeader[0] === 'true' || isChildZoneHeader[0] === '1'
            : false;
      }



      const userId = (req.user as { userId: string }).userId;
      // const zoneId = (req.user as { zoneId: string }).zoneId;
      const result = await checkUserPermission({ userId, rightCodes, zoneId, isChildZone });

      if (result) {
        next(); // Không return ở đây
      } else {
        res.status(403).json({ message: "Người dùng không có quyền truy cập!" });
        return; // Dùng return để kết thúc hàm
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi kiểm tra quyền!" });
      return; // Dùng return để kết thúc hàm
    }
  };
};

export default checkPermission;


const checkUserPermission = async ({ userId, rightCodes, zoneId, isChildZone }: { userId: string, rightCodes: string[] | number[], zoneId: string, isChildZone: boolean }) => {
  if (!rightCodes || rightCodes.length === 0) {
    return false;
  }
  const placeholders = rightCodes.map(() => '?').join(', ');
  let query = "";
  if (isChildZone) {
    query = `
                WITH RECURSIVE zone_tree AS (
                SELECT id
                FROM zones
                WHERE id = ? -- zone gốc
                UNION ALL

                SELECT z.id
                FROM zones z
                JOIN zone_tree zt ON z.parentId = zt.id
              )
            SELECT rights.id
            FROM users
            JOIN users_roles_zones ON users.id = users_roles_zones.userId
            JOIN roles ON users_roles_zones.roleId = roles.id
            JOIN roles_rights ON roles.id = roles_rights.roleId
            JOIN rights ON roles_rights.rightId = rights.id
            WHERE roles_rights.isactive = TRUE
              AND users_roles_zones.isactive = TRUE
              AND users.id = ?
              AND users_roles_zones.zoneId IN (SELECT id FROM zone_tree)
              AND rights.code IN (${placeholders})
            `;
  } else {
    query = `
                SELECT rights.id FROM users
                JOIN users_roles_zones ON users.id = users_roles_zones.userId
                JOIN roles ON users_roles_zones.roleId = roles.id
                JOIN roles_rights ON roles.id = roles_rights.roleId
                JOIN rights ON roles_rights.rightId = rights.id
                WHERE roles_rights.isactive = TRUE AND users_roles_zones.isactive = TRUE AND users.id = ? AND users_roles_zones.zoneId = ? AND rights.code IN (${placeholders})
            `;
  }


  const result = await executeQuery(
    query,
    isChildZone
      ? [zoneId, userId, ...rightCodes]
      : [userId, zoneId, ...rightCodes]
  );

  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    return true; // Có ít nhất một quyền hợp lệ
  } else {
    return false; // Không có quyền hợp lệ
  }
}