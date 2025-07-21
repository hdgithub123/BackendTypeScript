import insertObjectsTables from './insertObjectsTables';
import updateObjectsTables from './updateObjectsTables';
import deleteObjectsTables from './deleteObjectsTables';
export async function insertObject(
  table: string,
  object: { [key: string]: any }
): Promise<{
  data:Array< { table: string; dataIn: Object; oldData: Object | null }>;
  status: boolean;
  errorCode: string | Object;
}> {
  return await insertObjectsTables([
    { table, dataIn: [object] }
  ]);
}

export async function insertObjects(
  table: string,
  dataIn: Array<{ [key: string]: any }>
): Promise<{
  data:Array< { table: string; dataIn: Object[]; oldData: null }>;
  status: boolean;
  errorCode: string | Object;
}> {
  return await insertObjectsTables([
    { table, dataIn }
  ]);
}


export async function updateObject(
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

  return await updateObjectsTables([updatePayload]);
}

export async function updateObjects(
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
  return await updateObjectsTables([
    {
      table,
      dataIn,
      columKey
    }
  ]);
}

export async function deleteObject(
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
  return await deleteObjectsTables([
    {
      table,
      columKey: [columKey]
    }
  ]);
}


export async function deleteObjects(
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
  return await deleteObjectsTables([
    {
      table,
      columKey
    }
  ]);
}
