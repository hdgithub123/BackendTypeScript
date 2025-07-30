import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'

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

const usersZonesRolesInsertSchema: RuleSchema = {
    userId: {
        type: "string",
        format: "uuid",
        required: true
    },

    roleId: {
        type: "string",
        format: "uuid",
        required: true
    },

    zoneId: {
        type: "string",
        format: "uuid",
        required: true
    },

    isActive: {
        type: "boolean",
        required: true
    }
};

const usersZonesRolesUpdateAndDeleteSchema: RuleSchema = {
    userId: {
        type: "string",
        format: "uuid",
        required: true
    },

    roleId: {
        type: "string",
        format: "uuid",
        required: true
    },

    zoneId: {
        type: "string",
        format: "uuid",
        required: true
    },

    isActive: {
        type: "boolean",
        required: false
    }
};






export async function getUserZoneRole(userZoneRoleId: userIdZoneIdRoleId) {
    const sqlQuery = "SELECT * FROM users_zones_roles WHERE userId = ? And zoneId = ? And roleId = ?";
    return await executeQuery(sqlQuery, [userZoneRoleId.userId, userZoneRoleId.zoneId, userZoneRoleId.roleId]);
}
export async function getUserZoneRoles() {
    const Sqlstring = "Select * from users_zones_roles";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertUserZoneRole(userZoneRole: userZoneRole): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userZoneRole], usersZonesRolesInsertSchema, messagesEn);
    if (status) {
        return await insertObject("users_zones_roles", userZoneRole);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUserZoneRole(userZoneRole: userZoneRole, userZoneRoleId: userIdZoneIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userZoneRole], usersZonesRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObject("users_zones_roles", userZoneRole, userZoneRoleId);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteUserZoneRole(userZoneRoleId: userIdZoneIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userZoneRoleId], usersZonesRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("users_zones_roles", userZoneRoleId);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertUserZoneRoles(userZoneRoles: Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userZoneRoles, usersZonesRolesInsertSchema, messagesEn);
    if (status) {
        return await insertObjects("users_zones_roles", userZoneRoles);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUserZoneRoles(userZoneRoles: Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userZoneRoles, usersZonesRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObjects("users_zones_roles", userZoneRoles, ["userId", "zoneId", "roleId"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteUserZoneRoles(userZoneRoles: Array<userZoneRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userZoneRoles, usersZonesRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObjects("users_zones_roles", userZoneRoles);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
