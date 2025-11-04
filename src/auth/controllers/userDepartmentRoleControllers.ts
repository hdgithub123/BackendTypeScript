import { Request, Response } from "express";
//import {getUserDepartmentRole,getUserDepartmentRoles,insertUserDepartmentRole,insertUserDepartmentRoles,updateUserDepartmentRole,updateUserDepartmentRoles} from "../models/userDepartmentRoleModels";
import * as userDepartmentRoleModel from "../models/userDepartmentRoleModels";

export type userDepartmentRoleIdDepartmentIdRoleId = {
    id: string;
    userId: string;
    departmentId: string;
    roleId: string;
};



export async function getUserDepartmentRole(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId;
        const id: string = req.params.id;

        const { data, status } = await userDepartmentRoleModel.getUserDepartmentRole(id, organizationId);
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'UserDepartmentRole not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getUserDepartmentRoles(req: Request, res: Response) {
    try {
        const departmentIds = (req.user as { departmentIds?: string[] }).departmentIds;
        const organizationId = req.user.organizationId
        const { data, status } = await userDepartmentRoleModel.getUserDepartmentRoles(organizationId, departmentIds);
        if (status) {
            res.status(200).json({ status: status, data: data });
        } else {
            res.status(500).json({ status: status, message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function insertUserDepartmentRole(req: Request, res: Response, next: Function) {
    try {

        const userDepartmentRole = req.body;
        if (req.user && req.user.code) {
            userDepartmentRole.createdBy = req.user.code;
            userDepartmentRole.updatedBy = req.user.code;
        } else {
            userDepartmentRole.createdBy = 'system';
        }

        const { data, status, errorCode } = await userDepartmentRoleModel.insertUserDepartmentRole(userDepartmentRole);
        if (status) {
            req.result = data;
            res.status(201).json({ status: status, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}


export async function insertUserDepartmentRoles(req: Request, res: Response, next: Function) {
    try {
            let userDepartmentRoles = req.body; // Lấy dữ liệu từ body của request
    
            // Đi qua array userDepartmentRoles gán userDepartmentRole.organizationId = req.user.organizationId
            if (Array.isArray(userDepartmentRoles) && req.user && req.user.organizationId) {
                userDepartmentRoles = userDepartmentRoles.map(userDepartmentRole => ({
                    ...userDepartmentRole,
                    createdBy: req.user.code ?? 'system',
                    updatedBy: req.user.code ?? 'system',
                }));
            }
    
            const { data, status, errorCode } = await userDepartmentRoleModel.insertUserDepartmentRoles(userDepartmentRoles); // Gọi hàm insertRoles từ model
            if (status) {
                req.result = data; // Lưu kết quả vào req.result để có thể sử dụng trong middleware khác nếu cần
                res.status(201).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    

}

export async function updateUserDepartmentRole(req: Request, res: Response, next: Function) {
    try {
            const userDepartmentRole = req.body;
            userDepartmentRole.id = req.params.id;
    
            if (req.user && req.user.code) {
                userDepartmentRole.updatedBy = req.user.code;
            } else {
                userDepartmentRole.updatedBy = 'Unknown';
            }

            const { data, status, errorCode } = await userDepartmentRoleModel.updateUserDepartmentRole(userDepartmentRole);
            if (status) {
                req.result = data;
                res.status(200).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
}


export async function updateUserDepartmentRoles(req: Request, res: Response, next: Function) {
     try {
            let userDepartmentRoles = req.body; // Lấy dữ liệu từ body của request
    
            // Đi qua array userDepartmentRoles gán userDepartmentRole.organizationId = req.user.organizationId
            if (Array.isArray(userDepartmentRoles) && req.user && req.user.organizationId) {
                userDepartmentRoles = userDepartmentRoles.map(userDepartmentRole => ({
                    ...userDepartmentRole,
                    updatedBy: req.user.code ?? 'Unknown',
                }));
            }
    
            const { data, status, errorCode } = await userDepartmentRoleModel.updateUserDepartmentRoles(userDepartmentRoles); // Gọi hàm updateRoles từ model
            if (status) {
                req.result = data;
                res.status(200).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
}



export async function deleteUserDepartmentRole(req: Request, res: Response, next: Function) {
     try {
            const userDepartmentRole = { id: req.params.id }
            const { data, status, errorCode } = await userDepartmentRoleModel.deleteUserDepartmentRole(userDepartmentRole);
            if (status) {
                req.result = data;
                res.status(200).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
}



export async function deleteUserDepartmentRoles(req: Request, res: Response, next: Function) {
    try {
            let userDepartmentRoles = req.body; // Lấy dữ liệu từ body của request

            if (Array.isArray(userDepartmentRoles) && req.user) {
                userDepartmentRoles = userDepartmentRoles.map(role => ({
                    ...role,
                }));
            }

            const { data, status, errorCode } = await userDepartmentRoleModel.deleteUserDepartmentRoles(userDepartmentRoles);
            if (status) {
                req.result = data;
                res.status(202).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
}