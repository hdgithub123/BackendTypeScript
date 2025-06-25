import executeTransaction from '../executeTransaction';

export async function deleteObjectsTreeTables(
  tablesData: Array<{
    table: string;
    dataIn: Array<string | number>;
    parentField: string;
    childField: string;
  }>
): Promise<{ data: any; status: boolean; errorCode: string | Object }> {
  return await executeTransaction(async (connection) => {
    for (const { table, dataIn, parentField, childField } of tablesData) {
      const idsToDelete = [...dataIn]; // Clone để không ảnh hưởng dữ liệu đầu vào

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
        throw new Error(`Cannot delete non-leaf nodes: [${idsToDelete.join(', ')}]`);
      }
    }

    return { data: null, status: true, errorCode: {} };
  });
}
