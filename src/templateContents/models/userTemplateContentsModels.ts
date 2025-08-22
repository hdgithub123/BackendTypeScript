import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'


//Tạo type cho user
export type templateContent = {
    id?: string;
    name?: string;
    code?: string;
    scopeName?: string;
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
        required: false
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
    scopeName: {
        type: "string",
        required: false,
        max: 255
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
    scopeName: {
        type: "string",
        required: true,
        max: 255
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



export async function getUserTemplateContent(id: string) {
    const sqlQuery = "SELECT * FROM template_contents WHERE id = ? AND scopeName = 'user'";
    return await executeQuery(sqlQuery, [id]);
}

export async function getUserTemplateContents() {
    const sqlQuery = "SELECT * FROM template_contents WHERE scopeName = 'user'";
    return await executeQuery(sqlQuery);
}



export async function insertUserTemplateContent(templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContent], templateContentsInsertSchema, messagesEn);
   const newTemplateContent = { ...templateContent, scopeName: 'user' };
    if (status) {
        return await insertObject("template_contents", newTemplateContent);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateUserTemplateContent(templateContentId: string, templateContent: templateContent): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([templateContent], templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status && templateContent.scopeName === 'user') {
        const columKey = { id: templateContentId }; // Use userId as the columKey
        return await updateObject("template_contents", templateContent, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteUserTemplateContent(templateContentId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = { id: templateContentId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], templateContentsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("template_contents", { id: templateContentId, scopeName: 'user' });
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
