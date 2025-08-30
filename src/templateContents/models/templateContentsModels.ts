import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects,checkExistenceOfFieldsObject,checkExistenceOfFieldsObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'


//Tạo type cho user
export type templateContent = {
    id?: string;
    name?: string;
    code?: string;
    content?: any;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
};


const templateContentsInsertSchema: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: true
    },

    name: {
        type: "string",
        required: true,
        max: 50
    },

    code: {
        type: "string",
        required: true,
        max: 50
    },
    content: {
        type: "object",
        required: true
    },

    description: {
        type: "string",
        required: false
    },

    createdAt: {
        type: "string",
        format: "datetime",
        required: false
    },
    updatedAt: {
        type: "string",
        format: "datetime",
        required: false
    },

    createdBy: {
        type: "string",
        required: false,
        max: 100
    },
    updatedBy: {
        type: "string",
        required: false,
        max: 100
    }
};

const templateContentsUpdateAndDeleteSchema: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: true
    },

    name: {
        type: "string",
        required: false,
        max: 50
    },

    code: {
        type: "string",
        required: false,
        max: 50
    },
    content: {
        type: "object",
        required: false
    },

    description: {
        type: "string",
        required: false
    },

    createdAt: {
        type: "string",
        format: "datetime",
        required: false
    },
    updatedAt: {
        type: "string",
        format: "datetime",
        required: false
    },

    createdBy: {
        type: "string",
        required: false,
        max: 100
    },
    updatedBy: {
        type: "string",
        required: false,
        max: 100
    }
};

const templateContentsCheckSchema: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: false
    },

    name: {
        type: "string",
        required: false,
        max: 50
    },

    code: {
        type: "string",
        required: true,
        max: 50
    },
    content: {
        type: "object",
        required: false
    },

    description: {
        type: "string",
        required: false
    },

    createdAt: {
        type: "string",
        format: "datetime",
        required: false
    },
    updatedAt: {
        type: "string",
        format: "datetime",
        required: false
    },

    createdBy: {
        type: "string",
        required: false,
        max: 100
    },
    updatedBy: {
        type: "string",
        required: false,
        max: 100
    }
};

export type templateContentExistanceCheck = {
    fields: {
    id?: string;
    code?: string;
    }
    excludeField?: string;
};


export type templateContentsExistanceCheck = {
    fields: Array<{
    id?: string;
    code?: string;
    }>
    excludeField?: string;
};


export async function checkExistenceTemplateContent(templateContentCheck: templateContentExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContentCheck.fields], templateContentsCheckSchema, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObject({ tableName: "template_contents", ...templateContentCheck });
        return { data: data.template_contents[0], status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function checkExistenceTemplateContents(templateContents: templateContentsExistanceCheck): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(templateContents.fields, templateContentsCheckSchema, messagesEn);
    if (status) {
        const { data, status, errorCode } = await checkExistenceOfFieldsObjects({ tableName: "template_contents", ...templateContents });
        return { data: data.template_contents, status: status, errorCode };
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function getTemplateContent(code: string) {
    const sqlQuery = "SELECT * FROM template_contents WHERE code = ?";
    return await executeQuery(sqlQuery, [code]);
}
export async function getTemplateContents() {
    const Sqlstring = "Select * from template_contents";
    const data = await executeQuery(Sqlstring);
    return data;
}


export async function insertTemplateContent(templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContent], templateContentsInsertSchema, messagesEn);
    if (status) {
        return await insertObject("template_contents", templateContent);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateTemplateContent(templateContentId: string, templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContent], templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        const columKey = { id: templateContentId }; // Use userId as the columKey
        return await updateObject("template_contents", templateContent, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteTemplateContent(templateContentId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = { id: templateContentId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("template_contents", { id: templateContentId });
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertTemplateContents(templateContents: Array<templateContent>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(templateContents, templateContentsInsertSchema, messagesEn);
    if (status) {
        return await insertObjects("template_contents", templateContents);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateTemplateContents(templateContents: Array<templateContent>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(templateContents, templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObjects("template_contents", templateContents, ["id"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteTemplateContents(templateContents: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(templateContents, templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObjects("template_contents", templateContents);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


