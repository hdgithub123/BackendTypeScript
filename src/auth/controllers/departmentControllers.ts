import { Request, Response } from "express";
//import {getDepartment,getDepartments,insertDepartment,insertDepartments,updateDepartment,updateDepartments} from "../models/departmentModels";
import * as departmentModel from "../models/departmentModels";



export async function checkExistenceDepartment(req: Request, res: Response) {
    try {
        const department = req.body;
        department.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await departmentModel.checkExistenceDepartment(department);
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



export async function checkExistenceDepartments(req: Request, res: Response) {
    try {
        const departments = req.body;
        departments.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await departmentModel.checkExistenceDepartments(departments);
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




export async function getDepartment(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await departmentModel.getDepartment(id, organizationId);
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
export async function getDepartments(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await departmentModel.getDepartments(organizationId);
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


export async function getIdDepartmentsByCodes(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const codes: string[] = req.body.data; // Giả sử bạn gửi mã người dùng trong body dưới dạng mảng
        const { data, status, errorCode } = await departmentModel.getIdDepartmentsByCodes(organizationId, codes);
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



export async function insertDepartment(req: Request, res: Response, next: Function) {
    try {
        const department = req.body;
        if (req.user && req.user.code) {
            department.createdBy = req.user.code;
            department.updatedBy = req.user.code;
        } else {
            department.createdBy = 'system';
        }

        if (req.user && req.user.organizationId) {
            department.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await departmentModel.insertDepartment(department);
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

export async function insertDepartments(req: Request, res: Response, next: Function) {
    try {
        let departments = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array departments gán department.organizationId = req.user.organizationId
        if (Array.isArray(departments) && req.user && req.user.organizationId) {
            departments = departments.map(department => ({
                ...department,
                createdBy: req.user.code ?? 'system',
                updatedBy: req.user.code ?? 'system',
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await departmentModel.insertDepartments(departments); // Gọi hàm insertDepartments từ model
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

export async function insertDepartmentsByCode(req: Request, res: Response, next: Function) {
    try {
        let departments = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array departments gán department.organizationId = req.user.organizationId
        if (Array.isArray(departments) && req.user && req.user.organizationId) {
            departments = departments.map(department => ({
                ...department,
                createdBy: req.user.code ?? 'system',
                updatedBy: req.user.code ?? 'system',
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await departmentModel.insertDepartmentsByCode(departments); // Gọi hàm insertDepartments từ model
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

export async function updateDepartment(req: Request, res: Response, next: Function) {
    try {
        const department = req.body;
        department.id = req.params.id;

        if (req.user && req.user.code) {
            department.updatedBy = req.user.code;
        } else {
            department.updatedBy = 'Unknown';
        }
        const now = new Date();
        department.updatedAt = now.toISOString().slice(0, 19).replace('T', ' ');

        if (req.user && req.user.organizationId) {
            department.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await departmentModel.updateDepartment(department);
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



export async function updateDepartments(req: Request, res: Response, next: Function) {
    try {
        let departments = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array departments gán department.organizationId = req.user.organizationId
        if (Array.isArray(departments) && req.user && req.user.organizationId) {
            departments = departments.map(department => ({
                ...department,
                organizationId: req.user.organizationId,
                updatedBy: req.user.code ?? 'Unknown',
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }));
        }

        const { data, status, errorCode } = await departmentModel.updateDepartments(departments); // Gọi hàm updateDepartments từ model
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

export async function updateDepartmentsByCode(req: Request, res: Response, next: Function) {
    try {
        let departments = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array departments gán department.organizationId = req.user.organizationId
        if (Array.isArray(departments) && req.user && req.user.organizationId) {
            departments = departments.map(department => ({
                ...department,
                organizationId: req.user.organizationId,
                updatedBy: req.user.code ?? 'Unknown',
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }));
        }

        const { data, status, errorCode } = await departmentModel.updateDepartmentsByCode(departments); // Gọi hàm updateDepartments từ model
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

export async function deleteDepartment(req: Request, res: Response, next: Function) {
    try {
        const department = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await departmentModel.deleteDepartment(department);
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


export async function deleteDepartments(req: Request, res: Response, next: Function) {
    try {
        let departments = req.body; // Lấy dữ liệu từ body của request

        if (Array.isArray(departments) && req.user && req.user.organizationId) {
            departments = departments.map(department => ({
                ...department,
                organizationId: req.user.organizationId
            }));
        }
        
        const { data, status, errorCode } = await departmentModel.deleteDepartments(departments);
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