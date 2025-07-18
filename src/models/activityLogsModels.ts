import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

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
    return await insertObjects("activityLogs", activeLogs);
}