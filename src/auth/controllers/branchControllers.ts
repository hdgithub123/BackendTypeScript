import { Request, Response } from "express";
import * as branchModel from "../models/branchModels";


export async function checkExistenceBranch(req: Request, res: Response) {
    try {
        const branch = req.body;
        branch.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await branchModel.checkExistenceBranch(branch);
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



export async function checkExistenceBranches(req: Request, res: Response) {
    try {
        const branchs = req.body;
        branchs.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await branchModel.checkExistenceBranches(branchs);
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


export async function getBranch(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await branchModel.getBranch(id, organizationId);
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
export async function getBranches(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await branchModel.getBranches(organizationId);
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


export async function getIdBranchesByCodes(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const codes: string[] = req.body.data; // Giả sử bạn gửi mã người dùng trong body dưới dạng mảng
        const { data, status, errorCode } = await branchModel.getIdBranchesByCodes(organizationId, codes);
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



export async function insertBranch(req: Request, res: Response, next: Function) {
    try {
        const branch = req.body;
        if (req.user && req.user.code) {
            branch.createdBy = req.user.code;
            branch.updatedBy = req.user.code;
        } else {
            branch.createdBy = 'system';
        }

        if (req.user && req.user.organizationId) {
            branch.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await branchModel.insertBranch(branch);
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

export async function insertBranches(req: Request, res: Response, next: Function) {
    try {
        let branchs = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array branchs gán branch.organizationId = req.user.organizationId
        if (Array.isArray(branchs) && req.user && req.user.organizationId) {
            branchs = branchs.map(branch => ({
                ...branch,
                createdBy: req.user.code ?? 'system',
                updatedBy: req.user.code ?? 'system',
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await branchModel.insertBranches(branchs); // Gọi hàm insertBranches từ model
        if (status) {
            req.result = data; // Lưu kết quả vào req.result để có thể sử dụng trong middleware khác nếu cần
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

export async function updateBranch(req: Request, res: Response, next: Function) {
    try {
        const branch = req.body;
        branch.id = req.params.id;

        if (req.user && req.user.code) {
            branch.updatedBy = req.user.code;
        } else {
            branch.updatedBy = 'Unknown';
        }
        const now = new Date();
        branch.updatedAt = now.toISOString().slice(0, 19).replace('T', ' ');

        if (req.user && req.user.organizationId) {
            branch.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await branchModel.updateBranch(branch);
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



export async function updateBranches(req: Request, res: Response, next: Function) {
    try {
        let branchs = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array branchs gán branch.organizationId = req.user.organizationId
        if (Array.isArray(branchs) && req.user && req.user.organizationId) {
            branchs = branchs.map(branch => ({
                ...branch,
                organizationId: req.user.organizationId,
                updatedBy: req.user.code ?? 'Unknown',
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }));
        }

        const { data, status, errorCode } = await branchModel.updateBranches(branchs); // Gọi hàm updateBranches từ model
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



export async function deleteBranch(req: Request, res: Response, next: Function) {
    try {
        const branch = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await branchModel.deleteBranch(branch);
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


export async function deleteBranches(req: Request, res: Response, next: Function) {
    try {
        let branchs = req.body; // Lấy dữ liệu từ body của request

        if (Array.isArray(branchs) && req.user && req.user.organizationId) {
            branchs = branchs.map(branch => ({
                ...branch,
                organizationId: req.user.organizationId
            }));
        }
        
        const { data, status, errorCode } = await branchModel.deleteBranches(branchs);
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