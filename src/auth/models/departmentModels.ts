import e from 'express';
import executeQuery from '../../connectSql'
import {
    insertObjectsTablesNotIsSystem,
    insertObject,
    insertObjects,
    insertObjectNotIsSystem,
    insertObjectsNotIsSystem,
    updateObject,
    updateObjects,
    updateObjectNotIsSystem,
    updateObjectsNotIsSystem,
    deleteObject,
    deleteObjects,
    deleteObjectNotIsSystem,
    deleteObjectsNotIsSystem,

    insertObjectsTreeTrunkTablesNotIsSystem,
    insertObjectsTreeTrunkTablesUniqueFieldNotIsSystem,
    deleteObjectsTreeTrunkTablesNotIsSystem,
    updateObjectsTreeTrunkTablesNotIsSystem,

    insertObjectsTreeTrunkTables,
    insertObjectsTreeTrunkTablesUniqueField,
    updateObjectsTreeTrunkTables,
    deleteObjectsTreeTrunkTables,

    checkExistenceOfFieldsObject,
    checkExistenceOfFieldsObjects
} from '../../connectSql'


import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
import { v4 as uuidv4 } from 'uuid';



export type department = {
    id?: string;
    code?: string;
    name?: string;
    address?: string;
    description?: string;
    parentId?: string | null;
    branchId: string;
    organizationId: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};


