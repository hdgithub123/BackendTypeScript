import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/userTemplateContentsModels";

export async function getUserTemplateContent(req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getUserTemplateContent(id, organizationId);
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

export async function getUserTemplateContents(req: Request, res: Response) {
    try {
        const organizationId = req.user.organizationId
        const { data, status, errorCode } = await templateContentModel.getUserTemplateContents(organizationId);
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

export async function insertUserTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        if (req.user && req.user.code) {
            templateContent.createdBy = req.user.code;
            templateContent.updatedBy = req.user.code;
        }

        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }
        const { data, status, errorCode } = await templateContentModel.insertUserTemplateContent(templateContent);
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



export async function updateUserTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        templateContent.id = req.params.id;
        if (req.user && req.user.organizationId) {
            templateContent.organizationId = req.user.organizationId;
        }

        const { data, status, errorCode } = await templateContentModel.updateUserTemplateContent(templateContent);
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




export async function deleteUserTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = { id: req.params.id, organizationId: req.user.organizationId }
        const { data, status, errorCode } = await templateContentModel.deleteUserTemplateContent(templateContent);
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
