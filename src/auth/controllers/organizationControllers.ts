import { Request, Response } from "express";
//import {getOrganization,getOrganizations,insertOrganization,insertOrganizations,updateOrganization,updateOrganizations} from "../models/organizationModels";
import * as organizationModel from "../models/organizationsModels";


export async function checkExistenceOrganization(req: Request, res: Response) {
    try {
        const organization = req.body;
        const { data, status, errorCode } = await organizationModel.checkExistenceOrganization(organization);
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


export async function checkExistenceOrganizations(req: Request, res: Response) {
    try {
        const organizations = req.body;
        const { data, status, errorCode } = await organizationModel.checkExistenceOrganizations(organizations);
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


export async function getIdOrganizationsByCodes(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const codes: string[] = req.body.data; // Giả sử bạn gửi mã người dùng trong body dưới dạng mảng
        const { data, status, errorCode } = await organizationModel.getIdOrganizationsByCodes(codes);
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


export async function getOrganization(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const { data, status, errorCode } = await organizationModel.getOrganization(id);
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
export async function getOrganizations(req: Request, res: Response) {
    try {
        const { data, status, errorCode } = await organizationModel.getOrganizations();
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

export async function insertOrganization(req: Request, res: Response, next: Function) {
    try {
        const organization = req.body;
        if (req.user && req.user.code) {
            organization.createdBy = req.user.code;
            organization.updatedBy = req.user.code;
        } else {
            organization.createdBy = 'Register';
        }
        const { data, status, errorCode } = await organizationModel.insertOrganization(organization);
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

export async function insertOrganizations(req: Request, res: Response, next: Function) {
    try {
        let organizations = req.body; // Lấy dữ liệu từ body của request
        if (Array.isArray(organizations) && req.user && req.user.organizationId) {
            organizations = organizations.map(organization => ({
                ...organization,
                createdBy: req.user.code ?? 'Register',
                updatedBy: req.user.code ?? 'Register',
            }));
        }


        const { data, status, errorCode } = await organizationModel.insertOrganizations(organizations); // Gọi hàm insertOrganizations từ model
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

export async function updateOrganization(req: Request, res: Response, next: Function) {
    try {
        let organization = req.body;
        organization.id = req.params.id;

        if (req.user && req.user.code) {
            organization.updatedBy = req.user.code;
        } else {
            organization.updatedBy = 'Unknown';
        }
        const now = new Date();
        organization.updatedAt = now.toISOString().slice(0, 19).replace('T', ' ');

        const { data, status, errorCode } = await organizationModel.updateOrganization(organization);
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

export async function updateOrganizations(req: Request, res: Response, next: Function) {
    try {
        let organizations = req.body; // Lấy dữ liệu từ body của request
        if (Array.isArray(organizations) && req.user && req.user.organizationId) {
            organizations = organizations.map(organization => ({
                ...organization,
                updatedBy: req.user.code ?? 'Unknown',
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }));
        }
        
        const { data, status, errorCode } = await organizationModel.updateOrganizations(organizations); // Gọi hàm updateOrganizations từ model
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



export async function deleteOrganization(req: Request, res: Response, next: Function) {
    try {
        const organizationId = req.params.id;
        const { data, status, errorCode } = await organizationModel.deleteOrganization(organizationId);
        if (status) {
            req.result = data;
            res.status(204).json({ data, status, errorCode });
            next();
        } else {
            res.status(400).json({ data, status, errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
export async function deleteOrganizations(req: Request, res: Response, next: Function) {
    try {
        const organizations = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await organizationModel.deleteOrganizations(organizations);
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