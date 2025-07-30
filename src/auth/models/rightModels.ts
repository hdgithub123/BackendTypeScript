import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'


//Tạo type cho user
export type right = {
    name: string;
    code: string;
    description?: string;
};


const rightsInsertSchema: RuleSchema = {
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

    description: {
        type: "string",
        required: false
    },

    createdAt: {
        type: "string",
        format: "datetime",
        required: false
    },

    createdBy: {
        type: "string",
        required: false,
        max: 100
    }
};

const rightsUpdateAndDeleteSchema: RuleSchema = {
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
        required: false,
        max: 50
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

    createdBy: {
        type: "string",
        required: false,
        max: 100
    }
};



export async function getRight(code: string) {
    const sqlQuery = "SELECT * FROM rights WHERE code = ?";
    return await executeQuery(sqlQuery, [code]);
}
export async function getRights() {
    const Sqlstring = "Select * from rights";
    const data = await executeQuery(Sqlstring);
    return data;

}


export async function insertRight(right: right): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([right], rightsInsertSchema, messagesEn);
    if (status) {
        return await insertObject("rights", right);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRight(rightsId: string, right: right): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray([right], rightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        const columKey = { id: rightsId }; // Use userId as the columKey
        return await updateObject("rights", right, columKey);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function deleteRight(rightsId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const columKey = { id: rightsId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], rightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObject("rights", { id: rightsId });
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertRights(rights: Array<right>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(rights, rightsInsertSchema, messagesEn);
    if (status) {
        return await insertObjects("rights", rights);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function updateRights(rights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(rights, rightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await updateObjects("rights", rights, ["id"]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteRights(rights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const { status, results } = validateDataArray(rights, rightsUpdateAndDeleteSchema, messagesEn);
    if (status) {
        return await deleteObjects("rights", rights);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}
