import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as rightModel from "../models/rightModels";

export async function getRight(req: Request, res: Response) {
    try {
        const code:string = req.params.code;
        const { data, status, errorCode } = await rightModel.getRight(code);
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
export async function getRights(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await rightModel.getRights(organizationId);
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


// export async function getRightOfOwner(req: Request, res: Response) {
//     try {
//         const code:string = req.params.code;
//         const { data, status, errorCode } = await rightModel.getRightOfOwner(code);
//         if (status && Array.isArray(data) && data.length > 0) {
//             res.status(200).json({ data, status, errorCode });
//         } else {
//             res.status(404).json({ data, status, errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }
// export async function getRightsOfOwner(req: Request, res: Response) {
//     try {
//         const { data, status, errorCode } = await rightModel.getRightsOfOwner();
//         if (status) {
//             res.status(200).json({ data, status, errorCode });
//         } else {
//             res.status(500).json({ data, status, errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }


// export async function insertRight(req: Request, res: Response, next: Function) {
//     try {
//         const user = req.body;
//         const { data, status, errorCode } = await rightModel.insertRight(user);
//         if (status) {
//             req.result = data;
//             res.status(201).json({ data, status, errorCode });
//             next();
//         } else {
//             res.status(400).json({ data, status, errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }

// export async function insertRights(req: Request, res: Response, next: Function) {
//     try {
//         const rights = req.body; // Lấy dữ liệu từ body của request
//        const { data, status, errorCode } = await rightModel.insertRights(rights); // Gọi hàm insertRights từ model
//          if (status) {
//             req.result = data;
//             res.status(201).json({ data, status, errorCode });
//             next();
//         } else {
//             res.status(400).json({ data, status, errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }

// export async function updateRight(req: Request, res: Response, next: Function) {
//     try {
//         const rightId:string = req.params.id;
//         const right = req.body;
//         const { data, status,errorCode } = await rightModel.updateRight(rightId, right);
//         if (status) {
//             req.result = data;
//             res.status(200).json({ data, status,errorCode });
//             next();
//         } else {
//             res.status(400).json({ data, status,errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }
// export async function updateRights(req: Request, res: Response, next: Function) {
//     try {
//         const rights = req.body; // Lấy dữ liệu từ body của request
//         const { data, status,errorCode } = await rightModel.updateRights(rights); // Gọi hàm updateRights từ model
//          if (status) {
//             req.result = data;
//             res.status(200).json({ data, status,errorCode });
//             next();
//         } else {
//             res.status(400).json({ data, status,errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }



// export async function deleteRight(req: Request, res: Response, next: Function) {
//     try {
//         const rightId = req.params.id;
//         const { data, status,errorCode } = await rightModel.deleteRight(rightId);
//         if (status) {
//             req.result = data;
//             res.status(204).json({  data, status,errorCode  });
//             next();
//         } else {
//             res.status(400).json({  data, status,errorCode  });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }
// export async function deleteRights(req: Request, res: Response, next: Function) {
//     try {
//         const rights = req.body; // Lấy dữ liệu từ body của request
//         const { data, status,errorCode  } = await rightModel.deleteRights(rights);
//         if (status) {
//             req.result = data;
//             res.status(202).json({  data, status,errorCode  });
//             next();
//         } else {
//             res.status(400).json({  data, status,errorCode  });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }