import { Request, Response } from "express";
//import {getRole,getRoles,insertRole,insertRoles,updateRole,updateRoles} from "../models/roleModels";
import * as roleModel from "../models/roleModels";


export async function checkExistenceRole(req: Request, res: Response) {
    try {
        const role = req.body;
        role.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await roleModel.checkExistenceRole(role);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(404).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function checkExistenceRoles(req: Request, res: Response) {
    try {
        const roles = req.body;
        roles.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await roleModel.checkExistenceRoles(roles);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(404).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}




export async function getRole(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await roleModel.getRole(id, organizationId);
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
export async function getRoles(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await roleModel.getRoles(organizationId);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(404).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}


export async function getIdRolesByCodes(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const codes: string[] = req.body.data; // Giả sử bạn gửi mã người dùng trong body dưới dạng mảng
        const { data, status, errorCode } = await roleModel.getIdRolesByCodes(organizationId, codes);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(500).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }

}



export async function insertRole(req: Request, res: Response, next: Function) {
    try {
        const role = req.body;
        if (req.user && req.user.code) {
            role.createdBy = req.user.code;
            role.updatedBy = req.user.code;
        } else {
            role.createdBy = 'system';
        }

        if (req.user && req.user.organizationId) {
            role.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await roleModel.insertRole(role);
        if (status) {
            req.result = data;
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

export async function insertRoles(req: Request, res: Response, next: Function) {
    try {
        let roles = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array roles gán role.organizationId = req.user.organizationId
        if (Array.isArray(roles) && req.user && req.user.organizationId) {
            roles = roles.map(role => ({
                ...role,
                createdBy: req.user.code ?? 'system',
                updatedBy: req.user.code ?? 'system',
                organizationId: req.user.organizationId
            }));
        }

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

export async function updateRole(req: Request, res: Response, next: Function) {
    try {
        const role = req.body;
        role.id = req.params.id;

        if (req.user && req.user.code) {
            role.updatedBy = req.user.code;
        } else {
            role.updatedBy = 'Unknown';
        }
        const now = new Date();
        role.updatedAt = now.toISOString().slice(0, 19).replace('T', ' ');

        if (req.user && req.user.organizationId) {
            role.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await roleModel.updateRole(role);
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



export async function updateRoles(req: Request, res: Response, next: Function) {
    try {
        let roles = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array roles gán role.organizationId = req.user.organizationId
        if (Array.isArray(roles) && req.user && req.user.organizationId) {
            roles = roles.map(role => ({
                ...role,
                organizationId: req.user.organizationId,
                updatedBy: req.user.code ?? 'Unknown',
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }));
        }

        const { data, status, errorCode } = await roleModel.updateRoles(roles); // Gọi hàm updateRoles từ model
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



export async function deleteRole(req: Request, res: Response, next: Function) {
    try {
        const role = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await roleModel.deleteRole(role);
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


export async function deleteRoles(req: Request, res: Response, next: Function) {
    try {
        let roles = req.body; // Lấy dữ liệu từ body của request

        if (Array.isArray(roles) && req.user && req.user.organizationId) {
            roles = roles.map(role => ({
                ...role,
                organizationId: req.user.organizationId
            }));
        }
        
        const { data, status, errorCode } = await roleModel.deleteRoles(roles);
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