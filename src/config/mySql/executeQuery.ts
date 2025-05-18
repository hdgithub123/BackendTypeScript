const mysql = require('mysql2/promise');

// Tạo kết nối với MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'MYDATABASE',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const executeQuery = async (query: string, params: (string | number)[] = []): Promise<{ data: Object | null, status: boolean, errorCode: string | null }> => {
  try {
    const [rows] = await pool.execute(query, params);
    return {
      data: rows,
      status: true,
      errorCode: null
    };
  } catch (error: any) {
    console.error('Lỗi khi thực hiện truy vấn:', error);
    return {
      data: null,
      status: false,
      errorCode: error.code || 'UNKNOWN_ERROR'
    };
  }
};

export default executeQuery