import executeQuery, { insertObjectsTablesNotIsSystem, insertObject, insertObjects, insertObjectNotIsSystem, insertObjectsNotIsSystem, updateObject, updateObjects, updateObjectNotIsSystem, updateObjectsNotIsSystem, deleteObject, deleteObjects, deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
import { v4 as uuidv4 } from 'uuid';

export type branch = {
    id?: string;
    code?: string;
    name?: string;
    address?: string;
    description?: string;
    organizationId?: string;
    isIndependent?: boolean;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};


export type branchUpdateAndDelete = {
    id: string;
    code?: string;
    name?: string;
    description?: string;
    address?: string;
    organizationId: string;
    isIndependent?: boolean;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

const branchInsertRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: true, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: true, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    isIndependent: { type: 'boolean', required: false },
    isActive: { type: 'boolean', required: false },
    organizationId: { type: "string", format: "uuid", required: true },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


const branchUpdateAndDeleteRule: RuleSchema = {
    id: { type: 'string', required: true, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    isIndependent: { type: 'boolean', required: false },
    isActive: { type: 'boolean', required: false },
    organizationId: { type: "string", format: "uuid", required: true },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};

const branchCheckRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    isIndependent: { type: 'boolean', required: false },
    isActive: { type: 'boolean', required: false },
    organizationId: { type: "string", format: "uuid", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};

export type branchExistanceCheck = {
    fields: {
        id?: string;
        code?: string;
    }
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};


export type branchesExistanceCheck = {
    fields: Array<{
        id?: string;
        code?: string;
    }>
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};

export async function getBranch(id: string, organizationId: string) {
    const sqlQuery = "SELECT * FROM branches WHERE id = ? AND organizationId = ?";
    return await executeQuery(sqlQuery, [id, organizationId]);
}
export async function getBranches(organizationId: string) {
    const Sqlstring = "Select * from branches WHERE organizationId = ?";
    const data = await executeQuery(Sqlstring, [organizationId]);
    return data;

}



export async function getIdBranchesByCodes(organizationId: string, codes: string[]) {
    if (!codes.length) return { data: [], status: true, errorCode: {} };

    const placeholders = codes.map(() => '?').join(', ');
    const query = `SELECT id, code FROM branches WHERE organizationId = ? AND code IN (${placeholders})`;
    const params = [organizationId, ...codes];

    const result = await executeQuery(query, params);
    return result;
}


export async function checkExistenceBranch(branchCheck: branchExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {

    const { status, results } = validateDataArray([branchCheck.fields], branchCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObject({ tableName: "branches", ...branchCheck });
        return { data: data.branches[0], status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function checkExistenceBranches(branchesCheck: branchesExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(branchesCheck.fields, branchCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObjects({ tableName: "branches", ...branchesCheck });
        return { data: data.branches, status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertBranch(branch: branch): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([branch], branchInsertRule, messagesEn);
    if (status) {
        return await insertObjectNotIsSystem("branches", branch);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateBranch(branch: branchUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiêm tra dữ liệu đầu vào branch.code = 'Administrator' thì không cho update
    const { status, results } = validateDataArray([branch], branchUpdateAndDeleteRule, messagesEn);
    if (status) {
        const checkAdminSql = "SELECT code FROM branches WHERE id = ? AND code = 'General'";
        const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [branch.id]);
        if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
            if (branch.code) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not update code General branch' } } };
            }
        }
    }


    if (status) {
        const columKey = { id: branch.id, organizationId: branch.organizationId }; // Use userId as the columKey
        return await updateObjectNotIsSystem("branches", branch, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteBranch(branch: branchUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const checkAdminSql = "SELECT code FROM branches WHERE id = ? AND code = 'General'";
    const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [branch.id]);
    if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
        return { data: null, status: false, errorCode: { failData: { code: ' Can not delete General branch' } } };
    }

    const columKey = { id: branch.id, organizationId: branch.organizationId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], branchUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await deleteObjectNotIsSystem("branches", columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertBranches(branches: Array<branch>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(branches, branchInsertRule, messagesEn);
    if (status) {
        return await insertObjectsNotIsSystem("branches", branches);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateBranches(branches: Array<branchUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(branches, branchUpdateAndDeleteRule, messagesEn);


    if (status) {
        // kiêm tra xem trong măng với mỗi branch có id và có code = 'General' thì không cho update
        for (const branch of branches) {
            const checkAdminSql = "SELECT code FROM branches WHERE id = ? AND code = 'General'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [branch.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                // Nếu tìm thấy branch có code = 'General' trong branch thì trả về lỗi
                if (branch.code) {
                    return { data: null, status: false, errorCode: { failData: { code: 'Can not update code General branch' } } };
                }
            }
        }
        return await updateObjectsNotIsSystem("branches", branches, ["id", "organizationId"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteBranches(branches: Array<branchUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(branches, branchUpdateAndDeleteRule, messagesEn);
    if (status) {
        for (const branch of branches) {
            const checkAdminSql = "SELECT code FROM branches WHERE id = ? AND code = 'General'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [branch.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not delete General branch' } } };
            }
        }

        const deleteTargets = branches.map((u: branchUpdateAndDelete) => ({
            id: u.id!,
            organizationId: u.organizationId!
        }));

        return await deleteObjectsNotIsSystem("branches", deleteTargets);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}




export async function getSettingBranches(organizationId: string) {
    const Sqlstring = "Select id, code, name from branches WHERE organizationId = ?";
    const data = await executeQuery(Sqlstring, [organizationId]);
    return data;

}