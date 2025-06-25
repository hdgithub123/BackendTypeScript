import pool from './pool';

const executeQuery = async (query: string, params: (string | number)[] = []): Promise<{ data: Object | null, status: boolean, errorCode: string | object }> => {
  try {
    const [rows] = await pool.execute(query, params);
    return {
      data: rows,
      status: true,
      errorCode: {}
    };
  } catch (error: any) {
    console.error('Lỗi khi thực hiện truy vấn:', error);
    return {
      data: null,
      status: false,
      errorCode: error || 'UNKNOWN_ERROR'
    };
  }
};

export default executeQuery