import executeQuery, { insertObject, insertObjects, insertObjectNotIsSystem, insertObjectsNotIsSystem, updateObject, updateObjects, updateObjectNotIsSystem, updateObjectsNotIsSystem, deleteObject, deleteObjects, deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
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

export type right = {
    id: string;
    name: string;
    code: string;
    description?: string;
    createdAt?: string;
    createdBy?: string;
};



const rolesRightsInsertSchema: RuleSchema = {
    roleId: {
        type: "string",
        format: "uuid",
        required: true
    },

    rightId: {
        type: "string",
        format: "uuid",
        required: true
    },

    isActive: {
        type: "boolean",
        required: true
    }
};

const rolesRightsUpdateAndDeleteSchema: RuleSchema = {
    roleId: {
        type: "string",
        format: "uuid",
        required: true
    },

    rightId: {
        type: "string",
        format: "uuid",
        required: true
    },

    isActive: {
        type: "boolean",
        required: false
    }
};


export async function getRightsFromRoleId(roleId: string, organizationId: string): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu organizationId là '00000000-0000-0000-0000-000000000001' thì lấy quyền isOwner = 1
    let sqlString = "";
    if (organizationId === '00000000-0000-0000-0000-000000000001') {
        sqlString = "Select rights.id As id, rights.name As name, rights.code As code, rights.description As description,roles_rights.isActive As isActive, roles_rights.isSystem As isSystem from roles_rights, rights, roles  Where roles_rights.roleId = ? and roles_rights.rightId = rights.id and rights.isOwner = 1 and roles.id = roles_rights.roleId and roles.organizationId = ?";
    } else {
        sqlString = "Select rights.id As id, rights.name As name, rights.code As code, rights.description As description,roles_rights.isActive As isActive, roles_rights.isSystem As isSystem from roles_rights, rights, roles  Where roles_rights.roleId = ? and roles_rights.rightId = rights.id and rights.isOrganization = 1 and roles.id = roles_rights.roleId and roles.organizationId = ?";
    }
    return await executeQuery(sqlString, [roleId, organizationId]);
}


export async function getRightsNotInRoleId(roleId: string, organizationId: string): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    let sqlString = "";
    if (organizationId === '00000000-0000-0000-0000-000000000001') {
        sqlString = `
        SELECT 
            rights.id AS id,
            rights.name AS name,
            rights.code AS code,
            rights.description AS description,
            0 AS isActive,
            0 AS isSystem
        FROM 
            rights
        LEFT JOIN roles_rights 
            ON rights.id = roles_rights.rightId AND roles_rights.roleId = ?
        LEFT JOIN roles 
            ON roles.id = roles_rights.roleId AND roles.organizationId = ?
        WHERE 
            rights.isOwner = 1 AND roles_rights.roleId IS NULL
    `;
    } else {
        sqlString = `
        SELECT 
            rights.id AS id,
            rights.name AS name,
            rights.code AS code,
            rights.description AS description,
            0 AS isActive,
            0 AS isSystem
        FROM 
            rights
        LEFT JOIN roles_rights 
            ON rights.id = roles_rights.rightId AND roles_rights.roleId = ?
        LEFT JOIN roles 
            ON roles.id = roles_rights.roleId AND roles.organizationId = ?
        WHERE 
            rights.isOrganization = 1 AND roles_rights.roleId IS NULL
    `;
    }

    return await executeQuery(sqlString, [roleId, organizationId]);
}



export async function insertRoleRights(roleRights: Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roleRights, rolesRightsInsertSchema, messagesEn);
    if (status) {
        return await insertObjectsNotIsSystem("roles_rights", roleRights);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRoleRights(roleRights: Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roleRights, rolesRightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        for (const roleRight of roleRights) {
            const checkAdminSql = "SELECT code FROM roles WHERE id = ? AND code = 'Administrator'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [roleRight.roleId]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                // chỉ cho cập nhật isActive = true của roleRight với roleId là Administrator
                if (roleRight.isActive === false) {
                    return { data: null, status: false, errorCode: { failData: { code: 'Can not update Administrator role to inactive' } } };
                }
            }
        }
    }

    if (status) {
        return await updateObjectsNotIsSystem("roles_rights", roleRights, ["roleId", "rightId"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteRoleRights(roleRights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roleRights, rolesRightsUpdateAndDeleteSchema, messagesEn);
    // kiêm tra xem trong mảng với mỗi roleRight có roleId mà trong bảng roles có code = 'Administrator' thì không cho delete
    if (status) {
        for (const roleRight of roleRights) {
            const checkAdminSql = "SELECT code FROM roles WHERE id = ? AND code = 'Administrator'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [roleRight.roleId]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                return { data: null, status: false, errorCode: { failData: { code: ' can not delete Administrator role' } } };
            }
        }
    }

    if (status) {
        const roleRightPairs = roleRights.map(roleRight => ({
            roleId: roleRight.roleId,
            rightId: roleRight.rightId
        }));

        return await deleteObjectsNotIsSystem("roles_rights", roleRightPairs);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}




// chua cần động đến
// export async function getRoleRight(roleRightId: roleIdRightId) {
//     const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =?";
//     return await executeQuery(sqlQuery, [roleRightId.roleId, roleRightId.rightId]);
// }
// export async function insertRoleRight(roleRight: roleRight): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
//     const { status, results } = validateDataArray([roleRight], rolesRightsInsertSchema, messagesEn);
//     if (status) {
//         return await insertObject("roles_rights", roleRight);
//     }
//     return { data: null, status: status, errorCode: { failData: results } };
// }


// export async function updateRoleRight(roleRight: roleRight, roleRightId: roleIdRightId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
//     const { status, results } = validateDataArray([roleRight], rolesRightsUpdateAndDeleteSchema, messagesEn);
//     if (status) {
//         return await updateObject("roles_rights", roleRight, roleRightId);
//     }
//     return { data: null, status: status, errorCode: { failData: results } };
// }


// export async function deleteRoleRight(roleRightId: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
//     const { status, results } = validateDataArray([roleRightId], rolesRightsUpdateAndDeleteSchema, messagesEn);
//     if (status) {
//         return await deleteObject("roles_rights", { roleId: roleRightId.roleId, rightId: roleRightId.rightId });
//     }
//     return { data: null, status: status, errorCode: { failData: results } };
// }