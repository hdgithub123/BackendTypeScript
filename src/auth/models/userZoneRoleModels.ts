import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'

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
    const sqlQuery = "SELECT * FROM users_zones_roles WHERE userId = ? And zoneId = ? And roleId = ?";
    return await executeQuery(sqlQuery, [userZoneRoleId.userId,userZoneRoleId.zoneId,userZoneRoleId.roleId]);
}
export async function getUserZoneRoles() {
    const Sqlstring = "Select * from users_zones_roles";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertUserZoneRole(userZoneRole: userZoneRole): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await insertObject("users_zones_roles", userZoneRole);
}


export async function updateUserZoneRole( userZoneRole: userZoneRole, userZoneRoleId: userIdZoneIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await updateObject("users_zones_roles", userZoneRole, userZoneRoleId);
}


export async function deleteUserZoneRole( userZoneRoleId: userIdZoneIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObject("users_zones_roles", userZoneRoleId);
}


export async function insertUserZoneRoles(userZoneRoles:Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        return await insertObjects("users_zones_roles", userZoneRoles);
}


export async function updateUserZoneRoles(userZoneRoles:Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        return await updateObjects("users_zones_roles", userZoneRoles, ["userId", "zoneId", "roleId"]);
}

export async function deleteUserZoneRoles(userZoneRoles: Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    return await deleteObjects("users_zones_roles", userZoneRoles);
}
