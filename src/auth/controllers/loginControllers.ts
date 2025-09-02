import { Request, Response, NextFunction } from 'express';
import authentication from '../services/authentication'

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username
    const password = req.body.password
    let organizationCode = req.body.organization
    const result = await authentication(username, password, organizationCode);
    const cookieOptions = {
        httpOnly: true,
        secure: false, // Chỉ gửi cookie qua HTTPS
        // sameSite: 'Strict',
        sameSite: 'lax' as const,
        expires: new Date(Date.now() + 86400000) // Thời gian hết hạn, tính bằng milliseconds( 1 ngày)
    };
    if (result.status && result.refreshToken) {
        res.cookie('RefreshToken', result.refreshToken, cookieOptions);
        res.json({ status: true, token: result.token });
        delete req.body.password;
        req.user = result.user;
        next();
    } else {
        res.status(401).json({ status: false, message: result.message });
    }
}

export default loginController
