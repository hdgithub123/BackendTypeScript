// import hàm lớn đã có
import checkExistenceOfFieldsObjectsTables from './checkExistenceOfFieldsObjectsTables';

// Reuse the RowResult type used by the other function.
export type RowResult = Record<string, boolean>;

export interface GroupedExistenceCheckResult {
  [tableName: string]: {
    [rowIndex: string]: RowResult;
  };
}

// Input type for single-object checker
export interface ExistenceCheckInputSingle {
  tableName: string;
  excludeField?: string;
  fields: {
    [field: string]: string | number | undefined;
  };
}

/**
 * Reuse checkExistenceOfFieldsObjectsTables to check a single object.
 * Now returns the same `data` shape as checkExistenceOfFieldsObjectsTables (i.e. GroupedExistenceCheckResult).
 */
export default async function checkExistenceOfFieldsObject(
  input: ExistenceCheckInputSingle
): Promise<{
  data: GroupedExistenceCheckResult;
  status: boolean;
  errorCode: string | object;
}> {
  const checksForTables = [
    {
      tableName: input.tableName,
      excludeField: input.excludeField,
      fields: [input.fields],
    }
  ];

  try {
    return await checkExistenceOfFieldsObjectsTables(checksForTables);
  } catch (err) {
    return {
      data: {},
      status: false,
      errorCode: err ?? {},
    };
  }
}
