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
import { insertObjectsTreeTables } from './mySql/ObjectsTreeNomal/insertObjectsTreeTables'
import { insertObjectsTreeTablesUniqueField } from './mySql/ObjectsTreeNomal/insertObjectsTreeTablesUniqueField'
import { updateObjectsTreeTables } from './mySql/ObjectsTreeNomal/updateObjectsTreeTables'
import { deleteObjectsTreeTables } from './mySql/ObjectsTreeNomal/deleteObjectsTreeTables'
import {insertObjectNotIsSystem,insertObjectsNotIsSystem,updateObjectNotIsSystem,updateObjectsNotIsSystem, deleteObjectsNotIsSystem, deleteObjectNotIsSystem } from './mySql/ObjectNotIsSystem/executeObjects'
import deleteObjectsTreeTablesNotIsSystem from './mySql/ObjectsTreeNotIsSystem/deleteObjectsTreeTablesNotIsSystem'
import insertObjectsTreeTablesNotIsSystem from './mySql/ObjectsTreeNotIsSystem/insertObjectsTreeTablesNotIsSystem'
import insertObjectsTreeTablesUniqueFieldNotIsSystem from './mySql/ObjectsTreeNotIsSystem/insertObjectsTreeTablesNotIsSystem'
import updateObjectsTreeTablesNotIsSystem from './mySql/ObjectsTreeNotIsSystem/updateObjectsTreeTablesNotIsSystem'

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
    insertObjectsTreeTables,
    insertObjectsTreeTablesNotIsSystem,
    updateObjectsTreeTables,
    updateObjectsTreeTablesNotIsSystem,
    deleteObjectsTreeTables,
    deleteObjectsTablesNotIsSystem,
    deleteObjectsTreeTablesNotIsSystem,
    insertObjectsTreeTablesUniqueField,
    insertObjectsTreeTablesUniqueFieldNotIsSystem,
    checkExistenceOfFieldsObject,
    checkExistenceOfFieldsObjects,
    checkExistenceOfFieldsObjectsTables,
}