import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type roleRight = {
    roleId: string;
    rightId: string;
    isActive: boolean;
    isSystem?: boolean;
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


export async function insertRoleRight(roleRight: roleRight): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const newRoleRight= { ...roleRight, isSystem: false };
    return await insertObject("roles_rights", newRoleRight);
}


export async function updateRoleRight( roleRight: roleRight, roleRightId: roleIdRightId): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
   // kiểm tra nếu thuộc tính isSystem là true thì không được xóa
    const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =? AND isSystem = true";
    const dataRoleRight = await executeQuery(sqlQuery, [roleRightId.roleId,roleRightId.rightId]);
    if (dataRoleRight && Array.isArray(dataRoleRight.data) && dataRoleRight.data.length > 0) {
        return { data: null, status: false, errorCode:{message: "Can not update system role right" } };
    }
    return await updateObject("roles_rights", roleRight, roleRightId);
}


export async function deleteRoleRight( roleRightId: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu thuộc tính isSystem là true thì không được xóa
    const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =? AND isSystem = true";
    const roleRight = await executeQuery(sqlQuery, [roleRightId.roleId,roleRightId.rightId]);

    if (roleRight && Array.isArray(roleRight.data) && roleRight.data.length > 0) {
        return { data: null, status: false, errorCode:{message: "Can not delete system role right" } };
    }
    return await deleteObject("roles_rights", { roleId: roleRightId.roleId, rightId:roleRightId.rightId  });
}


export async function insertRoleRights(roleRights:Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // loại bỏ thuộc tính isSystem nếu ở các đối tượng trong mảng roleRights
    const filteredRoleRights = roleRights.map(roleRight => {
        const { isSystem, ...rest } = roleRight;
        return rest;
    });
    return await insertObjects("roles_rights", filteredRoleRights);
}


export async function updateRoleRights(roleRights:Array<roleRight>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // duyệt lần lượt qua mảng roleRights và kiểm tra nếu thuộc tính isSystem là true thì không được cập nhật
    for (const roleRight of roleRights) {
        const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =? AND isSystem = true";
        const dataRoleRight = await executeQuery(sqlQuery, [roleRight.roleId, roleRight.rightId]);
        if (dataRoleRight && Array.isArray(dataRoleRight.data) && dataRoleRight.data.length > 0) {
            return { data: null, status: false, errorCode:{message: "Can not update system role right" } };
        }
    }
    return await updateObjects("roles_rights", roleRights, ["roleId", "rightId"]);
}

export async function deleteRoleRights(roleRights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
   // duyệt lần lượt qua mảng roleRights và kiểm tra nếu thuộc tính isSystem là true thì không được xóa
   for (const roleRight of roleRights) {
       const sqlQuery = "SELECT * FROM roles_rights WHERE roleId = ? And rightId =? AND isSystem = true";
       const dataRoleRight = await executeQuery(sqlQuery, [roleRight.roleId, roleRight.rightId]);
       if (dataRoleRight && Array.isArray(dataRoleRight.data) && dataRoleRight.data.length > 0) {
           return { data: null, status: false, errorCode:{message: "Can not delete system role right" } };
       }
   }
    return await deleteObjects("roles_rights", roleRights);
}
