// checkExistenceOfFieldsObjects.ts
import checkExistenceOfFieldsObjectsTables from './checkExistenceOfFieldsObjectsTables';

// Reuse RowResult type (nếu module kia export thì import thay vì redeclare)
export type RowResult = Record<string, boolean>;

export interface GroupedExistenceCheckResult {
  [tableName: string]: {
    [rowIndex: string]: RowResult;
  };
}

export interface MultiFieldsInput {
  tableName: string;
  excludeField?: string; // tên cột dùng để exclude cho tất cả rows (nếu có)
  whereField?:{[field: string]: string | number | undefined};
  fields: Array<{
    [field: string]: string | number | undefined;
  }>;
}

/**
 * Kiểm tra nhiều object (mảng fields) cho 1 table.
 * Trả trực tiếp phần `data` của checkExistenceOfFieldsObjectsTables.
 */
export default async function checkExistenceOfFieldsObjects(
  input: MultiFieldsInput
): Promise<{
  data: GroupedExistenceCheckResult;
  status: boolean;
  errorCode: string | object;
}> {
  const { tableName, fields,whereField, excludeField } = input;

  const checksForTables = [
    {
      tableName,
      excludeField,
      whereField,
      fields
    }
  ];

  try {
    return await checkExistenceOfFieldsObjectsTables(checksForTables);
  } catch (err) {
    return {
      data: {},
      status: false,
      errorCode: err ?? {}
    };
  }
}
