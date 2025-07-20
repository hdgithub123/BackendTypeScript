const bcrypt = require('bcrypt');
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'

import dotenv from 'dotenv';
dotenv.config();

const defaultUserID = process.env.ADMIN_ID;



//Tạo type cho user
export type user = {
    username: string;
    password: string;
    fullName?: string;
    email?: string;
    phone?: string;
    isActive: boolean;

};


export async function getUser(userName: string) {
    const sqlQuery = "SELECT * FROM users WHERE userName = ?";
    return await executeQuery(sqlQuery, [userName]);
}
export async function getUsers() {
    const Sqlstring = "Select * from users";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertUser(user: user): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const reuser = { ...user, password: hashedPassword}
    return await insertObject("users", reuser);
}


export async function updateUser(userId: string, user: user): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { password } = user;
    let hashedPassword = null;
    let userData = {}
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
        userData = { ...user, password: hashedPassword };
    } else {
        userData = { ...user};
    }    
    const columKey = { id: userId }; // Use userId as the columKey
    return await updateObject("users", userData, columKey);
}


export async function deleteUser(userId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    if (userId === defaultUserID) {
        return { data: null, status: false, errorCode: 'CANNOT_DELETE_ADMIN_USER' };
    }
    try {
        return await deleteObject("users", { id: userId });
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }

}


export async function insertUsers(users: Array<user>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    try {
        const hashedUsers = await Promise.all(users.map(async user => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));
        return await insertObjects("users", hashedUsers);
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}


export async function updateUsers(users: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    try {
        const hashedUsers = await Promise.all(users.map(async user => {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return { ...user, password: hashedPassword };
            }
            return user;
        }));
        // Cập nhật người dùng trong cơ sở dữ liệu
        return await updateObjects("users", hashedUsers, ["id"]);
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}

export async function deleteUsers(userIds: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // Kiểm tra xem có cố gắng xóa người dùng quản trị hay không
    if (userIds.some(user => user.id === defaultUserID)) {
        return { data: null, status: false, errorCode: 'CANNOT_DELETE_ADMIN_USER' };
    }

    return await deleteObjects("users", userIds);
}
