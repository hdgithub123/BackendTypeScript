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
    const newError = { ...error };
    delete newError.sql;
    return {
      data: null,
      status: false,
      errorCode: newError || 'UNKNOWN_ERROR'
    };
  }
};

export default executeQuery