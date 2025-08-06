// import hàm lớn đã có
import checkUniqueFieldsObjectsTables from './checkUniqueFieldsObjectsTables';

// Reuse the RowResult type used by the other function.
// Nếu RowResult được export ở module kia, import thay vì định nghĩa lại.
export type RowResult = { _rowIndex: number } & Record<string, boolean>;

// GroupedUniqueCheckResult giống kiểu trả về từ checkUniqueFieldsObjectsTables
export interface GroupedUniqueCheckResult {
  [tableName: string]: RowResult[];
}

// Input type for single-object checker (updated)
export interface UniqueCheckInputSingle {
  tableName: string;
  excludeField?: string; // tên cột để exclude (nếu có)
  fields: {
    [field: string]: string | number | undefined;
  };
}

/**
 * Reuse checkUniqueFieldsObjectsTables to check a single object.
 * Now returns the same `data` shape as checkUniqueFieldsObjectsTables (i.e. GroupedUniqueCheckResult[]).
 */
export default async function checkUniqueFieldsObject(
  input: UniqueCheckInputSingle
): Promise<{
  data: GroupedUniqueCheckResult[];
  status: boolean;
  errorCode: string | object;
}> {
  // Build the input shape expected by checkUniqueFieldsObjectsTables:
  const checksForTables = [
    {
      tableName: input.tableName,
      excludeField: input.excludeField, // truyền excludeField xuống
      // fields (array) with single element = the object the caller passed
      fields: [input.fields]
    }
  ];
  try {
    return  await checkUniqueFieldsObjectsTables(checksForTables);
  } catch (err) {
    // normalize error shape like other functions
    return {
      data: [],
      status: false,
      errorCode: err ?? {}
    };
  }
}
