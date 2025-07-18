const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';

import executeQuery from "../config/mySql/executeQuery";

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


async function authentication(username: string, password: string): Promise<AuthResult> {
    const Sqlstring = "SELECT id, username, password FROM users WHERE username = ?";
    const userResult = await executeQuery(Sqlstring, [username]);
    if (userResult.status && Array.isArray(userResult.data) && userResult.data.length > 0) {
        const user = userResult.data[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: tokenExpiresIn });
            const refreshToken = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: refreshTokenExpiresIn });
            return { user:{ userId: user.id, username: user.username },status: true, token, refreshToken, message:null };
        } else {
            return { status: false, token: null, refreshToken: null, message: 'Invalid username or password' };
        }
    } else {
        return { status: false, message: 'ERROR connect or user not found' };
    }
}

export default authentication;