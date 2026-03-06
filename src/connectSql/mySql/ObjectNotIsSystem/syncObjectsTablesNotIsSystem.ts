import executeTransaction from '../executeTransaction';
require('dotenv').config();


// Hàm đồng bộ dữ liệu giữa bảng chính và bảng chi tiết, với bảo vệ dữ liệu hệ thống (isSystem)
// với mode = 'update': chỉ cập nhật những bản ghi đã tồn tại, không tạo mới và không xóa
// với mode = 'upsert': cập nhật nếu tồn tại, tạo mới nếu không tồn tại, không xóa
// với mode = 'sync': cập nhật nếu tồn tại, tạo mới nếu không tồn tại, xóa những bản ghi thừa (không có trong dataIn) nhưng chỉ khi isSystem = false
// với mode phải thêm as const để giữ nguyên kiểu literal và tránh lỗi khi so sánh chuỗi
// syncKey: trường khóa ngoại dùng để xác định nhóm bản ghi cần đồng bộ (dùng cho mode 'sync') ví dụ: bookingId trong bảng chi tiết liên kết với id trong bảng chính

export default async function syncObjectsTablesNotIsSystem(
    tablesData: Array<{
        table: string;
        dataIn: Array<{ [key: string]: any }>;
        columKey: string[];
        mode: 'update' | 'upsert' | 'sync';
        syncKey?: string;
    }>
): Promise<{
    data: Array<{
        table: string;
        dataIn: Object[];
        oldData: Object[];
        columKey: string[];
    }>;
    status: boolean;
    errorCode: string | Object;
}> {
    const resultData: Array<{
        table: string;
        dataIn: Object[];
        oldData: Object[];
        columKey: string[];
    }> = [];

    const { status, errorCode } = await executeTransaction(async (connection) => {
        for (const { table, dataIn, columKey, mode, syncKey } of tablesData) {
            const tableOldData: Object[] = [];
            const tableValidDataIn: Object[] = [];
            const keptIds: any[] = [];

            for (const item of dataIn) {
                // 1️⃣ Lấy dữ liệu cũ để so sánh và kiểm tra isSystem
                const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
                const whereValues = columKey.map(key => item[key]);
                const [rows]: any = await connection.execute(
                    `SELECT * FROM ${table} WHERE ${whereClause}`, 
                    whereValues
                );
                
                const exists = rows.length > 0;

                if (exists) {
                    // 🛡️ BẢO VỆ: Nếu bản ghi là hệ thống, không cho phép sửa
                    if (rows[0].isSystem === 1 || rows[0].isSystem === true) {
                        throw { failData: { isSystem: `Bản ghi thuộc hệ thống trong bảng '${table}' không thể thay đổi.` } };
                    }

                    // Lưu oldData: Chỉ lấy các trường có trong item gửi lên để đối soát
                    const oldRow = Object.keys(item).reduce((obj: any, key) => {
                        if (key in rows[0]) obj[key] = rows[0][key];
                        return obj;
                    }, {});
                    tableOldData.push(oldRow);
                }

                // Nếu mode 'update' mà không tồn tại bản ghi thì bỏ qua dòng này
                if (mode === 'update' && !exists) continue;

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
                        await connection.execute(
                            `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`, 
                            [...setValues, ...whereValues]
                        );
                    }
                }

                // Lưu lại định danh để không bị xóa ở bước sync
                keptIds.push(item[columKey[0]]);
                tableValidDataIn.push(item);
            }

            // 3️⃣ Xử lý Xóa hàng thừa (Chỉ áp dụng cho mode 'sync')
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

            // Push kết quả của bảng hiện tại vào mảng tổng
            resultData.push({
                table,
                dataIn: tableValidDataIn,
                oldData: tableOldData,
                columKey
            });
        }
    });

    return { 
        data: resultData, 
        status: status || false, 
        errorCode: errorCode || '' 
    };
}