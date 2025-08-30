import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/usersTemplateContentsModels";

export async function getUsersTemplateContent(req: Request, res: Response) {
    try {
        const id:string = req.params.id;
        const { data, status, errorCode } = await templateContentModel.getUsersTemplateContent(id);
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

export async function getUsersTemplateContents(req: Request, res: Response) {
    try {
        const { data, status, errorCode } = await templateContentModel.getUsersTemplateContents();
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

export async function insertUsersTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContent = req.body;
        const { data, status, errorCode } = await templateContentModel.insertUsersTemplateContent(templateContent);
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



export async function updateUsersTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContentId: string = req.params.id;
        const templateContent = req.body;
        const { data, status, errorCode } = await templateContentModel.updateUsersTemplateContent(templateContentId, templateContent);
        if (status) {
            req.result = data;
            res.status(200).json({ data, status,errorCode });
            next();
        } else {
            res.status(400).json({ data, status,errorCode });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}




export async function deleteUsersTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContentId = req.params.id;
        const { data, status, errorCode } = await templateContentModel.deleteUsersTemplateContent(templateContentId);
        if (status) {
            req.result = data;
            res.status(204).json({  data, status,errorCode  });
            next();
        } else {
            res.status(400).json({  data, status,errorCode  });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
