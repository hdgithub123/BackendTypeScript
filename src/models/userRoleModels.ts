import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type userRole = {
    userId: string;
    roleId: string;
    isActive: boolean;
};

export type userIdRoleId = {
    userId: string;
    roleId: string;
};

export async function getUserRole(userRoleId: userIdRoleId) {
    const sqlQuery = "SELECT * FROM roles_rights WHERE userId = ? And roleId =?";
    return await executeQuery(sqlQuery, [userRoleId.userId,userRoleId.roleId]);
}
export async function getUserRoles() {
    const Sqlstring = "Select * from roles_rights";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertUserRole(userRole: userRole): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await insertObject("roles_rights", userRole);
}


export async function updateUserRole( userRole: userRole, userRoleId: userIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await updateObject("roles_rights", userRole, userRoleId);
}


export async function deleteUserRole( userRoleId: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObject("roles_rights", { userId: userRoleId.userId, roleId:userRoleId.roleId  });
}


export async function insertUserRoles(userRoles:Array<userRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        return await insertObjects("roles_rights", userRoles);
}


export async function updateUserRoles(userRoles:Array<userRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        return await updateObjects("roles_rights", userRoles, ["userId", "roleId"]);
}

export async function deleteUserRoles(userRoles: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObjects("roles_rights", userRoles);
}
