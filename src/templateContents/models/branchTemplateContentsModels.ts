import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'


//Tạo type cho user
export type templateContent = {
    id?: string;
    name?: string;
    code?: string;
    organizationId?: string;
    scopeName?: string;
    content?: any;
    description?: string;
    isActive?: boolean;
    isSystem?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
};



const templateContentsInsertSchema: RuleSchema = {
  id: { type: "string", format: "uuid", required: false },
  name: { type: "string", required: true, max: 255 },
  code: { type: "string", required: true, max: 100 },
  organizationId: { type: "string", required: true, max: 50 },
  scopeName: { type: "string", required: false, max: 255 },
  content: { type: "object", required: true },
  description: { type: "string", required: false, max: 255 },
  isActive: { type: "boolean", required: false},
  isSystem: { type: "boolean", required: false},
  createdAt: { type: "string", format: "datetime", required: false },
  updatedAt: { type: "string", format: "datetime", required: false },
  createdBy: { type: "string", required: false, max: 100 },
  updatedBy: { type: "string", required: false, max: 100 }
};

const templateContentsUpdateAndDeleteSchema: RuleSchema = {
  id: { type: "string", format: "uuid", required: true },
  name: { type: "string", required: false, max: 255 },
  code: { type: "string", required: false, max: 100 },
  organizationId: { type: "string", required: true, max: 50 },
  scopeName: { type: "string", required: false, max: 255 },
  content: { type: "object", required: false },
  description: { type: "string", required: false, max: 255 },
  isActive: { type: "boolean", required: false},
  isSystem: { type: "boolean", required: false},
  createdAt: { type: "string", format: "datetime", required: false },
  updatedAt: { type: "string", format: "datetime", required: false },
  createdBy: { type: "string", required: false, max: 100 },
  updatedBy: { type: "string", required: false, max: 100 }
};



export async function getBranchTemplateContent(id: string, organizationId: string) {
    const sqlQuery = "SELECT * FROM template_contents WHERE id = ? AND scopeName = 'branch' AND organizationId = ?";
    return await executeQuery(sqlQuery, [id,organizationId]);
}

export async function getBranchTemplateContents(organizationId: string) {
    const sqlQuery = "SELECT * FROM template_contents WHERE scopeName = 'branch' AND organizationId = ?";
    return await executeQuery(sqlQuery,[organizationId]);
}



export async function insertBranchTemplateContent(templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContent], templateContentsInsertSchema, messagesEn);
    const newTemplateContent = { ...templateContent, scopeName: 'branch' };
    if (status) {
        return await insertObject("template_contents", newTemplateContent);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateBranchTemplateContent(templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContent], templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        const columKey = { id: templateContent.id,organizationId: templateContent.organizationId, scopeName: 'branch'};
        return await updateObject("template_contents", templateContent, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteBranchTemplateContent(templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = {  id: templateContent.id,organizationId: templateContent.organizationId, scopeName: 'branch' };
    const { status, results } = validateDataArray([columKey], templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("template_contents", columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}