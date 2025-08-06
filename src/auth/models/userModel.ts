const bcrypt = require('bcrypt');
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects,checkUniqueFieldsObject } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
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
    isActive?: boolean;
};


const userInsertRule: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: false
    },
    username: {
        type: "string",
        required: true,
        min: 3,
        max: 50
    },
    password: {
        type: "string",
        required: true,
        max: 255
    },
    fullName: {
        type: "string",
        required: false,
        max: 100
    },
    email: {
        type: "string",
        format: "email",
        required: true,
        max: 100
    },
    phone: {
        type: "string",
        required: false,
        format: "phone",
        max: 20
    },
    isActive: {
        type: "boolean",
        required: true
    },
    createdAt: {
        type: "string",
        format: "datetime",
        required: false
    },
    createdBy: {
        type: "string",
        required: false,
        max: 100
    }
};


const userUpdateAnDeleteRule: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: true
    },
    username: {
        type: "string",
        required: false,
        min: 3,
        max: 50
    },
    password: {
        type: "string",
        required: false,
        max: 255
    },
    fullName: {
        type: "string",
        required: false,
        max: 100
    },
    email: {
        type: "string",
        format: "email",
        required: false,
        max: 100
    },
    phone: {
        type: "string",
        required: false,
        format: "phone",
        max: 20
    },
    isActive: {
        type: "boolean",
        required: false
    },
    createdAt: {
        type: "string",
        format: "datetime",
        required: false
    },
    createdBy: {
        type: "string",
        required: false,
        max: 100
    }
};


export type userUniqueCheck = {
    fields: {
    id?: string;
    username?: string;
    email?: string;
    }
    excludeField: string;
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


export async function checkUniqueUser(userCheck: userUniqueCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    console.log("userCheck",userCheck)
    const { status, results } = validateDataArray([userCheck.fields], userUpdateAnDeleteRule, messagesEn);
    if (status) {
        console.log("status",status)
         console.log("results",results)
        return await checkUniqueFieldsObject({tableName:"users",...userCheck});
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function insertUser(user: user): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const reuser = { ...user, password: hashedPassword }
    const { status, results } = validateDataArray([reuser], userInsertRule, messagesEn);
    if (status) {
        return await insertObject("users", reuser);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUser(userId: string, user: user): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { password } = user;
    let hashedPassword = null;
    let userData = {}
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
        userData = { ...user, password: hashedPassword };
    } else {
        userData = { ...user };
    }

    const { status, results } = validateDataArray([userData], userUpdateAnDeleteRule, messagesEn);
    if (status) {
        const columKey = { id: userId }; // Use userId as the columKey
        return await updateObject("users", userData, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteUser(userId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    if (userId === defaultUserID) {
        return { data: null, status: false, errorCode: 'CANNOT_DELETE_ADMIN_USER' };
    }
    try {
        const columKey = { id: userId }; // Use userId as the columKey
        const { status, results } = validateDataArray([columKey], userUpdateAnDeleteRule, messagesEn);
        if (status) {
            return await deleteObject("users", { id: userId });
        }
        return { data: null, status: status, errorCode: { failData: results } };

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
            return await insertObjects("users", hashedUsers);
        }
        return { data: null, status: status, errorCode: { failData: results } };



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

        const { status, results } = validateDataArray(hashedUsers, userUpdateAnDeleteRule, messagesEn);
        if (status) {
            return await updateObjects("users", hashedUsers, ["id"]);
        }
        return { data: null, status: status, errorCode: { failData: results } };

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

    const { status, results } = validateDataArray(userIds, userUpdateAnDeleteRule, messagesEn);
    if (status) {
        return await deleteObjects("users", userIds);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
