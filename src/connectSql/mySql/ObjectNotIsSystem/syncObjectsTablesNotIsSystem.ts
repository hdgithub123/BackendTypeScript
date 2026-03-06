import executeTransaction from '../executeTransaction';
require('dotenv').config();

// cập nhật cho nhiều bảng, nếu không có thì insert, có thì update, được update trường isSystem, 
// và có thêm mode 'sync' để xóa các bản ghi thừa, nhưng không được update trường isSystem
export default async function syncObjectsTablesNotIsSystem(
    tablesData: Array<{
        table: string;
        dataIn: Array<{ [key: string]: any }>;
        columKey: string[];
        mode: 'update' | 'upsert' | 'sync';
        syncKey?: string; 
    }>
): Promise<{
    data: any[];
    status: boolean;
    errorCode: string | Object;
}> {
    const resultData: any[] = [];

    const { status, errorCode } = await executeTransaction(async (connection) => {
        for (const { table, dataIn, columKey, mode, syncKey } of tablesData) {
            const tableOldData: any[] = [];
            const tableValidDataIn: any[] = [];
            const keptIds: any[] = []; 

            for (const item of dataIn) {
                // 1️⃣ Kiểm tra dữ liệu cũ và isSystem
                const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
                const whereValues = columKey.map(key => item[key]);
                const [rows]: any = await connection.execute(
                    `SELECT * FROM ${table} WHERE ${whereClause}`, 
                    whereValues
                );
                
                const exists = rows.length > 0;

                if (exists) {
                    // 🛡️ BẢO VỆ: Nếu là bản ghi hệ thống, không cho phép sửa
                    if (rows[0].isSystem === 1 || rows[0].isSystem === true) {
                        throw { failData: { isSystem: `Bản ghi thuộc hệ thống trong bảng '${table}' không thể thay đổi.` } };
                    }

                    const oldRow = Object.keys(item).reduce((obj: any, key) => {
                        if (key in rows[0]) obj[key] = rows[0][key];
                        return obj;
                    }, {});
                    tableOldData.push(oldRow);
                }

                if (mode === 'update' && !exists) continue;

                // 2️⃣ Thực thi ghi dữ liệu
                const allKeys = Object.keys(item);
                
                if (mode === 'upsert' || mode === 'sync') {
                    const placeholders = allKeys.map(() => '?').join(', ');
                    const columns = allKeys.join(', ');
                    const updateKeys = allKeys.filter(key => !columKey.includes(key));
                    const updateClause = updateKeys.map(key => `${key} = VALUES(${key})`).join(', ');

                    let query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
                    if (updateKeys.length > 0) query += ` ON DUPLICATE KEY UPDATE ${updateClause}`;
                    
                    await connection.execute(query, Object.values(item));
                } else {
                    const setKeys = allKeys.filter(key => !columKey.includes(key));
                    const setClause = setKeys.map(key => `${key} = ?`).join(', ');
                    const setValues = setKeys.map(key => item[key]);
                    
                    if (setKeys.length > 0) {
                        await connection.execute(`UPDATE ${table} SET ${setClause} WHERE ${whereClause}`, [...setValues, ...whereValues]);
                    }
                }

                keptIds.push(item[columKey[0]]);
                tableValidDataIn.push(item);
            }

            // 3️⃣ Xử lý Xóa hàng thừa (Có kiểm tra isSystem)
            if (mode === 'sync' && syncKey) {
                const parentValue = dataIn.length > 0 ? dataIn[0][syncKey] : null;

                if (parentValue) {
                    // 🛡️ BẢO VỆ: Chỉ xóa những dòng KHÔNG PHẢI isSystem
                    let deleteQuery = `DELETE FROM ${table} WHERE ${syncKey} = ? AND (isSystem IS NULL OR isSystem = 0)`;
                    const deleteParams: any[] = [parentValue];

                    if (keptIds.length > 0) {
                        const inPlaceholders = keptIds.map(() => '?').join(', ');
                        deleteQuery += ` AND ${columKey[0]} NOT IN (${inPlaceholders})`;
                        deleteParams.push(...keptIds);
                    }

                    await connection.execute(deleteQuery, deleteParams);
                }
            }

            resultData.push({ table, dataIn: tableValidDataIn, oldData: tableOldData, columKey });
        }
    });

    return { data: resultData, status, errorCode };
}