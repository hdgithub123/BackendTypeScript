import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'

//Tạo type cho user
export type userDepartmentRole = {
    userId: string;
    zoneId: string;
    roleId: string;
    isActive: boolean;
};



export type userIdDepartmentIdRoleId = {
    userId: string;
    zoneId: string;
    roleId: string;
};


const usersDepartmentsRolesInsertSchema: RuleSchema = {
  userId: { type: "string", format: "uuid", required: true },
  roleId: { type: "string", format: "uuid", required: true },
  zoneId: { type: "string", format: "uuid", required: true },
  isActive: { type: "boolean", required: true }
};

const usersDepartmentsRolesUpdateAndDeleteSchema: RuleSchema = {
  userId: { type: "string", format: "uuid", required: true },
  roleId: { type: "string", format: "uuid", required: true },
  zoneId: { type: "string", format: "uuid", required: true },
  isActive: { type: "boolean", required: false }
};

department

export async function getUserDepartmentRole(userDepartmentRoleId: userIdDepartmentIdRoleId) {
    const sqlQuery = "SELECT * FROM users_departments_roles WHERE userId = ? And zoneId = ? And roleId = ?";
    return await executeQuery(sqlQuery, [userDepartmentRoleId.userId, userDepartmentRoleId.zoneId, userDepartmentRoleId.roleId]);
}
export async function getUserDepartmentRoles() {
    const Sqlstring = "Select * from users_departments_roles";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertUserDepartmentRole(userDepartmentRole: userDepartmentRole): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userDepartmentRole], usersDepartmentsRolesInsertSchema, messagesEn);
    if (status) {
        return await insertObject("users_departments_roles", userDepartmentRole);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUserDepartmentRole(userDepartmentRole: userDepartmentRole, userDepartmentRoleId: userIdDepartmentIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userDepartmentRole], usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObject("users_departments_roles", userDepartmentRole, userDepartmentRoleId);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteUserDepartmentRole(userDepartmentRoleId: userIdDepartmentIdRoleId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userDepartmentRoleId], usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("users_departments_roles", userDepartmentRoleId);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertUserDepartmentRoles(userDepartmentRoles: Array<userDepartmentRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userDepartmentRoles, usersDepartmentsRolesInsertSchema, messagesEn);
    if (status) {
        return await insertObjects("users_departments_roles", userDepartmentRoles);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUserDepartmentRoles(userDepartmentRoles: Array<userDepartmentRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userDepartmentRoles, usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObjects("users_departments_roles", userDepartmentRoles, ["userId", "zoneId", "roleId"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteUserDepartmentRoles(userDepartmentRoles: Array<userDepartmentRole>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userDepartmentRoles, usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObjects("users_departments_roles", userDepartmentRoles);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
