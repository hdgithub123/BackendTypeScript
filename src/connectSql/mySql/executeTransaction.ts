import pool from './pool'; // import pool đã tạo bằng mysql2/promise

async function executeTransaction(
    callback: (connection: any) => Promise<any>
): Promise<{ data: any, status: boolean, errorCode: object | string }> {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const data = await callback(connection);
        await connection.commit();
        return { data, status: true, errorCode: {} };
    } catch (error: any) {
        await connection.rollback();
        const newError = { ...error };
        delete newError.sql;
        return { data: null, status: false, errorCode: newError || 'UNKNOWN_ERROR' };
    } finally {
        connection.release();
    }
}

export default executeTransaction