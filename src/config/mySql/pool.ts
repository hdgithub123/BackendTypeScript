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

export default pool