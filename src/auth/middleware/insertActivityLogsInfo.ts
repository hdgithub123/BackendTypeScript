import { Request, Response, NextFunction } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as activityLogsModels from "../models/activityLogsModels";
const UAParser = require("ua-parser-js");

export default function insertActivityLogsInfo(
    info?: Partial<{ action: string; tableName: string; description: string }>,
    isNext?: boolean
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const activeData = req.body;
            const oldData = req.headers['old_data'];
            const ua = req.headers['user-agent'] || '';
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


            const activeLogs = [
                {
                    userId: req.user?.userId ? req.user.userId : null, // Lưu ID người dùng nếu có
                    userName: req.user?.username ? req.user.username : 'unknown',
                    action: info?.action ?? "unknown",
                    tableName: info?.tableName ?? "unknown",
                    description: info?.description ?? "unknown",
                    ip: ip,
                    oldData: oldData ? oldData : {},
                    newData: activeData ? activeData : {},
                    browserInfo,
                    protocol,
                    hostname,
                    originalUrl,
                    method,
                    port,
                    secure,
                }
            ]

            await activityLogsModels.insertActivityLogs(activeLogs);
            if (isNext) {
                next();
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}