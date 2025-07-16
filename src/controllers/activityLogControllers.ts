import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as activityLogsModels from "../models/activityLogsModels";



export async function getActivityLogs(req: Request, res: Response) {
    try {
        const { data, status, errorCode } = await activityLogsModels.getActivityLogs();
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


export async function insertActivityLogs(req: Request, res: Response) {
    try {
        const activeLogs = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await activityLogsModels.insertActivityLogs(activeLogs); // Gọi hàm insertActivityLogs từ model
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