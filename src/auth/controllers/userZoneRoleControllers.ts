import { Request, Response } from "express";
//import {getUserZoneRole,getUserZoneRoles,insertUserZoneRole,insertUserZoneRoles,updateUserZoneRole,updateUserZoneRoles} from "../models/userZoneRoleModels";
import * as userZoneRoleModel from "../models/userZoneRoleModels";

export type userIdZoneIdRoleId = {
    userId: string;
    zoneId: string;
    roleId: string;
};

export async function getUserZoneRole(req: Request, res: Response) {
    try {
        const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
        const zoneId = typeof req.query.zoneId === 'string' ? req.query.zoneId : '';
        const roleId = typeof req.query.roleId === 'string' ? req.query.roleId : '';

        const { data, status } = await userZoneRoleModel.getUserZoneRole({ userId: userId, zoneId: zoneId, roleId: roleId });
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'UserZoneRole not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getUserZoneRoles(req: Request, res: Response) {
    try {
        const { data, status } = await userZoneRoleModel.getUserZoneRoles();
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

export async function insertUserZoneRole(req: Request, res: Response, next: Function) {
    try {
        const userZoneRole = req.body;
        const { data, status, errorCode } = await userZoneRoleModel.insertUserZoneRole(userZoneRole);
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

export async function insertUserZoneRoles(req: Request, res: Response, next: Function) {
    const userZoneRoles = req.body; // Lấy dữ liệu từ body của request
    const { data, status, errorCode } = await userZoneRoleModel.insertUserZoneRoles(userZoneRoles); // Gọi hàm insertUserZoneRoles từ model
    if (status) {
        req.result = data;
        res.status(200).json({ status: status, data: data, errorCode });
        next();
    } else {
        res.status(400).json({ status: status, data: data, errorCode });
    }

}

export async function updateUserZoneRole(req: Request, res: Response, next: Function) {
    try {
        const userZoneRole = req.body;
        const { data, status, errorCode } = await userZoneRoleModel.updateUserZoneRole(userZoneRole, { userId: userZoneRole.userId, zoneId: userZoneRole.zoneId, roleId: userZoneRole.roleId });
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
export async function updateUserZoneRoles(req: Request, res: Response, next: Function) {
    try {
        const userZoneRoles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await userZoneRoleModel.updateUserZoneRoles(userZoneRoles); // Gọi hàm updateUserZoneRoles từ model
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



export async function deleteUserZoneRole(req: Request, res: Response, next: Function) {
    try {
        const userZoneRole = req.body;
        const { data, status, errorCode } = await userZoneRoleModel.deleteUserZoneRole({ userId: userZoneRole.userId, zoneId: userZoneRole.zoneId, roleId: userZoneRole.roleId });
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
export async function deleteUserZoneRoles(req: Request, res: Response, next: Function) {
    try {
        const userZoneRoles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await userZoneRoleModel.deleteUserZoneRoles(userZoneRoles);
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