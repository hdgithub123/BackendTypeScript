import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray } from '../utilities/valadation/validateDataArray'
import { Schema } from '../utilities/valadation/validate'


//Tạo type cho user
export type role = {
    name: string;
    code: string;
    description?: string;
};

const roleRule: Schema = {
    id: {
       required: false,
        type: 'string',
        min: 3
    },
    name: {
        required: true,
        type: 'string',
        min: 3
    },
    code: {
        required: true,
        type: 'string',
        min: 2
    },
    description: {
        type: 'string',
        min: 18
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
    const { status, results } = validateDataArray([role], roleRule);
    if (status) {
        return await insertObject("roles", role);
    }
    return { data: null, status: status, errorCode: {dataWrong: results} };
}


export async function updateRole(rolesId: string, role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = { id: rolesId }; // Use userId as the columKey
    return await updateObject("roles", role, columKey);
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
