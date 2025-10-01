import executeQuery, { insertObjectsTablesNotIsSystem, insertObject, insertObjects, insertObjectNotIsSystem, insertObjectsNotIsSystem, updateObject, updateObjects, updateObjectNotIsSystem, updateObjectsNotIsSystem, deleteObject, deleteObjects, deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'

//Tạo type cho user
export type userDepartmentRole = {
    id?: string;
    userId?: string;
    departmentId: string;
    roleId: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    
};


export type userDepartmentRoleUpdateAndDelete = {
    id: string;
    userId?: string;
    departmentId?: string;
    roleId?: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    
};




const usersDepartmentsRolesInsertSchema: RuleSchema = {
    id: { type: "string", format: "uuid", required: false },
    userId: { type: "string", format: "uuid", required: true },
    roleId: { type: "string", format: "uuid", required: true },
    departmentId: { type: "string", format: "uuid", required: true },
    isActive: { type: "boolean", required: false }
};

const usersDepartmentsRolesUpdateAndDeleteSchema: RuleSchema = {
    id: { type: "string", format: "uuid", required: true },
    userId: { type: "string", format: "uuid", required: false },
    roleId: { type: "string", format: "uuid", required: false },
    departmentId: { type: "string", format: "uuid", required: false },
    isActive: { type: "boolean", required: false }
};



export async function getUserDepartmentRole(userDepartmentRoleId: string, organizationId: string) {
    // muốn lấy ra id, userId,user.code as userCode,user.name as fullName, departmentId,department.code as departmentCode,department.name as departmentName, roleId,role.code as roleCode,role.name as roleName
    // bổ sung thêm createdBy, updatedBy, createdAt, updatedAt, isActive, isSystem và có điều kiện user.organizationId = organizationId

    const sqlQuery = `SELECT udr.id as id, udr.userId as userId, u.code as _userCode, u.name as _userName, d.id as departmentId, d.code as _departmentCode, d.name as _departmentName, r.id as roleId, r.code as _roleCode, r.name as _roleName,
    udr.createdBy as createdBy, udr.updatedBy as updatedBy, udr.createdAt as createdAt, udr.updatedAt as updatedAt, udr.isActive as isActive, udr.isSystem as isSystem
    FROM users_departments_roles udr
    JOIN users u ON udr.userId = u.id
    JOIN departments d ON udr.departmentId = d.id
    JOIN roles r ON udr.roleId = r.id
    WHERE udr.id = ? AND u.organizationId = ?`;

    return await executeQuery(sqlQuery, [userDepartmentRoleId, organizationId]);
}
export async function getUserDepartmentRoles(organizationId: string) {
    const sqlQuery = `SELECT udr.id as id, udr.userId as userId, u.code as _userCode, u.name as _userName, d.id as departmentId, d.code as _departmentCode, d.name as _departmentName, r.id as roleId, r.code as _roleCode, r.name as _roleName,
    udr.createdBy as createdBy, udr.updatedBy as updatedBy, udr.createdAt as createdAt, udr.updatedAt as updatedAt, udr.isActive as isActive, udr.isSystem as isSystem
    FROM users_departments_roles udr
    JOIN users u ON udr.userId = u.id
    JOIN departments d ON udr.departmentId = d.id
    JOIN roles r ON udr.roleId = r.id
    WHERE u.organizationId = ?`;
    return await executeQuery(sqlQuery, [organizationId]);
}



export async function insertUserDepartmentRole(userDepartmentRole: userDepartmentRole): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userDepartmentRole], usersDepartmentsRolesInsertSchema, messagesEn);
    if (status) {
        return await insertObjectNotIsSystem("users_departments_roles", userDepartmentRole);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUserDepartmentRole(userDepartmentRole: userDepartmentRoleUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userDepartmentRole], usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        const columKey = { id: userDepartmentRole.id};
        return await updateObjectNotIsSystem("users_departments_roles", userDepartmentRole, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteUserDepartmentRole(userDepartmentRole: userDepartmentRoleUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([userDepartmentRole], usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        const columKey = { id: userDepartmentRole.id };
        return await deleteObjectNotIsSystem("users_departments_roles", columKey);
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


export async function updateUserDepartmentRoles(userDepartmentRoles: Array<userDepartmentRoleUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userDepartmentRoles, usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObjectsNotIsSystem("users_departments_roles", userDepartmentRoles, ["id"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteUserDepartmentRoles(userDepartmentRoles: Array<userDepartmentRoleUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(userDepartmentRoles, usersDepartmentsRolesUpdateAndDeleteSchema, messagesEn);
    if (status) {
        const deleteTargets = userDepartmentRoles.map((u: userDepartmentRoleUpdateAndDelete) => ({
            id: u.id!,
        }));

        return await deleteObjectsNotIsSystem("users_departments_roles", deleteTargets);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
