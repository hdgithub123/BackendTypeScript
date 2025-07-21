import { Request, Response, NextFunction,RequestHandler } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load biến môi trường từ tệp .env

//Extend Express Request interface to include 'user'
// declare global {
//     namespace Express {
//         interface Request {
//             user?: any;
//         }
//     }
// }

const secretKey: string | null = process.env.SECRET_KEY || null

// Middleware để xác thực token JWT
const authorization: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    // Lấy token từ tiêu đề 'Authorization'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
        return;
    }

    // Xử lý Bearer Token
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid token format' });
        return;
    }
    const token = parts[1];

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

