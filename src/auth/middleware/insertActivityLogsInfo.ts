import { Request, Response, NextFunction } from "express";
import * as activityLogsModels from "../models/activityLogsModels";
const UAParser = require("ua-parser-js");

export default function insertActivityLogsInfo(
    info?: Partial<{ action: string; tableName: string; description: string }>,
    isNext?: boolean
) {
    return async function (req: Request, res: Response, next: NextFunction) {

        try {
            const resultsData = req.result || [];
            const userId = req.user?.id || "unknown";
            const userName = req.user?.code || 'unknown';
            const action = info?.action ?? "unknown";
            const description = info?.description ?? "unknown";
            const zoneId = req.headers['zone'] ?? "unknown";
            
            let organizationId = "unknown";
            if (typeof req.user.organizationId === 'string') {
                organizationId = req.user.organizationId;
            }
            // Lấy thông tin trình duyệt và địa chỉ IP
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

            const activeLogs: any[] = [];
            // Kiểm tra nếu resultsData là một mảng hoặc là mảng rỗng
            if (!resultsData || !Array.isArray(resultsData) || resultsData.length === 0) {
                activeLogs.push({
                    organizationId,
                    zoneId,
                    userId,
                    userName,
                    action,
                    tableName: info?.tableName || "unknown",
                    description,
                    ip,
                    oldData: null,
                    activeData: null,
                    browserInfo,
                    protocol,
                    hostname,
                    originalUrl,
                    method,
                    port,
                    secure,
                });
            } else {
                for (const resultData of resultsData) {
                    const tableName = resultData.table || info?.tableName || "unknown";

                    const dataInArr = Array.isArray(resultData.dataIn) ? resultData.dataIn : [];
                    const oldDataArr = Array.isArray(resultData.oldData) ? resultData.oldData : [];

                    for (let i = 0; i < dataInArr.length; i++) {
                        const activeData = dataInArr[i];
                        const oldData = oldDataArr[i] || {};

                        activeLogs.push({
                            organizationId,
                            zoneId,
                            userId,
                            userName,
                            action,
                            tableName,
                            description,
                            ip,
                            oldData,
                            activeData: activeData,
                            browserInfo,
                            protocol,
                            hostname,
                            originalUrl,
                            method,
                            port,
                            secure,
                        });
                    }
                }
            }

            await activityLogsModels.insertAutoActivityLogs(activeLogs);
            if (isNext) {
                next();
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}