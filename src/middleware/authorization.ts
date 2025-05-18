import { Request, Response, NextFunction,RequestHandler } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load biến môi trường từ tệp .env

//Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const secretKey: string | null = process.env.SECRET_KEY || null

// Middleware để xác thực token JWT
const authorization: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    // Lấy token từ tiêu đề 'Authorization'
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
        return;
    }

    // Xác thực token
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
            return;
        } else {
            // Lưu thông tin người dùng được giải mã từ token vào đối tượng yêu cầu
            req.user = decoded;
            next(); // Cho phép middleware tiếp tục xử lý yêu cầu
        }
    });
}










export default authorization;

