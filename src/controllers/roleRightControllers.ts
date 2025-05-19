import { Request, Response } from "express";
//import {getRoleRight,getRoleRights,insertRoleRight,insertRoleRights,updateRoleRight,updateRoleRights} from "../models/roleRightModels";
import * as roleRightModel from "../models/roleRightModels";

export type roleIdRightId = {
    roleId: string;
    rightId: string;
};

export async function getRoleRight(req: Request, res: Response) {
    try {
        const roleId = typeof req.query.roleId === 'string' ? req.query.roleId : '';
        const rightId = typeof req.query.rightId === 'string' ? req.query.rightId : '';
        const { data, status } = await roleRightModel.getRoleRight({ roleId: roleId, rightId: rightId });
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'RoleRight not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getRoleRights(req: Request, res: Response) {
    try {
        const { data, status } = await roleRightModel.getRoleRights();
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

export async function insertRoleRight(req: Request, res: Response) {
    try {
        const user = req.body;
        const { data, status, errorCode } = await roleRightModel.insertRoleRight(user);
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

export async function insertRoleRights(req: Request, res: Response) {
    const roleRights = req.body; // Lấy dữ liệu từ body của request
    const { data, status, errorCode } = await roleRightModel.insertRoleRights(roleRights); // Gọi hàm insertRoleRights từ model
    if (status) {
        res.status(200).json({ status: status, data: data, errorCode });
    } else {
        res.status(400).json({ status: status, data: data, errorCode });
    }

}

export async function updateRoleRight(req: Request, res: Response) {
    try {
        // const roleRightId: string = req.params.id;
        const roleRight = req.body;
        const { data, status, errorCode } = await roleRightModel.updateRoleRight(roleRight, { roleId: roleRight.roleId, rightId: roleRight.rightId });
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
export async function updateRoleRights(req: Request, res: Response) {
    try {
        const roleRights = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleRightModel.updateRoleRights(roleRights); // Gọi hàm updateRoleRights từ model
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



export async function deleteRoleRight(req: Request, res: Response) {
    try {
        const roleRight = req.body;
        const { data, status, errorCode } = await roleRightModel.deleteRoleRight({ roleId: roleRight.roleId, rightId: roleRight.rightId });
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
export async function deleteRoleRights(req: Request, res: Response) {
    try {
        const roleRights = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleRightModel.deleteRoleRights(roleRights);
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