import { Request, Response } from 'express';
import authentication from './authentication'

const authenticate = async (req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password
    const result = await authentication(username, password);
        const cookieOptions = {
            httpOnly: true,
            secure: false, // Chỉ gửi cookie qua HTTPS
            // sameSite: 'Strict',
            sameSite:'lax' as const,
            expires: new Date(Date.now() + 86400000) // Thời gian hết hạn, tính bằng milliseconds( 1 ngày)
        };
    if (result.status && result.refreshToken) {
        res.cookie('RefreshToken', result.refreshToken, cookieOptions);
        res.json({ status: true, token: result.token });
    } else {
        res.status(401).json({ status: false, message: result.message });
    }
}

export default authenticate