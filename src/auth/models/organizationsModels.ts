const bcrypt = require('bcrypt');
import executeQuery, { insertObject, insertObjects,insertObjectNotIsSystem,insertObjectsNotIsSystem, updateObject, updateObjects,updateObjectNotIsSystem,updateObjectsNotIsSystem, deleteObject, deleteObjects,deleteObjectNotIsSystem, deleteObjectsNotIsSystem, checkExistenceOfFieldsObject, checkExistenceOfFieldsObjects } from '../../connectSql'
import { deleteObjectsTables } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'
import dotenv from 'dotenv';
dotenv.config();



//Tạo type cho organization
export type organization = {
    id?: string;
    code?: string;
    name?: string;
    address?: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};



//Tạo type cho organization
export type organizationUpdateAndDelete = {
    id: string;
    code?: string;
    name?: string;
    address?: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

const organizationInsertRule: RuleSchema = {
    id: { type: "string", format: "uuid", required: false },
    code: { type: "string", required: true, minLength: 2, maxLength: 100 },
    name: { type: "string", required: true, minLength: 2, maxLength: 255 },
    address: { type: "string", required: false, maxLength: 255 },
    isActive: { type: "boolean", required: false },
    isSystem: { type: "boolean", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


const organizationUpdateAndDeleteRule: RuleSchema = {
    id: { type: "string", format: "uuid", required: true },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: "string", required: false, minLength: 2, maxLength: 255 },
    address: { type: "string", required: false, maxLength: 255 },
    isActive: { type: "boolean", required: false },
    isSystem: { type: "boolean", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};



const organizationCheckRule: RuleSchema = {
    id: { type: "string", format: "uuid", required: false },
    code: { type: "string", required: false, minLength: 2, maxLength: 100 },
    name: { type: "string", required: false, minLength: 2, maxLength: 255 },
    address: { type: "string", required: false, maxLength: 255 },
    isActive: { type: "boolean", required: false },
    isSystem: { type: "boolean", required: false },
    createdBy: { type: "string", required: false, maxLength: 100 },
    updatedBy: { type: "string", required: false, maxLength: 100 },
    createdAt: { type: "string", format: "datetime", required: false },
    updatedAt: { type: "string", format: "datetime", required: false }
};


export type organizationExistanceCheck = {
    fields: {
        id?: string;
        code?: string;
    }
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};


export type organizationsExistanceCheck = {
    fields: Array<{
        id?: string;
        code?: string;
        email?: string;
    }>
    excludeField?: string;
    whereField?: { [field: string]: string | number | undefined };
};



export async function getOrganization(organizationId: string) {
    const sqlQuery = "SELECT id,code,name,address,isActive,isSystem,createdBy,updatedBy,createdAt,updatedAt FROM organizations WHERE id = ?";
    return await executeQuery(sqlQuery, [organizationId]);
}
export async function getOrganizations() {
    const Sqlstring = "Select id,code,name,address,isActive,isSystem,createdBy,updatedBy,createdAt,updatedAt from organizations";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function getIdOrganizationsByCodes(codes: string[]) {
  if (!codes.length) return { data: [], status: true, errorCode: {} };

  const placeholders = codes.map(() => '?').join(', ');
  const query = `SELECT id, code FROM organizations WHERE code IN (${placeholders})`;
  const params = [...codes];

  const result = await executeQuery(query, params);
  return result;
}



export async function checkExistenceOrganization(organizationCheck: organizationExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([organizationCheck.fields], organizationCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObject({ tableName: "organizations", ...organizationCheck });
        return { data: data.organizations[0], status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function checkExistenceOrganizations(organizationsCheck: organizationsExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(organizationsCheck.fields, organizationCheckRule, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObjects({ tableName: "organizations", ...organizationsCheck });
        return { data: data.organizations, status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function insertOrganization(organization: organization): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([organization], organizationInsertRule, messagesEn);
    if (status) {
        return await insertObjectNotIsSystem("organizations", organization);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateOrganization(organization: organizationUpdateAndDelete): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = { id: organization.id }; // Use userId as the columKey
        const { status, results } = validateDataArray([columKey], organizationUpdateAndDeleteRule, messagesEn);
        if (status) {
            return await updateObjectNotIsSystem("organizations", organization, columKey);
        }
        return { data: null, status: status, errorCode: { failData: results } };
}




export async function deleteOrganization(organizationid: string): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
      const columKey = { id: organizationid }; // Use userId as the columKey
      const { status, results } = validateDataArray([columKey], organizationUpdateAndDeleteRule, messagesEn);
      if (status) {
          return await deleteObjectNotIsSystem("organizations", columKey);
      }
      return { data: null, status: status, errorCode: { failData: results } };
}




export async function insertOrganizations(organizations: Array<organization>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
        const { status, results } = validateDataArray(organizations, organizationInsertRule, messagesEn);
        if (status) {
            return await insertObjectsNotIsSystem("organizations", organizations);
        }
        return { data: null, status: status, errorCode: { failData: results } };
}



export async function updateOrganizations(organizations: Array<organization>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(organizations, organizationUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await updateObjectsNotIsSystem("organizations", organizations, ["id"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}



export async function deleteOrganizations(organizations: Array<organization>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(organizations, organizationUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await deleteObjectsNotIsSystem("organizations", organizations);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
