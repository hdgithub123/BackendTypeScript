import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'



//Tạo type cho user
export type role = {
    name: string;
    code: string;
    description?: string;
};

const roleInsertRule: RuleSchema = {
    id: {
        type: 'string',
        required: false,
        format: 'uuid'
    },
    name: {
        type: 'string',
        required: true,
        maxLength: 50,
    },
    code: {
        type: 'string',
        required: true,
        maxLength: 50
    },
    description: {
        type: 'string',
        required: false,
    },
    createdAt: {
        type: 'string',
        required: false,
        format: 'datetime'
    },
    createdBy: {
        type: 'string',
        required: false,
        maxLength: 100
    }
}

const roleUpdateAndDeleteRule: RuleSchema = {
    id: {
        type: 'string',
        required: true,
        format: 'uuid'
    },
    name: {
        type: 'string',
        required: false,
        maxLength: 50,
    },
    code: {
        type: 'string',
        required: false,
        maxLength: 50
    },
    description: {
        type: 'string',
        required: false,
    },
    createdAt: {
        type: 'string',
        required: false,
        format: 'date'
    },
    createdBy: {
        type: 'string',
        required: false,
        maxLength: 100
    }
}


export async function getRole(code: string) {
    const sqlQuery = "SELECT * FROM roles WHERE code = ?";
    return await executeQuery(sqlQuery, [code]);
}
export async function getRoles() {
    const Sqlstring = "Select * from roles";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([role], roleInsertRule, messagesEn);
    if (status) {
        return await insertObject("roles", role);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRole(rolesId: string, role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([role], roleUpdateAndDeleteRule, messagesEn);
    if (status) {
        const columKey = { id: rolesId }; // Use userId as the columKey
        return await updateObject("roles", role, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteRole(rolesId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = { id: rolesId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], roleUpdateAndDeleteRule, messagesEn);
    if (status) {

        return await deleteObject("roles", columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertRoles(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roles, roleInsertRule, messagesEn);
    if (status) {
        return await insertObjects("roles", roles);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roles, roleUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await updateObjects("roles", roles, ["id"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roles, roleUpdateAndDeleteRule, messagesEn);
    if (status) {

        return await deleteObjects("roles", roles);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
