import insertObjectsTablesNotIsSystem from './insertObjectsTablesNotIsSystem';
import updateObjectsTablesNotIsSystem from './updateObjectsTablesNotIsSystem';
import deleteObjectsTablesNotIsSystem from './deleteObjectsTablesNotIsSystem';
export async function insertObjectNotIsSystem(
  table: string,
  object: { [key: string]: any }
): Promise<{
  data:Array< { table: string; dataIn: Object; oldData: Object | null }>;
  status: boolean;
  errorCode: string | Object;
}> {
  return await insertObjectsTablesNotIsSystem([
    { table, dataIn: [object] }
  ]);
}

export async function insertObjectsNotIsSystem(
  table: string,
  dataIn: Array<{ [key: string]: any }>
): Promise<{
  data:Array< { table: string; dataIn: Object[]; oldData: null }>;
  status: boolean;
  errorCode: string | Object;
}> {
  return await insertObjectsTablesNotIsSystem([
    { table, dataIn }
  ]);
}


export async function updateObjectNotIsSystem(
  table: string,
  object: { [key: string]: any },
  columKey: { [key: string]: any }
): Promise<{
  data:Array< {
    table: string;
    dataIn: Object[];
    oldData: Object[];
    columKey: string[];
  }>;
  status: boolean;
  errorCode: string | Object;
}> {
  const columKeyFields = Object.keys(columKey);
  const fullRecord = { ...object, ...columKey };

  const updatePayload = {
    table,
    dataIn: [fullRecord],
    columKey: columKeyFields
  };

  return await updateObjectsTablesNotIsSystem([updatePayload]);
}

export async function updateObjectsNotIsSystem(
  table: string,
  dataIn: Array<{ [key: string]: any }>,
  columKey: Array<string>
): Promise<{
  data:Array< {
    table: string;
    dataIn: Object[];
    oldData: Object[];
    columKey: string[];
  }> | null;
  status: boolean;
  errorCode: string | Object;
}> {
  return await updateObjectsTablesNotIsSystem([
    {
      table,
      dataIn,
      columKey
    }
  ]);
}

export async function deleteObjectNotIsSystem(
  table: string,
  columKey: { [key: string]: any }
): Promise<{
  data: Array<{
    table: string;
    columKey: Array<{ [key: string]: any }>;
    oldData: Object[];
  }> | null;
  status: boolean;
  errorCode: string | Object;
}> {
  return await deleteObjectsTablesNotIsSystem([
    {
      table,
      columKey: [columKey]
    }
  ]);
}


export async function deleteObjectsNotIsSystem(
  table: string,
  columKey: Array<{ [key: string]: any }>
): Promise<{
  data: Array<{
    table: string;
    columKey: Array<{ [key: string]: any }>;
    oldData: Object[];
  }> | null;
  status: boolean;
  errorCode: string | Object;
}> {
  return await deleteObjectsTablesNotIsSystem([
    {
      table,
      columKey
    }
  ]);
}
