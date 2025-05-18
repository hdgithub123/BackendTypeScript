import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type role = {
    roleName: string;
    code: string;
    description?: string;
};


export async function getRole(code: string) {
    const sqlQuery = "SELECT * FROM roles WHERE code = ?";
    return await executeQuery(sqlQuery, [code]);
}
export async function getRoles() {
    const Sqlstring = "Select * from roles";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await insertObject("roles", role);
}


export async function updateRole(rolesId: string, role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    const columKey = { id: rolesId }; // Use userId as the columKey
    return await updateObject("roles", role, columKey);
}


export async function deleteRole(rolesId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObject("roles", { id: rolesId });
}


export async function insertRoles(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await insertObjects("roles", roles);
}


export async function updateRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await updateObjects("roles", roles, ["id"]);
}

export async function deleteRoles(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObjects("roles", roles);
}
