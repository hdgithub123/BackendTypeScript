const bcrypt = require('bcrypt');
import executeQuery, { insertObject, insertObjects,insertObjectNotIsSystem,insertObjectsNotIsSystem, updateObject, updateObjects,updateObjectNotIsSystem,updateObjectsNotIsSystem, deleteObject, deleteObjects,deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { deleteObjectsTables } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
import dotenv from 'dotenv';
dotenv.config();



//Tạo type cho user
export type user = {
    id?: string;
    code?: string;
    password?: string;
    name?: string;
    address?: string;
    email?: string;
    phone?: string;
    image?: string;
    organizationId?: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};



//Tạo type cho user
export type userUpdateAndDelete = {
    id: string;
    code?: string;
    password?: string;
    name?: string;
    address?: string;
    email?: string;
    phone?: string;
    image?: string;
    organizationId: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

const userInsertRule: RuleSchema = {
    id: { type: "string", format: "uuid", required: false },
    code: { type: "string", required: true, minLength: 2, maxLength: 100 },
    password: { type: "string", required: true, maxLength: 255 },
    name: { type: "string", required: true, minLength: 2, maxLength: 255 },
    address: { type: "string", required: false, maxLength: 255 },
    email: { type: "string", format: "email", required: true, maxLength: 100 },
    phone: { type: "string", required: false, format: "phone", maxLength: 20 },
    image: { type: "string", required: false, maxLength: 255 },
    organizationId: { type: "string", format: "uuid", required: true },
    isActive: { type: "boolean", required: false },
    isSystem: { type: "boolean", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


const userUpdateAndDeleteRule: RuleSchema = {
    id: { type: "string", format: "uuid", required: true },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    password: { type: "string", required: false, maxLength: 255 },
    name: { type: "string", required: false, minLength: 2, maxLength: 255 },
    address: { type: "string", required: false, maxLength: 255 },
    email: { type: "string", format: "email", required: false, maxLength: 100 },
    phone: { type: "string", required: false, format: "phone", maxLength: 20 },
    image: { type: "string", required: false, maxLength: 255 },
    organizationId: { type: "string", format: "uuid", required: true },
    isActive: { type: "boolean", required: false },
    isSystem: { type: "boolean", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};



const userCheckRule: RuleSchema = {
    id: { type: "string", format: "uuid", required: false },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    password: { type: "string", required: false, maxLength: 255 },
    name: { type: "string", required: false, minLength: 2, maxLength: 255 },
    address: { type: "string", required: false, maxLength: 255 },
    email: { type: "string", format: "email", required: false, maxLength: 100 },
    phone: { type: "string", required: false, format: "phone", maxLength: 20 },
    image: { type: "string", required: false, maxLength: 255 },
    organizationId: { type: "string", format: "uuid", required: false },
    isActive: { type: "boolean", required: false },
    isSystem: { type: "boolean", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


export type userExistanceCheck = {
    fields: {
        id?: string;
        code?: string;
        email?: string;
    }
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};


export type usersExistanceCheck = {
    fields: Array<{
        id?: string;
        code?: string;
        email?: string;
    }>
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};



export async function getUser(userName: string, organizationId: string) {
    const sqlQuery = "SELECT * FROM users WHERE code = ? AND organizationId = ?";
    return await executeQuery(sqlQuery, [userName, organizationId]);
}
export async function getUsers(organizationId: string) {
    const Sqlstring = "Select * from users WHERE organizationId = ?";
    const data = await executeQuery(Sqlstring, [organizationId]);
    return data;

}


export async function getIdUsersByCodes(organizationId: string, codes: string[]) {
  if (!codes.length) return { data: [], status: true, errorCode: {} };

  const placeholders = codes.map(() => '?').join(', ');
  const query = `SELECT id, code FROM users WHERE organizationId = ? AND code IN (${placeholders})`;
  const params = [organizationId, ...codes];

  const result = await executeQuery(query, params);
  return result;
}



export async function checkExistenceUser(userCheck: userExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userCheck.fields], userCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObject({ tableName: "users", ...userCheck });
        return { data: data.users[0], status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function checkExistenceUsers(usersCheck: usersExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(usersCheck.fields, userCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObjects({ tableName: "users", ...usersCheck });
        return { data: data.users, status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function insertUser(user: user): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const reuser = { ...user, password: hashedPassword }
    const { status, results } = validateDataArray([reuser], userInsertRule, messagesEn);
    if (status) {
        return await insertObjectNotIsSystem("users", reuser);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUser(user: userUpdateAndDelete, currentUser: userUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { password } = user;
    let hashedPassword = null;
    let userData = user
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
        userData = { ...user, password: hashedPassword };
    } else {
        userData = { ...user };
    }

    const { status, results } = validateDataArray([userData], userUpdateAndDeleteRule, messagesEn);
    if (status) {
        const columKey = { id: userData.id, organizationId: userData.organizationId }; // Use userId as the columKey
        const Sqlstring = "Select code from users WHERE id =? AND  organizationId = ? AND code = 'admin'";
        const { data, status: queryStatus, errorCode } = await executeQuery(Sqlstring, [userData.id, userData.organizationId]);
        if (queryStatus && Array.isArray(data) && data.length > 0) {
            if (currentUser.id === userData.id) {
                if (userData.code) {
                    return { data: null, status: false, errorCode: { failData: { code: 'Not allow edit admin' } } };
                }
                return await updateObjectNotIsSystem("users", userData, columKey);
            } else {
                return { data: null, status: false, errorCode: { failData: { code: 'Not allow edit admin' } } };
            }
        } else {
            return await updateObjectNotIsSystem("users", userData, columKey);
        }

    }
    return { data: null, status: status, errorCode: { failData: results } };
}




export async function deleteUser(user: userUpdateAndDelete, currentUser: userUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    try {
        const columKey = { id: user.id, organizationId: user.organizationId };

        // Validate input
        const { status: isValid, results } = validateDataArray([columKey], userUpdateAndDeleteRule, messagesEn);
        if (!isValid) {
            return { data: null, status: false, errorCode: { failData: results } };
        }

        // Check if user is admin
        const sqlCheckAdmin = "SELECT code FROM users WHERE id = ? AND organizationId = ? AND code = 'admin'";
        const { data: adminCheck, status: queryStatus } = await executeQuery(sqlCheckAdmin, [user.id, user.organizationId]);

        if (queryStatus && adminCheck && Array.isArray(adminCheck) && adminCheck.length > 0) {
            // User is admin → block deletion completely
            return { data: null, status: false, errorCode: { failData: { code: 'Not allow delete admin' } } };
        }

        // Proceed to delete
        return await deleteObjectNotIsSystem("users", columKey);

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

        const { status, results } = validateDataArray(hashedUsers, userInsertRule, messagesEn);
        if (status) {
            return await insertObjectsNotIsSystem("users", hashedUsers);
        }
        return { data: null, status: status, errorCode: { failData: results } };

    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}



export async function updateUsers(users: Array<user>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    try {
        // Băm mật khẩu nếu có
        const hashedUsers: user[] = await Promise.all(
            users.map(async (u: user): Promise<user> => {
                if (u.password) {
                    const hashedPassword = await bcrypt.hash(u.password, 10);
                    return { ...u, password: hashedPassword };
                }
                return { ...u };
            })
        );

        // Lọc user có đủ thông tin để kiểm tra admin
        const validUsers: user[] = hashedUsers.filter((u: user) => u.id !== undefined && u.organizationId !== undefined);
        if (validUsers.length === 0) {
            return { data: null, status: false, errorCode: 'Thiếu thông tin người dùng để kiểm tra quyền' };
        }

        // Tạo câu SQL kiểm tra admin
        const adminCheckSql: string = `
            SELECT id FROM users 
            WHERE code = 'admin' AND (${validUsers.map(() => '(id = ? AND organizationId = ?)').join(' OR ')})
        `;
        const adminParams: (string | number)[] = validUsers.flatMap((u: user) => [u.id!, u.organizationId!]);

        const { data: adminUsers, status: queryStatus } = await executeQuery(adminCheckSql, adminParams);

        if (queryStatus && Array.isArray(adminUsers) && adminUsers.length > 0) {
            return {
                data: null,
                status: false,
                errorCode: { failData: { code: 'Not allow edit admin' } }
            };
        }

        // Validate dữ liệu
        const { status: isValid, results } = validateDataArray(hashedUsers, userUpdateAndDeleteRule, messagesEn);
        if (!isValid) {
            return { data: null, status: false, errorCode: { failData: results } };
        }

        // Cập nhật
        return await updateObjectsNotIsSystem("users", hashedUsers, ["id", "organizationId"]);

    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}



export async function deleteUsers(users: Array<user>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    try {
        // Validate dữ liệu đầu vào
        const { status: isValid, results } = validateDataArray(users, userUpdateAndDeleteRule, messagesEn);
        if (!isValid) {
            return { data: null, status: false, errorCode: { failData: results } };
        }

        // Lọc user có đủ thông tin để kiểm tra admin
        const validUsers: user[] = users.filter((u: user) => u.id !== undefined && u.organizationId !== undefined);
        if (validUsers.length === 0) {
            return { data: null, status: false, errorCode: 'Thiếu thông tin người dùng để kiểm tra quyền' };
        }

        // Tạo câu SQL kiểm tra admin
        const adminCheckSql: string = `
            SELECT id FROM users 
            WHERE code = 'admin' AND (${validUsers.map(() => '(id = ? AND organizationId = ?)').join(' OR ')})
        `;
        const adminParams: (string | number)[] = validUsers.flatMap((u: user) => [u.id!, u.organizationId!]);

        const { data: adminUsers, status: queryStatus } = await executeQuery(adminCheckSql, adminParams);

        if (queryStatus && Array.isArray(adminUsers) && adminUsers.length > 0) {
            return {
                data: null,
                status: false,
                errorCode: { failData: { code: 'Not allow delete admin' } }
            };
        }

        // Chuẩn bị dữ liệu xóa
        const deleteTargets = users.map((u: user) => ({
            id: u.id!,
            organizationId: u.organizationId!
        }));

        // Thực hiện xóa
        return await deleteObjectsNotIsSystem("users", deleteTargets);

    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}
