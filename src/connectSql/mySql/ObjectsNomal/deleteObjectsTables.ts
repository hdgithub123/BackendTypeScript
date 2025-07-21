import executeTransaction from '../executeTransaction';
require('dotenv').config();


export default async function deleteObjectsTables(
    tablesData: Array<{
        table: string;
        columKey: Array<{ [key: string]: any }>;
    }>
): Promise<{
    data: Array<{
        table: string;
        dataIn: Object[];
        columKey: Array<{ [key: string]: any }>;
        oldData: Object[];
    }>;
    status: boolean;
    errorCode: string | Object;
}> {

    const resultData: Array<{
        table: string;
        dataIn: Object[];
        columKey: Array<{ [key: string]: any }>;
        oldData: Object[];
    }> = [];


    const { data, status, errorCode } = await executeTransaction(async (connection) => {


        for (const { table, columKey } of tablesData) {
            const validColumKey: Array<{ [key: string]: any }> = [];
            const deletedOldData: Object[] = [];

            for (const conditionObj of columKey) {
                const keys = Object.keys(conditionObj);
                const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
                const values = keys.map(key => conditionObj[key]);

                // Lấy bản ghi cũ trước khi xóa
                const [rows] = await connection.execute(
                    `SELECT * FROM ${table} WHERE ${whereClause}`,
                    values
                );

                if (!rows || rows.length === 0) continue; // ➡️ Không có bản ghi, bỏ qua

                deletedOldData.push(...(rows as Object[]));

                // Thực hiện xóa nếu có
                await connection.execute(
                    `DELETE FROM ${table} WHERE ${whereClause}`,
                    values
                );

                validColumKey.push(conditionObj); // Đưa điều kiện thành công vào kết quả
            }

            // Chỉ push nếu có ít nhất một bản ghi đã xoá
            if (validColumKey.length > 0) {
                resultData.push({
                    table,
                    dataIn: validColumKey,
                    columKey: validColumKey,
                    oldData: deletedOldData
                });
            }
        }


    });

    return { data: resultData, status, errorCode };
}
