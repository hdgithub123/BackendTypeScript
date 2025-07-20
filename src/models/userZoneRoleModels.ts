import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type userZoneRole = {
    userId: string;
    zoneId: string;
    roleId: string;
    isActive: boolean;
};

export type userIdZoneIdRoleId = {
    userId: string;
    zoneId: string;
    roleId: string;
};

export async function getUserZoneRole(userZoneRoleId: userIdZoneIdRoleId) {
    const sqlQuery = "SELECT * FROM users_roles_zones WHERE userId = ? And zoneId = ? And roleId = ?";
    return await executeQuery(sqlQuery, [userZoneRoleId.userId,userZoneRoleId.zoneId,userZoneRoleId.roleId]);
}
export async function getUserZoneRoles() {
    const Sqlstring = "Select * from users_roles_zones";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertUserZoneRole(userZoneRole: userZoneRole): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await insertObject("users_roles_zones", userZoneRole);
}


export async function updateUserZoneRole( userZoneRole: userZoneRole, userZoneRoleId: userIdZoneIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await updateObject("users_roles_zones", userZoneRole, userZoneRoleId);
}


export async function deleteUserZoneRole( userZoneRoleId: userIdZoneIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObject("users_roles_zones", userZoneRoleId);
}


export async function insertUserZoneRoles(userZoneRoles:Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        return await insertObjects("users_roles_zones", userZoneRoles);
}


export async function updateUserZoneRoles(userZoneRoles:Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        return await updateObjects("users_roles_zones", userZoneRoles, ["userId", "zoneId", "roleId"]);
}

export async function deleteUserZoneRoles(userZoneRoles: Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObjects("users_roles_zones", userZoneRoles);
}
