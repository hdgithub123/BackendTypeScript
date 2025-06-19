//lấy dbName từ biến môi trường
import dotenv from 'dotenv';
dotenv.config();

// Kiểm tra xem một giá trị có đang bị tham chiếu bởi foreign key ở bảng khác không

async function checkIfValueIsReferencedElsewhere({
  connection,
  dbName = process.env.DB_DATABASE || 'MYDATABASE',
  referencedTable,
  referencedColumn,
  value,
}: {
  connection: any;
  dbName?: string;
  referencedTable: string;
  referencedColumn: string;
  value: any;
}): Promise<boolean> {
  const [fkRefs] = await connection.execute(
    `
    SELECT TABLE_NAME, COLUMN_NAME 
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE REFERENCED_TABLE_NAME = ? AND REFERENCED_COLUMN_NAME = ? AND TABLE_SCHEMA = ?
    `,
    [referencedTable, referencedColumn, dbName]
  );

  for (const ref of fkRefs as any[]) {
    const table = ref.TABLE_NAME;
    const column = ref.COLUMN_NAME;

    // Bỏ qua nếu là cùng bảng
    if (table === referencedTable) continue;

    const [rows] = await connection.execute(
      `SELECT COUNT(*) as count FROM ${table} WHERE ${column} = ? LIMIT 1`,
      [value]
    );

    if (rows[0]?.count > 0) return true;
  }

  return false;
}

export default checkIfValueIsReferencedElsewhere;