import executeTransaction from '../executeTransaction';
require('dotenv').config();



export default async function insertObjectsTables(
    tablesData: Array<{ table: string; dataIn: Array<{ [key: string]: any }> }>
): Promise<{
    data: Array<{ table: string; dataIn: Object[]; oldData: null }>;
    status: boolean;
    errorCode: string | Object;
}> {

    const resultData: Array<{
        table: string;
        dataIn: Object[];
        oldData: null;
    }> = [];
    const { data, status, errorCode } = await executeTransaction(async (connection) => {

        for (const { table, dataIn } of tablesData) {
            if (!dataIn || dataIn.length === 0) continue;

            const keys = Object.keys(dataIn[0]);
            const columns = keys.join(',');
            const placeholders = dataIn.map(() => `(${keys.map(() => '?').join(',')})`).join(',');
            const values = dataIn.flatMap(item => keys.map(key => item[key]));

            const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES ${placeholders}`;
            await connection.execute(sqlQuery, values);

            resultData.push({ table, dataIn, oldData: null });
        }


    });
    return { data: resultData, status, errorCode };
}

