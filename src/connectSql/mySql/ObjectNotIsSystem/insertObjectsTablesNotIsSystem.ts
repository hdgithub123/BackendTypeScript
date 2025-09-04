import executeTransaction from '../executeTransaction';
require('dotenv').config();

export default async function insertObjectsTablesNotIsSystem(
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

      // 🔍 Kiểm tra xem bảng có cột isSystem không
      const [columnsResult] = await connection.execute(
        `SHOW COLUMNS FROM ${table} LIKE 'isSystem'`
      );
      const hasIsSystem = Array.isArray(columnsResult) && columnsResult.length > 0;

      // ✅ Nếu có thì thêm isSystem: false
      const sanitizedDataIn = dataIn.map(item =>
        hasIsSystem ? { ...item, isSystem: false } : item
      );

      const keys = Object.keys(sanitizedDataIn[0]);
      const columns = keys.join(',');
      const placeholders = sanitizedDataIn.map(() => `(${keys.map(() => '?').join(',')})`).join(',');
      const values = sanitizedDataIn.flatMap(item => keys.map(key => item[key]));

      const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES ${placeholders}`;
      await connection.execute(sqlQuery, values);

      resultData.push({ table, dataIn: sanitizedDataIn, oldData: null });
    }

    return {
      data: resultData,
      status: true,
      errorCode: null
    };
  });

  return { data, status, errorCode };
}
