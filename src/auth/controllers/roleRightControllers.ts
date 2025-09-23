import e, { Request, Response } from "express";
//import {getRoleRight,getRoleRights,insertRoleRight,insertRoleRights,updateRoleRight,updateRoleRights} from "../models/roleRightModels";
import * as roleRightModel from "../models/roleRightModels";

export type roleIdRightId = {
    roleId: string;
    rightId: string;
};



export async function getRightsFromRoleId(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await roleRightModel.getRightsFromRoleId(id, organizationId);
        if (status) {
            res.status(200).json({ status: status, data: data, errorCode: errorCode });
        } else {
            res.status(500).json({ status: status, message: 'Internal Server Error', errorCode: errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}



export async function getRightsNotInRoleId(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await roleRightModel.getRightsNotInRoleId(id, organizationId);
        if (status) {
            res.status(200).json({ status: status, data: data, errorCode: errorCode });
        } else {
            res.status(500).json({ status: status, message: 'Internal Server Error', errorCode: errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}


export async function insertRoleRights(req: Request, res: Response, next: Function) {
    const roleRights = req.body; // Lấy dữ liệu từ body của request
    const { data, status, errorCode } = await roleRightModel.insertRoleRights(roleRights); // Gọi hàm insertRoleRights từ model
    if (status) {
        req.result = data;
        res.status(200).json({ status: status, data: data, errorCode });
        next();
    } else {
        res.status(400).json({ status: status, data: data, errorCode });
    }

}


export async function updateRoleRights(req: Request, res: Response, next: Function) {
    try {
        const roleRights = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleRightModel.updateRoleRights(roleRights); // Gọi hàm updateRoleRights từ model
        if (status) {
            req.result = data;
            res.status(200).json({ status: status, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}




export async function deleteRoleRights(req: Request, res: Response, next: Function) {
    try {
        const roleRights = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await roleRightModel.deleteRoleRights(roleRights);
        if (status) {
            req.result = data;
            res.status(202).json({ status: status, data: data, errorCode });
            next();
        } else {
            res.status(400).json({ status: status, data: data, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}











// export async function getRoleRight(req: Request, res: Response) {
//     try {
//         const roleId = typeof req.query.roleId === 'string' ? req.query.roleId : '';
//         const rightId = typeof req.query.rightId === 'string' ? req.query.rightId : '';
//         const { data, status } = await roleRightModel.getRoleRight({ roleId: roleId, rightId: rightId });
//         if (status && Array.isArray(data) && data.length > 0) {
//             res.status(200).json({ status: status, data: data[0] });
//         } else {
//             res.status(404).json({ status: status, message: 'RoleRight not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }

// export async function insertRoleRight(req: Request, res: Response, next: Function) {
//     try {
//         const user = req.body;
//         const { data, status, errorCode } = await roleRightModel.insertRoleRight(user);
//         if (status) {
//             req.result = data;
//             res.status(201).json({  status: status, data: data, errorCode  });
//             next();
//         } else {
//             res.status(400).json({  status: status, data: data, errorCode  });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }

// export async function updateRoleRight(req: Request, res: Response, next: Function) {
//     try {
//         // const roleRightId: string = req.params.id;
//         const roleRight = req.body;
//         const { data, status, errorCode } = await roleRightModel.updateRoleRight(roleRight, { roleId: roleRight.roleId, rightId: roleRight.rightId });
//         if (status) {
//             req.result = data;
//             res.status(200).json({ status: status, data: data, errorCode });
//             next();
//         } else {
//             res.status(400).json({ status: status, data: data, errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }

// export async function deleteRoleRight(req: Request, res: Response, next: Function) {
//     try {
//         const roleRight = req.body;
//         const { data, status, errorCode } = await roleRightModel.deleteRoleRight({ roleId: roleRight.roleId, rightId: roleRight.rightId });
//         if (status) {
//             req.result = data;
//             res.status(204).json({ status: true, data: data, errorCode });
//             next();
//         } else {
//             res.status(400).json({ status: false, data: data, errorCode });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Internal Server Error' });
//     }
// }