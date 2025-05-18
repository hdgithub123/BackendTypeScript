import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from '../config'

//Tạo type cho user
export type right = {
    rightName: string;
    code: string;
    description?: string;
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


export async function insertRight(right: right): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await insertObject("rights", right);
}


export async function updateRight(rightsId: string, right: right): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    const columKey = { id: rightsId }; // Use userId as the columKey
    return await updateObject("rights", right, columKey);
}


export async function deleteRight(rightsId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObject("rights", { id: rightsId });
}


export async function insertRights(rights: Array<right>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await insertObjects("rights", rights);
}


export async function updateRights(rights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
        return await updateObjects("rights", rights, ["id"]);
}

export async function deleteRights(rights: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    return await deleteObjects("rights", rights);
}
