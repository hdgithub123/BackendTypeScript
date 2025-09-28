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
    updateObjectsTreeTrunkTablesUniqueFieldNotIsSystem,

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


export type departmentInsertByCode = {
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


const departmentInsertByCodeRule: RuleSchema = {
    id: { type: 'string', required: false, format: 'uuid' },
    code: { type: "string", required: true, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: true, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    parentId: { type: "string", required: false, minLength: 2, maxLength: 100 },
    organizationId: { type: "string", format: "uuid", required: true },
    branchId: { type: "string", format: "uuid", required: true },
    isActive: { type: 'boolean', required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


const departmentUpdateAndDeleteByCodeRule: RuleSchema = {
    id: { type: 'string', required: true, format: 'uuid' },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    address: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    description: { type: 'string', required: false, minLength: 2, maxLength: 255 },
    isActive: { type: 'boolean', required: false },
    parentId: { type: "string", required: false, minLength: 2, maxLength: 100 },
    branchId: { type: "string", format: "uuid", required: false },
    organizationId: { type: "string", format: "uuid", required: false },
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
    // lay ra 
    const sqlQuery = "SELECT * FROM departments WHERE id = ? AND organizationId = ?";
    return await executeQuery(sqlQuery, [id, organizationId]);
}



export async function getDepartments(organizationId: string) {
    // lay ra tat ca cac department, parentCode = 
    //const Sqlstring = "Select * from departments WHERE organizationId = ?";

    // lấy cùng với branchCode trong bang branches mã code của branch
    const Sqlstring = `SELECT 
                        d.*,
                        b.code AS _branchCode,
                        b.name AS _branchName
                        FROM 
                        departments d
                        LEFT JOIN 
                        branches b ON d.branchId = b.id
                        WHERE 
                        d.organizationId = ?`;

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


        // kiểm tra xem branchId mà có id = parentId có  = brachId của department không
        if (department.parentId) {
            const checkParentSql = "SELECT branchId FROM departments WHERE id = ?";
            const { data: parentData, status: parentStatus } = await executeQuery(checkParentSql, [department.parentId]);
            if (parentStatus && parentData && Array.isArray(parentData) && parentData.length > 0) {
                if (parentData[0].branchId !== department.branchId) {
                    return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department and Child department does not belong to the same branch' } } };
                }
            } else {
                return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department not found' } } };
            }
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

        const data = await insertObjectsTreeTrunkTablesNotIsSystem([tablesData]);
        return data;

        // return await insertObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateDepartment(department: departmentUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu không có id thì trả về lỗi
    if (!department.id) {
        return { data: null, status: false, errorCode: { failData: { id: 'Id is required' } } };
    }


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
    // kiểm tra nếu có department.parentId thì phải kiểm tra branchId của cha có khác với con không bằng cách 
    // lấy branchId của department hiện tại với department.id và lấy branchId của department.parentId nếu khác thì trả về lỗi
    if (status && department.parentId) {
        const getBranchSql = "SELECT branchId FROM departments WHERE id = ?";
        const { data: childData, status: childStatus } = await executeQuery(getBranchSql, [department.id]);
        const { data: parentData, status: parentStatus } = await executeQuery(getBranchSql, [department.parentId]);
        if (childStatus && parentStatus && childData && parentData && Array.isArray(childData) && Array.isArray(parentData) && childData.length > 0 && parentData.length > 0) {
            if (childData[0].branchId !== parentData[0].branchId) {
                return { data: null, status: false, errorCode: { failData: { parentId: `Parent department and Child department does not belong to the same branch` } } };
            }
        } else {
            return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department not found' } } };
        }
    }

    // kiểm tra nếu có department.branchId thì phải kiểm tra xem có parentId không nếu có thì không cho update
    if (status && department.branchId) {
        const getParentSql = "SELECT parentId FROM departments WHERE id = ?";
        const { data: childData, status: childStatus } = await executeQuery(getParentSql, [department.id]);
        if (childStatus && childData && Array.isArray(childData) && childData.length > 0) {
            if (childData[0].parentId) {
                return { data: null, status: false, errorCode: { failData: { branchId: 'Can not update branchId when department has parentId' } } };
            }
        } else {
            return { data: null, status: false, errorCode: { failData: { id: 'Department not found' } } };
        }
    }


    if (status) {
        // loại bỏ branchId và organizationId trong department
        // delete department.branchId;
        delete department.organizationId;

        const tablesData = {
            table: "departments",
            dataIn: [department],
            parentField: "parentId",
            childField: "id"
        };
        return await updateObjectsTreeTrunkTablesNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteDepartment(department: departmentUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu không có id thì trả về lỗi
    if (!department.id) {
        return { data: null, status: false, errorCode: { failData: { id: 'Id is required' } } };
    }

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
                    return { data: null, status: false, errorCode: { failData: { branchId: `Branch does not belong to the same organization at ${department.code}` } } };
                }
            } else {
                return { data: null, status: false, errorCode: { failData: { branchId: 'Branch not found' } } };
            }

            // nếu parentid = '' thì gán parentId = null
            if (department.parentId === '') {
                department.parentId = null;
            }

            // kiểm tra xem branchId mà có id = parentId có  = branchId của department không
            if (department.parentId) {
                const checkParentSql = "SELECT branchId FROM departments WHERE id = ?";
                const { data: parentData, status: parentStatus } = await executeQuery(checkParentSql, [department.parentId]);
                if (parentStatus && parentData && Array.isArray(parentData) && parentData.length > 0) {
                    if (parentData[0].branchId !== department.branchId) {
                        return { data: null, status: false, errorCode: { failData: { parentId: `Parent department and Child department does not belong to the same branch at ${department.code}` } } };
                    }
                } else {
                    return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department not found' } } };
                }
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


export async function insertDepartmentsByCode(departments: Array<departmentInsertByCode>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(departments, departmentInsertByCodeRule, messagesEn);
    
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
            uniqueField: "code",
            parentField: "parentId",
            childField: "id"
        };
        const result = await insertObjectsTreeTrunkTablesUniqueFieldNotIsSystem([tablesData]);
        return result;
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateDepartments(departments: Array<departmentUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu không có id thì trả về lỗi
    for (const department of departments) {
        if (!department.id) {
            return { data: null, status: false, errorCode: { failData: { id: 'Id is required' } } };
        }
    }



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
            // kiểm tra nếu có department.parentId thì phải kiểm tra branchId của cha có khác với con không bằng cách 
            // lấy branchId của department hiện tại với department.id và lấy branchId của department.parentId nếu khác thì trả về lỗi
            if (status && department.parentId) {
                const getBranchSql = "SELECT branchId FROM departments WHERE id = ?";
                const { data: childData, status: childStatus } = await executeQuery(getBranchSql, [department.id]);
                const { data: parentData, status: parentStatus } = await executeQuery(getBranchSql, [department.parentId]);
                if (childStatus && parentStatus && childData && parentData && Array.isArray(childData) && Array.isArray(parentData) && childData.length > 0 && parentData.length > 0) {
                    if (childData[0].branchId !== parentData[0].branchId) {
                        return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department does not belong to the same branch' } } };
                    }
                } else {
                    return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department not found' } } };
                }
            }

            // kiểm tra nếu có department.branchId thì phải kiểm tra xem có parentId không nếu có thì không cho update
            if (status && department.branchId) {
                const getParentSql = "SELECT parentId FROM departments WHERE id = ?";
                const { data: childData, status: childStatus } = await executeQuery(getParentSql, [department.id]);
                if (childStatus && childData && Array.isArray(childData) && childData.length > 0) {
                    if (childData[0].parentId) {
                        return { data: null, status: false, errorCode: { failData: { branchId: 'Can not update branchId when department has parentId' } } };
                    }
                } else {
                    return { data: null, status: false, errorCode: { failData: { id: 'Department not found' } } };
                }
            }


        }


        // loại bỏ branchId và organizationId trong mỗi department
        for (const department of departments) {
            // delete department.branchId;
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

export async function updateDepartmentsByCode(departments: Array<departmentUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu không có id thì trả về lỗi
    for (const department of departments) {
        if (!department.id) {
            return { data: null, status: false, errorCode: { failData: { id: 'Id is required' } } };
        }
    }

    const { status, results } = validateDataArray(departments, departmentUpdateAndDeleteByCodeRule, messagesEn);

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
            // kiểm tra nếu có department.parentId thì phải kiểm tra branchId của cha có khác với con không bằng cách 
            // lấy branchId của department hiện tại với department.id và lấy branchId của department.parentId nếu khác thì trả về lỗi
            if (status && department.parentId) {
                const getBranchSql = "SELECT branchId FROM departments WHERE id = ?";
                const getBranchCodeSql = "SELECT branchId FROM departments WHERE code = ?";
                const { data: childData, status: childStatus } = await executeQuery(getBranchSql, [department.id]);
                const { data: parentData, status: parentStatus } = await executeQuery(getBranchCodeSql, [department.parentId]);
                if (childStatus && parentStatus && childData && parentData && Array.isArray(childData) && Array.isArray(parentData) && childData.length > 0 && parentData.length > 0) {
                    if (childData[0].branchId !== parentData[0].branchId) {
                        return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department does not belong to the same branch' } } };
                    }
                } else {
                    return { data: null, status: false, errorCode: { failData: { parentId: 'Parent department not found' } } };
                }
            }
            // kiểm tra nếu có department.branchId thì phải kiểm tra xem có parentId không nếu có thì không cho update

            if (status && department.branchId) {
                const getParentSql = "SELECT parentId FROM departments WHERE id = ?";
                const { data: childData, status: childStatus } = await executeQuery(getParentSql, [department.id]);
                if (childStatus && childData && Array.isArray(childData) && childData.length > 0) {
                    if (childData[0].parentId) {
                        return { data: null, status: false, errorCode: { failData: { branchId: `Can not update branchId when department has parentId at ${department.code}` } } };
                    }
                } else {
                    return { data: null, status: false, errorCode: { failData: { id: 'Department not found' } } };
                }
            }

        }

        // loại bỏ branchId và organizationId trong mỗi department
        for (const department of departments) {
            // delete department.branchId;
            delete department.organizationId;
        }


        const tablesData = {
            table: "departments",
            dataIn: departments,
            uniqueField: "code",
            parentField: "parentId",
            childField: "id"
        };

        return await updateObjectsTreeTrunkTablesUniqueFieldNotIsSystem([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function deleteDepartments(departments: Array<departmentUpdateAndDelete>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    // kiểm tra nếu không có id thì trả về lỗi
    for (const department of departments) {
        if (!department.id) {
            return { data: null, status: false, errorCode: { failData: { id: 'Id is required' } } };
        }
    }
    const { status, results } = validateDataArray(departments, departmentUpdateAndDeleteRule, messagesEn);
    if (status) {
        for (const department of departments) {
            const checkAdminSql = "SELECT code FROM departments WHERE id = ? AND code = 'General'";
            const { data: adminData, status: adminStatus } = await executeQuery(checkAdminSql, [department.id]);
            if (adminStatus && adminData && Array.isArray(adminData) && adminData.length > 0) {
                return { data: null, status: false, errorCode: { failData: { code: 'Can not delete General department' } } };
            }
        }

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


