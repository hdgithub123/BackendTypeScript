import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type roleRight = {
    roleId: string;
    rightId: string;
    isActive: boolean;
};

export type roleIdRightId = {
    roleId: string;
    rightId: string;
};

export async function getRoleRight(roleRightId: roleIdRightId) {
    const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =?";
    return await executeQuery(sqlQuery, [roleRightId.roleId,roleRightId.rightId]);
}
export async function getRoleRights() {
    const Sqlstring = "Select * from roles_rights";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertRoleRight(roleRight: roleRight): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await insertObject("roles_rights", roleRight);
}


export async function updateRoleRight( roleRight: roleRight, roleRightId: roleIdRightId): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await updateObject("roles_rights", roleRight, roleRightId);
}


export async function deleteRoleRight( roleRightId: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObject("roles_rights", { roleId: roleRightId.roleId, rightId:roleRightId.rightId  });
}


export async function insertRoleRights(roleRights:Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await insertObjects("roles_rights", roleRights);
}


export async function updateRoleRights(roleRights:Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await updateObjects("roles_rights", roleRights, ["roleId", "rightId"]);
}

export async function deleteRoleRights(roleRights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObjects("roles_rights", roleRights);
}
