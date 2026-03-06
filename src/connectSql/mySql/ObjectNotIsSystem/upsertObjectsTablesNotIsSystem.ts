import executeTransaction from '../executeTransaction';
require('dotenv').config();
// cập nhật cho nhiều bảng, nếu không có thì insert, có thì update, nhưng không được update trường isSystem
export default async function upsertObjectsTablesNotIsSystem(
    tablesData: Array<{
        table: string;
        dataIn: Array<{ [key: string]: any }>;
        columKey: string[];
    }>
): Promise<{
    data: any[];
    status: boolean;
    errorCode: string | Object;
}> {
    const resultData: any[] = [];

    const { status, errorCode } = await executeTransaction(async (connection) => {
        for (const { table, dataIn, columKey } of tablesData) {
            const tableOldData: Object[] = [];
            const tableValidDataIn: Object[] = [];

            for (const item of dataIn) {
                // 1️⃣ Kiểm tra bảo mật: không cho phép update 'isSystem'
                if ('isSystem' in item) {
                    throw { failData: { isSystem: `Not allowed to update 'isSystem' in '${table}'` } };
                }

                // 2️⃣ Lấy dữ liệu cũ (Chỉ khi bạn thực sự cần trả về oldData)
                const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
                const whereValues = columKey.map(key => item[key]);
                const [rows]: any = await connection.execute(`SELECT * FROM ${table} WHERE ${whereClause}`, whereValues);
                
                if (rows.length > 0) {
                    // Map lại dữ liệu cũ chỉ lấy các field có trong dataIn
                    const oldRow = Object.keys(item).reduce((obj: any, key) => {
                        if (key in rows[0]) obj[key] = rows[0][key];
                        return obj;
                    }, {});
                    tableOldData.push(oldRow);
                }

                // 3️⃣ Xây dựng câu lệnh UPSERT
                const allKeys = Object.keys(item);
                const placeholders = allKeys.map(() => '?').join(', ');
                const columns = allKeys.join(', ');

                // Các field cần update nếu trùng key (loại trừ columKey)
                const updateKeys = allKeys.filter(key => !columKey.includes(key));
                const updateClause = updateKeys.map(key => `${key} = VALUES(${key})`).join(', ');

                let query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
                if (updateKeys.length > 0) {
                    query += ` ON DUPLICATE KEY UPDATE ${updateClause}`;
                }

                // 4️⃣ Thực thi
                await connection.execute(query, Object.values(item));
                
                tableValidDataIn.push(item);
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