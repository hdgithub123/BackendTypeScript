import { Request, Response } from "express";
import * as zoneModel from "../models/zoneModels";

export async function getZone(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const { data, status, errorCode } = await zoneModel.getZone(id);
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
export async function getZones(req: Request, res: Response) {
    try {
        const { data, status, errorCode } = await zoneModel.getZones();
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

export async function insertZone(req: Request, res: Response) {
    try {
        const zone = req.body;
        const { data, status, errorCode } = await zoneModel.insertZone(zone);
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


export async function updateZone(req: Request, res: Response) {
    try {
        const zoneId: string = req.params.id;
        const zone = req.body;
        const { data, status, errorCode } = await zoneModel.updateZone(zoneId, zone);
        if (status) {
            res.status(200).json({ data, status, errorCode });
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}


export async function insertZones(req: Request, res: Response, next: Function) {
    try {
        const zones = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await zoneModel.insertZones(zones); // Gọi hàm insertZones từ model
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



export async function insertZonesByCode(req: Request, res: Response, next: Function) {
    try {
        const zones = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await zoneModel.insertZonesByCode(zones); // Gọi hàm insertZones từ model
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



// export async function updateZone(req: Request, res: Response) {
//     try {
//         const zoneId:string = req.params.id;
//         const zone = req.body;
//         const { data, status,errorCode } = await zoneModel.updateZone(zoneId, zone);
//         if (status) {
//             res.status(200).json({ data, status,errorCode});
//         } else {
//             res.status(400).json({ data, status,errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }

export async function updateZones(req: Request, res: Response,next: Function) {
    try {
        const zones = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await zoneModel.updateZones(zones); // Gọi hàm updateZones từ model
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


export async function deleteZones(req: Request, res: Response, next: Function) {
    try {
        const zones = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await zoneModel.deleteZones(zones);
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


export async function deleteZone(req: Request, res: Response) {
    try {
        const zoneId = req.params.id;
        const { data, status, errorCode } = await zoneModel.deleteZone(zoneId);
        if (status) {
            res.status(202).json({ data, status, errorCode });
        } else {
            res.status(400).json({ data, status, errorCode });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

// export async function deleteZones(req: Request, res: Response) {
//     try {
//         const zones = req.body; // Lấy dữ liệu từ body của request
//         const { data, status,errorCode } = await zoneModel.deleteZones(zones);
//         if (status) {
//             res.status(202).json({ data, status,errorCode });
//         } else {
//             res.status(400).json({ data, status,errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }