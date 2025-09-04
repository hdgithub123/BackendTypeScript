import executeQuery from "./mySql/executeQuery";
import { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from './mySql/ObjectsNomal/executeObject'
import insertObjectsTables from './mySql/ObjectsNomal/insertObjectsTables';
import updateObjectsTables from './mySql/ObjectsNomal/updateObjectsTables';
import deleteObjectsTables from './mySql/ObjectsNomal/deleteObjectsTables';
import checkExistenceOfFieldsObject from './mySql/ObjectsNomal/checkExistenceOfFieldsObject';
import checkExistenceOfFieldsObjects from './mySql/ObjectsNomal/checkExistenceOfFieldsObjects';
import checkExistenceOfFieldsObjectsTables from './mySql/ObjectsNomal/checkExistenceOfFieldsObjectsTables';
import { insertObjectsTreeTables } from './mySql/ObjectsTree/insertObjectsTreeTables'
import { insertObjectsTreeTablesUniqueField } from './mySql/ObjectsTree/insertObjectsTreeTablesUniqueField'
import { updateObjectsTreeTables } from './mySql/ObjectsTree/updateObjectsTreeTables'
import { deleteObjectsTreeTables } from './mySql/ObjectsTree/deleteObjectsTreeTables'
import deleteObjectsTablesNotIsSystem from './mySql/ObjectNotIsSystem/deleteObjectsTablesNotIsSystem'
import {insertObjectNotIsSystem,insertObjectsNotIsSystem,updateObjectNotIsSystem,updateObjectsNotIsSystem, deleteObjectsNotIsSystem, deleteObjectNotIsSystem } from './mySql/ObjectNotIsSystem/executeObjects'
import deleteObjectsTreeTablesNotIsSystem from './mySql/ObjectsTree/deleteObjectsTreeTablesNotIsSystem'
import insertObjectsTreeTablesNotIsSystem from './mySql/ObjectsTree/insertObjectsTreeTablesNotIsSystem'
import insertObjectsTreeTablesUniqueFieldNotIsSystem from './mySql/ObjectsTree/insertObjectsTreeTablesNotIsSystem'
import updateObjectsTreeTablesNotIsSystem from './mySql/ObjectsTree/updateObjectsTreeTablesNotIsSystem'

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
    updateObjectsTables,
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