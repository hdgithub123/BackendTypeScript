import executeQuery, { insertObjectsTablesNotIsSystem, insertObject, insertObjects, insertObjectNotIsSystem, insertObjectsNotIsSystem, updateObject, updateObjects, updateObjectNotIsSystem, updateObjectsNotIsSystem, deleteObject, deleteObjects, deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
import { v4 as uuidv4 } from 'uuid';

// CREATE TABLE departments (
//     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
//     name VARCHAR(255) NOT NULL,
//     code VARCHAR(100) NOT NULL, -- Mã phòng ban có thể thay đổi
//     address TEXT,
//     description TEXT,
//     parentId CHAR(36) NULL,
//     departmentId CHAR(36) NOT NULL,
//     FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE CASCADE,
//     UNIQUE (departmentId, code),
//     isSystem TINYINT(1) DEFAULT 0,
//     createdBy VARCHAR(100),
//     updatedBy VARCHAR(100),
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (parentId) REFERENCES departments(id),
//     CHECK (id <> '')
// );



export type department = {
    id?: string;
    code?: string;
    name?: string;
    address?: string;
    description?: string;
    parentId?: string;
    branchId?: string;
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
    parentId?: string;
    branchId?: string;
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

export async function getDepartment(id: string, branchId: string) {
    const sqlQuery = "SELECT * FROM departments WHERE id = ? AND branchId = ?";
    return await executeQuery(sqlQuery, [id, branchId]);
}
export async function getDepartments(branchId: string) {
    const Sqlstring = "Select * from departments WHERE branchId = ?";
    const data = await executeQuery(Sqlstring, [branchId]);
    return data;

}

export async function getIdDepartmentsByCodes(branchId: string, codes: string[]) {
    if (!codes.length) return { data: [], status: true, errorCode: {} };

    const placeholders = codes.map(() => '?').join(', ');
    const query = `SELECT id, code FROM departments WHERE branchId = ? AND code IN (${placeholders})`;
    const params = [branchId, ...codes];

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
        return await insertObjectNotIsSystem("departments", department);
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
        const columKey = { id: department.id, branchId: department.branchId }; // Use userId as the columKey
        return await updateObjectNotIsSystem("departments", department, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteDepartment(department: departmentUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const checkAdminSql = "SELECT code FROM departments WHERE id = ? AND code = 'General'";
    const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [department.id]);
    if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
        return { data: null, status: false, errorCode: { failData: { code: ' Can not delete General department' } } };
    }

    const columKey = { id: department.id, branchId: department.branchId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], departmentUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await deleteObjectNotIsSystem("departments", columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertDepartments(departments: Array<department>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(departments, departmentInsertRule, messagesEn);
    if (status) {
        return await insertObjectsNotIsSystem("departments", departments);
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
                if (department.code) {
                    return { data: null, status: false, errorCode: { failData: { code: 'Can not update code General department' } } };
                }
            }
        }
        return await updateObjectsNotIsSystem("departments", departments, ["id", "branchId"]);
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

        const deleteTargets = departments.map((u: departmentUpdateAndDelete) => ({
            id: u.id!,
            branchId: u.branchId!
        }));

        return await deleteObjectsNotIsSystem("departments", deleteTargets);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


