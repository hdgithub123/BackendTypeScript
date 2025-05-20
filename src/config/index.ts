import executeQuery from "./mySql/executeQuery";
import { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from './mySql/executeObject'
import {  insertObjectsTables, updateObjectsTables, deleteObjectsTables } from './mySql/executeObject'

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
}