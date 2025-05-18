import executeQuery from "./mySql/executeQuery";
import { insertObject, insertObjects, updateObject, updateObjects, deleteObject, deleteObjects } from './mySql/executeObject'


export default executeQuery

export {
    insertObject, 
    insertObjects, 
    updateObject, 
    updateObjects, 
    deleteObject, 
    deleteObjects
}