import executeTransaction from '../executeTransaction';

interface ExistenceCheckInput {
  tableName: string;
  excludeField?: string;
  whereField?:{[field: string]: string | number | undefined};
  fields: Array<{
    [field: string]: string | number | undefined;
  }>;
}

export type RowResult = Record<string, boolean>;

export interface GroupedExistenceCheckResult {
  [tableName: string]: {
    [rowIndex: string]: RowResult;
  };
}

/**
 * Kiểm tra sự tồn tại của từng giá trị trong danh sách fields.
 * Trả về true nếu giá trị TỒN TẠI trong DB (đã được sử dụng), false nếu KHÔNG tồn tại.
 */

export default async function checkExistenceOfFieldsObjectsTables(
  checks: ExistenceCheckInput[]
): Promise<{
  data: GroupedExistenceCheckResult;
  status: boolean;
  errorCode: string | object;
}> {
  const groupedResult: GroupedExistenceCheckResult = {};

  const { data: _ignored, status, errorCode } = await executeTransaction(async (connection) => {
    for (const check of checks) {
      const { tableName, fields, excludeField, whereField } = check;

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
            rowResult[field] = false;
            continue;
          }

          let query = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${field} = ?`;
          const params: (string | number)[] = [value];

          // Thêm điều kiện whereField nếu có
          if (whereField) {
            for (const [whereKey, whereValue] of Object.entries(whereField)) {
              if (whereValue !== undefined && whereValue !== null) {
                query += ` AND ${whereKey} = ?`;
                params.push(whereValue);
              }
            }
          }

          // Thêm điều kiện excludeField nếu hợp lệ
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

          rowResult[field] = count > 0;
        }

        groupedResult[tableName][String(i)] = rowResult;
      }
    }
  });

  return {
    data: groupedResult,
    status,
    errorCode
  };
}
