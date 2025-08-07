import executeTransaction from '../executeTransaction';

interface UniqueCheckInput {
  tableName: string;
  excludeField?: string;
  fields: Array<{
    [field: string]: string | number | undefined;
  }>;
}

export type RowResult = Record<string, boolean>;

export interface GroupedUniqueCheckResult {
  [tableName: string]: {
    [rowIndex: string]: RowResult;
  };
}


export default async function checkUniqueFieldsObjectsTables(
  checks: UniqueCheckInput[]
): Promise<{
  data: GroupedUniqueCheckResult;
  status: boolean;
  errorCode: string | object;
}> {
   const groupedResult: GroupedUniqueCheckResult = {};
  const { data, status, errorCode } = await executeTransaction(async (connection) => {
   

    for (const check of checks) {
      const { tableName, fields, excludeField } = check;

      if (!groupedResult[tableName]) {
        groupedResult[tableName] = {};
      }

      for (let i = 0; i < fields.length; i++) {
        const fieldValues = fields[i];
        const rowResult: RowResult = {};

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
            params.push(excludeIdValue);
          }

          const [rows] = await connection.execute(query, params);
          const count = Number((rows as any)[0]?.count ?? 0);
          rowResult[field] = count === 0;
        }

        groupedResult[tableName][String(i)] = rowResult;
      }
    }

    // return { data: groupedResult, status: true, errorCode: null };
  });

  return {
    data: groupedResult,
    status,
    errorCode
  };
}
