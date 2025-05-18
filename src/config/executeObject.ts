import executeQuery from './mySql/executeQuery';
require('dotenv').config();

export async function insertObject(table: string, object: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    try {
        const keys = Object.keys(object);
        const placeholders = keys.map(() => '?').join(',');
        const values = keys.map(key => object[key]);
        const sqlQuery = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;
        const { data, status, errorCode } = await executeQuery(sqlQuery, values);
        return { data: data || null, status: status, errorCode: errorCode };
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}


export async function updateObject(table: string, object: { [key: string]: any }, columKey: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    try {
        const keys = Object.keys(object); // Get the keys from the object
        const setClause = keys.map(key => `${key} = ?`).join(','); // Create the SET clause for the update
        const values = Object.values(object); // Get the values to be updated
        const whereClause = Object.keys(columKey).map(key => `${key} = ?`).join(' AND '); // Create the WHERE clause
        const whereValues = Object.values(columKey); // Get the values for the WHERE clause
        const sqlQuery = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`; // Create the SQL query
        const { data, status, errorCode } = await executeQuery(sqlQuery, [...values, ...whereValues]); // Execute the query
        return { data: data || null, status: status, errorCode: errorCode };
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}


export async function deleteObject(table: string, columKey: { [key: string]: any }): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    try {
        const setClause = Object.keys(columKey).map(key => `${key} = ?`).join(' AND '); // Create the SET clause for the delete
        const values = Object.values(columKey); // Get the values to be used in the WHERE clause
        const sqlQuery = `DELETE FROM ${table} WHERE ${setClause}`; // Create the SQL query
        const { data, status, errorCode } = await executeQuery(sqlQuery, values); // Execute the query
        return { data: data || null, status: status, errorCode: errorCode };
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}



export async function insertObjects(table: string, dataIn: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    try {
        const keys = Object.keys(dataIn[0]); // Lấy danh sách các trường từ object đầu tiên
        const placeholders = dataIn.map(() => `(${keys.map(() => '?').join(',')})`).join(','); // Tạo chuỗi placeholders cho các giá trị
        const columns = keys.join(','); // Tạo chuỗi các trường cần insert
        const values = dataIn.flatMap(item => Object.values(item)); // Tạo mảng giá trị từ mảng dữ liệu
        
        const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES ${placeholders};`; // Tạo câu truy vấn insert
        const { data, status, errorCode } = await executeQuery(sqlQuery, values); // Thực thi truy vấn
        return { data: data || null, status: status, errorCode: errorCode };
    } catch (error) {
        console.error(error);
       const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}



export async function updateObjects(table: string, dataIn: Array<{ [key: string]: any }>, columKey: Array<string>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    try {
        let sqlQuery = 'BEGIN TRANSACTION; ';
        let allValues: string[] = [];
        // Iterate through each object in data
        dataIn.forEach(item => {
            // Initialize setClause, whereClause, và itemValues
            let setClause = '';
            let whereClause = '';     
            // Iterate through keys of the item
            Object.keys(item).forEach(key => {
                // Check if the key exists in columKey
                if (columKey.includes(key)) {

                } else {
                    // Append to setClause và itemValues
                    setClause += `${key} = ?, `;
                    allValues.push(item[key]);
                }
            });

            Object.keys(item).forEach(key => {
                // Check if the key exists in columKey
                if (columKey.includes(key)) {
                    // Append to whereClause và itemValues
                    whereClause += `${key} = ? AND `;
                    allValues.push(item[key]);
                } else {

                }
            });
        
            // Remove trailing commas from setClause và whereClause
            setClause = setClause.replace(/,\s*$/, '');
            whereClause = whereClause.replace(/ AND\s*$/, '');
        
            // Append the UPDATE statement to the SQL query
            sqlQuery += `UPDATE ${table} SET ${setClause} WHERE ${whereClause}; `;
        
        });

        sqlQuery += 'COMMIT;';
        // Execute the SQL query with values
        const { data, status, errorCode } = await executeQuery(sqlQuery, allValues);
        return { data, status, errorCode };
    } catch (error) {
        console.error(error);
       const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}


export async function deleteObjects(table: string, columKey: Array<{ [key: string]: any }>): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
    try {
        let sqlQuery = 'BEGIN TRANSACTION; ';
        
        columKey.forEach(obj => {
            const conditions = [];
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    conditions.push(`${key} = '${value}'`);
                }
            }
            const whereClause = conditions.join(' AND ');
            sqlQuery += `DELETE FROM ${table} WHERE ${whereClause}; `;
        });

        sqlQuery += 'COMMIT;';
        
        const { data, status, errorCode } = await executeQuery(sqlQuery); // Execute the query
        return { data, status, errorCode };
    } catch (error) {
        console.error(error);
        const errorCode = typeof error === 'object' && error !== null && 'code' in error ? (error as any).code : 'UNKNOWN_ERROR';
        return { data: null, status: false, errorCode };
    }
}

// module.exports = {
//     executeQuery,
//     insertObject,
//     updateObject,
//     deleteObject,
//     insertObjects,
//     updateObjects,
//     deleteObjects
// };
