import { Request, Response } from "express";
//import {getRole,getRoles,insertRole,insertRoles,updateRole,updateRoles} from "../models/roleModels";
import * as roleModel from "../models/roleModels";

export async function getRole(req: Request, res: Response) {
    try {
        const code:string = req.params.code;
        const { data, status } = await roleModel.getRole(code);
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'Role not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getRoles(req: Request, res: Response) {
    try {
        const { data, status } = await roleModel.getRoles();
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

export async function insertRole(req: Request, res: Response) {
    try {
        const user = req.body;
        const { data, status } = await roleModel.insertRole(user);
        if (status) {
            res.status(201).json({ status: status, data: data });
        } else {
            res.status(400).json({ status: status, message: 'Not connect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function insertRoles(req: Request, res: Response) {
    try {
        const roles = req.body; // Lấy dữ liệu từ body của request
        await roleModel.insertRoles(roles); // Gọi hàm insertRoles từ model
        res.status(201).json({ status: true, message: 'Roles inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function updateRole(req: Request, res: Response) {
    try {
        const roleId:string = req.params.id;
        const role = req.body;
        const { data, status } = await roleModel.updateRole(roleId, role);
        if (status) {
            res.status(200).json({ status: status, data: data });
        } else {
            res.status(400).json({ status: status, message: 'Not Connect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function updateRoles(req: Request, res: Response) {
    try {
        const roles = req.body; // Lấy dữ liệu từ body của request
        await roleModel.updateRoles(roles); // Gọi hàm updateRoles từ model
        res.status(200).json({ status: true, message: 'Roles updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function deleteRole(req: Request, res: Response) {
    try {
        const roleId = req.params.id;
        const { data, status } = await roleModel.deleteRole(roleId);
        if (status) {
            res.status(204).json({ status: true, data: data });
        } else {
            res.status(400).json({ status: false, message: 'Not Conect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function deleteRoles(req: Request, res: Response) {
    try {
        const roles = req.body; // Lấy dữ liệu từ body của request
        const { data, status } = await roleModel.deleteRoles(roles);
        if (status) {
            res.status(202).json({ status: true, data: data });
        } else {
            res.status(400).json({ status: false, message: 'Not Connect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}