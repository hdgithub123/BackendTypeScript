import executeQuery from "./mySql/executeQuery";
import { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from './mySql/ObjectsNomal/executeObject'
import insertObjectsTables from './mySql/ObjectsNomal/insertObjectsTables';
import updateObjectsTables from './mySql/ObjectsNomal/updateObjectsTables';
import deleteObjectsTables from './mySql/ObjectsNomal/deleteObjectsTables';
import checkExistenceOfFieldsObject from './mySql/ObjectsNomal/checkExistenceOfFieldsObject';
import checkExistenceOfFieldsObjects from './mySql/ObjectsNomal/checkExistenceOfFieldsObjects';
import checkExistenceOfFieldsObjectsTables from './mySql/ObjectsNomal/checkExistenceOfFieldsObjectsTables';
import {insertObjectsTreeTables} from './mySql/ObjectsTree/insertObjectsTreeTables'
import {insertObjectsTreeTablesUniqueField} from './mySql/ObjectsTree/insertObjectsTreeTablesUniqueField'
import {updateObjectsTreeTables} from './mySql/ObjectsTree/updateObjectsTreeTables'
import {deleteObjectsTreeTables} from './mySql/ObjectsTree/deleteObjectsTreeTables'

export default executeQuery

export {
    insertObject,
    insertObjects,
    updateObject,
    updateObjects, 
    deleteObject,
    deleteObjects,
    insertObjectsTables,
    updateObjectsTables,
    deleteObjectsTables,
    insertObjectsTreeTables,
    updateObjectsTreeTables,
    deleteObjectsTreeTables,
    insertObjectsTreeTablesUniqueField,
    checkExistenceOfFieldsObject,
    checkExistenceOfFieldsObjects,
    checkExistenceOfFieldsObjectsTables,
}