import { Request, Response } from "express";
//import {getUser,getUsers,insertUser,insertUsers,updateUser,updateUsers} from "../models/userModel";
import * as userModel from "../models/userModel";


export async function checkExistenceUser(req: Request, res: Response) {
    try {
        const user = req.body;
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
        const { data, status, errorCode } = await userModel.getUser(username);
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
        const { data, status, errorCode } = await userModel.getUsers();
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
        if (req.user && req.user.username) {
            user.createdBy = req.user.username;
        } else {
            user.createdBy = 'Register';
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
        const users = req.body; // Lấy dữ liệu từ body của request
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
        const userId: string = req.params.id;
        const user = req.body;
        const { data, status, errorCode } = await userModel.updateUser(userId, user);
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
        const users = req.body; // Lấy dữ liệu từ body của request
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
        const userId = req.params.id;
        const { data, status, errorCode } = await userModel.deleteUser(userId);
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
        const users = req.body; // Lấy dữ liệu từ body của request
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