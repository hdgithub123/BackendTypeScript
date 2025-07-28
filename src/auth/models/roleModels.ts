import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
//import { validateDataArray } from '../utilities/valadation/validateDataArray'
//import { RuleSchema } from '../utilities/valadation/validate'
import { validateDataArray, RuleSchema, CustomMessageRules } from '../utilities/valadation/validators'


//Tạo type cho user
export type role = {
    name: string;
    code: string;
    description?: string;
};


const customMessages: CustomMessageRules = {
    name: {
        required: 'Rolename is required',
        min: 'Rolename must be at least 1 characters',
        max: 'Rolename cannot exceed 50 characters',
        type: 'phai la kieu chu'
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


// export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
//     return await insertObject("roles", role);
// }


export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // dùng validateDataArray để kiểm tra dữ liệu trước khi insert
    const roleRule: RuleSchema = {
        id: {
            type: 'string',
            required: false,
            format: 'uuid'
        },
        name: {
            type: 'string',
            required: true,
            max: 50,
            min: 2,
            noXSS: true
        },
        code: {
            type: 'string',
            required: true,
            max: 50
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
            max: 100
        }
    }

    const { status, results } = validateDataArray([role], roleRule, customMessages);
    if (status) {
        return await insertObject("roles", role);
    }
    return { data: null, status: status, errorCode: { dataFail: results } };
}


export async function updateRole(rolesId: string, role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const roleRule: RuleSchema = {
        id: {
            type: 'string',
            required: true,
            format: 'uuid'
        },
        name: {
            type: 'string',
            required: false,
            max: 50,
            noXSS: true
        },
        code: {
            type: 'string',
            required: false,
            max: 50
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
            max: 100
        }
    }

    const { status, results } = validateDataArray([role], roleRule);
    if (status) {
        const columKey = { id: rolesId }; // Use userId as the columKey
        return await updateObject("roles", role, columKey);
    }
    return { data: null, status: status, errorCode: { dataFail: results } };

}


export async function deleteRole(rolesId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObject("roles", { id: rolesId });
}


export async function insertRoles(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await insertObjects("roles", roles);
}


export async function updateRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await updateObjects("roles", roles, ["id"]);
}

export async function deleteRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObjects("roles", roles);
}
