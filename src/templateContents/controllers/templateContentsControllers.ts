import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/templateContentsModels";


export async function checkExistenceTemplateContent(req: Request, res: Response) {
    try {
        const templateContent = req.body;
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
        const code:string = req.params.code;
        const { data, status, errorCode } = await templateContentModel.getTemplateContent(code);
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
        const { data, status, errorCode } = await templateContentModel.getTemplateContents();
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
        const templateContents = req.body; // Lấy dữ liệu từ body của request
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
        const templateContentId: string = req.params.id;
        const templateContent = req.body;
        const { data, status, errorCode } = await templateContentModel.updateTemplateContent(templateContentId, templateContent);
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
export async function updateTemplateContents(req: Request, res: Response, next: Function) {
    try {
        const templateContents = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await templateContentModel.updateTemplateContents(templateContents); // Gọi hàm updateTemplateContents từ model
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



export async function deleteTemplateContent(req: Request, res: Response, next: Function) {
    try {
        const templateContentId = req.params.id;
        const { data, status, errorCode } = await templateContentModel.deleteTemplateContent(templateContentId);
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
export async function deleteTemplateContents(req: Request, res: Response, next: Function) {
    try {
        const templateContents = req.body; // Lấy dữ liệu từ body của request
        const { data, status, errorCode } = await templateContentModel.deleteTemplateContents(templateContents);
        if (status) {
            req.result = data;
            res.status(202).json({  data, status,errorCode  });
            next();
        } else {
            res.status(400).json({  data, status,errorCode  });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}


