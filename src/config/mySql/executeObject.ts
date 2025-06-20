import executeQuery from './executeQuery';
import executeTransaction from './executeTransaction';
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



export async function insertObjectsTables(
  tablesData: Array<{ table: string, dataIn: Array<{ [key: string]: any }> }>
): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
  return await executeTransaction(async (connection) => {
    for (const { table, dataIn } of tablesData) {
      if (!dataIn || dataIn.length === 0) continue;
      const keys = Object.keys(dataIn[0]);
      const placeholders = dataIn.map(() => `(${keys.map(() => '?').join(',')})`).join(',');
      const columns = keys.join(',');
      const values = dataIn.flatMap(item => keys.map(key => item[key]));
      const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES ${placeholders}`;
      await connection.execute(sqlQuery, values);
    }
    return null; // Không cần trả về dữ liệu cụ thể
  });
}


export async function updateObjects(
  table: string,
  dataIn: Array<{ [key: string]: any }>,
  columKey: Array<string>
): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
  return await executeTransaction(async (connection) => {
    for (const item of dataIn) {
      // SET clause
      const setKeys = Object.keys(item).filter(key => !columKey.includes(key));
      const setClause = setKeys.map(key => `${key} = ?`).join(', ');
      const setValues = setKeys.map(key => item[key]);

      // WHERE clause
      const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
      const whereValues = columKey.map(key => item[key]);

      const sqlQuery = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
      await connection.execute(sqlQuery, [...setValues, ...whereValues]);
    }
    return null; // Không cần trả về dữ liệu cụ thể
  });
}


export async function updateObjectsTables(
  tablesData: Array<{ table: string, dataIn: Array<{ [key: string]: any }>, columKey: Array<string> }>
): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
  return await executeTransaction(async (connection) => {
    for (const { table, dataIn, columKey } of tablesData) {
      for (const item of dataIn) {
        // SET clause
        const setKeys = Object.keys(item).filter(key => !columKey.includes(key));
        const setClause = setKeys.map(key => `${key} = ?`).join(', ');
        const setValues = setKeys.map(key => item[key]);

        // WHERE clause
        const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
        const whereValues = columKey.map(key => item[key]);

        const sqlQuery = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        await connection.execute(sqlQuery, [...setValues, ...whereValues]);
      }
    }
    return null; // Không cần trả về dữ liệu cụ thể
  });
}


export async function deleteObjects(
  table: string,
  columKey: Array<{ [key: string]: any }>
): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
  return await executeTransaction(async (connection) => {
    for (const obj of columKey) {
      const keys = Object.keys(obj);
      const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
      const values = keys.map(key => obj[key]);
      const sqlQuery = `DELETE FROM ${table} WHERE ${whereClause}`;
      await connection.execute(sqlQuery, values);
    }
    return null; // Không cần trả về dữ liệu cụ thể
  });
}


export async function deleteObjectsTables(
  tablesData: Array<{ table: string, columKey: Array<{ [key: string]: any }> }>
): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> {
  return await executeTransaction(async (connection) => {
    for (const { table, columKey } of tablesData) {
      for (const obj of columKey) {
        const keys = Object.keys(obj);
        const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
        const values = keys.map(key => obj[key]);
        const sqlQuery = `DELETE FROM ${table} WHERE ${whereClause}`;
        await connection.execute(sqlQuery, values);
      }
    }
    return null; // Không cần trả về dữ liệu cụ thể
  });
}