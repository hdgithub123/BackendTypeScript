import { Request, Response, NextFunction } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as activityLogsModels from "../models/activityLogsModels";
const UAParser = require("ua-parser-js");


export async function getActivityLogsByUsername(req: Request, res: Response) {
    try {
        const username: string = req.params.username;
        const { data, status, errorCode } = await activityLogsModels.getActivityLogsByUsername(username);
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
        const activeData = req.body; // Lấy dữ liệu từ body của request

        const ua = req.headers["user-agent"];
        const parser = new UAParser(ua);
        const browserInfo = JSON.parse(JSON.stringify(parser.getResult(), null, 2));
        const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const ipString = typeof rawIp === "string" ? rawIp : String(rawIp);
        const ip = ipString === "::1" ? "127.0.0.1" : ipString;

        const protocol = req.protocol; // http hoặc https
        const hostname = req.hostname; // tên host (không bao gồm port)
        const originalUrl = req.originalUrl; // đường dẫn đầy đủ được truy cập
        const method = req.method; // GET, POST, PUT, DELETE...

        const port = req.socket.localPort; // Port server đang lắng nghe
        const secure = req.secure; // true nếu HTTPS


        const activeLogs = activeData.map((log: any) => ({
            action: "unknown",
            tableName: "unknown",
            description: "unknown",
            ...log,
            userId: req.user?.userId ? req.user.userId : null, // Lưu ID người dùng nếu có
            userName: req.user?.username ? req.user.username : 'unknown',
            ip,
            protocol,
            hostname,
            originalUrl,
            method,
            port,
            secure,
            browserInfo,
        }));


        const { data, status, errorCode } = await activityLogsModels.insertActivityLogs(activeLogs); // Gọi hàm insertActivityLogs từ model

        if (status) {
            res.status(201).json({ data, status, errorCode, browserInfo, ip });
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function deleteActivityLogs(req: Request, res: Response) {
    try {

        const { status, errorCode } = await activityLogsModels.deleteActivityLogs();

        if (status) {
            res.status(200).json({ status, message: 'Activity log deleted successfully' });
        } else {
            res.status(400).json({ status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}