import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
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





export async function getRoleRight(roleRightId: roleIdRightId) {
    const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =?";
    return await executeQuery(sqlQuery, [roleRightId.roleId, roleRightId.rightId]);
}
export async function getRoleRights() {
    const Sqlstring = "Select * from roles_rights";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertRoleRight(roleRight: roleRight): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([roleRight], rolesRightsInsertSchema, messagesEn);
    if (status) {
        return await insertObject("roles_rights", roleRight);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRoleRight(roleRight: roleRight, roleRightId: roleIdRightId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([roleRight], rolesRightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObject("roles_rights", roleRight, roleRightId);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteRoleRight(roleRightId: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([roleRightId], rolesRightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("roles_rights", { roleId: roleRightId.roleId, rightId: roleRightId.rightId });
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertRoleRights(roleRights: Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roleRights, rolesRightsInsertSchema, messagesEn);
    if (status) {
        return await insertObjects("roles_rights", roleRights);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRoleRights(roleRights: Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roleRights, rolesRightsInsertSchema, messagesEn);
    if (status) {
        return await updateObjects("roles_rights", roleRights, ["roleId", "rightId"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteRoleRights(roleRights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(roleRights, rolesRightsInsertSchema, messagesEn);
    if (status) {
        return await deleteObjects("roles_rights", roleRights);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}