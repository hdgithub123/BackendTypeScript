import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as rightModel from "../models/rightModels";

export async function getRight(req: Request, res: Response) {
    try {
        const code:string = req.params.code;
        const { data, status } = await rightModel.getRight(code);
        if (status && Array.isArray(data) && data.length > 0) {
            res.status(200).json({ status: status, data: data[0] });
        } else {
            res.status(404).json({ status: status, message: 'Right not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function getRights(req: Request, res: Response) {
    try {
        const { data, status } = await rightModel.getRights();
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

export async function insertRight(req: Request, res: Response) {
    try {
        const user = req.body;
        const { data, status } = await rightModel.insertRight(user);
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

export async function insertRights(req: Request, res: Response) {
    try {
        const rights = req.body; // Lấy dữ liệu từ body của request
        await rightModel.insertRights(rights); // Gọi hàm insertRights từ model
        res.status(201).json({ status: true, message: 'Rights inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

export async function updateRight(req: Request, res: Response) {
    try {
        const rightId:string = req.params.id;
        const right = req.body;
        const { data, status } = await rightModel.updateRight(rightId, right);
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
export async function updateRights(req: Request, res: Response) {
    try {
        const rights = req.body; // Lấy dữ liệu từ body của request
        await rightModel.updateRights(rights); // Gọi hàm updateRights từ model
        res.status(200).json({ status: true, message: 'Rights updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function deleteRight(req: Request, res: Response) {
    try {
        const rightId = req.params.id;
        const { data, status } = await rightModel.deleteRight(rightId);
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
export async function deleteRights(req: Request, res: Response) {
    try {
        const rights = req.body; // Lấy dữ liệu từ body của request
        const { data, status } = await rightModel.deleteRights(rights);
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