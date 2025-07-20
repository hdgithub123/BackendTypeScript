import executeQuery from "./mySql/executeQuery";
import { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from './mySql/executeObject'
import {  insertObjectsTables, updateObjectsTables, deleteObjectsTables } from './mySql/executeObject'
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
}