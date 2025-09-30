import executeTransaction from '../executeTransaction';

export default async function deleteObjectsTreeTablesNotIsSystem(
  tablesData: Array<{
    table: string;
    dataIn: Array<string | number>;
    parentField: string;
    childField: string;
  }>
): Promise<{
  data: Array<{
    table: string;
    dataIn: Object[];
    oldData: Object[];
  }>;
  status: boolean;
  errorCode: string | Object;
}> {

  const resultData: Array<{
    table: string;
    dataIn: Object[];
    oldData: Object[];
  }> = [];

  const { data, status, errorCode } = await executeTransaction(async (connection) => {
    for (const { table, dataIn, parentField, childField } of tablesData) {
      const idsToDelete = [...dataIn]; // Clone để không ảnh hưởng dữ liệu đầu vào

      // 🔍 Kiểm tra xem bảng có cột isSystem không
      const [columns] = await connection.execute(`SHOW COLUMNS FROM ${table}`);
      const hasIsSystemColumn = (columns as any[]).some(col => col.Field === 'isSystem');

      if (hasIsSystemColumn) {
        const [systemRows] = await connection.execute(
          `SELECT ${childField} FROM ${table} WHERE ${childField} IN (${idsToDelete.map(() => '?').join(',')}) AND isSystem = 1`,
          idsToDelete
        );

        if ((systemRows as any[]).length > 0) {
          throw {
            data: [],
            status: false,
            errorCode: { messenger: "Cannot delete system records" }
          };
        }
      }

      let changed = true;
      while (changed && idsToDelete.length > 0) {
        changed = false;

        for (let i = idsToDelete.length - 1; i >= 0; i--) {
          const id = idsToDelete[i];

          // Kiểm tra xem có bản ghi nào khác tham chiếu đến id này không (tức là nó có con)
          const [children] = await connection.execute(
            `SELECT ${childField} FROM ${table} WHERE ${parentField} = ? LIMIT 1`,
            [id]
          );

          const isLeaf = (children as any[]).length === 0;
          if (isLeaf) {
            // Xóa nếu là mức lá
            await connection.execute(
              `DELETE FROM ${table} WHERE ${childField} = ?`,
              [id]
            );

            // Xóa khỏi mảng
            idsToDelete.splice(i, 1);
            changed = true;
          }
        }
      }

      if (idsToDelete.length > 0) {
        throw { message: "Cannot delete parent records" };
      }
    }


  });

  tablesData.forEach(({ table, dataIn, parentField, childField }) => {
    // tạo 1 object key là childField và value là dataIn và đưa vào resultData dataIn
    // để phù hợp với định dạng trả về

    const dataInObj = dataIn.map(id => ({ [childField]: id }));
    resultData.push({
      table,
      dataIn: dataInObj,
      oldData: [],
    });
  });

  return { data: resultData, status, errorCode };
}
