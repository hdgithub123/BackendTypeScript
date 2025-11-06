import executeQuery, { insertObjectsTablesNotIsSystem, insertObject, insertObjects, insertObjectNotIsSystem, insertObjectsNotIsSystem, updateObject, updateObjects, updateObjectNotIsSystem, updateObjectsNotIsSystem, deleteObject, deleteObjects, deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
import { v4 as uuidv4 } from 'uuid';
//Tạo type cho user
export type role = {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    organizationId?: string;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};


export type roleUpdateAndDelete = {
    id: string;
    code?: string;
    name?: string;
    description?: string;
    organizationId: string;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

const roleInsertRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: true, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: true, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    organizationId: { type: "string", format: "uuid", required: true },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


const roleUpdateAndDeleteRule: RuleSchema = {
    id: { type: 'string', required: true, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    organizationId: { type: "string", format: "uuid", required: true },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};

const roleCheckRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    organizationId: { type: "string", format: "uuid", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};

export type roleExistanceCheck = {
    fields: {
        id?: string;
        code?: string;
    }
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};


export type rolesExistanceCheck = {
    fields: Array<{
        id?: string;
        code?: string;
    }>
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};

export async function getRole(id: string, organizationId: string) {
    const sqlQuery = "SELECT * FROM roles WHERE id = ? AND organizationId = ?";
    return await executeQuery(sqlQuery, [id, organizationId]);
}
export async function getRoles(organizationId: string) {
    const Sqlstring = "Select * from roles WHERE organizationId = ?";
    const data = await executeQuery(Sqlstring, [organizationId]);
    return data;

}

export async function getIdRolesByCodes(organizationId: string, codes: string[]) {
    if (!codes.length) return { data: [], status: true, errorCode: {} };

    const placeholders = codes.map(() => '?').join(', ');
    const query = `SELECT id, code FROM roles WHERE organizationId = ? AND code IN (${placeholders})`;
    const params = [organizationId, ...codes];

    const result = await executeQuery(query, params);
    return result;
}


export async function checkExistenceRole(roleCheck: roleExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {

    const { status, results } = validateDataArray([roleCheck.fields], roleCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObject({ tableName: "roles", ...roleCheck });
        return { data: data.roles[0], status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function checkExistenceRoles(rolesCheck: rolesExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(rolesCheck.fields, roleCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObjects({ tableName: "roles", ...rolesCheck });
        return { data: data.roles, status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertRole(role: role): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([role], roleInsertRule, messagesEn);
    if (status) {

        let sqlStringRights = '';
        if (role.organizationId === '00000000-0000-0000-0000-000000000001') {
            sqlStringRights = "SELECT id FROM rights WHERE isOwner = TRUE";
        } else {
            sqlStringRights = "SELECT id FROM rights WHERE isOrganization = TRUE";
        }
        // lấy ra tất cả các rightId từ bảng rights với isOrganization = TRUE
        const { data, status: statusRights, errorCode } = await executeQuery(sqlStringRights);
        // đưa tất cả các rightId vào bảng roles_rights với isActive = 0, isSystem = 0
        let roleRights: Array<any> = [];
        if (statusRights && data && Array.isArray(data)) {
            roleRights = data.map((right: any) => ({
                roleId: role.id,
                rightId: right.id,
                isActive: 0,
                isSystem: 0,
            }));
        }

        if (roleRights.length) {
            return await insertObjectsTablesNotIsSystem([{ table: "roles", dataIn: [role] }, { table: "roles_rights", dataIn: roleRights }]);
        } else {
            return await insertObjectNotIsSystem("roles", role);
        }
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRole(role: roleUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiêm tra dữ liệu đầu vào role.code = 'Administrator' thì không cho update
    const { status, results } = validateDataArray([role], roleUpdateAndDeleteRule, messagesEn);
    if (status) {
        const checkAdminSql = "SELECT code FROM roles WHERE id = ? AND code = 'Administrator'";
        const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [role.id]);
        if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
            return { data: null, status: false, errorCode: { failData: { code: ' Can not update Administrator role' } } };
        }
    }


    if (status) {
        const columKey = { id: role.id, organizationId: role.organizationId }; // Use userId as the columKey
        return await updateObjectNotIsSystem("roles", role, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteRole(role: roleUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const checkAdminSql = "SELECT code FROM roles WHERE id = ? AND code = 'Administrator'";
    const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [role.id]);
    if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
        return { data: null, status: false, errorCode: { failData: { code: ' Can not delete Administrator role' } } };
    }

    const columKey = { id: role.id, organizationId: role.organizationId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], roleUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await deleteObjectNotIsSystem("roles", columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


// export async function insertRoles(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
//     const { status, results } = validateDataArray(roles, roleInsertRule, messagesEn);
//     if (status) {
//         // thêm vào bảng roles giá trị id = uuid
//         roles = roles.map(role => ({ ...role, id: uuidv4() }));
//         // lấy ra tất cả các rightId từ bảng rights với isOrganization = TRUE
//         const sqlStringRights = "SELECT id FROM rights WHERE isOrganization = TRUE";
//         const { data, status: statusRights, errorCode } = await executeQuery(sqlStringRights);
//         const sqlStringRightsOwner = "SELECT id FROM rights WHERE isOwner = TRUE";
//         const { data: dataOwner, status: statusRightsOwner, errorCode: errorCodeOwner } = await executeQuery(sqlStringRightsOwner);
        
//         // đưa tất cả các rightId vào bảng roles_rights với isActive = 0, isSystem = 0 của mối role thuộc roles
//         let roleRights: Array<any> = [];
//         if (statusRights && data && Array.isArray(data)) {
//             for (const role of roles) {
//                 const rightsForRole = data.map((right: any) => ({
//                     roleId: role.id,
//                     rightId: right.id,
//                     isActive: 0,
//                     isSystem: 0,
//                 }));
//                 roleRights.push(...rightsForRole);
//             }
//         }

//         if (roleRights.length) {
//             return await insertObjectsTablesNotIsSystem([{ table: "roles", dataIn: roles }, { table: "roles_rights", dataIn: roleRights }]);
//         } else {
//             return await insertObjectsNotIsSystem("roles", roles);
//         }
//     }
//     return { data: null, status: status, errorCode: { failData: results } };
// }

export async function insertRoles(roles: Array<role>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roles, roleInsertRule, messagesEn);
    if (status) {
        // thêm vào bảng roles giá trị id = uuid
        roles = roles.map(role => ({ ...role, id: uuidv4() }));
        
        // Lấy rights cho cả owner và organization
        const sqlStringRights = "SELECT id FROM rights WHERE isOrganization = TRUE";
        const sqlStringRightsOwner = "SELECT id FROM rights WHERE isOwner = TRUE";
        
        const [normalRights, ownerRights] = await Promise.all([
            executeQuery(sqlStringRights),
            executeQuery(sqlStringRightsOwner)
        ]);

        let roleRights: Array<any> = [];
        
        // Với mỗi role, kiểm tra organizationId để quyết định dùng rights nào
        for (const role of roles) {
            const useOwnerRights = role.organizationId === '00000000-0000-0000-0000-000000000001';
            const rightsList = useOwnerRights ? ownerRights.data : normalRights.data;
            
            if (rightsList && Array.isArray(rightsList)) {
                const rightsForRole = rightsList.map((right: any) => ({
                    roleId: role.id,
                    rightId: right.id,
                    isActive: 0,
                    isSystem: 0,
                }));
                roleRights.push(...rightsForRole);
            }
        }

        if (roleRights.length) {
            return await insertObjectsTablesNotIsSystem([
                { table: "roles", dataIn: roles }, 
                { table: "roles_rights", dataIn: roleRights }
            ]);
        } else {
            return await insertObjectsNotIsSystem("roles", roles);
        }
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRoles(roles: Array<roleUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roles, roleUpdateAndDeleteRule, messagesEn);


    if (status) {
        // kiêm tra xem trong măng với mỗi role có id và có code = 'Administrator' thì không cho update
        for (const role of roles) {
            const checkAdminSql = "SELECT code FROM roles WHERE id = ? AND code = 'Administrator'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [role.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not update Administrator role' } } };
            }
        }
        return await updateObjectsNotIsSystem("roles", roles, ["id", "organizationId"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteRoles(roles: Array<roleUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roles, roleUpdateAndDeleteRule, messagesEn);
    if (status) {
        for (const role of roles) {
            const checkAdminSql = "SELECT code FROM roles WHERE id = ? AND code = 'Administrator'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [role.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not delete Administrator role' } } };
            }
        }

        const deleteTargets = roles.map((u: roleUpdateAndDelete) => ({
            id: u.id!,
            organizationId: u.organizationId!
        }));

        return await deleteObjectsNotIsSystem("roles", deleteTargets);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


