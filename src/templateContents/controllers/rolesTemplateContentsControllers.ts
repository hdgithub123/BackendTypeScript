import { Request, Response } from "express";
import * as templateContentModel from "../models/rolesTemplateContentsModels";

export async function getRolesTemplateContent(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getRolesTemplateContent(id, organizationId);
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

export async function getRolesTemplateContents(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getRolesTemplateContents(organizationId);
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

export async function insertRolesTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        if (req.user && req.user.code) {
            templateContent.createdBy = req.user.code;
            templateContent.updatedBy = req.user.code;
        }

        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }
        const { data, status, errorCode } = await templateContentModel.insertRolesTemplateContent(templateContent);
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



export async function updateRolesTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        templateContent.id = req.params.id;
        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }
        const { data, status, errorCode } = await templateContentModel.updateRolesTemplateContent(templateContent);
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




export async function deleteRolesTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await templateContentModel.deleteRolesTemplateContent(templateContent);
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
