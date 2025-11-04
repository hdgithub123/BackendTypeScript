import e, { Request, Response, NextFunction, RequestHandler } from 'express';
import executeQuery from "../../connectSql/mySql/executeQuery";

import dotenv from 'dotenv';
dotenv.config();


const checkPermission = ({ rightCodes, isAllowMoreDepartment = false }: { rightCodes: string[] | number[], isAllowMoreDepartment?: boolean }): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Kiểm tra req.user tồn tại và có userId
      if (!req.user || !('id' in req.user)) {
        res.status(401).json({ message: "User not logged in!" });
        return;
      }

      // Lấy departmentIds từ header
      const currentDepartmentId = req.headers.departmentid;
      const stringDepartmentIds = req.headers.departmentids;
      if (!stringDepartmentIds) {
        res.status(400).json({ message: "Missing departments information!" });
        return;
      }

      // Chuyển departmentIds thành mảng
      let departmentIdsTemp: string[] = [];
      if (typeof stringDepartmentIds === 'string') {
        departmentIdsTemp = stringDepartmentIds.split(',').map(id => id.trim()).filter(Boolean);
      } else if (Array.isArray(stringDepartmentIds)) {
        departmentIdsTemp = stringDepartmentIds.map(id => id.toString().trim()).filter(Boolean);
      }

      if (departmentIdsTemp.length === 0) {
        res.status(400).json({ message: "Invalid departments information!" });
        return;
      }


      let departmentIds: string[] = [];
      if(isAllowMoreDepartment) {
        departmentIds = [...departmentIdsTemp,currentDepartmentId as string];
      } else {
       departmentIds = currentDepartmentId ? [currentDepartmentId as string] : [];
      }


      const userId = (req.user as { id: string }).id;

      // Gọi hàm check quyền
      const result = await checkUserPermission({ 
        userId, 
        rightCodes, 
        departmentIds, 
      });

      if (result) {
        next();
      } else {
        res.status(403).json({ message: "User does not have permission!" });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error while checking permission!" });
      return;
    }
  };
};

export default checkPermission;


const checkUserPermission = async ({
  userId,
  rightCodes,
  departmentIds,
}: {
  userId: string;
  rightCodes: string[] | number[];
  departmentIds: string[];
}) => {
  if (!rightCodes || rightCodes.length === 0) return false;
  if (!departmentIds || departmentIds.length === 0) return false;

  const rightPlaceholders = rightCodes.map(() => '?').join(', ');

  for (const deptId of departmentIds) {
    const query = `
      SELECT rights.id
      FROM users
      JOIN users_departments_roles ON users.id = users_departments_roles.userId
      JOIN roles ON users_departments_roles.roleId = roles.id
      JOIN roles_rights ON roles.id = roles_rights.roleId
      JOIN rights ON roles_rights.rightId = rights.id
      WHERE users.isActive = TRUE
        AND roles_rights.isactive = TRUE
        AND users_departments_roles.isactive = TRUE
        AND users.id = ?
        AND users_departments_roles.departmentId = ?
        AND rights.code IN (${rightPlaceholders})
    `;
    const params = [userId, deptId, ...rightCodes];

    const result = await executeQuery(query, params);

    const hasPermission = result.data && Array.isArray(result.data) && result.data.length > 0;
    if (!hasPermission) {
      // Nếu không có quyền ở phòng ban này → trả về false
      return false;
    }
  }

  // Nếu tất cả phòng ban đều có quyền → trả về true
  return true;
};

