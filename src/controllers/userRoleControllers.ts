import { Request, Response } from "express";
//import {getUserRole,getUserRoles,insertUserRole,insertUserRoles,updateUserRole,updateUserRoles} from "../models/userRoletModels";
import * as userRoletModel from "../models/userRoleModels";

export type userIdRightId = {
    userId: string;
    roleId: string;
};

export async function getUserRole(req: Request, res: Response) {
    try {
        const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
        const roleId = typeof req.query.roleId === 'string' ? req.query.roleId : '';
        const { data, status } = await userRoletModel.getUserRole({ userId: userId, roleId: roleId });
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'UserRole not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getUserRoles(req: Request, res: Response) {
    try {
        const { data, status } = await userRoletModel.getUserRoles();
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

export async function insertUserRole(req: Request, res: Response) {
    try {
        const user = req.body;
        const { data, status, errorCode } = await userRoletModel.insertUserRole(user);
        if (status) {
            res.status(201).json({  status: status, data: data, errorCode  });
        } else {
            res.status(400).json({  status: status, data: data, errorCode  });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function insertUserRoles(req: Request, res: Response) {
    const userRoles = req.body; // Lấy dữ liệu từ body của request
    const { data, status, errorCode } = await userRoletModel.insertUserRoles(userRoles); // Gọi hàm insertUserRoles từ model
    if (status) {
        res.status(200).json({ status: status, data: data, errorCode });
    } else {
        res.status(400).json({ status: status, data: data, errorCode });
    }

}

export async function updateUserRole(req: Request, res: Response) {
    try {
        // const userRoletId: string = req.params.id;
        const userRolet = req.body;
        const { data, status, errorCode } = await userRoletModel.updateUserRole(userRolet, { userId: userRolet.userId, roleId: userRolet.roleId });
        if (status) {
            res.status(200).json({ status: status, data: data, errorCode });
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function updateUserRoles(req: Request, res: Response) {
    try {
        const userRolets = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await userRoletModel.updateUserRoles(userRolets); // Gọi hàm updateUserRoles từ model
        if (status) {
            res.status(200).json({ status: status, data: data, errorCode });
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function deleteUserRole(req: Request, res: Response) {
    try {
        const userRole = req.body;
        const { data, status, errorCode } = await userRoletModel.deleteUserRole({ userId: userRole.userId, roleId: userRole.roleId });
        if (status) {
            res.status(204).json({ status: true, data: data, errorCode });
        } else {
            res.status(400).json({ status: false, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function deleteUserRoles(req: Request, res: Response) {
    try {
        const userRolets = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await userRoletModel.deleteUserRoles(userRolets);
        if (status) {
            res.status(202).json({ status: status, data: data, errorCode });
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}