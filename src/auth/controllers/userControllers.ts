import { Request, Response } from "express";
//import {getUser,getUsers,insertUser,insertUsers,updateUser,updateUsers} from "../models/userModel";
import * as userModel from "../models/userModel";


export async function checkExistenceUser(req: Request, res: Response) {
    try {
        const user = req.body;
        user.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await userModel.checkExistenceUser(user);
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


export async function checkExistenceUsers(req: Request, res: Response) {
    try {
        const users = req.body;
        users.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await userModel.checkExistenceUsers(users);
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


export async function getUser(req: Request, res: Response) {
    try {
        const username: string = req.params.username;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await userModel.getUser(username, organizationId);
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


export async function getUsers(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await userModel.getUsers(organizationId);
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


export async function getIdUsersByCodes(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const codes: string[] = req.body.data; // Giả sử bạn gửi mã người dùng trong body dưới dạng mảng
        const { data, status, errorCode } = await userModel.getIdUsersByCodes(organizationId, codes);
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

export async function insertUser(req: Request, res: Response, next: Function) {
    try {
        const user = req.body;
        if (req.user && req.user.code) {
            user.createdBy = req.user.code;
            user.updatedBy = req.user.code;
        } else {
            user.createdBy = 'Register';
        }

        if (req.user && req.user.organizationId) {
            user.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await userModel.insertUser(user);
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

export async function insertUsers(req: Request, res: Response, next: Function) {
    try {
        let users = req.body; // Lấy dữ liệu từ body của request
        // Đi qua array users gán user.organizationId = req.user.organizationId
        if (Array.isArray(users) && req.user && req.user.organizationId) {
            users = users.map(user => ({
                ...user,
                createdBy: req.user.code ?? 'Register',
                updatedBy: req.user.code ?? 'Register',
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await userModel.insertUsers(users); // Gọi hàm insertUsers từ model
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


export async function updateUser(req: Request, res: Response, next: Function) {
    try {
        const user = req.body;
        user.id = req.params.id;
        if (req.user && req.user.organizationId) {
            user.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await userModel.updateUser(user,req.user);
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


export async function updateUsers(req: Request, res: Response, next: Function) {
    try {
        let users = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array users gán user.organizationId = req.user.organizationId
        if (Array.isArray(users) && req.user && req.user.organizationId) {
            users = users.map(user => ({
                ...user,
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await userModel.updateUsers(users); // Gọi hàm updateUsers từ model
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



export async function deleteUser(req: Request, res: Response, next: Function) {
    try {
        const user = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await userModel.deleteUser(user,req.user);
        if (status) {
            req.result = data;
            res.status(204).json({ data, status, errorCode });
            next();
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}


export async function deleteUsers(req: Request, res: Response, next: Function) {
    try {
        let users = req.body; // Lấy dữ liệu từ body của request

        if (Array.isArray(users) && req.user && req.user.organizationId) {
            users = users.map(user => ({
                ...user,
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await userModel.deleteUsers(users);
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