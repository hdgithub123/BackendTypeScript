import executeTransaction from '../executeTransaction';
require('dotenv').config();

export default async function updateObjectsTablesNotIsSystem(
    tablesData: Array<{
        table: string;
        dataIn: Array<{ [key: string]: any }>;
        columKey: string[];
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
    const { data, status, errorCode } = await executeTransaction(async (connection) => {
        for (const { table, dataIn, columKey } of tablesData) {
            const tableOldData: Object[] = [];
            const tableValidDataIn: Object[] = [];

            for (const item of dataIn) {
                // 1️⃣ Tạo WHERE clause từ columKey
                const whereClause = columKey.map(key => `${key} = ?`).join(' AND ');
                const whereValues = columKey.map(key => item[key]);

                // 2️⃣ SELECT bản ghi cũ
                const [rows] = await connection.execute(
                    `SELECT * FROM ${table} WHERE ${whereClause}`,
                    whereValues
                );

                if (rows.length === 0) continue; // ➡️ Bỏ qua nếu không có dữ liệu
                // so sánh rows với item để xác định cho vào tableOldData


                const cleanedRows = rows.map((row: any) => {
                    const newRow: any = {};

                    for (const key in item) {
                        if (key in row) {
                            newRow[key] = row[key];
                        }
                    }

                    return newRow;
                });
                tableOldData.push(...cleanedRows);  // chỉ lấy các trường có trong item
                // tableOldData.push(...(rows as Object[]));//-- nếu muôn lấy tất cả các trường có trong DB

                // 3️⃣ Xác định các field cần cập nhật (loại trừ columKey)
                const setKeys = Object.keys(item).filter(key => !columKey.includes(key));
                if (setKeys.length === 0) continue; // ➡️ Bỏ qua nếu không có gì để cập nhật
                if (setKeys.includes('isSystem')) {
                    throw {
                        data: null,
                        status: false,
                        errorCode: {
                            message: `not alow update 'isSystem' in '${table}'`,
                            table,
                            item
                        }
                    };
                }

                const setClause = setKeys.map(key => `${key} = ?`).join(', ');
                const setValues = setKeys.map(key => item[key]);

                // 4️⃣ Thực hiện UPDATE
                const updateQuery = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
                await connection.execute(updateQuery, [...setValues, ...whereValues]);

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











