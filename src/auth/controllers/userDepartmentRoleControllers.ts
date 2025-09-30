import { Request, Response } from "express";
//import {getUserDepartmentRole,getUserDepartmentRoles,insertUserDepartmentRole,insertUserDepartmentRoles,updateUserDepartmentRole,updateUserDepartmentRoles} from "../models/userDepartmentRoleModels";
import * as userDepartmentRoleModel from "../models/userDepartmentRoleModels";

export type userIdDepartmentIdRoleId = {
    userId: string;
    departmentId: string;
    roleId: string;
};



export async function getUserDepartmentRole(req: Request, res: Response) {
    try {
        const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
        const departmentId = typeof req.query.departmentId === 'string' ? req.query.departmentId : '';
        const roleId = typeof req.query.roleId === 'string' ? req.query.roleId : '';

        const { data, status } = await userDepartmentRoleModel.getUserDepartmentRole({ userId: userId, departmentId: departmentId, roleId: roleId });
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
        const { data, status } = await userDepartmentRoleModel.getUserDepartmentRoles();
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
        const { data, status, errorCode } = await userDepartmentRoleModel.insertUserDepartmentRole(userDepartmentRole);
        if (status) {
            req.result = data;
            res.status(201).json({  status: status, data: data, errorCode  });
            next();
        } else {
            res.status(400).json({  status: status, data: data, errorCode  });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function insertUserDepartmentRoles(req: Request, res: Response, next: Function) {
    const userDepartmentRoles = req.body; // Lấy dữ liệu từ body của request
    const { data, status, errorCode } = await userDepartmentRoleModel.insertUserDepartmentRoles(userDepartmentRoles); // Gọi hàm insertUserDepartmentRoles từ model
    if (status) {
        req.result = data;
        res.status(200).json({ status: status, data: data, errorCode });
        next();
    } else {
        res.status(400).json({ status: status, data: data, errorCode });
    }

}

export async function updateUserDepartmentRole(req: Request, res: Response, next: Function) {
    try {
        const userDepartmentRole = req.body;
        const { data, status, errorCode } = await userDepartmentRoleModel.updateUserDepartmentRole(userDepartmentRole, { userId: userDepartmentRole.userId, departmentId: userDepartmentRole.departmentId, roleId: userDepartmentRole.roleId });
        if (status) {
            req.result = data;
            res.status(200).json({ status: status, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function updateUserDepartmentRoles(req: Request, res: Response, next: Function) {
    try {
        const userDepartmentRoles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await userDepartmentRoleModel.updateUserDepartmentRoles(userDepartmentRoles); // Gọi hàm updateUserDepartmentRoles từ model
        if (status) {
            req.result = data;
            res.status(200).json({ status: status, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function deleteUserDepartmentRole(req: Request, res: Response, next: Function) {
    try {
        const userDepartmentRole = req.body;
        const { data, status, errorCode } = await userDepartmentRoleModel.deleteUserDepartmentRole({ userId: userDepartmentRole.userId, departmentId: userDepartmentRole.departmentId, roleId: userDepartmentRole.roleId });
        if (status) {
            req.result = data;
            res.status(204).json({ status: true, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: false, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function deleteUserDepartmentRoles(req: Request, res: Response, next: Function) {
    try {
        const userDepartmentRoles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await userDepartmentRoleModel.deleteUserDepartmentRoles(userDepartmentRoles);
        if (status) {
            req.result = data;
            res.status(202).json({ status: status, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}