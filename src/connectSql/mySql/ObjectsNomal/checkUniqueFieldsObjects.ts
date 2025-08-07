// checkUniqueFieldsObjects.ts
import checkUniqueFieldsObjectsTables from './checkUniqueFieldsObjectsTables';

// Reuse RowResult type (nếu module kia export thì import thay vì redeclare)
export type RowResult = Record<string, boolean>;

export interface GroupedUniqueCheckResult {
  [tableName: string]: {
    [rowIndex: string]: RowResult;
  };
}

export interface MultiFieldsInput {
  tableName: string;
  excludeField?: string; // tên cột dùng để exclude cho tất cả rows (nếu có)
  fields: Array<{
    [field: string]: string | number | undefined;
  }>;
}

/**
 * Kiểm tra nhiều object (mảng fields) cho 1 table.
 * Trả trực tiếp phần `data` của checkUniqueFieldsObjectsTables.
 */
export default async function checkUniqueFieldsObjects(
  input: MultiFieldsInput
): Promise<{
  data: GroupedUniqueCheckResult;
    status: boolean;
    errorCode: string | object;
}> {
  const { tableName, fields, excludeField } = input;

  // build input cho hàm lớn (truyền excludeField xuống)
  const checksForTables = [
    {
      tableName,
      excludeField,
      fields
    }
  ];

  try {
    return  await checkUniqueFieldsObjectsTables(checksForTables);
  } catch (err) {
    return {
      data: {},
      status: false,
      errorCode: err ?? {}
    };
  }
}
