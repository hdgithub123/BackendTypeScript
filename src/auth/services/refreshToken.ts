import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey: string | undefined = process.env.SECRET_KEY || "123456";
const tokenExpiresIn: string = process.env.TOKEN_EXPIRESIN || '1d';

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing access token' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token format' });
  }

  const accessToken = parts[1];


  jwt.verify(accessToken, secretKey, (err: any, decoded: any) => {
    if (!err) {
      // Token vẫn còn hiệu lực
      return res.status(200).json({ message: 'Access token vẫn còn hiệu lực', accessToken });
    }

    // Kiểm tra loại lỗi
    if (err.name === 'TokenExpiredError') {
      // Token hết hạn → kiểm tra refresh token
      const refreshToken = req.cookies.RefreshToken;
      if (!refreshToken) {
        return res.status(403).json({ message: 'Không có Refresh Token' });
      }

      jwt.verify(refreshToken, secretKey, (refreshErr: any, refreshDecoded: any) => {
        if (refreshErr) {
          return res.status(403).json({ message: 'Refresh Token không hợp lệ hoặc đã hết hạn' });
        }

        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id, code: refreshDecoded.code, organizationId: refreshDecoded.organizationId },
          secretKey,
          { expiresIn: tokenExpiresIn }
        );

        return res.status(200).json({ accessToken: newAccessToken });
      });
    } else {
      // Token giả mạo hoặc sai định dạng
      return res.status(401).json({ message: 'Access token không hợp lệ hoặc bị giả mạo' });
    }
  });

};

export default refreshToken;
