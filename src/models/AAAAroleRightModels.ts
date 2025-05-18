import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type roleRight = {
    roleID: string;
    rightID: string;
    isActive: boolean;
};


// export async function getRoleRight(code: string) {
//     const sqlQuery = "SELECT * FROM roles WHERE code = ?";
//     return await executeQuery(sqlQuery, [code]);
// }
export async function getRolesRights() {
    const Sqlstring = "Select * from roles_rights";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertRoleRight(roleRight: roleRight): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await insertObject("roles_rights", roleRight);
}


export async function updateRoleRight(roleRightsId: string, role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    const columKey = { id: roleRightsId }; // Use userId as the columKey
    return await updateObject("roles_rights", role, columKey);
}


export async function deleteRoleRight(roleRightsId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObject("roles_rights", { id: roleRightsId });
}


export async function insertRolesRights(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await insertObjects("roles_rights", roles);
}


export async function updateRolesRights(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await updateObjects("roles_rights", roles, ["id"]);
}

export async function deleteRolesRights(roles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObjects("roles_rights", roles);
}
