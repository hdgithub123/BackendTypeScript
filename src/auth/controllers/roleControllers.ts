import { Request, Response } from "express";
//import {getRole,getRoles,insertRole,insertRoles,updateRole,updateRoles} from "../models/roleModels";
import * as roleModel from "../models/roleModels";

// Extend Express Request interface to include 'result'
// declare global {
//     namespace Express {
//         interface Request {
//             result?: any;
//         }
//     }
// }

export async function getRole(req: Request, res: Response) {
    try {
        const code: string = req.params.code;
        const { data, status, errorCode } = await roleModel.getRole(code);
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(404).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getRoles(req: Request, res: Response, next: Function) {
    try {
        const { data, status, errorCode } = await roleModel.getRoles();
        if (status) {
            res.status(200).json({ data, status, errorCode });
            next();
        } else {
            res.status(404).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function insertRole(req: Request, res: Response) {
    try {
        const user = req.body;
        const { data, status, errorCode } = await roleModel.insertRole(user);
        if (status) {
            res.status(201).json({ data, status, errorCode });
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function insertRoles(req: Request, res: Response, next: Function) {
    try {
        const roles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleModel.insertRoles(roles); // Gọi hàm insertRoles từ model
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

export async function updateRole(req: Request, res: Response) {
    try {
        const roleId: string = req.params.id;
        const role = req.body;
        const { data, status, errorCode } = await roleModel.updateRole(roleId, role);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function updateRoles(req: Request, res: Response, next: Function) {
    try {
        const roles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleModel.updateRoles(roles); // Gọi hàm updateRoles từ model
        if (status) {
            req.result = data; // Lưu kết quả vào req.result để có thể sử dụng trong middleware khác nếu cần
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



export async function deleteRole(req: Request, res: Response) {
    try {
        const roleId = req.params.id;
        const { data, status, errorCode } = await roleModel.deleteRole(roleId);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function deleteRoles(req: Request, res: Response) {
    try {
        const roles = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleModel.deleteRoles(roles);
        if (status) {
            res.status(202).json({ data, status, errorCode });
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}