import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/branchTemplateContentsModels";


export async function getBranchTemplateContent(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getBranchTemplateContent(id, organizationId);
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

export async function getBranchTemplateContents(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getBranchTemplateContents(organizationId);
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

export async function insertBranchTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        if (req.user && req.user.code) {
            templateContent.createdBy = req.user.code;
            templateContent.updatedBy = req.user.code;
        }

        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }
        const { data, status, errorCode } = await templateContentModel.insertBranchTemplateContent(templateContent);
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



export async function updateBranchTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        templateContent.id = req.params.id;
        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await templateContentModel.updateBranchTemplateContent(templateContent);
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




export async function deleteBranchTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await templateContentModel.deleteBranchTemplateContent(templateContent);
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
