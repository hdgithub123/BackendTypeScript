import executeTransaction from '../executeTransaction';
import getAutoGeneratedColumns from '../utilities/getAutoGeneratedColumns';
import checkIfValueIsReferencedElsewhere from '../utilities/checkIfValueIsReferencedElsewhere';


// export async function updateObjectsTreeTables(
//   tablesData: Array<{
//     table: string;
//     dataIn: Array<{ [key: string]: any }>;
//     parentField: string;
//     childField: string;
//   }>,
// ): Promise<{ data: any; status: boolean; errorCode: string | Object }> {
//   return await executeTransaction(async (connection) => {
//     for (const { table, dataIn, parentField, childField } of tablesData) {
//       const {autoGeneratedFields} = await getAutoGeneratedColumns(connection, table);

//       for (const dataUpdate of dataIn) {
//         const currentId = dataUpdate[childField];
//         const parentIdNew = dataUpdate[parentField];

//         // Lấy bản ghi hiện tại trong DB
//         const [currentRows] = await connection.execute(
//           `SELECT * FROM ${table} WHERE ${childField} = ?`,
//           [currentId]
//         );
//         if (currentRows.length === 0) throw new Error(`Record with ID ${currentId} not found`);
//         const currentRecord = currentRows[0];
//         const parentIdOld = currentRecord[parentField];

//         // Nếu parentId bị thay đổi → kiểm tra khóa ngoại
//         if (parentIdOld !== parentIdNew) {
//           const isReferenced = await checkIfValueIsReferencedElsewhere({
//             connection,
//             referencedTable: table,
//             referencedColumn: childField,
//             value: parentIdNew,
//             // currentId
//           });


//           if (isReferenced) {
//             //throw new Error('have a data cannot update data for parentField');
//             return { data: null, status: false, errorCode: 'FOREIGN_KEY_VIOLATION' };
//           }
//         }

//         // Tiến hành cập nhật bản ghi
//         const updatePayload = Object.fromEntries(
//           Object.entries(dataUpdate).filter(([key]) => !autoGeneratedFields.includes(key))
//         );

//         const updateKeys = Object.keys(updatePayload);
//         const sql = `UPDATE ${table} SET ${updateKeys.map(k => `${k} = ?`).join(', ')} WHERE ${childField} = ?`;

//         await connection.execute(
//           sql,
//           [...updateKeys.map(k => updatePayload[k]), currentId]
//         );
//       }
//     }

//     return { message: 'Update tree data completed' };
//   });
// }


export async function updateObjectsTreeTables(
  tablesData: Array<{
    table: string;
    dataIn: Array<{ [key: string]: any }>;
    parentField: string;
    childField: string;
  }>,
): Promise<{
  data: Array<{
    table: string;
    dataIn: Object[];
    oldData: Object[];
    parentField: string;
    childField: string;
  }>;
  status: boolean;
  errorCode: string | Object;
}> {
  const resultData: Array<{
    table: string;
    dataIn: Object[];
    oldData: Object[];
    parentField: string;
    childField: string;
  }> = [];
  const validDataIn: Object[] = [];
  const collectedOldData: Object[] = [];

  const { data, status, errorCode } = await executeTransaction(async (connection) => {
    for (const { table, dataIn, parentField, childField } of tablesData) {
      const { autoGeneratedFields } = await getAutoGeneratedColumns(connection, table);

      for (const dataUpdate of dataIn) {
        const currentId = dataUpdate[childField];
        const parentIdNew = dataUpdate[parentField];

        // Lấy bản ghi hiện tại trong DB
        const [currentRows] = await connection.execute(
          `SELECT * FROM ${table} WHERE ${childField} = ?`,
          [currentId]
        );
        if (currentRows.length === 0) throw new Error(`Record with ID ${currentId} not found`);
        const currentRecord = currentRows[0];
        const parentIdOld = currentRecord[parentField];

        // Nếu parentId bị thay đổi → kiểm tra khóa ngoại
        if (parentIdOld !== parentIdNew) {
          const isReferenced = await checkIfValueIsReferencedElsewhere({
            connection,
            referencedTable: table,
            referencedColumn: childField,
            value: parentIdNew,
            // currentId
          });


          if (isReferenced) {
            //throw new Error('have a data cannot update data for parentField');
            return { data: null, status: false, errorCode: 'FOREIGN_KEY_VIOLATION' };
          }
        }

        // Tiến hành cập nhật bản ghi
        const updatePayload = Object.fromEntries(
          Object.entries(dataUpdate).filter(([key]) => !autoGeneratedFields.includes(key))
        );

        const updateKeys = Object.keys(updatePayload);
        const sql = `UPDATE ${table} SET ${updateKeys.map(k => `${k} = ?`).join(', ')} WHERE ${childField} = ?`;

        await connection.execute(
          sql,
          [...updateKeys.map(k => updatePayload[k]), currentId]
        );

        validDataIn.push(dataUpdate);
  
        const cleanedRows = currentRows.map((row: any) => {
          const newRow: any = {};

          for (const key in dataUpdate) {
            if (key in row) {
              newRow[key] = row[key];
            }
          }
          return newRow;
        });

        collectedOldData.push(...cleanedRows);

        resultData.push({
          table,
          dataIn: validDataIn,
          oldData: collectedOldData,
          parentField,
          childField
        });
      }
    }
  });

  return {
    data: resultData,
    status,
    errorCode
  };
}
