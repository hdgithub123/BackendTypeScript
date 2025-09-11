const mysql = require('mysql2/promise');
import dotenv from 'dotenv';
dotenv.config();


// Tạo kết nối với MySQL
const pool = mysql.createPool({
  host: process.env.DB_SERVER || 'localhost',
  user: process.env.DB_USER || 'root',
  port: process.env.DB_PORT || '3306',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'MYDATABASE',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'local', 
  dateStrings: true,  
});

export default pool