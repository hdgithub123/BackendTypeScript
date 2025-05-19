import { Request, Response, NextFunction, RequestHandler } from 'express';
import executeQuery from "../config/mySql/executeQuery";

const checkPermission = ({ rightIds }: { rightIds: string[] | number[] }): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Kiểm tra req.user tồn tại và có userId
      if (!req.user || !('userId' in req.user)) {
        res.status(401).json({ message: "Người dùng chưa đăng nhập!" });
        return; // Dùng return để kết thúc hàm
      }

      const userId = (req.user as { userId: string }).userId;
      const result = await checkUserPermission({ userId, rightIds });

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

const checkUserPermission = async ({ userId, rightIds }: { userId: string, rightIds: string[] | number[] }) => {
  if (!rightIds || rightIds.length === 0) {
    return false;
  }
  const placeholders = rightIds.map(() => '?').join(', ');
    const query = `
                SELECT rights.id FROM users
                JOIN users_roles ON users.id = users_roles.userId
                JOIN roles ON users_roles.roleId = roles.id
                JOIN roles_rights ON roles.id = roles_rights.roleId
                JOIN rights ON roles_rights.rightId = rights.id
                WHERE roles_rights.isactive = TRUE AND users_roles.isactive = TRUE AND users.id = ? AND rights.id IN (${placeholders})
            `;

  const result = await executeQuery(query, [userId, ...rightIds]);
  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    return true; // Có ít nhất một quyền hợp lệ
  } else {
    return false; // Không có quyền hợp lệ
  }
}