import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/templateContentsModels";


export async function checkExistenceTemplateContent(req: Request, res: Response) {
    try {
        const templateContent = req.body;
        templateContent.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await templateContentModel.checkExistenceTemplateContent(templateContent);
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


export async function checkExistenceTemplateContents(req: Request, res: Response) {
    try {
        const templateContents = req.body;
        templateContents.whereField = { organizationId: req.user.organizationId }
        const { data, status, errorCode } = await templateContentModel.checkExistenceTemplateContents(templateContents);
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


export async function getTemplateContent(req: Request, res: Response) {
    try {
        const code: string = req.params.code;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getTemplateContent(code, organizationId);
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
export async function getTemplateContents(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getTemplateContents(organizationId);
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

export async function insertTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        if (req.user && req.user.code) {
            templateContent.createdBy = req.user.code;
            templateContent.updatedBy = req.user.code;
        }

        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await templateContentModel.insertTemplateContent(templateContent);
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

export async function insertTemplateContents(req: Request, res: Response, next: Function) {
    try {
        let templateContents = req.body; // Lấy dữ liệu từ body của request
        if (Array.isArray(templateContents) && req.user && req.user.organizationId) {
            templateContents = templateContents.map(templateContent => ({
                ...templateContent,
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await templateContentModel.insertTemplateContents(templateContents); // Gọi hàm insertTemplateContents từ model
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

export async function updateTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        templateContent.id = req.params.id;
        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await templateContentModel.updateTemplateContent(templateContent);
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
export async function updateTemplateContents(req: Request, res: Response, next: Function) {
    try {
        let templateContents = req.body; // Lấy dữ liệu từ body của request

        // Đi qua array users gán templateContents.organizationId = req.user.organizationId
        if (Array.isArray(templateContents) && req.user && req.user.organizationId) {
            templateContents = templateContents.map(templateContent => ({
                ...templateContent,
                organizationId: req.user.organizationId
            }));
        }

        const { data, status, errorCode } = await templateContentModel.updateTemplateContents(templateContents); // Gọi hàm updateTemplateContents từ model
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



export async function deleteTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await templateContentModel.deleteTemplateContent(templateContent);
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
export async function deleteTemplateContents(req: Request, res: Response, next: Function) {
    try {
        let templateContents = req.body; // Lấy dữ liệu từ body của request

        if (Array.isArray(templateContents) && req.user && req.user.organizationId) {
            templateContents = templateContents.map(templateContent => ({
                ...templateContent,
                organizationId: req.user.organizationId
            }));
        }


        const { data, status, errorCode } = await templateContentModel.deleteTemplateContents(templateContents);
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


