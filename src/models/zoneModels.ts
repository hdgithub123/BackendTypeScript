import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects, insertObjectsTreeTables,updateObjectsTreeTables } from '../config'

//Tạo type cho zone
export type zone = {
    zoneName: string; 
    code: string; 
    address?: string; 
    description?: string; 
    parentId?: string; 
    createdBy?: string;
}


export async function getZone(id: string) {
    const sqlQuery = "SELECT * FROM zones WHERE id = ?";
    return await executeQuery(sqlQuery, [id]);
}

export async function getZones() {
    const Sqlstring = "Select * from zones";
    const data = await executeQuery(Sqlstring);
    return data;

}


export type zoneData = {
    table: string;
    dataIn: Array<zone>;
    parentField: string;
    childField: string;
}
export async function insertZone(zone: zone): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    const tablesData: zoneData = {
        table: "zones",
        dataIn: [zone],
        parentField: "parentId",
        childField: "id"
    };
    return await insertObjectsTreeTables([tablesData]);
}


export async function updateZone(zone: zone): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    const tablesData: zoneData = {
        table: "zones",
        dataIn: [zone],
        parentField: "parentId",
        childField: "id"
    };
    return await updateObjectsTreeTables([tablesData]);
}


// export async function insertZones(zones: Array<zone>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//     const tablesData: zoneData = {
//         table: "zones",
//         dataIn: zones,
//         parentField: "parentId",
//         childField: "id"
//     };
//     return await insertObjectsTreeTables([tablesData]);
// }



// export async function insertZone(zone: zone): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//     return await insertObject("zones", zone);
// }


// export async function updateZone(zonesId: string, zone: zone): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//     const columKey = { id: zonesId }; // Use userId as the columKey
//     return await updateObject("zones", zone, columKey);
// }


// export async function deleteZone(zonesId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//     return await deleteObject("zones", { id: zonesId });
// }


// export async function insertZones(zones: Array<zone>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//         return await insertObjects("zones", zones);
// }


// export async function updateZones(zones: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//         return await updateObjects("zones", zones, ["id"]);
// }

// export async function deleteZones(zones: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
//     return await deleteObjects("zones", zones);
// }