export type departmentUpdateAndDelete = {
    id: string;
    code?: string;
    name?: string;
    address?: string;
    description?: string;
    parentId?: string | null;
    branchId?: string;
    organizationId?: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

const departmentInsertRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: true, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: true, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    parentId: { type: "string", format: "uuid", required: false },
    organizationId: { type: "string", format: "uuid", required: true },
    branchId: { type: "string", format: "uuid", required: true },
    isActive: { type: 'boolean', required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


const departmentUpdateAndDeleteRule: RuleSchema = {
    id: { type: 'string', required: true, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    isActive: { type: 'boolean', required: false },
    parentId: { type: "string", format: "uuid", required: false },
    branchId: { type: "string", format: "uuid", required: false },
    organizationId: { type: "string", format: "uuid", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};

const departmentCheckRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    isActive: { type: 'boolean', required: false },
    parentId: { type: "string", format: "uuid", required: false },
    branchId: { type: "string", format: "uuid", required: false },
    organizationId: { type: "string", format: "uuid", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};

export type departmentExistanceCheck = {
    fields: {
        id?: string;
        code?: string;
    }
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};


export type departmentsExistanceCheck = {
    fields: Array<{
        id?: string;
        code?: string;
    }>
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};


export type departmentData = {
    table: string;
    dataIn: Array<department>;
    parentField: string;
    childField: string;
}


export async function getDepartment(id: string, organizationId: string) {
    const sqlQuery = "SELECT * FROM departments WHERE id = ? AND organizationId = ?";
    return await executeQuery(sqlQuery, [id, organizationId]);
}
export async function getDepartments(organizationId: string) {
    const Sqlstring = "Select * from departments WHERE organizationId = ?";
    const data = await executeQuery(Sqlstring, [organizationId]);
    return data;

}

export async function getIdDepartmentsByCodes(organizationId: string, codes: string[]) {
    if (!codes.length) return { data: [], status: true, errorCode: {} };

    const placeholders = codes.map(() => '?').join(', ');
    const query = `SELECT id, code FROM departments WHERE organizationId = ? AND code IN (${placeholders})`;
    const params = [organizationId, ...codes];

    const result = await executeQuery(query, params);
    return result;
}


export async function checkExistenceDepartment(departmentCheck: departmentExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {

    const { status, results } = validateDataArray([departmentCheck.fields], departmentCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObject({ tableName: "departments", ...departmentCheck });
        return { data: data.departments[0], status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function checkExistenceDepartments(departmentsCheck: departmentsExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(departmentsCheck.fields, departmentCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObjects({ tableName: "departments", ...departmentsCheck });
        return { data: data.departments, status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertDepartment(department: department): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([department], departmentInsertRule, messagesEn);
    if (status) {
        // kiểm tra xem với branchId thì vào bảng branches xem organizationId  trùng với organizationId của department không
        const checkBranchSql = "SELECT organizationId FROM branches WHERE id = ?";
        const { data: branchData, status: branchStatus } = await executeQuery(checkBranchSql, [department.branchId]);
        if (branchStatus && branchData && Array.isArray(branchData) && branchData.length > 0) {
            if (branchData[0].organizationId !== department.organizationId) {
                return { data: null, status: false, errorCode: { failData: { branchId: 'Branch does not belong to the same organization' } } };
            }
        } else {
            return { data: null, status: false, errorCode: { failData: { branchId: 'Branch not found' } } };
        }


        // nếu parentid = '' thì gán parentId = null
        if (department.parentId === '') {
            department.parentId = null;
        }


        if (!department.id) {
            department.id = uuidv4();
        }
        
        const tablesData = {
            table: "departments",
            dataIn: [department],
            parentField: "parentId",
            childField: "id"
        };

        const  data = await insertObjectsTreeTrunkTablesNotIsSystem([tablesData]);
        console.log('Inserted successfully:', data);
        return data;

        // return await insertObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateDepartment(department: departmentUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiêm tra dữ liệu đầu vào department.code = 'Administrator' thì không cho update
    const { status, results } = validateDataArray([department], departmentUpdateAndDeleteRule, messagesEn);
    if (status) {
        const checkAdminSql = "SELECT code FROM departments WHERE id = ? AND code = 'General'";
        const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [department.id]);
        if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
            if (department.code) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not update code General department' } } };
            }
        }
    }


    if (status) {
        // loại bỏ branchId và organizationId trong department
        delete department.branchId;
        delete department.organizationId;
        
        const tablesData = {
            table: "departments",
            dataIn: [department],
            parentField: "parentId",
            childField: "id"
        };


        const columKey = { id: department.id, organizationId: department.organizationId }; // Use userId as the columKey
        return await updateObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteDepartment(department: departmentUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const checkAdminSql = "SELECT code FROM departments WHERE id = ? AND code = 'General'";
    const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [department.id]);
    if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
        return { data: null, status: false, errorCode: { failData: { code: ' Can not delete General department' } } };
    }

    const columKey = { id: department.id, organizationId: department.organizationId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], departmentUpdateAndDeleteRule, messagesEn);
    if (status) {
        const tablesData = {
            table: "departments",
            dataIn: [department.id],
            parentField: "parentId",
            childField: "id"
        };


        return await deleteObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertDepartments(departments: Array<department>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(departments, departmentInsertRule, messagesEn);
    if (status) {
        // với mỗi department kiểm tra xem với branchId thì vào bảng branches xem organizationId  trùng với organizationId của department không
        for (const department of departments) {
            const checkBranchSql = "SELECT organizationId FROM branches WHERE id = ?";
            const { data: branchData, status: branchStatus } = await executeQuery(checkBranchSql, [department.branchId]);
            if (branchStatus && branchData && Array.isArray(branchData) && branchData.length > 0) {
                if (branchData[0].organizationId !== department.organizationId) {
                    return { data: null, status: false, errorCode: { failData: { branchId: 'Branch does not belong to the same organization' } } };
                }
            } else {
                return { data: null, status: false, errorCode: { failData: { branchId: 'Branch not found' } } };
            }

            // nếu parentid = '' thì gán parentId = null
            if (department.parentId === '') {
                department.parentId = null;
            }

            if (!department.id) {
                department.id = uuidv4();
            }
        }

        const tablesData = {
            table: "departments",
            dataIn: departments,
            parentField: "parentId",
            childField: "id"
        };
        return await insertObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateDepartments(departments: Array<departmentUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(departments, departmentUpdateAndDeleteRule, messagesEn);

    if (status) {
        // kiêm tra xem trong măng với mỗi department có id và có code = 'General' thì không cho update
        for (const department of departments) {
            const checkAdminSql = "SELECT code FROM departments WHERE id = ? AND code = 'General'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [department.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                // Nếu tìm thấy department có code = 'General' trong department thì trả về lỗi
                if (department.code || department.parentId) {
                    return { data: null, status: false, errorCode: { failData: { code: 'Can not update code General department' } } };
                }
            }
        }

        // loại bỏ branchId và organizationId trong mỗi department
        for (const department of departments) {
            delete department.branchId;
            delete department.organizationId;
        }


        const tablesData = {
            table: "departments",
            dataIn: departments,
            parentField: "parentId",
            childField: "id"
        };

        return await updateObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteDepartments(departments: Array<departmentUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(departments, departmentUpdateAndDeleteRule, messagesEn);
    if (status) {
        for (const department of departments) {
            const checkAdminSql = "SELECT code FROM departments WHERE id = ? AND code = 'General'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [department.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not delete General department' } } };
            }
        }

        // const deleteTargets = departments.map((u: departmentUpdateAndDelete) => ({
        //     id: u.id!,
        //     organizationId: u.organizationId!
        // }));

        const tablesData = {
            table: "departments",
            dataIn: departments.map(d => d.id!),
            parentField: "parentId",
            childField: "id"
        };

        return await deleteObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


