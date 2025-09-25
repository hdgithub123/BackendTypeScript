import bcrypt from 'bcrypt';
import executeQuery, { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects, insertObjectsTreeLeafTables, updateObjectsTreeLeafTables, deleteObjectsTreeLeafTables, insertObjectsTreeLeafTablesUniqueField } from '../../connectSql'
import { validateDataArray, RuleSchema, messagesVi, messagesEn } from '../../validation'

//Tạo type cho zone
export type zone = {
    name: string;
    code: string;
    address?: string;
    description?: string;
    parentId?: string;
    createdBy?: string;
}

const zoneInsertRule: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: false
    },

    name: {
        type: "string",
        required: true,
        max: 255
    },

    code: {
        type: "string",
        required: true,
        max: 50
    },

    address: {
        type: "string",
        required: false
    },

    description: {
        type: "string",
        required: false
    },

    parentId: {
        type: "string",
        format: "uuid",
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

const zoneUpdateAndDeleteRule: RuleSchema = {
    id: {
        type: "string",
        format: "uuid",
        required: true
    },

    name: {
        type: "string",
        required: false,
        max: 255
    },

    code: {
        type: "string",
        required: false,
        max: 50
    },

    address: {
        type: "string",
        required: false
    },

    description: {
        type: "string",
        required: false
    },

    parentId: {
        type: "string",
        format: "uuid",
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




export async function getZone(id: string) {
    const sqlQuery = "Select * from zones WHERE id = ?";
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
export async function insertZone(zone: zone): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const tablesData = {
        table: "zones",
        dataIn: [zone],
        parentField: "parentId",
        childField: "id"
    };

    const { status, results } = validateDataArray([zone], zoneInsertRule, messagesEn);
    if (status) {
        return await insertObjectsTreeLeafTables([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };



}


export async function updateZone(zoneId: string, zone: zone): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const updateZone = { ...zone, id: zoneId }; // Ensure the zone has the id field for update
    const tablesData: zoneData = {
        table: "zones",
        dataIn: [updateZone],
        parentField: "parentId",
        childField: "id"
    };
    const { status, results } = validateDataArray([updateZone], zoneUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await updateObjectsTreeLeafTables([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}


export async function insertZones(zones: Array<zone>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const tablesData: zoneData = {
        table: "zones",
        dataIn: zones,
        parentField: "parentId",
        childField: "id"
    };

    const { status, results } = validateDataArray(zones, zoneInsertRule, messagesEn);
    if (status) {
        return await insertObjectsTreeLeafTables([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };

}


export async function updateZones(zones: Array<zone>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const tablesData: zoneData = {
        table: "zones",
        dataIn: zones,
        parentField: "parentId",
        childField: "id"
    };

    const { status, results } = validateDataArray(zones, zoneUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await updateObjectsTreeLeafTables([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}

export async function deleteZone(zonesId: string | number): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const tablesData = {
        table: "zones",
        dataIn: [zonesId],
        parentField: "parentId",
        childField: "id"
    };

    const columKey = { id: zonesId }; // Use userId as the columKey
    const { status, results } = validateDataArray([columKey], zoneUpdateAndDeleteRule, messagesEn);
    if (status) {

        return await deleteObjectsTreeLeafTables([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };



}

export async function deleteZones(zones: Array<string>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const tablesData = {
        table: "zones",
        dataIn: zones,
        parentField: "parentId",
        childField: "id"
    };

    // chuyển zones thành [{id:"zone",...}]
    const dataIdZones = zones.map(id => ({ id }));
    const { status, results } = validateDataArray(dataIdZones, zoneUpdateAndDeleteRule, messagesEn);
    if (status) {
        return await deleteObjectsTreeLeafTables([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };


}



export async function insertZonesByCode(zones: Array<zone>): Promise<{ data: Object | null, status: boolean, errorCode: string | Object }> {
    const tablesData = {
        table: "zones",
        dataIn: zones,
        uniqueField: "code",
        parentField: "parentId",
        childField: "id"
    };

    const zoneInsertRuleByCode: RuleSchema = {
        id: {
            type: "string",
            format: "uuid",
            required: false
        },

        name: {
            type: "string",
            required: true,
            max: 255
        },

        code: {
            type: "string",
            required: true,
            max: 50
        },

        address: {
            type: "string",
            required: false
        },

        description: {
            type: "string",
            required: false
        },

        parentId: {
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

    const { status, results } = validateDataArray(zones, zoneInsertRuleByCode, messagesEn);
    if (status) {
        return await insertObjectsTreeLeafTablesUniqueField([tablesData]);
    }
    return { data: null, status: status, errorCode: { failData: results } };
}