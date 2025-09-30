import e, { Request, Response, NextFunction, RequestHandler } from 'express';
import executeQuery from "../../connectSql/mySql/executeQuery";

import dotenv from 'dotenv';
dotenv.config();


const checkPermission = ({ rightCodes, isAllowChildZone = false }: { rightCodes: string[] | number[], isAllowChildZone?: boolean }): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Kiểm tra req.user tồn tại và có userId
      if (!req.user || !('id' in req.user)) {
        res.status(401).json({ message: "User not logged in!" });
        return;
      }

      // Lấy departmentIds từ header
      const currentDeptHeader = req.headers['departments'];
      if (!currentDeptHeader) {
        res.status(400).json({ message: "Missing departments information!" });
        return;
      }

      // Chuyển departmentIds thành mảng
      let departmentIds: string[] = [];
      if (typeof currentDeptHeader === 'string') {
        departmentIds = currentDeptHeader.split(',').map(id => id.trim()).filter(Boolean);
      } else if (Array.isArray(currentDeptHeader)) {
        departmentIds = currentDeptHeader.map(id => id.toString().trim()).filter(Boolean);
      }

      if (departmentIds.length === 0) {
        res.status(400).json({ message: "Invalid departments information!" });
        return;
      }

      // Xử lý cờ isChildDepartment
      const isChildDeptHeader = req.headers['is_child_department'];
      let isChildDepartment = false;

      if (!isAllowChildZone) {
        isChildDepartment = false;
      } else {
        isChildDepartment = typeof isChildDeptHeader === 'string'
          ? isChildDeptHeader === 'true' || isChildDeptHeader === '1'
          : Array.isArray(isChildDeptHeader)
            ? isChildDeptHeader[0] === 'true' || isChildDeptHeader[0] === '1'
            : false;
      }

      const userId = (req.user as { id: string }).id;

      // Gọi hàm check quyền
      const result = await checkUserPermission({ 
        userId, 
        rightCodes, 
        departmentIds, 
        isChildDepartment 
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
  isChildDepartment,
}: {
  userId: string;
  rightCodes: string[] | number[];
  departmentIds: string[];
  isChildDepartment: boolean;
}) => {
  if (!rightCodes || rightCodes.length === 0) {
    return false;
  }
  if (!departmentIds || departmentIds.length === 0) {
    return false;
  }

  const rightPlaceholders = rightCodes.map(() => '?').join(', ');
  const deptPlaceholders = departmentIds.map(() => '?').join(', ');

  let query = "";
  let params: any[] = [];

  if (isChildDepartment) {
    query = `
      WITH RECURSIVE dept_tree AS (
        SELECT id
        FROM departments
        WHERE id IN (${deptPlaceholders})
        UNION ALL
        SELECT d.id
        FROM departments d
        JOIN dept_tree dt ON d.parentId = dt.id
      )
      SELECT rights.id
      FROM users
      JOIN users_departments_roles ON users.id = users_departments_roles.userId
      JOIN roles ON users_departments_roles.roleId = roles.id
      JOIN roles_rights ON roles.id = roles_rights.roleId
      JOIN rights ON roles_rights.rightId = rights.id
      WHERE roles_rights.isactive = TRUE
        AND users.isActive = TRUE
        AND users_departments_roles.isactive = TRUE
        AND users.id = ?
        AND users_departments_roles.departmentId IN (SELECT id FROM dept_tree)
        AND rights.code IN (${rightPlaceholders})
    `;
    params = [...departmentIds, userId, ...rightCodes];
  } else {
    query = `
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
        AND users_departments_roles.departmentId IN (${deptPlaceholders})
        AND rights.code IN (${rightPlaceholders})
    `;
    params = [userId, ...departmentIds, ...rightCodes];
  }

  const result = await executeQuery(query, params);

  return result.data && Array.isArray(result.data) && result.data.length > 0;
};
