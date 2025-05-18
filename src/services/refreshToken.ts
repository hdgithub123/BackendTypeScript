import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey: string | undefined = process.env.SECRET_KEY;
const tokenExpiresIn: string | null = process.env.TOKEN_EXPIRESIN || '1d'

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.RefreshToken;
  if (!refreshToken) return res.status(403).json({ message: 'Không có Refresh Token' });

  jwt.verify(refreshToken, secretKey, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'Refresh Token hết hạn, đăng nhập lại' });
        const newAccessToken = jwt.sign({ userId: decoded.userId, username: decoded.username }, secretKey, { expiresIn: tokenExpiresIn });
    res.json({ accessToken: newAccessToken });
  });
};

export default refreshToken