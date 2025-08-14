import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'

//Tạo type cho user
type activeLogs = {
    userId?: string;
    userName?: string;
    fullName?: string;
    time?: Date;
    action: string;
    tableName: string;
    description?: string;
    ip?: string;
    computerName?: string;
    oldData?: object;
    newData?: object;
    browserInfo?: object;
    protocol?: string;
    hostname?: string;
    originalUrl?: string;
    method?: string;
    port?: number;
    secure?: boolean;
};


const activityLogsRule: RuleSchema = {
    id: {
        type: "number",
        required: false // AUTO_INCREMENT nên không cần truyền
    },

    userId: {
        type: "string",
        format: "uuid",
        required: false
    },

    username: {
        type: "string",
        required: false,
        max: 100
    },

    time: {
        type: "string",
        format: "datetime",
        required: false
    },

    action: {
        type: "string",
        required: false,
        max: 50,
    },

    tableName: {
        type: "string",
        required: false,
        max: 100
    },

    description: {
        type: "string",
        required: false
    },

    ip: {
        type: "string",
        format: "ip",
        required: false,
        max: 45
    },

    oldData: {
        type: "object", // JSON
        required: false
    },

    activeData: {
        type: "object", // JSON
        required: false
    },

    browserInfo: {
        type: "object", // JSON
        required: false
    },

    protocol: {
        type: "string",
        required: false,
        max: 10,
        enum: ["http", "https"]
    },

    hostname: {
        type: "string",
        required: false,
        max: 255
    },

    originalUrl: {
        type: "string",
        required: false
    },

    method: {
        type: "string",
        required: false,
        max: 10,
        enum: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    },

    port: {
        type: "number",
        required: false
    },

    secure: {
        type: "boolean",
        required: false
    }
};


export async function getActivityLogs() {
    const Sqlstring = "Select * from activityLogs";
    const data = await executeQuery(Sqlstring);
    return data;
}

export async function getActivityLogsByUsername(username: string) {
    const Sqlstring = "Select * from activityLogs where userName = ?";
    const data = await executeQuery(Sqlstring, [username]);
    return data;
}


export async function insertActivityLogs(activeLogs: Array<activeLogs>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    if (!Array.isArray(activeLogs) || activeLogs.length === 0) {
        return { data: null, status: false, errorCode: "Invalid input" };
    }
    const { status, results } = validateDataArray(activeLogs, activityLogsRule, messagesEn);
    if (status) {
        return await insertObjects("activityLogs", activeLogs);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function insertAutoActivityLogs(activeLogs: Array<activeLogs>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    if (!Array.isArray(activeLogs) || activeLogs.length === 0) {
        return { data: null, status: false, errorCode: "Invalid input" };
    }
    return await insertObjects("activityLogs", activeLogs);
}

export async function deleteActivityLogs() {
    const Sqlstring = "DELETE FROM activityLogs";
    const data = await executeQuery(Sqlstring);
    return data;
}