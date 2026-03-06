import executeTransaction from '../executeTransaction';
require('dotenv').config();

// cập nhật cho nhiều bảng, nếu không có thì insert, có thì update, được update trường isSystem, 
// và có thêm mode 'sync' để xóa các bản ghi thừa
export default async function syncObjectsTables(
    tablesData: Array<{
        table: string;
        dataIn: Array<{ [key: string]: any }>;
        columKey: string[];
        mode: 'update' | 'upsert' | 'sync';
        syncKey?: string; // Bắt buộc nếu dùng mode 'sync' (ví dụ: 'bookingId')
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
            const keptIds: any[] = []; // Lưu lại danh sách ID để phục vụ mode 'sync'

            for (const item of dataIn) {
                // 1️⃣ Lấy dữ liệu cũ để trả về kết quả
                const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
                const whereValues = columKey.map(key => item[key]);
                const [rows]: any = await connection.execute(
                    `SELECT * FROM ${table} WHERE ${whereClause}`, 
                    whereValues
                );
                
                const exists = rows.length > 0;

                // Nếu mode 'update' mà không tồn tại bản ghi thì bỏ qua
                if (mode === 'update' && !exists) continue;

                if (exists) {
                    const oldRow = Object.keys(item).reduce((obj: any, key) => {
                        if (key in rows[0]) obj[key] = rows[0][key];
                        return obj;
                    }, {});
                    tableOldData.push(oldRow);
                }

                // 2️⃣ Thực thi ghi dữ liệu (INSERT ON DUPLICATE hoặc UPDATE)
                const allKeys = Object.keys(item);
                
                if (mode === 'upsert' || mode === 'sync') {
                    const placeholders = allKeys.map(() => '?').join(', ');
                    const columns = allKeys.join(', ');
                    const updateKeys = allKeys.filter(key => !columKey.includes(key));
                    const updateClause = updateKeys.map(key => `${key} = VALUES(${key})`).join(', ');

                    let query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
                    if (updateKeys.length > 0) {
                        query += ` ON DUPLICATE KEY UPDATE ${updateClause}`;
                    }
                    await connection.execute(query, Object.values(item));
                } else {
                    // Mode 'update' thuần túy
                    const setKeys = allKeys.filter(key => !columKey.includes(key));
                    const setClause = setKeys.map(key => `${key} = ?`).join(', ');
                    const setValues = setKeys.map(key => item[key]);
                    
                    if (setKeys.length > 0) {
                        const updateQuery = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
                        await connection.execute(updateQuery, [...setValues, ...whereValues]);
                    }
                }

                // Lưu lại khóa chính để không bị xóa ở bước sync
                // Giả sử columKey[0] là trường định danh (như 'id' hoặc 'externalUid')
                keptIds.push(item[columKey[0]]);
                tableValidDataIn.push(item);
            }

            // 3️⃣ Xử lý Xóa hàng thừa (Chỉ áp dụng cho mode 'sync')
            if (mode === 'sync' && syncKey) {
                // Lấy giá trị cha từ item đầu tiên (ví dụ bookingId = 'BK001')
                const parentValue = dataIn.length > 0 ? dataIn[0][syncKey] : null;

                if (parentValue) {
                    let deleteQuery = `DELETE FROM ${table} WHERE ${syncKey} = ?`;
                    const deleteParams: any[] = [parentValue];

                    // Nếu có danh sách giữ lại thì thêm điều kiện NOT IN
                    if (keptIds.length > 0) {
                        const inPlaceholders = keptIds.map(() => '?').join(', ');
                        deleteQuery += ` AND ${columKey[0]} NOT IN (${inPlaceholders})`;
                        deleteParams.push(...keptIds);
                    }

                    await connection.execute(deleteQuery, deleteParams);
                }
            }

            resultData.push({
                table,
                dataIn: tableValidDataIn,
                oldData: tableOldData,
                columKey
            });
        }
    });

    return { data: resultData, status, errorCode };
}