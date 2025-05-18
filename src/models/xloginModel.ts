import executeQuery from "../config/mySql/executeQuery";
// lấy tất cả users trên csdl
function loginModel(): any {
        const Sqlstring = "Select * from users";
        const data =  executeQuery(Sqlstring);
        console.log("data",data)
        return data;
}

export default loginModel