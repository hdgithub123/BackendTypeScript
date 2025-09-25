import executeQuery from "./mySql/executeQuery";
import { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from './mySql/ObjectsNomal/executeObject'
import insertObjectsTables from './mySql/ObjectsNomal/insertObjectsTables';
import insertObjectsTablesNotIsSystem from './mySql/ObjectNotIsSystem/insertObjectsTablesNotIsSystem';
import updateObjectsTables from './mySql/ObjectsNomal/updateObjectsTables';
import updateObjectsTablesNotIsSystem from "./mySql/ObjectNotIsSystem/updateObjectsTablesNotIsSystem";
import deleteObjectsTables from './mySql/ObjectsNomal/deleteObjectsTables';
import deleteObjectsTablesNotIsSystem from './mySql/ObjectNotIsSystem/deleteObjectsTablesNotIsSystem'
import checkExistenceOfFieldsObject from './mySql/ObjectsNomal/checkExistenceOfFieldsObject';
import checkExistenceOfFieldsObjects from './mySql/ObjectsNomal/checkExistenceOfFieldsObjects';
import checkExistenceOfFieldsObjectsTables from './mySql/ObjectsNomal/checkExistenceOfFieldsObjectsTables';

import insertObjectsTreeLeafTables from './mySql/ObjectsTreeLeafNomal/insertObjectsTreeLeafTables'
import insertObjectsTreeLeafTablesUniqueField from './mySql/ObjectsTreeLeafNomal/insertObjectsTreeLeafTablesUniqueField'
import updateObjectsTreeLeafTables from './mySql/ObjectsTreeLeafNomal/updateObjectsTreeLeafTables'
import deleteObjectsTreeLeafTables from './mySql/ObjectsTreeLeafNomal/deleteObjectsTreeLeafTables'

import insertObjectsTreeTrunkTables from './mySql/ObjectsTreeTrunkNomal/insertObjectsTreeTrunkTables'
import insertObjectsTreeTrunkTablesUniqueField from './mySql/ObjectsTreeTrunkNomal/insertObjectsTreeTrunkTablesUniqueField'
import updateObjectsTreeTrunkTables from './mySql/ObjectsTreeTrunkNomal/updateObjectsTreeTrunkTables'
import deleteObjectsTreeTrunkTables from './mySql/ObjectsTreeTrunkNomal/deleteObjectsTreeTrunkTables'
import updateObjectsTreeTrunkTablesUniqueField from './mySql/ObjectsTreeTrunkNomal/updateObjectsTreeTrunkTablesUniqueField'


import { insertObjectNotIsSystem, insertObjectsNotIsSystem, updateObjectNotIsSystem, updateObjectsNotIsSystem, deleteObjectsNotIsSystem, deleteObjectNotIsSystem } from './mySql/ObjectNotIsSystem/executeObjects'
import deleteObjectsTreeLeafTablesNotIsSystem from './mySql/ObjectsTreeLeafNotIsSystem/deleteObjectsTreeLeafTablesNotIsSystem'
import insertObjectsTreeLeafTablesNotIsSystem from './mySql/ObjectsTreeLeafNotIsSystem/insertObjectsTreeLeafTablesNotIsSystem'
import insertObjectsTreeLeafTablesUniqueFieldNotIsSystem from './mySql/ObjectsTreeLeafNotIsSystem/insertObjectsTreeLeafTablesNotIsSystem'
import updateObjectsTreeLeafTablesNotIsSystem from './mySql/ObjectsTreeLeafNotIsSystem/updateObjectsTreeLeafTablesNotIsSystem'

import deleteObjectsTreeTrunkTablesNotIsSystem from './mySql/ObjectsTreeTrunkNotIsSystem/deleteObjectsTreeTrunkTablesNotIsSystem'
import insertObjectsTreeTrunkTablesNotIsSystem from './mySql/ObjectsTreeTrunkNotIsSystem/insertObjectsTreeTrunkTablesNotIsSystem'
import insertObjectsTreeTrunkTablesUniqueFieldNotIsSystem from './mySql/ObjectsTreeTrunkNotIsSystem/insertObjectsTreeTrunkTablesNotIsSystem'
import updateObjectsTreeTrunkTablesNotIsSystem from './mySql/ObjectsTreeTrunkNotIsSystem/updateObjectsTreeTrunkTablesNotIsSystem'
import updateObjectsTreeTrunkTablesUniqueFieldNotIsSystem from './mySql/ObjectsTreeTrunkNotIsSystem/updateObjectsTreeTrunkTablesUniqueFieldNotIsSystem'

export default executeQuery

export {
    insertObject,
    insertObjectNotIsSystem,
    insertObjects,
    insertObjectsNotIsSystem,
    updateObject,
    updateObjectNotIsSystem,
    updateObjects,
    updateObjectsNotIsSystem,
    deleteObject,
    deleteObjectNotIsSystem,
    deleteObjects,
    deleteObjectsNotIsSystem,
    insertObjectsTables,
    insertObjectsTablesNotIsSystem,
    updateObjectsTables,
    updateObjectsTablesNotIsSystem,
    deleteObjectsTables,
    insertObjectsTreeLeafTables,
    insertObjectsTreeLeafTablesNotIsSystem,
    updateObjectsTreeLeafTables,
    updateObjectsTreeLeafTablesNotIsSystem,
    deleteObjectsTreeLeafTables,
    deleteObjectsTablesNotIsSystem,
    deleteObjectsTreeLeafTablesNotIsSystem,
    insertObjectsTreeLeafTablesUniqueField,
    insertObjectsTreeLeafTablesUniqueFieldNotIsSystem,

    insertObjectsTreeTrunkTables,
    insertObjectsTreeTrunkTablesUniqueField,
    updateObjectsTreeTrunkTables,
    deleteObjectsTreeTrunkTables,
    updateObjectsTreeTrunkTablesUniqueField,

    insertObjectsTreeTrunkTablesNotIsSystem,
    insertObjectsTreeTrunkTablesUniqueFieldNotIsSystem,
    deleteObjectsTreeTrunkTablesNotIsSystem,
    updateObjectsTreeTrunkTablesNotIsSystem,
    updateObjectsTreeTrunkTablesUniqueFieldNotIsSystem,

    checkExistenceOfFieldsObject,
    checkExistenceOfFieldsObjects,
    checkExistenceOfFieldsObjectsTables,
}