import { Request, Response } from "express";
//import {getUser,getUsers,insertUser,insertUsers,updateUser,updateUsers} from "../models/userModel";
import * as userModel from "../models/userModel";

export async function getUser(req: Request, res: Response) {
    try {
        const username:string = req.params.username;
        const { data, status } = await userModel.getUser(username);
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getUsers(req: Request, res: Response) {
    try {
        const { data, status } = await userModel.getUsers();
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

export async function insertUser(req: Request, res: Response) {
    try {
        const user = req.body;
        const { data, status } = await userModel.insertUser(user);
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

export async function insertUsers(req: Request, res: Response) {
    try {
        const users = req.body; // Lấy dữ liệu từ body của request
        await userModel.insertUsers(users); // Gọi hàm insertUsers từ model
        res.status(201).json({ status: true, message: 'Users inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const userId:string = req.params.id;
        const user = req.body;
        const { data, status } = await userModel.updateUser(userId, user);
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
export async function updateUsers(req: Request, res: Response) {
    try {
        const users = req.body; // Lấy dữ liệu từ body của request
        await userModel.updateUsers(users); // Gọi hàm updateUsers từ model
        res.status(200).json({ status: true, message: 'Users updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const { data, status } = await userModel.deleteUser(userId);
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
export async function deleteUsers(req: Request, res: Response) {
    try {
        const users = req.body; // Lấy dữ liệu từ body của request
        const { data, status } = await userModel.deleteUsers(users);
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