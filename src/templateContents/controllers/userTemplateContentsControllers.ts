import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/userTemplateContentsModels";

export async function getUserTemplateContent(req: Request, res: Response) {
    try {
        const id:string = req.params.id;
        const { data, status, errorCode } = await templateContentModel.getUserTemplateContent(id);
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
        const templateContentId: string = req.params.id;
        const templateContent = req.body;
        const { data, status, errorCode } = await templateContentModel.updateUserTemplateContent(templateContentId, templateContent);
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




export async function deleteUserTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContentId = req.params.id;
        const { data, status, errorCode } = await templateContentModel.deleteUserTemplateContent(templateContentId);
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
