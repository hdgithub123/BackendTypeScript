import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load biến môi trường từ tệp .env
const secretKey: string | null = process.env.SECRET_KEY || null;


const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // Xử lý Bearer Token
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {

        } else {
            const token = parts[1];
            // Xác thực token
            jwt.verify(token, secretKey, (err: any, decoded: any) => {
                if (!err) {
                    // Lưu thông tin người dùng được giải mã từ token vào đối tượng yêu cầu
                    req.user = decoded;
                }
            });
        }
    }
    // kiểm tra xem có RefreshToken trong cookie không nếu có thì xóa nó đi 

    const refreshToken = req.cookies.RefreshToken;
    if (refreshToken) {
        res.clearCookie('RefreshToken', {
            httpOnly: true,
            secure: false, // Đặt true nếu dùng HTTPS
            sameSite: 'lax',
            path: '/', // Đảm bảo đúng path nếu bạn set cookie với path khác
        });

        // Thông báo cho frontend xóa token trong session
        res.json({
            status: true,
            message: 'Logout successful. Please remove token from session on frontend.'
        });
        next(); // Tiếp tục xử lý middleware khác nếu có
    };
}


export default logoutController;