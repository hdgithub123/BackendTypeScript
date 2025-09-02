const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';

import executeQuery from "../../connectSql/mySql/executeQuery";

require('dotenv').config(); // Load biến môi trường từ tệp .env

const secretKey: string | null = process.env.SECRET_KEY || null
const tokenExpiresIn: string | null = process.env.TOKEN_EXPIRESIN || '1d'
const refreshTokenExpiresIn: string | null = process.env.REFRESH_TOKEN_EXPIRESIN || '7d'


// tạo interface authentication status: true, token, refreshToken, message:null
export interface AuthResult {
    user?: object; // Optional user object
    status: boolean;
    token?: string | null;
    refreshToken?: string | null;
    message?: string | null;
}


async function authentication(username: string, password: string, organizationCode: string): Promise<AuthResult> {
    const Sqlstring = `
                SELECT 
                users.id AS id,
                users.code AS code,
                users.password AS password,
                organizations.id AS organizationId
                FROM users
                JOIN organizations ON users.organizationId = organizations.id
                WHERE users.code = ?
                AND users.isActive = TRUE
                AND organizations.code = ?

    `;

    const userResult = await executeQuery(Sqlstring, [username, organizationCode]);

    if (userResult.status && Array.isArray(userResult.data) && userResult.data.length > 0) {
        const user = userResult.data[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ userId: user.id, username: user.code, organizationId: user.organizationId }, secretKey, { expiresIn: tokenExpiresIn });
            const refreshToken = jwt.sign({ userId: user.id, username: user.code,organizationId: user.organizationId }, secretKey, { expiresIn: refreshTokenExpiresIn });
            return { user: { userId: user.id, username: user.code, organizationId: user.organizationId }, status: true, token, refreshToken, message: null };
        } else {
            return { status: false, token: null, refreshToken: null, message: 'Invalid username or password' };
        }
    } else {
        return { status: false, message: 'ERROR connect or user not found' };
    }
}

export default authentication;