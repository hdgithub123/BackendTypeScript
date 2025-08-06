import executeTransaction from '../executeTransaction';

interface UniqueCheckInput {
  tableName: string;
  // tên cột dùng để exclude (áp dụng cho tất cả rows). Nếu undefined -> không exclude.
  excludeField?: string;
  fields: Array<{
    [field: string]: string | number | undefined;
  }>;
}

export type RowResult = { _rowIndex: number } & Record<string, boolean>;

export interface GroupedUniqueCheckResult {
  [tableName: string]: RowResult[];
}

export default async function checkUniqueFieldsObjectsTables(
  checks: UniqueCheckInput[]
): Promise<{
  data: GroupedUniqueCheckResult[];
  status: boolean;
  errorCode: string | object;
}> {

  let finalResult : GroupedUniqueCheckResult[]= []

  const { data, status, errorCode } = await executeTransaction(async (connection) => {
    const groupedResult: Record<string, RowResult[]> = {};

    for (const check of checks) {
      const { tableName, fields, excludeField } = check;

      for (let i = 0; i < fields.length; i++) {
        const fieldValues = fields[i];
        const _rowIndex = i;

        const rowResult = { _rowIndex } as RowResult;

        // Lấy giá trị excludeId từ row hiện tại (nếu excludeField được chỉ định)
        const excludeIdValue =
          excludeField !== undefined ? (fieldValues as any)[excludeField] : undefined;

        for (const [field, value] of Object.entries(fieldValues)) {
          if (value === undefined || value === null) {
            rowResult[field] = true;
            continue;
          }

          let query = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${field} = ?`;
          const params: (string | number)[] = [value];

          if (
            excludeField &&
            excludeIdValue !== undefined &&
            excludeIdValue !== null &&
            field !== excludeField
          ) {
            query += ` AND ${excludeField} != ?`;
            params.push(excludeIdValue as string | number);
          }

          const [rows] = await connection.execute(query, params);
          const count = Number((rows as any)[0]?.count ?? 0);

          rowResult[field] = count === 0;
        }

        if (!groupedResult[tableName]) {
          groupedResult[tableName] = [];
        }

        groupedResult[tableName].push(rowResult);
      }
    }

     finalResult = Object.entries(groupedResult).map(
      ([tableName, rows]) => ({ [tableName]: rows })
    );

    console.log("finalResult",finalResult)

  });
      return {
      data: finalResult,
      status,
      errorCode
    };
}
